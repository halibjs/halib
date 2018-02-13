import { seq, replaceAll } from 'halib'
import { print } from './output.mjs'



// from http://rosettacode.org/wiki/Reverse_the_gender_of_a_string



const s = "She was a soul stripper. She took my heart!"

const rev = str => seq('She') (str) ? replaceAll ('She') ('He') (str) :
                                      replaceAll ('He') ('She') (str)



const res1 = rev(s)
const res2 = rev(res1)


print(res1)
print(res2)





/*

He was a soul stripper. He took my heart!
She was a soul stripper. She took my heart!

*/


























