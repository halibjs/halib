import { elemIndex, elemIndices, sum, cp, nub, filter, permutations, len, odd,
         until, shuffle, insertAt, random, foldl, choice, range } from 'halib'
import { printv1D } from 'output'


// from http://rosettacode.org/wiki/Generate_Chess960_starting_position, translation of Haskell


const isChess960 = rank => {
    const bishops = elemIndices ('B') (rank)
    const [rookA, rookB] = elemIndices ('R') (rank)
    const king = elemIndex ('K') (rank)
        
    return cp(odd, sum) (bishops) && king > rookA && king < rookB
}

const rank1 = cp(choice, nub, filter(isChess960), permutations) ('RNBQKBNR')



const rank2 = until (isChess960) (shuffle) ('RRNNBBQK')



const rand960 = () => {
    let start = 'RKR', toIns = 'QNN', bishpos
    const fn = (z, x) => insertAt (random(0, len(z))) (x) (z)
    start = foldl (fn) (start) (toIns)
    bishpos = random(0, len(start))
    start = insertAt (bishpos) ('B') (start)
    return insertAt(choice(range(bishpos + 1, len(start), 2))) ('B') (start)
}

const rank3 = rand960()





printv1D([rank1, rank2, rank3])






/*

RKNNBBQR
QRBKRNNB
QBNRKRBN

*/






















