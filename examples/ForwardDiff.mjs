import { zipWith, iterate, tail, len, sub } from 'halib'
import { printTable } from './output.mjs'




// from http://rosettacode.org/wiki/Forward_difference, translation of Haskell


const input = [90,47,58,29,22,32,55,5,55,73]


const fd = xs => zipWith (sub) (tail (xs)) (xs)
const f_diff = iterate (len(input) - 1) (fd) (input)




printTable(f_diff)








/*

   90    47    58   29   22   32   55   5 55 73
  -43    11   -29   -7   10   23  -50  50 18
   54   -40    22   17   13  -73  100 -32
  -94    62    -5   -4  -86  173 -132
  156   -67     1  -82  259 -305
 -223    68   -83  341 -564
  291  -151   424 -905
 -442   575 -1329
 1017 -1904
-2921

*/










