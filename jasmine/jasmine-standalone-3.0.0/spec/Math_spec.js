//const { add, sub, mul, div, fact, negate, even, odd, sq, sqrt, inc, dec, max, min, random, choice } = require('./halib.js');
//const { elem } = require('./halib.js');




describe('Math:', () => { 
    describe('add', () => {
        it(`adds two numbers`, () => {
            expect(add(1, 2)).toEqual(3);
        });
    });

    describe('sub', () => {
        it(`subtracts two numbers`, () => {
            expect(sub(2, 1)).toEqual(1);
        });
    });

    describe('mul', () => {
        it(`multiplies two numbers`, () => {
            expect(mul(2, 3)).toEqual(6);
        });
    });

    describe('div', () => {
        it(`divides two numbers`, () => {
            expect(div(6, 2)).toEqual(3);
        });
    });

    describe('fact', () => {
        it(`returns the factorial of the given number`, () => {
            expect(fact(5)).toEqual(120);
        });
    });

    describe('negate', () => {
        it(`returns the given number with opposite sign`, () => {
            expect(negate(5)).toEqual(-5);
            expect(negate(-5)).toEqual(5);
        });
    });

    describe('even', () => {
        it(`returns true if the given number is an even number`, () => {
            expect(even (4)).toEqual(true);
            expect(even (3)).toEqual(false);
        });
    });

    describe('odd', () => {
        it(`returns true if the given number is an odd number`, () => {
            expect(odd (3)).toEqual(true);
            expect(odd (4)).toEqual(false);
        });
    });

    describe('sq', () => {
        it(`returns the square of the given number`, () => {
            expect(sq (3)).toEqual(9);
        });
    });

    describe('sqrt', () => {
        it(`returns the square root of the given number`, () => {
            expect(sqrt (9)).toEqual(3);
        });
    });

    describe('inc', () => {
        it(`returns the given number plus 1`, () => {
            expect(inc (3)).toEqual(4);
        });
    });

    describe('dec', () => {
        it(`returns the given number minus 1`, () => {
            expect(dec (3)).toEqual(2);
        });
    });
    
    describe('max', () => {
        it('returns the larger arg using the ordering operator', () => {
            expect(max(2, 1)).toEqual(2);
        });
    });
    
    describe('min', () => {
        it('returns the smaller arg using the ordering operator', () => {
            expect(min(2, 1)).toEqual(1);
        });
    });

    describe('random', () => {
        it('returns a random number inclusive-between the given numbers', () => {
            expect(elem (random (2, 5)) ([2,3,4,5])).toEqual(true);
            expect(elem (random (5, 2)) ([2,3,4,5])).toEqual(true);
            expect(elem (random (-2, 5)) ([-2,-1,0,1,2,3,4,5])).toEqual(true);
            expect(elem (random (5, -2)) ([-2,-1,0,1,2,3,4,5])).toEqual(true);
            expect(elem (random (-2, -5)) ([-2,-3,-4,-5])).toEqual(true);
            expect(elem (random (-5, -2)) ([-2,-3,-4,-5])).toEqual(true);
        });
                
        it('returns value equal to args if both args are equal', () => {
            expect(random (0, 0)).toEqual(0);
            expect(random (5, 5)).toEqual(5);
            expect(random (-5, -5)).toEqual(-5);
        });
    });

    describe('choice', () => {
        it('returns a random element of the given array', () => {
            expect(elem (choice([1,2,3])) ([1,2,3])).toEqual(true);
        });
    });
});






















































