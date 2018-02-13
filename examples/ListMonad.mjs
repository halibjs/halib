import { bindL, guardL, returnL, range, sq } from 'halib'
import { print2D } from './output.mjs'


// a simple list monad example


const triangle = bindL (range(1, 10))
           (c => bindL (range(1, c))
           (b => bindL (range(1, b))
           (a => guardL (sq(a) + sq(b) === sq(c))
           (_ => guardL (a + b + c === 24)
           (_ => returnL ([a,b,c]))))))




print2D(triangle)








/*

6 8 10

*/




















