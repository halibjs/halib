import { findIndex, find } from 'halib'
import { printv1D } from './output.mjs'



// from http://rosettacode.org/wiki/Search_a_list_of_records


const cities =
    [{ "name": "Lagos", "population": 21.0 },
     { "name": "Cairo", "population": 15.2 },
     { "name": "Kinshasa-Brazzaville", "population": 11.3 },
     { "name": "Greater Johannesburg", "population": 7.55 },
     { "name": "Mogadishu", "population": 5.85 },
     { "name": "Khartoum-Omdurman", "population": 4.98 },
     { "name": "Dar Es Salaam", "population": 4.7 },
     { "name": "Alexandria", "population": 4.58 },
     { "name": "Abidjan", "population": 4.4 },
     { "name": "Casablanca", "population": 3.98 }]


const index = findIndex (city => city.name === 'Dar Es Salaam') (cities)
const firstBelow5M = find (city => city.population < 5) (cities)
const firstApop = find (city => city.name[0] === 'A') (cities)



printv1D([index, firstBelow5M.name, firstApop.population])






/*

6
Khartoum-Omdurman
4.58

*/









