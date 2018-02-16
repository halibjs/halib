//const { lines, words, chars, split, toLower, toUpper, trim, ord, unlines, unwords, unchars, join, chr,
//        upper, lower, alpha, digit, space, alnum } = require('./halib.js');



describe('Special lists:', () => {
    describe('lines', () => {
        it('breaks a string up into an array of strings at newline characters', () => {
            expect(lines('abc\ndef\nghi')).toEqual(['abc','def','ghi']);
        });
        
        it('returns an empty array with an empty string when given an empty string', () => {
            expect(lines('')).toEqual(['']);
        });
    });
    
    describe('words', () => {
        it('breaks a string up into an array of words at white space characters', () => {
            expect(words('abc def ghi')).toEqual(['abc','def','ghi']);
        });
        
        it('returns an empty array with an empty string when given an empty string', () => {
            expect(words('')).toEqual(['']);
        });
    });
    
    describe('chars', () => {
        it('breaks a string up into an array of characters', () => {
            expect(chars('abcdefghi')).toEqual(['a','b','c','d','e','f','g','h','i']);
        });
    });

    describe('split', () => {
        it('breaks a string up into an array of words at given character(s)', () => {
            expect(split(':') ('abc:def:ghi')).toEqual(['abc', 'def', 'ghi']);
        });
    });
    
    describe('toLower', () => {
        it('converts the given string to that of lowercase characters', () => {
            expect(toLower('ABC')).toEqual('abc');
        });
    });
    
    describe('toUpper', () => {
        it('converts the given string to that of uppercase characters', () => {
            expect(toUpper('abc')).toEqual('ABC');
        });
    });
    
    describe('trim', () => {
        it('removes whitespace characters from both sides of a string', () => {
            expect(trim('   trim   ')).toEqual('trim');
        });
    });

    describe('ord', () => {
        it('returns the UTF-16 code unit value of the given character', () => {
            expect(ord('A')).toEqual(65);
            expect(ord('a')).toEqual(97);
        });
    });

    describe('unlines', () => {
        it('joins an array of lines after appending a terminating newline to each', () => {
            expect(unlines(['abc','def','ghi'])).toEqual('abc\ndef\nghi');
        });
        
        it('returns an empty string when given an empty array', () => {
            expect(unlines([])).toEqual('');
        });
    });
    
    describe('unwords', () => {
        it('joins an array of words with separating spaces', () => {
            expect(unwords(['abc','def','ghi'])).toEqual('abc def ghi');
        });
        
        it('returns an empty string when given an empty array', () => {
            expect(unwords([])).toEqual('');
        });
    });
    
    describe('unchars', () => {
        it('joins an array of chars into a string', () => {
            expect(unchars(['a','b','c','d','e','f','g','h'])).toEqual(('abcdefgh'));
        });
    });

    describe('join', () => {
        it('joins ab array of strings with given character(s) into a string', () => {
            expect(join(':')(['abc', 'def', 'ghi']) ).toEqual('abc:def:ghi');
        });
    });

    describe('chr', () => {
        it('converts an UTF-16 code unit value into a character', () => {
            expect(chr(65)).toEqual('A');
            expect(chr(97)).toEqual('a');
        });
    });

    describe('upper', () => {
        it('returns true if first char is an uppercase string', () => {
            expect(upper('A')).toEqual(true);
            expect(upper('a')).toEqual(false);
        });

        it('returns false if first char is an empty string', () => {
            expect(upper('')).toEqual(false);
        });

        it('returns false if first char is not a string', () => {
            expect(upper(null)).toEqual(false);
            expect(upper(undefined)).toEqual(false);
            expect(upper(5)).toEqual(false);
        });
    });

    describe('lower', () => {
        it('returns true if first char is a lowercase string', () => {
            expect(lower('a')).toEqual(true);
            expect(lower('A')).toEqual(false);
        });

        it('returns false if first char is an empty string', () => {
            expect(lower('')).toEqual(false);
        });

        it('returns false if first char is not a string', () => {
            expect(lower(null)).toEqual(false);
            expect(lower(undefined)).toEqual(false);
            expect(lower(5)).toEqual(false);
        });
    });

    describe('alpha', () => {
        it('returns true if first char is a letter string', () => {
            expect(alpha('a')).toEqual(true);
            expect(alpha('A')).toEqual(true);
            expect(alpha('5')).toEqual(false);
            expect(alpha('.')).toEqual(false);
      
        });

        it('returns false if first char is an empty string', () => {
            expect(alpha('')).toEqual(false);
        });

        it('returns false if first char is not a string', () => {
            expect(alpha(null)).toEqual(false);
            expect(alpha(undefined)).toEqual(false);
            expect(alpha(5)).toEqual(false);
        });
    });

    describe('digit', () => {
        it('returns true if first char is a digit string', () => {
            expect(digit('1')).toEqual(true);
            expect(digit('0')).toEqual(true);
            expect(digit('a')).toEqual(false);
            expect(digit('.')).toEqual(false);
      
        });

        it('returns false if first char is an empty string', () => {
            expect(digit('')).toEqual(false);
        });

        it('returns false if first char is not a string', () => {
            expect(digit(null)).toEqual(false);
            expect(digit(undefined)).toEqual(false);
            expect(digit(5)).toEqual(false);
        });
    });

    describe('space', () => {
        it('returns true if first char is a space string', () => {
            expect(space(' ')).toEqual(true);
            expect(space('\n')).toEqual(true);
            expect(space('\t')).toEqual(true);
            expect(space('\r')).toEqual(true);
            expect(space('a')).toEqual(false);            
        });

        it('returns false if first char is an empty string', () => {
            expect(space('')).toEqual(false);
        });

        it('returns false if first char is not a string', () => {
            expect(space(null)).toEqual(false);
            expect(space(undefined)).toEqual(false);
            expect(space(5)).toEqual(false);
        });
    });

    describe('alnum', () => {
        it('returns true if first char is a letter string or is a digit string', () => {
            expect(alnum('1')).toEqual(true);
            expect(alnum('0')).toEqual(true);
            expect(alnum('a')).toEqual(true);
            expect(alnum('A')).toEqual(true);
            expect(alnum('.')).toEqual(false);
            expect(alnum('?')).toEqual(false);
        });

        it('returns false if first char is an empty string', () => {
            expect(alnum('')).toEqual(false);
        });

        it('returns false if first char is not a string', () => {
            expect(alnum(null)).toEqual(false);
            expect(alnum(undefined)).toEqual(false);
            expect(alnum(5)).toEqual(false);
        });
    });

});
