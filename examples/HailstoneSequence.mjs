import { take, untilA, len, maximumBy, map, last, cp, range, takeLast, even, unwords } from 'halib'
import { printv1D } from './output.mjs'



// from http://rosettacode.org/wiki/Hailstone_sequence, translation of Haskell
              

const hailstone = n => {
    const collatz = n => even (n) ? n / 2 : 3 * n + 1
    return untilA (x => x === 1) (collatz) (n)
}

const hs27 = hailstone (27)
const longest = maximumBy (last) (map (x => [x, cp(len, hailstone) (x)]) (range (1, 100000)))




const res1 = len (hs27)
const res2 = unwords(take (4) (hs27))
const res3 = unwords(takeLast (4) (hs27))
const res4 = unwords(longest)

printv1D([res1, res2, res3, res4])





/*

112
27 82 41 124
8 4 2 1
77031 351

*/


















