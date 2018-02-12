import { cp, map, concat, transpose, splitBy, len, id, filter, minus, any, nul, not, each, unlines,
         uniq, all, findIndex, flip, replaceAt, bindL, returnL, unchars } from 'halib'
import { print } from 'output'



// from http://www.cs.nott.ac.uk/~pszgmh/sudoku.lhs, translation


const easy =  ['2....1.38', '........5', '.7...6...', '.......13', '.981..257',
             '31....8..', '9..8...2.', '.5..69784', '4..25....']
             
const two_solutions = ['9.6.7.4.3','...4..2..','.7..23.1.','5.....1..',
                    '.4.2.8.6.','..3.....5','.3.7...5.','..7..5...','4.5.1.7.8']
                 

const transposeBy = n => cp(map(concat), concat, map(transpose), splitBy(n), map (splitBy(n)))
const digits = ['1','2','3','4','5','6','7','8','9']
const blank = x => x === '.'
const single = xs => len(xs) === 1
const boxsize = 3

const choice = d => blank(d) ? digits : [d]
const choices = map (map (choice))

const rows = id
const cols = transpose
const boxes = transposeBy (boxsize)

const singles = cp(concat, filter (single))
const _minus = xs => ys => single (xs) ? xs : minus (xs) (ys)
const reduce = unit => {
    const us = singles(unit)
    return  map (xs => _minus (xs) (us)) (unit)
}
const pruneBy = f => cp(f, map(reduce), f)
const prune = cp(pruneBy(boxes), pruneBy(cols), pruneBy(rows))

const holey = any (any (nul))
const anydups = any (cp(not, uniq, singles))
const dupsy = cm => anydups (rows(cm)) || anydups (cols(cm)) || anydups (boxes(cm))
const blocked = grid => holey (grid) || dupsy (grid)

const complete = all (all (single))
const collapse = map(concat)

const expand = grid => {
    const rowInd = findIndex (any(cp(not, single))) (grid)
    const row = grid[rowInd]
    const colInd = findIndex (cp(not, single)) (row)
    const cs = row[colInd]

    const newrows = map (flip (replaceAt(colInd))(row)) (cs)
    return map (flip (replaceAt(rowInd))(grid)) (newrows)
};

const search = grid => {
    if (blocked(grid)) return []
    if (complete(grid)) return [collapse (grid)]
    return bindL(expand(grid))
    (m => bindL(cp(search, prune)(m))
    (g => returnL (g)))
};

const solve = cp(search, prune, choices)
const format = map (map (unchars))
const res = format (solve (two_solutions))




each ((b, ind) => { cp(print, unlines) (b); if (ind < len(res) - 1) print('\n'); }) (res)






/*

926571483
351486279
874923516
582367194
149258367
763149825
238794651
617835942
495612738


926571483
351486279
874923516
582367194
149258367
763194825
238749651
617835942
495612738

*/




