import { from, combinations, repeat, each, zip, sort, reverse, len, permRep } from 'halib'
import { printTable } from './output.mjs'



// from http://rosettacode.org/wiki/World_Cup_group_stage, translation of Python, Ruby



const worldCup = () => {
    const scoring = [0, 1, 3]
    const outcomes = [0, 1, 2]
    const teams = from(0, 4)
    const games = combinations(2)(teams)
    const histo = repeat(len(teams), repeat(10, 0))

    each (results => {
        const s = repeat (4, 0)
        each (([res, g]) => { s[g[0]] += scoring[res]; s[g[1]] += scoring[2 - res]; }) (zip (results) (games))
        each ((v, ind) => { histo[ind][v]++;}) (sort(s))
    }) (permRep (len(games)) (outcomes))

    return reverse(histo)
}





printTable(worldCup())





/*

  0   0   0   1  14 148 152 306 0 108
  0   0   4  33 338 172 164  18 0   0
  0  18 136 273 290   4   8   0 0   0
108 306 184 125   6   0   0   0 0   0

*/









