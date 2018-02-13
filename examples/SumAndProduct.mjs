import { filter, combinations, len, intersect, range, all } from 'halib'
import { print2D } from './output.mjs'






// http://rosettacode.org/wiki/Sum_and_Product_Puzzle


const puzzle = () => {    
    const add = x => x[0] + x[1]
    const mul = x => x[0] * x[1]

    const sumEq = (s, p) => filter (q => add(q) === add(p)) (s)
    const mulEq = (s, p) => filter (q => mul(q) === mul(p)) (s)

    const s1 = filter (a => a[0] + a[1] < 100) (combinations(2)(range(2, 100)))
    const s2 = filter (p => all (q => len(mulEq(s1, q)) > 1) (sumEq(s1, p))) (s1)
    const s3 = filter (p => len(intersect (mulEq(s1, p)) (s2)) === 1) (s2)
    return     filter (p => len(intersect (sumEq(s1, p)) (s3)) === 1) (s3)
}





print2D(puzzle())






/*

4 13

*/














