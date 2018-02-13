import { repeat, len, transpose, map, iter } from 'halib'
import { printTable } from './output.mjs'


// from http://rosettacode.org/wiki/Matrix-exponentiation_operator




const fn = (x, y) => x[0] * y[0] + (len(x) > 1 ? x[1] * y[1] : 0)

const mulMatrix = (a, b) => {
    const tp = transpose(b)
    return map (x => map (y => fn(x, y)) (tp)) (a)
}


const mExp = (n, m) => {
    let idMatrix = map ((arr, i) => map((n, ind) => i === ind ? 1: 0)(arr)) (repeat(len(m), Array(len(m))))
    return iter (n) (idm => mulMatrix(idm, m)) (idMatrix)
}


const res = mExp(10, [[3, 2], [2, 1]])



printTable(res)






/*

1346269 832040
 832040 514229

*/












