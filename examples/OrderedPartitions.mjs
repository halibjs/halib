import { combinations, nul, bindL, returnL, minusSorted, cons, range, sum, head, tail } from 'halib'
import { printArr3D } from './output.mjs'



// from http://rosettacode.org/wiki/Ordered_Partitions, translation of Haskell


const fn = (xs, ys) => nul(ys) ? [[]] :
           bindL (combinations(head(ys))(xs))
    (cs => bindL (fn(minusSorted(xs)(cs), tail(ys)))
    (rs => returnL (cons(cs)(rs))))

const partitions = xs => fn(range(1, sum(xs)), xs)
const res = partitions([2,0,2])





printArr3D(res)






/*

[ [ [ 1, 2 ], [ ], [ 3, 4 ] ],
  [ [ 1, 3 ], [ ], [ 2, 4 ] ],
  [ [ 1, 4 ], [ ], [ 2, 3 ] ],
  [ [ 2, 3 ], [ ], [ 1, 4 ] ],
  [ [ 2, 4 ], [ ], [ 1, 3 ] ],
  [ [ 3, 4 ], [ ], [ 1, 2 ] ] ]

*/
















