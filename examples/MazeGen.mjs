import { repeat, replicate, map, each, shuffle, max, random, zip, unlines, concat, unchars, consR, head,
         lines, chars, len } from 'halib'
import { print } from './output.mjs'


// from http://rosettacode.org/wiki/Maze_generation, translation of D

const generate = (height, width) => {
    const vis = repeat(height, repeat(width, 0))
    const hor = repeat(height, consR (replicate(width, '+---')) ('+'))
    const ver = repeat(height, consR (replicate(width, '|   ')) ('|'))

    const walk = (h, w) => {
        vis[h][w] = 1

        each (([nh, nw]) => {
            if (nh < height && nw < width && nh >= 0 && nw >= 0 && !vis[nh][nw]) {
                if (nw === w) hor[max(h, nh)][w] = '+   '
                if (nh === h) ver[h][max(w, nw)] = '    '
                walk(nh, nw)
            }
        }) (shuffle([[h,w-1],[h+1,w],[h,w+1],[h-1,w]]))
    };

    walk(random(0, height-1), random(0, width-1))
    const comb = concat(zip (map(unchars)(hor)) (map(unchars)(ver)))
    return unlines(consR (comb) (head(comb)))
}






// from http://rosettacode.org/wiki/Maze_solving, translation of D

const solve = mazeStr => {
    const cw = 4, ch = 2, cw2 = cw /2, ch2 = ch / 2
    const sym = '*'
    const deltas = [{ w: 0, h: -ch }, { w: cw, h: 0 }, { w: 0, h: ch }, { w: -cw, h: 0 }]

    const solveMaze = (maze, s, end) => {
        if (s.h === end.h && s.w === end.w) return true
        let d
        for (let ind = 0; ind < len(deltas); ind++) {
            d = deltas[ind]
            if (maze[s.h + d.h / 2][s.w + d.w / 2] === ' ' && maze[s.h + d.h][s.w + d.w] === ' ') {
                maze[s.h + d.h][s.w + d.w] = sym
                if (solveMaze(maze, { w: s.w + d.w, h: s.h + d.h}, end)) return true
                maze[s.h + d.h][s.w + d.w] = ' '
            }
        }
        return false
    }

    const maze = map (chars) (lines(mazeStr))
    const height = (len(maze) - 1) / ch
    const width = (len(maze[0]) - 1) / cw

    const start = { w: cw2 + cw * random(0, width - 1) , h: ch2 + ch * random(0, height - 1) }
    const end = { w: cw2 + cw * random(0, width - 1) , h: ch2 + ch * random(0, height - 1) }

    maze[start.h][start.w] = sym
    if (!solveMaze(maze, start, end)) return 'No solution'
    maze[start.h][start.w] = 'S'
    maze[end.h][end.w] = 'E'

    return unlines(map (unchars) (maze))
}




const res = solve(generate(10,14))

print(res)





/*

+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
|   |           | S   *   *   *   * |       |           |
+   +   +   +   +   +---+---+---+   +   +   +   +   +---+
|       |   |       |       | *   * |   |   |   |       |
+   +---+   +---+---+---+   +   +---+   +   +---+---+   +
|       |   |           | *   * |       |       |       |
+---+---+   +   +---+   +   +---+   +---+---+   +   +   +
|       |   |       |   | * |       |               |   |
+   +   +   +---+   +   +   +---+   +---+---+---+---+---+
|   |       |       |   | *   * |                       |
+   +---+---+   +---+---+---+   +---+---+---+---+---+   +
|           |   | *   *   * | * | *   * | *   * |       |
+---+---+   +   +   +---+   +   +   +   +   +   +   +---+
|       |       | * |   | *   * | * | *   * | * |       |
+   +---+---+---+   +   +---+---+   +---+---+   +---+   +
|   |           | * |   |         *   * |   | *   * | E |
+   +   +   +   +   +   +   +---+---+   +   +---+   +   +
|       |   |   | * |               | * |       | *   * |
+   +---+   +---+   +---+---+---+---+   +   +---+---+   +
|       |         *   *   *   *   *   * |               |
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+

*/



