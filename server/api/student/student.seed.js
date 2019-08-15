import School from '../school/school.model.js';
import User from '../user/user.model.js';
import Grade from '../grade/grade.model.js';
import _ from 'lodash';

export default {
    dependencies: [School, User, Grade],
    seed: (schools, users, grades) => [{
        id: '313562894',
        first_name: 'Yaniv',
        last_name: 'Segal',
        class: 'ט-1',
        school: schools[0],
        gender: 'male',
        grades: _.times(9).map(i => grades[i])
    }, {
        id: '204773584',
        first_name: 'Tal',
        last_name: 'Fin',
        class: 'יא-2',
        school: schools[0],
        gender: 'male',
        grade: []
    }, {
        id: '205634645',
        first_name: 'Eden',
        last_name: 'Tur',
        class: 'י-1',
        school: schools[0],
        gender: 'male',
        grades: []
    }, {
        id: '123456789',
        first_name: 'Gal',
        last_name: 'Levin',
        class: 'ט-1',
        school: schools[0],
        gender: 'female',
        grades: []
    }]
}
