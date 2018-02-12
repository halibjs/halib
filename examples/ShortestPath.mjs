import { each, keys, len, minimumBy, head, last, del, entries, reverse, cons, foldl, iter } from 'halib'
import { printh1D } from 'output'



// Dijkstra's algorithm


const vertices = 
    { 'A': {'B': 8, 'C': 2, 'D': 5},
      'B': {'A': 8, 'F': 13, 'D': 2},
      'C': {'A': 2, 'D': 2, 'E': 5},
      'D': {'A': 5, 'B': 2, 'F': 6, 'G': 3, 'E': 1, 'C': 2},
      'E': {'C': 5, 'D': 1, 'G': 1},
      'F': {'B': 13, 'D': 6, 'G': 2, 'H': 3},
      'G': {'E': 1, 'D': 3, 'F': 2, 'H': 6},
      'H': {'F': 3, 'G': 6} }



const shortestPath = (start , end) => {
    const prev = {}
    const dist = foldl ((d, k) => (d[k] = k === start ? 0 : Infinity, d)) ({}) (keys(vertices))
    const path = []
    let nodes = keys(vertices)
    let smallest, alt

    while (len(nodes)) {
        smallest = minimumBy (x => dist[x]) (nodes)
        nodes = del (smallest) (nodes)

        if (smallest === end) break

        each (neighbor => {
            alt = dist[smallest] + last(neighbor)
            if (alt < dist[head(neighbor)]) {
                dist[head(neighbor)] = alt
                prev[head(neighbor)] = smallest
            }
        }) (entries(vertices[smallest]))
    }

    iter (s => prev[s]) (s => (path.push(s), prev[s])) (smallest)
    return cons (start) (reverse(path))
}


printh1D(shortestPath('A', 'H'))





/*

A C D E G F H

*/

