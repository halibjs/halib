import { prod, filter, minus, map, repeat, append, last, nul, minimumBy, cp, len, consR, unwords, unlines,
         each } from 'halib'
import { print } from './output.mjs'


// from http://rosettacode.org/wiki/Knight%27s_tour, translation of Haskell


const [a, b] = [[1, -1],[2, -2]]
const deltas = append(prod(a)(b))(prod(b)(a))
const inside = ([i, j]) => i >= 1 && i <= 8 && j >= 1 && j <= 8


const kmoves = sq => {
    const jumps = ([a, b]) => map (([i, j]) => [a + i, b + j]) (deltas)
    return filter (inside) (jumps(sq))
}

const knightTour = moves => {
    const findMoves = sq => minus (kmoves(sq)) (moves)
    const candMoves = findMoves(last(moves))
    
    if (nul(candMoves)) return moves
    const newSquare = minimumBy (cp(len, findMoves)) (candMoves)
    return knightTour(consR(moves)(newSquare))
}

const moves = knightTour([[1, 3]])







const draw = moves => {
    const board = repeat (8, repeat(8, 0))
    each ((m, ind) => board[m[0]-1][m[1]-1] = ind+1) (moves)
    const fn = map(c => (len(String(c)) < 2 ? ' ' : '') + c)
    return unlines(map(cp(unwords, fn))(board))
}


print(draw(moves))








/*

23 20  1 16 33 38 11 14
 2 17 22 37 12 15 32 39
21 24 19 34 49 40 13 10
18  3 50 63 36 57 48 31
25 64 35 54 41 62  9 56
 4 51 42 61 58 55 30 47
43 26 53  6 45 28 59  8
52  5 44 27 60  7 46 29

*/
