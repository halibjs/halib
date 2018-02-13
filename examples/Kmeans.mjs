import { cp, sum, map, zipWith, len, mean, transpose, minimumBy, elemIndex, foldr, all, sort, sub,
         take, head, cons, last, minus, combinations, sq, sqrt } from 'halib'
import { print, printArr2D } from './output.mjs'



// from https://github.com/BinRoot/Haskell-Data-Analysis-Cookbook/blob/master/Ch08/Code01_kmeans/Main.hs, translation

const points = [[0,0], [1,0], [0,1], [1,1], [7,5], [9,6], [8,7]]

const distance = cp(sqrt, sum, map(sq))
const dist = (a, b) => distance  (zipWith (sub) (a) (b))
const center = pts => map (mean) (transpose(pts))

const assign = (centroids, points) => {
    const assignpoint = p => [minimumBy (c => dist (c, p)) (centroids), p]
    const merge = ([c, p], z) => (z[elemIndex (c) (centroids)].push(p), z)
    return foldr (merge) (map (_ => []) (centroids)) (map (assignpoint) (points))
}

const relocate = map(center)

const kmeans = (centroids, points) => {
    const newcentroids = relocate (assign (centroids, points))
    const converged = all (x => x < 0.00001) (zipWith (dist) (centroids) (newcentroids))
    return converged ? centroids : kmeans (newcentroids, points)      
}

const res = kmeans(take (2) (points), points)
printArr2D(sort(res))






// from https://github.com/BinRoot/Haskell-Data-Analysis-Cookbook/blob/master/Ch08/Code02_hier/Main.hs, translation

const merge = points => {
    const pts = combinations (2) (points)
    const np = minimumBy (pt => dist(head(pt), last(pt))) (pts)
    return cons (center(np)) (minus (points) (np))
}

const run = (k, points) => len (points) === k ? points : run(k, merge(points))
const centroids = run (2, points)

print('')
printArr2D(sort(centroids))






/*

[ [ 0.5, 0.5 ],
  [ 8, 6 ] ]

[ [ 0.5, 0.5 ],
  [ 7.75, 5.75 ] ]

*/











