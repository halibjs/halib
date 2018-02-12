import { unchars, reverse, replace, intersperse, chain, join, init, len, last, cp,
         liftM2L, unlines, splitBy, map } from 'halib'
import { print } from 'output'




// from http://rosettacode.org/wiki/Comma_quibbling


const quibble1 = ws => '{' + cp(unchars, reverse, replace(', ')(' and '), intersperse(', '), reverse) (ws) + '}'

const quibble2 = ws => '{' + chain(
    reverse,
    intersperse(', '),
    replace(', ')(' and '),
    reverse,
    unchars) (ws) + '}'

const quibble3 = ws => '{' + join(', ')(init(ws)) + (len(ws) > 1 ? ' and ' : '') + (last(ws) || '') + '}'






const fns = [quibble1, quibble2, quibble3]
const args = [[], ['ABC'], ['ABC','DEF'], ['ABC','DEF','G','H']]

const res = liftM2L ((fn, arg) => fn(arg)) (fns) (args)

print(cp(unlines, map(x => unlines(x) + '\n'), splitBy(len(args)))  (res))







/*

{}
{ABC}
{ABC and DEF}
{ABC, DEF, G and H}

{}
{ABC}
{ABC and DEF}
{ABC, DEF, G and H}

{}
{ABC}
{ABC and DEF}
{ABC, DEF, G and H}

*/










































