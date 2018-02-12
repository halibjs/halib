import { repeat, each, range, permRep, from, permK, map, unlines, until } from 'halib'
import { print } from 'output'




// from http://rosettacode.org/wiki/Floyd-Warshall_algorithm


const weights = [[1,3,-2],[2,1,4],[2,3,3],[3,4,2],[4,2,-1]]
const numV = 4

const floydW = (weights, numV) => {
    const dist = repeat (numV, repeat (numV, Infinity))
    each (([a, b, w]) => dist[a-1][b-1] = w) (weights)
    const next = repeat (numV, range(1, numV))

    each (([k, i, j], _, vmi = dist[i][k] + dist[k][j]) => {
        if (dist[i][j] > vmi) { dist[i][j] = vmi; next[i][j] = next[i][k] }
    }) (permRep (3) (from(0, numV)))

    return [dist, next]
};

const drawFloyd = ([dist, next]) => {
    const header = 'pair    dist  path\n'
    return header + unlines (map (([u, v], _, d = dist[u-1][v-1]) => {
        const txt = u + ' -> ' + v + '   ' + (d > -1 ? ' ' + d : d) + '   ' + u
        const fn = ([u, p]) => (u = next[u - 1][v - 1], [u, p + ' -> ' + u])
        return txt + until (([u, _]) => u === v) (fn) ([u,'']) [1]
    }) (permK (2) (range(1, numV))))
};



print(drawFloyd(floydW(weights, numV)))







/*

pair    dist  path
1 -> 2   -1   1 -> 3 -> 4 -> 2
1 -> 3   -2   1 -> 3
1 -> 4    0   1 -> 3 -> 4
2 -> 1    4   2 -> 1
2 -> 3    2   2 -> 1 -> 3
2 -> 4    4   2 -> 1 -> 3 -> 4
3 -> 1    5   3 -> 4 -> 2 -> 1
3 -> 2    1   3 -> 4 -> 2
3 -> 4    2   3 -> 4
4 -> 1    3   4 -> 2 -> 1
4 -> 2   -1   4 -> 2
4 -> 3    1   4 -> 2 -> 1 -> 3

*/



































