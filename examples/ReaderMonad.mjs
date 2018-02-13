import { bindR, returnR, liftM2R, add, mul } from 'halib'
import { printv1D } from './output.mjs'


// a simple reader monad example



const rm = bindR (add(2))
     (x => bindR (mul(3))
     (y => returnR (x + y)))
     
const rm2 = liftM2R (add) (add(2)) (mul(3))




printv1D([rm(4), rm2(4)])







/*

18
18

*/





















