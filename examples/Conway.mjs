import { foldl, map, len, head, repeat, random, iter } from 'halib'
import { draw2D, print } from './output.mjs'



// from http://rosettacode.org/wiki/Conway%27s_Game_of_Life


const blinker = 
    [[0, 0, 0],
     [1, 1, 1],
     [0, 0, 0]]


const glider =
    [[0, 0, 0, 0, 0, 0],
     [0, 0, 1, 0, 0, 0],
     [0, 0, 0, 1, 0, 0],
     [0, 1, 1, 1, 0, 0],
     [0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0]]


const board = (width, high) => map (row => map(_ => random(0, 1))(row)) (repeat(high, Array(width)))


const deltas = [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]]
const displayWorld = world => print(draw2D(world) + '\n')


const conway = (world, turn, maxR = len(world) - 1, maxC = len(head(world)) - 1) => {
    const countN = (board, x, y) => {
        const value = (x, y) => x < 0 || y < 0 || x > maxR || y > maxC ? 0 : board[x][y]
        const fn = (res, [a, b]) => res + value(x + a, y + b)
        return foldl (fn) (0) (deltas)
    }

    const isAlive = (cell, num) => (cell && num === 2) || num === 3 ? 1 : 0
    const newWorld = w => map ((row, ir) => map((cell, ic) => isAlive(cell, countN(w, ir, ic)))(row)) (w)

    iter (turn) (world => (world = newWorld(world), displayWorld(world), world)) (world)
}



conway(blinker, 5)







/*

0 1 0
0 1 0
0 1 0

0 0 0
1 1 1
0 0 0

0 1 0
0 1 0
0 1 0

0 0 0
1 1 1
0 0 0

0 1 0
0 1 0
0 1 0

*/







