import { endsWith, any, each, toLower, map } from 'halib'
import { print2D } from './output.mjs'



// from http://rosettacode.org/wiki/File_extension_is_in_extensions_list



const fnames =
    ["MyData.a##"
    , "MyData.tar.Gz"
    , "MyData.gzip"
    , "MyData.7z.backup"
    , "MyData..."
    , "MyData"
    , "MyData_v1.0.tar.bz2"
    , "MyData_v1.0.bz2"]

const extensions = ["zip", "rar", "7z", "gz", "archive", "A##", "tar.bz2"]



const isExt = fname => any (ext => endsWith ('.' + toLower(ext)) (toLower(fname))) (extensions)

const res = map (fname => [fname, isExt(fname)]) (fnames)






print2D(res)








/*

MyData.a## true
MyData.tar.Gz true
MyData.gzip false
MyData.7z.backup false
MyData... false
MyData false
MyData_v1.0.tar.bz2 true
MyData_v1.0.bz2 false

*/









