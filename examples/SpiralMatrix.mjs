import { cp, splitBy, from, map, head, len, tail, append, copy, rotateL, invert } from 'halib'
import { printTable } from './output.mjs'



// from http://rosettacode.org/wiki/Spiral_matrix



const matrix = n => {
    const res = splitBy (n) (from(0, n * n))
    let snail = []
    let array = copy(res)

    while (len(array)) {
        snail = append (snail) (head(array))
        array = cp(rotateL, tail) (array)
    }

    const obj = invert(snail)
    return map (map(n => obj[n])) (res)
}

const res = matrix(5)




printTable(res)





/*

 0  1  2  3 4
15 16 17 18 5
14 23 24 19 6
13 22 21 20 7
12 11 10  9 8

*/











