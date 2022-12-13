import schools from './assets/json/nyc-highschool.json';

let focuses = schools.map(school => school.interest1);

focuses = new Set(focuses);

console.log(focuses);
