import School from '../school/school.model.js';

export default {
    dependencies: [School],
    seed: schools => [{
        id: 'admin',
        password: '123',
        first_name: 'admin',
        last_name: 'admin',
        role: 'admin'
    }, {
        id: 'manager0',
        password: '123',
        first_name: 'Shula',
        last_name: 'Cohen',
        role: 'manager',
        school: schools[0]
    },{
        id: 'editor0',
        password: '123',
        first_name: 'Merav',
        last_name: 'Sason',
        role: 'editor',
        school: schools[0]
    }, {
        id: 'viewer0',
        password: '123',
        first_name: 'Sara',
        last_name: 'Levu',
        role: 'viewer',
        school: schools[0]
    }, {
        id: 'manager1',
        password: '123',
        first_name: 'Smadar',
        last_name: 'Shtein',
        role: 'manager',
        school: schools[1]
    },{
        id: 'editor1',
        password: '123',
        first_name: 'Eti',
        last_name: 'Raul',
        role: 'editor',
        school: schools[1]
    }, {
        id: 'viewer1',
        password: '123',
        first_name: 'Clara',
        last_name: 'Amsalem',
        role: 'viewer',
        school: schools[1]
    }]
}