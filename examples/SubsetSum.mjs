import { until, combinations, any, sum, find, map, last } from 'halib'
import { print2D } from './output.mjs'


// from http://rosettacode.org/wiki/Subset_sum_problem


const list = 
    [ ["alliance", -624],  ["archbishop", -915],  ["balm", 397],  ["bonnet", 452],
    ["brute", 870],  ["centipede", -658],  ["cobol", 362],  ["covariate", 590],
    ["departure", 952] , ["deploy", 44] , ["diophantine", 645],  ["efferent", 54],
    ["elysee", -326],  ["eradicate", 376],  ["escritoire", 856],  ["exorcism", -983],
    ["fiat", 170],  ["filmy", -874],  ["flatworm", 503],  ["gestapo", 915],
    ["infra", -847],  ["isis", -982],  ["lindholm", 999],  ["markham", 475],
    ["mincemeat", -880],  ["moresby", 756],  ["mycenae", 183],  ["plugging", -266],
    ["smokescreen", 423],  ["speakeasy", -745],  ["vein", 813]]



const zero = x => sum(map(last)(x)) === 0
const combs = until (xs => any (zero) (xs[0]))
                    (xs => (xs[0] = combinations(xs[1]) (list), xs[1]++, xs))
                    ([[[['',1]]], 2])

const res = find (zero) (combs[0])




print2D(res)





/*

archbishop -915
gestapo 915

*/











