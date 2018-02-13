import { cp, map, unwords, unlines, words, lines, reverse } from 'halib'
import { print } from './output.mjs'




// from http://rosettacode.org/wiki/Reverse_words_in_a_string



const strReversed =
`---------- Ice and Fire ------------

fire, in end will world the say Some
ice. in say Some
desire of tasted I've what From
fire. favor who those with hold I

... elided paragraph last ...

Frost Robert -----------------------`




const rev = cp(unlines, map(cp(unwords, reverse, words)), lines)

print(rev(strReversed))












/*

------------ Fire and Ice ----------

Some say the world will end in fire,
Some say in ice.
From what I've tasted of desire
I hold with those who favor fire.

... last paragraph elided ...

----------------------- Robert Frost

*/



