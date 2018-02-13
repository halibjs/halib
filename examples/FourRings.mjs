import { len, permK, permRep, filter, range, map } from 'halib'
import { print, print2D } from './output.mjs'


// from http://rosettacode.org/wiki/4-rings_or_4-squares_puzzle




const eq = ([a, b, c, d, e, f, g], _, v = a + b) => v === b+c+d && v === d+e+f && v === f+g
const fs = (low, high, perm) => filter (eq) (perm(7)(range(low, high)))



const res1 = fs (1, 7, permK)
const res2 = fs (3, 9, permK)
// const res3 = fs (0, 9, permRep)      // slow (~10s)




print2D(res1)
print('')
print2D(res2)
print('')
// print(len(res3));






/*

3 7 2 1 5 4 6
4 5 3 1 6 2 7
4 7 1 3 2 6 5
5 6 2 3 1 7 4
6 4 1 5 2 3 7
6 4 5 1 2 7 3
7 2 6 1 3 5 4
7 3 2 5 1 4 6

7 8 3 4 5 6 9
8 7 3 5 4 6 9
9 6 4 5 3 7 8
9 6 5 4 3 8 7

2860

*/






