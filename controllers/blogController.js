var Blog = require('../models/blog');
require('mongoose-pagination');
// const {check, validationResult} = require('express-validator/check');

exports.getList = function (req, resp) {
    var page = req.query.page || 1;
    var limit = req.query.limit || 10;
    var responseData;
    var keyword = req.query.keyword;
    var query;
    if (keyword) {
        var searchPara = {
            $text: {
                $search: keyword
            }
        };
        query = Blog.find(searchPara);
    } else {
        query = Blog.find();
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
            resp.render('doctor/blog/list', responseData);
        });
}

exports.create = function (req, resp) {
    var responseData = {
        'action': '/doctor/blog/create',
        'obj': new Blog()
    }
    resp.render('doctor/blog/ckeditor', responseData);
}
exports.save = function (req, resp) {
    var obj = new Blog(req.body);
    obj.save(function (err) {
        if (err) {
            return resp.status(500).send(err);
        } else {
            return resp.redirect('/doctor/blog/list');
        }
    });

}
exports.getDetail = function (req, resp) {
    Blog.findById(req.params.id, function (err, obj) {
        if (err) {
            return res.status(500).send(err);
        } else {
            var responseData = {
                'obj': obj
            };
            resp.render('doctor/blog/detail', obj);
        }
    });
}
exports.edit = function (req, resp) {
    Blog.findById(req.params.id, function (err, obj) {
        if (err) {
            return res.status(500).send(err);
        } else {
            var responseData = {
                'action': '/doctor/blog/edit/' + req.params.id,
                'obj': obj
            };
            resp.render('doctor/blog/ckeditor', responseData);
        }
    });
}

// lưu thông tin sản phẩm sau khi sửa.
exports.update = function (req, resp) {
    Blog.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: false},
        function (err, obj) {
            if (err) {
                return res.status(500).send(err);
            } else {
                resp.redirect('/doctor/blog/list');
            }
        });
}
exports.delete = function (req, resp) {
    Blog.findByIdAndUpdate(
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
                resp.redirect('/doctor/blog/list');
            }
        });
}

