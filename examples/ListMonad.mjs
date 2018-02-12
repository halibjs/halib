import { bindL, guardL, returnL, range } from 'halib'
import { print2D } from 'output'


// a simple list monad example


const square = x => x * x

const triangle = bindL (range(1, 10))
           (c => bindL (range(1, c))
           (b => bindL (range(1, b))
           (a => guardL (square(a) + square(b) === square(c))
           (_ => guardL (a + b + c === 24)
           (_ => returnL ([a,b,c]))))))




print2D(triangle)








/*

6 8 10

*/




















