import schoolsList from './json/nyc-highschool.json';
import scoresList from './json/nysc-highschool-scores.json';
import { create, insert, remove, search } from '@lyrasearch/lyra';

// Path: assets\json\nyc-highschool.json

const searchDB = create({
    schema: {
        dbn: 'string',
        name: 'string',
        specialty: 'string',
        location: 'string',
        students: 'number',
        attendance: 'number'
    },
});

let extracted = schoolsList.map((school) => {
        return {
            name: school.school_name,
            dbn: school.dbn,
            location: school.primary_address_line_1,
            city: school.city,
            zip: school.zip,
            phone: school.phone_number,
            website: school.website,
            totalStudents: school.total_students,
            start: school.start_time,
            end: school.end_time,
            sports: school.school_sports?.split(',').map((sport) => sport.trim()),
            attendance: (school.attendance_rate * 100).toFixed(),
            pct_stu_enough_variety: school.pct_stu_enough_variety,
            pct_stu_safe: school.pct_stu_safe,
            school_accessibility_description: school.school_accessibility_description,
            neighborhood: school.neighborhood,
            description: school.overview_paragraph,
            program1: school.program1,
            interest1: school.interest1,
            code1: school.code1,
            email: school.school_email,
            perks: school.addtl_info1?.split(';').map((perk) => perk.trim()),
        }
    }
);

let formattedSchools = scoresList.map((score) => {
        let school = extracted.find((school) => school.dbn === score.dbn);

        return {
            ...school,
            scores: {
                reading: score.sat_critical_reading_avg_score,
                math: score.sat_math_avg_score,
                writing: score.sat_writing_avg_score,
                number: score.num_of_sat_test_takers
            }
        }
    }
);


let schools = formattedSchools.map((school) => {
        return {
            dbn: school.dbn,
            name: school.name,
            specialty: school.interest1,
            location: school.location,
            students: +school.totalStudents,
            attendance: +school.attendance
        }
    }
);

// Deduplicates schools by DBN
schools = schools.filter((school, index, self) => self.findIndex((s) => s.dbn === school.dbn) === index);

// Removes schools that don't have dnbs
schools = schools.filter((school) => school.dbn !== undefined);

// Removes schools that don't have a name
schools = schools.filter((school) => school.name !== undefined);

// This process has to be done, to prevent the schools from being undefined or null. Also, it makes it easier to access the schools and their data
// Flatlist requires a key, so we use the DBN as the key, however you can't have duplicate keys, so we have to remove the duplicates.
// This also makes sure all schools provided have SAT scores.

// Added all schools to a Map
let schoolsMap = new Map();

// Adds all schools to the searchDB
schools.forEach((school) => insert(searchDB, school));

// Maps each school by it DBN
formattedSchools.map((school) => schoolsMap.set(school.dbn, school));


// Functional exports
const getSchools = (dbn) => {
    // If the school exists, return it, otherwise return null
    return schoolsMap.get(dbn) ?? null;
};

const searchSchools = (query) => {
    return search(searchDB, query);
};



export { getSchools, schools, searchSchools };