import { range, sum, unionSorted } from 'halib'
import { print } from './output.mjs'


// from http://rosettacode.org/wiki/Sum_multiples_of_3_and_5



const res = sum(unionSorted (range(3, 1000, 3)) (range(5, 1000, 5)))

print(res)




/*

234168

*/





































