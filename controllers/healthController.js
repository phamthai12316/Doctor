var Health = require('../models/health');
require('mongoose-pagination');
const {check, validationResult} = require('express-validator/check');
exports.getList = function (req, resp) {
    var page = req.query.page || 1;
    var limit = req.query.limit || 10;
    var responseData;
    var keyword = req.query.keyword ;
    var query;
    if (keyword) {
        var searchPara = {
            $text: {
                $search: keyword
            }
        };
        query = Health.find(searchPara);
    } else {
        query = Health.find();
    }
    query = query.where('status').ne(-1);
    query.paginate(parseInt(page), parseInt(limit),
        function (err, listData, totalItem) {
            responseData = {
                'listData': listData,
                'totalPage': Math.ceil(totalItem / limit),
                'page': page,
                'limit': limit,
                'keyword': keyword
            };
            resp.render('admin/health/list', responseData);
        });
}

exports.create = function (req, resp) {
    var responseData = {
        'action': '/admin/health/create',
        'obj': new Health()
    }
    resp.render('admin/health/form', responseData);
}
exports.save = function (req, resp) {

    var obj = new Health(req.body);
    obj.save(function (err) {
        if (err) {
            return resp.status(500).send(err);
        } else {
            return resp.redirect('/admin/health/list');
        }
    });


}
exports.getDetail = function (req, resp) {
    Health.findById(req.params.id, function (err, obj) {
        if (err) {
            return res.status(500).send(err);
        } else {
            var responseData = {
                'obj': obj
            };
            resp.render('admin/health/detail', obj);
        }
    });
}
exports.edit = function (req, resp) {
    Health.findById(req.params.id, function (err, obj) {
        if (err) {
            return res.status(500).send(err);
        } else {
            var responseData = {
                'action': '/admin/health/edit/' + req.params.id,
                'obj': obj
            };
            resp.render('admin/health/form', responseData);
        }
    });
}

// lưu thông tin sản phẩm sau khi sửa.
exports.update = function (req, resp) {
    Health.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: false},
        function (err, obj) {
            if (err) {
                return res.status(500).send(err);
            } else {
                resp.redirect('/admin/health/list');
            }
        });
}
exports.delete = function (req, resp) {
    Health.findByIdAndUpdate(
        req.params.id,
        {
            'status': -1
        },
        {
            new: false
        },
        function (err, obj) {
            if (err) {
                return res.status(500).send(err);
            } else {
                resp.redirect('/admin/health/list');
            }
        });
}

