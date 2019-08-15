import _ from 'lodash';
import Student from '../student/student.model';

var DecisionTree = require('decision-tree');

const errorIfEmpty = result => result || Promise.reject(createError(404));
const genders = ['male', 'female'];

export function avgGradeInClass(req) {
    return Student.aggregate([
        {$match: {school: req.user.school}},
        {
            $group: {
                _id: '$class',
                averageGrade: {$avg: '$avgGrade'}
            }
        }]);
}

export function numInClass(req) {
    return Student.aggregate([
        {$match: {school: req.user.school}},
        {
            $group: {
                _id: '$class',
                count: {$sum: 1}
            }
        }]);
}

export async function decisionTree(req) {
    var class_name = "class";
    var features = ["avgGrade", "gender"];
    var d = await Student.find().then(function (data) {
        return data;
    });

    var dt = new DecisionTree(d, class_name, features);
    return dt.predict({
        gender: "female",
        avgGrade: 70
    });
}
