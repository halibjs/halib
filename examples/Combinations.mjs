import { scanl1, map, cons, append, foldr, repeat, zipWith, combinations, combRep } from 'halib'
import { print, printArr2D } from './output.mjs'



// from http://rosettacode.org/wiki/Combinations, translation of Haskell

const combs = k => xs => {
    const fn = (x, next) => zipWith (append) (map (map (cons(x))) (cons([])(next))) (next)
    return foldr (fn) (cons ([[]]) (repeat (k, []))) (xs) [k]
}






// from http://rosettacode.org/wiki/Combinations_with_repetitions, translation of Haskell

const combrep = k => xs => {
    const fn = (x, next) => scanl1 ((z, n) => append (map (cons(x)) (z)) (n)) (next)
    return foldr (fn) (cons ([[]]) (repeat (k, []))) (xs) [k]
}







const list = [0,1,2,3,4]

printArr2D(combs(3)(list))
print('')
printArr2D(combinations(3)(list))
print('')
printArr2D(combrep(3)(list))
print('')
printArr2D(combRep(3)(list))




/*

[ [ 0, 1, 2 ],
  [ 0, 1, 3 ],
  [ 0, 1, 4 ],
  [ 0, 2, 3 ],
  [ 0, 2, 4 ],
  [ 0, 3, 4 ],
  [ 1, 2, 3 ],
  [ 1, 2, 4 ],
  [ 1, 3, 4 ],
  [ 2, 3, 4 ] ]

[ [ 0, 1, 2 ],
  [ 0, 1, 3 ],
  [ 0, 1, 4 ],
  [ 0, 2, 3 ],
  [ 0, 2, 4 ],
  [ 0, 3, 4 ],
  [ 1, 2, 3 ],
  [ 1, 2, 4 ],
  [ 1, 3, 4 ],
  [ 2, 3, 4 ] ]

[ [ 0, 0, 0 ],
  [ 0, 0, 1 ],
  [ 0, 0, 2 ],
  [ 0, 0, 3 ],
  [ 0, 0, 4 ],
  [ 0, 1, 1 ],
  [ 0, 1, 2 ],
  [ 0, 1, 3 ],
  [ 0, 1, 4 ],
  [ 0, 2, 2 ],
  [ 0, 2, 3 ],
  [ 0, 2, 4 ],
  [ 0, 3, 3 ],
  [ 0, 3, 4 ],
  [ 0, 4, 4 ],
  [ 1, 1, 1 ],
  [ 1, 1, 2 ],
  [ 1, 1, 3 ],
  [ 1, 1, 4 ],
  [ 1, 2, 2 ],
  [ 1, 2, 3 ],
  [ 1, 2, 4 ],
  [ 1, 3, 3 ],
  [ 1, 3, 4 ],
  [ 1, 4, 4 ],
  [ 2, 2, 2 ],
  [ 2, 2, 3 ],
  [ 2, 2, 4 ],
  [ 2, 3, 3 ],
  [ 2, 3, 4 ],
  [ 2, 4, 4 ],
  [ 3, 3, 3 ],
  [ 3, 3, 4 ],
  [ 3, 4, 4 ],
  [ 4, 4, 4 ] ]

[ [ 0, 0, 0 ],
  [ 0, 0, 1 ],
  [ 0, 0, 2 ],
  [ 0, 0, 3 ],
  [ 0, 0, 4 ],
  [ 0, 1, 1 ],
  [ 0, 1, 2 ],
  [ 0, 1, 3 ],
  [ 0, 1, 4 ],
  [ 0, 2, 2 ],
  [ 0, 2, 3 ],
  [ 0, 2, 4 ],
  [ 0, 3, 3 ],
  [ 0, 3, 4 ],
  [ 0, 4, 4 ],
  [ 1, 1, 1 ],
  [ 1, 1, 2 ],
  [ 1, 1, 3 ],
  [ 1, 1, 4 ],
  [ 1, 2, 2 ],
  [ 1, 2, 3 ],
  [ 1, 2, 4 ],
  [ 1, 3, 3 ],
  [ 1, 3, 4 ],
  [ 1, 4, 4 ],
  [ 2, 2, 2 ],
  [ 2, 2, 3 ],
  [ 2, 2, 4 ],
  [ 2, 3, 3 ],
  [ 2, 3, 4 ],
  [ 2, 4, 4 ],
  [ 3, 3, 3 ],
  [ 3, 3, 4 ],
  [ 3, 4, 4 ],
  [ 4, 4, 4 ] ]

*/

