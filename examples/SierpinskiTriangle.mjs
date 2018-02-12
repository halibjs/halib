import { map, append, repeat, flip, cp } from 'halib'
import { printv1D } from 'output'



// from http://rosettacode.org/wiki/Sierpinski_triangle, translation of Haskell



const sierpinski = n => {
    if (n === 0) return ['*']
    const down = sierpinski (n - 1)
    const space = repeat (Math.pow (2, n - 1), ' ')
    
    return append (map (cp(append (space), flip (append) (space))) (down)) 
                  (map (x => x + ' ' + x) (down))
}

printv1D(sierpinski (4))





/*

               *
              * *
             *   *
            * * * *
           *       *
          * *     * *
         *   *   *   *
        * * * * * * * *
       *               *
      * *             * *
     *   *           *   *
    * * * *         * * * *
   *       *       *       *
  * *     * *     * *     * *
 *   *   *   *   *   *   *   *
* * * * * * * * * * * * * * * *

*/

























