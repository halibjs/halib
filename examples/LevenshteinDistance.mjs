import { minimum, uncons, scanl, transpose, last, range, foldl, map, len } from 'halib'
import { printh1D } from './output.mjs'


// from http://rosettacode.org/wiki/Levenshtein_distance, translation of Haskell


const data = 
    [["kitten", "sitting"],
     ["sitting", "kitten"],
     ["rosettacode", "raisethysword"],
     ["raisethysword", "rosettacode"]]


const fromEnum = x => x | 0
const zip3 = (x, y, z) => transpose([x, y, z])

const lev = ([s1, s2]) => {
    const transform = (ns, c) => {
        const [n, ns1] = uncons(ns)
        const calc = (z, [c1, x, y]) => minimum([y + 1, z + 1, x + fromEnum(c1 != c)])
        return scanl (calc) (n + 1) (zip3(s1, ns, ns1))
    }
    return last(foldl (transform) (range(0, len(s1))) (s2))
}



const res = map (lev) (data)
printh1D(res)








/*

3 3 8 8

*/














