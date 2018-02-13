import { bindL, guardL, returnL, range, len, drop, filter } from 'halib'
import { printv1D } from './output.mjs'



// from http://rosettacode.org/wiki/Pythagorean_triples, translation of Haskell, Javascript




const pytr = n => {
    const xs = range(1, Math.floor(n / 2))
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b)
    const prim = (a, b) => gcd (a, b) === 1
    return bindL (xs)
     (a => bindL (drop (a) (xs))
     (b => bindL (drop (b) (xs))
     (c => guardL (a + b + c <= n && a * a + b * b === c * c)
     (_ => returnL ([prim(a, b), a, b, c])))))
}

const res = pytr (1000)
const prims = filter (x => x[0]) (res)




printv1D([len(res), len(prims)])




/*

325
70

*/














