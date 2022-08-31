const Course = require('../models/Course')
const { mongooseToObject } = require('../../util/mongoose');


class CourseController {
    //[GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(course => 
                res.render('courses/show', { course: mongooseToObject(course) })
            )
            .catch(next);
    }
    
    //[GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }
    
    //[POST] /courses/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(formData);
        course.save()
            .then(() => res.redirect('/'))
            .catch(error => {

            });
    }
    
    //[GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseToObject(course)
            }))
            .catch(next);
    }

    //[PUT] /courses/:id/update
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    //GET: Gửi yêu cầu lên server, yêu cầu server trả về dữ liệu cho mình, 
    //POST: gửi dữ liệu lên server và yêu cầu server lưu lại dữ liệu cho mình, 
    //PUT: dùng chỉnh sửa dữ liệu, nó sẽ replace hẳn 1 cái document
    //PATCH: tương tự PUT, khác PUT là sửa từng field 
    //DELETE: , 
    //OPTIONS: Những phương thúc không cần pay load, 
    //HEAD: tương tự OPTIONS

}

module.exports = new CourseController;

