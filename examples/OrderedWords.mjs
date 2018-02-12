import { lines, sort, maxLen, len, filter, groupBy, head, cp, sortDescBy, takeWhile, ordered, eq } from 'halib'
import { text } from 'unixdict'
import { print2D } from 'output'


// from http://rosettacode.org/wiki/Ordered_words


const words = lines (text)
const ows = filter (ordered) (words)


const maxlen = maxLen(ows)
const ml_ows1 = filter (cp(eq(maxlen), len)) (ows)


const hlen = cp(len, head)
const ml_ows2 = cp(head, groupBy(len), sortDescBy(len)) (ows)
const ml_ows3 = cp(head, sortDescBy(hlen), groupBy(len)) (ows)



const sorted = sortDescBy (len) (ows)
const first = hlen(sorted)
const ml_ows4 = sort(takeWhile(cp(eq(first), len)) (sorted))







print2D([ml_ows1, ml_ows2, ml_ows3, ml_ows4])




/*

abbott accent accept access accost almost bellow billow biopsy chilly choosy choppy effort floppy glossy knotty
abbott accent accept access accost almost bellow billow biopsy chilly choosy choppy effort floppy glossy knotty
abbott accent accept access accost almost bellow billow biopsy chilly choosy choppy effort floppy glossy knotty
abbott accent accept access accost almost bellow billow biopsy chilly choosy choppy effort floppy glossy knotty

*/



























