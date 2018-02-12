import { cp, append, take, reverse, unlines, from, map, each, consR, intersperse } from 'halib'
import { printv1D } from 'output'



// from http://rosettacode.org/wiki/The_Twelve_Days_of_Christmas


const days = [
    'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth',
    'tenth', 'eleventh', 'twelfth',
]
 
const gifts = [
    "And a partridge in a pear tree",
    "Two turtle doves",
    "Three french hens",
    "Four calling birds",
    "Five golden rings",
    "Six geese a-laying",
    "Seven swans a-swimming",
    "Eight maids a-milking",
    "Nine ladies dancing",
    "Ten lords a-leaping",
    "Eleven pipers piping",
    "Twelve drummers drumming"
]

const christmas = ["On the ", " day of Christmas my true love gave to me... "]
const partridge = ["A partridge in a pear tree"]


const verseOfTheDay = day => append ([christmas[0] + days[day] + christmas[1]])
                                    (day === 0 ? partridge : reverse(take(day + 1) (gifts)))




const res = map (cp(unlines, verseOfTheDay)) (from(0, 12))
printv1D(intersperse(' ')(res))









/*

On the first day of Christmas my true love gave to me... 
A partridge in a pear tree
 
On the second day of Christmas my true love gave to me... 
Two turtle doves
And a partridge in a pear tree
 
On the third day of Christmas my true love gave to me... 
Three french hens
Two turtle doves
And a partridge in a pear tree
 
On the fourth day of Christmas my true love gave to me... 
Four calling birds
Three french hens
Two turtle doves
And a partridge in a pear tree
 
On the fifth day of Christmas my true love gave to me... 
Five golden rings
Four calling birds
Three french hens
Two turtle doves
And a partridge in a pear tree
 
On the sixth day of Christmas my true love gave to me... 
Six geese a-laying
Five golden rings
Four calling birds
Three french hens
Two turtle doves
And a partridge in a pear tree
 
On the seventh day of Christmas my true love gave to me... 
Seven swans a-swimming
Six geese a-laying
Five golden rings
Four calling birds
Three french hens
Two turtle doves
And a partridge in a pear tree
 
On the eighth day of Christmas my true love gave to me... 
Eight maids a-milking
Seven swans a-swimming
Six geese a-laying
Five golden rings
Four calling birds
Three french hens
Two turtle doves
And a partridge in a pear tree
 
On the ninth day of Christmas my true love gave to me... 
Nine ladies dancing
Eight maids a-milking
Seven swans a-swimming
Six geese a-laying
Five golden rings
Four calling birds
Three french hens
Two turtle doves
And a partridge in a pear tree
 
On the tenth day of Christmas my true love gave to me... 
Ten lords a-leaping
Nine ladies dancing
Eight maids a-milking
Seven swans a-swimming
Six geese a-laying
Five golden rings
Four calling birds
Three french hens
Two turtle doves
And a partridge in a pear tree
 
On the eleventh day of Christmas my true love gave to me... 
Eleven pipers piping
Ten lords a-leaping
Nine ladies dancing
Eight maids a-milking
Seven swans a-swimming
Six geese a-laying
Five golden rings
Four calling birds
Three french hens
Two turtle doves
And a partridge in a pear tree
 
On the twelfth day of Christmas my true love gave to me... 
Twelve drummers drumming
Eleven pipers piping
Ten lords a-leaping
Nine ladies dancing
Eight maids a-milking
Seven swans a-swimming
Six geese a-laying
Five golden rings
Four calling birds
Three french hens
Two turtle doves
And a partridge in a pear tree

*/



