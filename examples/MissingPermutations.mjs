import { minus, permutations, head, bindR, cp, map, transpose, count, fact, del,
         minimumBy, unchars, last, ord, chr, foldl1, sum, chain, len, from, elemIndex } from 'halib'
import { printv1D } from './output.mjs'


// from http://rosettacode.org/wiki/Find_the_missing_permutation

const set = 'ABCD'
const missing = 'DBAC'
const list = del (missing) (permutations(set))


const mp1 = list => minus (cp(permutations, head) (list)) (list)
const mp2 = bindR (cp(permutations, head)) (minus)

const mp3 = cp(unchars, map(head), map(minimumBy(last)), map(count), transpose)

const mp4 = cp(unchars, map(chr), map(foldl1((z, c) => z ^ c)), map(map(ord)), transpose)



const rowSum = sum (map (ord) (set))

const mp5 = chain (
    transpose,
    map (x => rowSum - sum(map (ord)(x)) % rowSum),
    map (chr),
    unchars) (list)



const n = len(set)
const max = fact(n) / n * sum(from(0, n))

const mp6 = chain (
    transpose,
    map (x => set[max - sum(map (y => elemIndex (y) (set)) (x))]),
    unchars) (list)






printv1D([last(mp1(list)), last(mp2(list)), mp3(list), mp4(list), mp5, mp6])








/*

DBAC
DBAC
DBAC
DBAC
DBAC
DBAC
DBAC

*/





