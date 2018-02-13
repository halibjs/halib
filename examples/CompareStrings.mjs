import { and, zipWith, equal, tail, len, nub, cp, sort, liftM2L, splitBy } from 'halib'
import { print2D } from './output.mjs'



// from http://rosettacode.org/wiki/Compare_a_list_of_strings


const allEqual = cp(x => x < 2, len, nub)
const allInc = xs => equal(xs, cp(nub, sort)(xs))




const allEqual2 = xs => and(zipWith (equal) (xs) (tail(xs)))
const allInc2 = xs => and(zipWith ((a, b) => a < b) (xs) (tail(xs)))






const equals = ['AA', 'AA', 'AA', 'AA']
const sorted = ['AA', 'ACB', 'BB', 'CC']
const empty = []
const single = ['AA']

const fns = [allEqual, allEqual2, allInc, allInc2]
const args = [equals, sorted, empty, single]

const res = liftM2L ((fn, arg) => fn(arg)) (fns) (args)
print2D(splitBy(len(args)) (res))







/*

true false true true
true false true true
false true true true
false true true true

*/




