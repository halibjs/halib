import { cp, diags1, splitBy, odd, reverse, from, map, concatMap, invert } from 'halib'
import { printTable } from 'output'



// from http://rosettacode.org/wiki/Zig-zag_matrix




const matrix = n => {
    const array = splitBy (n) (from(0, n * n))
    const fn = (arr, ind) => odd(ind) ? reverse(arr) : arr
    const obj = cp(invert, concatMap(fn), diags1) (array)
    return map (map(n => obj[n])) (array)
};

const res = matrix(5)


printTable(res)




/*

 0  1  5  6 14
 2  4  7 13 15
 3  8 12 16 21
 9 11 17 20 22
10 18 19 23 24

*/



































