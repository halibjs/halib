import { lines, map, split, len, repeat, maxLen, unwords,
         unlines, last, init, take, drop, tpLongest } from 'halib'
import { print } from './output.mjs'


const text =
`Given$a$text$file$of$many$lines,$where$fields$within$a$line$
are$delineated$by$a$single$'dollar'$character,$write$a$program
that$aligns$each$column$of$fields$by$ensuring$that$words$in$each$
column$are$separated$by$at$least$one$space.
Further,$allow$for$each$word$in$a$column$to$be$either$left$
justified,$right$justified,$or$center$justified$within$its$column.`




// from http://rosettacode.org/wiki/Align_columns, translation of Haskell


const alignColumns = (txt, a = 'left') => {
    const wLines = map (line => split ('$') (last(line) === '$' ? init(line) : line)) (lines(txt))
    const widths = map (maxLen) (tpLongest(wLines))

    const fn = (txt, ind) => {
        const ws = repeat(widths[ind] - len(txt), ' ')
        if (a === 'left') return txt + ws
        if (a === 'right') return ws + txt
        const n = Math.floor(len(ws) / 2)
        return take (n) (ws) + txt + drop (n) (ws)
    }

    return unlines(map (row => unwords(map (fn) (row))) (wLines))
}



print(alignColumns (text))





/*

Given      a          text       file   of     many      lines,     where    fields  within  a      line
are        delineated by         a      single 'dollar'  character, write    a       program
that       aligns     each       column of     fields    by         ensuring that    words   in     each
column     are        separated  by     at     least     one        space.
Further,   allow      for        each   word   in        a          column   to      be      either left
justified, right      justified, or     center justified within     its      column.

*/







