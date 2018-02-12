import { bindR, returnR, liftM2R } from 'halib'
import { printv1D } from 'output'


// a simple reader monad example

const plus = a => b => a + b
const mply = a => b => a * b

const rm = bindR (plus(2))
     (x => bindR (mply(3))
     (y => returnR (x + y)))
     
const rm2 = liftM2R (plus) (plus(2)) (mply(3))




printv1D([rm(4), rm2(4)])







/*

18
18

*/

























