import Student from './student.model.js';
import Grade from '../grade/grade.model.js';
import createError from 'http-errors';
import _ from 'lodash';
import * as socket from '../../config/socketio';

const errorIfEmpty = result => result || Promise.reject(createError(404));
const errorIfNotSchool = (student, school) => student.school.equals(school) ? student : Promise.reject(createError(403));
const notifyStudentChange = () => socket.onStudentsChange();

export function index(req) {
    var query = {school: req.user.school};

    if (req.query.first_name) {
        query['first_name'] = {$regex: req.query.first_name, $options: 'i'};
    }

    if (req.query.last_name) {
        query['last_name'] = {$regex: req.query.last_name, $options: 'i'};
    }

    if (req.query.class) {
        query['class'] = req.query.class;
    }

    return Student.paginate(query, req.query);
}

export function create(req) {
    const data = _.pick(req.body, ['id', 'name', 'class', 'gender', 'avgGrade']);

    data.school = req.user.school;

    return new Student(data).save()
        .then(errorIfEmpty)
        .then(notifyStudentChange)
        .then(_.noop);
}

export function update(req) {
    var data = _.pick(req.body, ['name', 'class', 'gender', 'avgGrade']);

    return Student.findById(req.params.id)
        .then(errorIfEmpty)
        .then(student => errorIfNotSchool(student, req.user.school))
        .then(student => student.set(data).save())
        .then(notifyStudentChange)
        .then(_.noop);
}

export function remove(req) {
    return Student.findById(req.params.id)
        .then(errorIfEmpty)
        .then(student => errorIfNotSchool(student, req.user.school))
        .then(student => student.remove())
        .then(notifyStudentChange)
        .then(_.noop);
}

export function grades(req) {
    return Student.findById(req.params.id)
        .populate('grades')
        .then(errorIfEmpty)
        .then(student => student.grades);
}

export function addGrade(req) {
    const data = _.pick(req.body, ['subject', 'score', 'created']);

    data.teacher = req.user;

    return Student.findById(req.params.id)
        .then(errorIfEmpty)
        .then(student => errorIfNotSchool(student, req.user.school))
        .then(student => {
            return new Grade(data).save()
                .then(errorIfEmpty)
                .then(grade => Student.findOneAndUpdate({_id: req.params.id}, {$push: {grades: grade._id}}, {new: true})
                    .exec())
                .then(student => student.updateAvgGrade())
                .then(notifyStudentChange)
                .then(_.noop);
        })
}

export function updateGrade(req) {
    var data = _.pick(req.body, ['score']);

    return Student.findById(req.params.id)
        .then(errorIfEmpty)
        .then(student => errorIfNotSchool(student, req.user.school))
        .then(student => {
            return Grade.findById(req.params.grade)
                .then(errorIfEmpty)
                .then(grade => grade.set(data).save())
                .then(() => student.updateAvgGrade())
                .then(notifyStudentChange)
                .then(_.noop);
        });
}

export function removeGrade(req) {
    return Student.findById(req.params.id)
        .then(errorIfEmpty)
        .then(student => errorIfNotSchool(student, req.user.school))
        .then(student => Student.findOneAndUpdate({_id: req.params.id}, {$pull: {grades: req.params.grade}}, {new: true})
            .exec())
        .then(student => student.updateAvgGrade())
        .then(() => Grade.findById(req.params.grade))
        .then(errorIfEmpty)
        .then(grade => grade.remove())
        .then(notifyStudentChange)
        .then(_.noop)
}