import { cp, filter, sum, map, iter, range, len, until, repeat, each, from, cons, unchars, combRep,
         foldl, fact, sq } from 'halib'
import { printv1D } from 'output'




// from http://rosettacode.org/wiki/Iterated_digits_squaring, translation of python, ruby



const step = cp(sum, map(sq), String)
const last = until (x => x === 89 || x === 1) (x => step(x))



const ids = num => len(filter (x => last(x) === 89) (range(1, Math.pow(10, num))))

const res1 = ids(4)   // slow for large numbers





const ids2 = D => {
    const ndig = 10

    const check = (comb, num = Number(unchars(comb))) => {
        const res = num ? last(num) : num
        if (res === 89) {
            const dc = repeat(ndig, 0)
            each (n => dc[n]++) (comb)
            return iter (ndig) ((res, i) => res / fact(dc[i])) (fact (len(comb)))
        }
        return 0
    }

    return foldl ((res, comb) => res + check(comb)) (0) (combRep (D)(from(0, ndig)))
}

const res2 = ids2(8)






const ids3 = D => {
    const table = num => map (x => last(x) === 89 ? 0 : 1) (range(1, num))
    const N = cons (1) (table(81 * D))
    const F = map (fact) (range(0, D))
    const step = cp(sum, map(sq))
    const ndig = 10
    let res = 0

    each (comb => {
        if (N[step(comb)] === 0) return
        const dc = repeat(ndig, 0)
        each (d => dc[d]++) (comb)
        res += iter (ndig) ((res, i) => res / F[dc[i]]) (F[D])
    }) (combRep (D)(from(0, ndig)))

    return Math.pow(ndig, D) - res
}

const res3 = ids3(8)




printv1D([res1, res2, res3])




/*

8558
85744333
85744333

*/








