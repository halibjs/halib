import { map, concat, concatMap, transpose } from 'halib'
import { print, printTable } from './output.mjs'


// from http://rosettacode.org/wiki/Kronecker_product, translation of Haskell



const a1 = [[1, 2], [3, 4]]
const b1 = [[0, 5], [6, 7]]

const a2 = [[0, 1, 0], [1, 1, 1], [0, 1, 0]]
const b2 = [[1, 1, 1, 1], [1, 0, 0, 1], [1, 1, 1, 1]]




const fn = mx => n => map (map(x => x * n)) (mx)
const kprod = (xs, ys) => concatMap (m => map (concat) (transpose(m))) (map (map(fn(ys))) (xs))



const res1 = kprod(a1, b1)
const res2 = kprod(a2, b2)



printTable(res1)
print('')
printTable(res2)







/*

 0  5  0 10
 6  7 12 14
 0 15  0 20
18 21 24 28

0 0 0 0 1 1 1 1 0 0 0 0
0 0 0 0 1 0 0 1 0 0 0 0
0 0 0 0 1 1 1 1 0 0 0 0
1 1 1 1 1 1 1 1 1 1 1 1
1 0 0 1 1 0 0 1 1 0 0 1
1 1 1 1 1 1 1 1 1 1 1 1
0 0 0 0 1 1 1 1 0 0 0 0
0 0 0 0 1 0 0 1 0 0 0 0
0 0 0 0 1 1 1 1 0 0 0 0

*/











