import { repeat, replicate, consR, cons, rotateR } from 'halib'
import { printTable } from './output.mjs'



const spiralize = n => {
    const sp = (n, m) => {
        if (n === 0) return []
        if (n === 1 && m === 1) return [[1]]
        const line1 = repeat(n, 1)
        const line2 = consR (replicate(n - 1, '.')) (1)
        return cons (line1) (cons (line2) (rotateR(sp(m - 2, n))))
    }
    return sp(n, n)
}



const res = spiralize(15)
printTable(res);






/*

1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
. . . . . . . . . . . . . . 1
1 1 1 1 1 1 1 1 1 1 1 1 1 . 1
1 . . . . . . . . . . . 1 . 1
1 . 1 1 1 1 1 1 1 1 1 . 1 . 1
1 . 1 . . . . . . . 1 . 1 . 1
1 . 1 . 1 1 1 1 1 . 1 . 1 . 1
1 . 1 . 1 . . . 1 . 1 . 1 . 1
1 . 1 . 1 . 1 1 1 . 1 . 1 . 1
1 . 1 . 1 . . . . . 1 . 1 . 1
1 . 1 . 1 1 1 1 1 1 1 . 1 . 1
1 . 1 . . . . . . . . . 1 . 1
1 . 1 1 1 1 1 1 1 1 1 1 1 . 1
1 . . . . . . . . . . . . . 1
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1

*/







