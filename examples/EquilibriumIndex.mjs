import { scanl1, scanr1, zip, cons, foldr, add, map } from 'halib'
import { printArr2D } from 'output'



// from http://rosettacode.org/wiki/Equilibrium_index, translation of Haskell, Javascript


const data =
    [[-7, 1, 5, 2, -4, 3, 0],
     [2, 4, 6],
     [2, 9, 2],
     [1, -1, 1, -1, 1, -1, 1],
     [1],
     []]




const fn = ([x, y], res, ind) => x === y ? cons (ind) (res) : res
const eqIndices = xs => foldr (fn) ([]) (zip (scanl1 (add) (xs)) (scanr1 (add) (xs)))




const res = map (eqIndices) (data)

printArr2D(res)







/*

[ [ 3, 6 ],
  [ ],
  [ 1 ],
  [ 0, 1, 2, 3, 4, 5, 6 ],
  [ 0 ],
  [ ] ]

*/


































