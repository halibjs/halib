import { concat, transpose, splitBy, each, filter, elem, notElem, nub, del, prod, copyO,
         all, nul, len, minimumBy, head, any, zip, cp, map } from 'halib'
import { print2D } from './output.mjs'



// from http://norvig.com/sudoku.html, translation


const some = fn => xs => {
    let res
    return any (x => res = fn(x)) (xs) ? res : false
}

const transposeBy = n => cp(map(concat), concat, map(transpose), splitBy(n), map (splitBy(n)))

const boxsize = 3
const gridsize = 9
const letters = 'ABCDEFGHI'
const digits = '123456789'
const squares = prod (letters) (digits)

const rows = splitBy (gridsize) (squares)
const cols = transpose (rows)
const boxes = transposeBy(boxsize)(rows)

const unitlist = concat([rows, cols, boxes])
const units = {}
const peers = {}
each (s => units[s] = filter (unit => elem (s) (unit)) (unitlist)) (squares)
each (s => peers[s] = del(s) (nub(concat(units[s])))) (squares)

let eliminate
const assign = (values, s, d) => {
    const otherValues = del (d) (values[s])
    return all (ov => eliminate(values, s, ov)) (otherValues) ? values : false
}

eliminate = (values, s, d) => {
    if (notElem (d) (values[s])) return values       //Already eliminated

    const vs = values[s] = del (d) (values[s])
    if (nul(vs)) return false                        //Contradiction: removed last value
    if (len(vs) === 1 && !all (sp => eliminate(values, sp, vs)) (peers[s])) return false

    const fn = unit => {
        const dplaces = filter (su => elem (d) (values[su])) (unit)
        if (nul(dplaces)) return false               //Contradiction: no place for this value
        return len(dplaces) !== 1 || assign(values, head(dplaces), d)
    }
    return all (fn) (units[s]) ? values : false
}

const parseGrid = grid => {
    const values = {}
    each (s => values[s] = digits) (squares)

    const fn = ([s, d]) => notElem (d) (digits) || assign(values, s, d)
    return all (fn) (zip (squares) (grid)) ? values : false
}

const search = values => {
    if (values === false) return false      //Failed earlier
    if (all (s => len(values[s]) === 1) (squares)) return values     // Solved!

    const candidates = filter (s => len(values[s]) > 1) (squares)
    const s = minimumBy (s => len(values[s])) (candidates)
    return some (d => search (assign (copyO (values), s, d))) (values[s])
}

const solve = grid => search(parseGrid(grid))

const grid2  =  '4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......'
const easy =    '2....1.38........5.7...6..........13.981..25731....8..9..8...2..5..697844..25....'
const minimal = '.98..........7........15...1...........2....9...9.6.82.......3.5.1.........4...2.'







const res = solve(easy)
const formatted_res = splitBy (gridsize) (map (s => res[s]) (squares))

print2D(formatted_res)







/*

2 4 9 5 7 1 6 3 8
8 6 1 4 3 2 9 7 5
5 7 3 9 8 6 1 4 2
7 2 5 6 9 8 4 1 3
6 9 8 1 4 3 2 5 7
3 1 4 7 2 5 8 6 9
9 3 7 8 1 4 5 2 6
1 5 2 3 6 9 7 8 4
4 8 6 2 5 7 3 9 1

*/











