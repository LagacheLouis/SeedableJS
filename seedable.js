// Copyright (c) 2022 Lagache Louis.
// All rights reserved.
//
// This code is licensed under the MIT License.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files(the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and / or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions :
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

class Seedable{
    
    /**
     * Create a new Seedable random generator
     * @param {string?} seed 
     */
    constructor(seed){
        this.updateSeed(seed);
    }

    /**
     * Update seed
     * @param {string} seed 
     */
    updateSeed(seed=null){
        this.seed = seed || Seedable.randomSeed();
        this.xmur3 = xmur3(this.seed);
        this.value = mulberry32(this.xmur3());
    }
    
    /**
     * @param {number} min 
     * @param {number} max 
     * @returns random number between min & max
     */
    range(min, max){
        return min + (max-min) * this.value();
    }
    
    /**
     * @param {array} array 
     * @returns random element from an array
     */
    element(array){
        return array[Math.floor(this.value() * array.length)];
    }
    
    /**
     * @param {array} array 
     * @param {number} min 
     * @param {number} max 
     * @param {bool} autorizeDuplicate 
     * @returns mutiple (between min & max) random elements from an array
     */
    elements(array, min, max, autorizeDuplicate=true){
        let length = Math.floor(this.range(min, max+1));
        let res = [];
        for(let i = 0; i<length; i++){
            const value = array[Math.floor(this.value() * array.length)];
            if(autorizeDuplicate || !res.includes(value)){
                res.push(value);
            }
        }
        return res;
    }

    /**
     * @param {*} sizeX 
     * @param {*} sizeY 
     * @returns random image url from piscsum.photos
     */
    image(sizeX, sizeY){
        return `https://picsum.photos/seed/${Math.floor(this.value() * 1000)}/${sizeX}/${sizeY}`;
    }
    
    /**
     * @param {number} min 
     * @param {number} max 
     * @returns random lorem ipsum sentence
     */
    lorem(min, max){
        let length = Math.ceil(this.range(min, max));
        let res = "";
        for(let i = 0; i<length; i++){
            if(i > 0) res+=" ";
            res += this.element(lorem_words);
        }
        return res
    }
    
    /**
     * @param {function} factoryFn 
     * @param {number} length 
     * @param {bool} unique 
     * @returns random array of elements based on the factoryFn
     */
    pool(factoryFn, length, unique = false){
        let res = [];
        let i = 0;
        while(res.length<length){
            let value = factoryFn();
            i++;
            if(!res.includes(value) || !unique){
                res.push(value);
                i=0;
            }
            if(i>100){
                console.warn(`Random.js : the pool generation iteration cap reached, ${res.length} values generated instead of ${length} `);
                break;
            }
        }
        return res;
    }
    /**
     * @param {date} start 
     * @param {date} end 
     * @returns random date between start & end
     */
    date(start, end) {
        return new Date(start.getTime() + this.value() * (end.getTime() - start.getTime()));
    }

    /**
     * @param {number} length 
     * @returns random string using these char [ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789]
     */
    string(length) {
        var result           = [];
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result.push(characters.charAt(Math.floor(this.value() *  charactersLength)));
        }
       return result.join('');
    }
}

/**
 * @param {number} length 
 * @returns random seed 
 */
Seedable.randomSeed = function(){
    return (Math.random() * Math.pow(10, 7)).toFixed(0);
}

const lorem_words = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "ut", "aliquam", "purus", "sit", "amet", "luctus", "venenatis", "lectus", "magna", "fringilla", "urna", "porttitor", "rhoncus", "dolor", "purus", "non", "enim", "praesent", "elementum", "facilisis", "leo", "vel", "fringilla", "est", "ullamcorper", "eget", "nulla", "facilisi", "etiam", "dignissim", "diam", "quis", "enim", "lobortis", "scelerisque", "fermentum", "dui", "faucibus", "in", "ornare", "quam", "viverra", "orci", "sagittis", "eu", "volutpat", "odio", "facilisis", "mauris", "sit", "amet", "massa", "vitae", "tortor", "condimentum", "lacinia", "quis", "vel", "eros", "donec", "ac", "odio", "tempor", "orci", "dapibus", "ultrices", "in", "iaculis", "nunc", "sed", "augue", "lacus", "viverra", "vitae", "congue", "eu", "consequat", "ac", "felis", "donec", "et", "odio", "pellentesque", "diam", "volutpat", "commodo", "sed", "egestas", "egestas", "fringilla", "phasellus", "faucibus", "scelerisque", "eleifend", "donec", "pretium", "vulputate", "sapien", "nec", "sagittis", "aliquam", "malesuada", "bibendum", "arcu", "vitae", "elementum",
    "curabitur", "vitae", "nunc", "sed", "velit", "dignissim", "sodales", "ut", "eu", "sem", "integer", "vitae", "justo", "eget", "magna", "fermentum", "iaculis", "eu", "non", "diam", "phasellus", "vestibulum", "lorem", "sed", "risus", "ultricies", "tristique", "nulla", "aliquet", "enim", "tortor", "at", "auctor", "urna", "nunc", "id", "cursus", "metus", "aliquam", "eleifend", "mi", "in", "nulla", "posuere", "sollicitudin", "aliquam", "ultrices", "sagittis", "orci", "a", "scelerisque", "purus", "semper", "eget", "duis", "at", "tellus", "at", "urna", "condimentum", "mattis", "pellentesque", "id", "nibh", "tortor", "id", "aliquet", "lectus", "proin", "nibh", "nisl", "condimentum", "id", "venenatis", "a", "condimentum", "vitae", "sapien", "pellentesque", "habitant", "morbi", "tristique", "senectus", "et", "netus", "et", "malesuada", "fames", "ac", "turpis", "egestas", "sed", "tempus", "urna", "et", "pharetra", "pharetra", "massa", "massa", "ultricies", "mi", "quis", "hendrerit", "dolor", "magna", "eget", "est", "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "pellentesque", "habitant", "morbi", "tristique", "senectus", "et", "netus", "et", "malesuada", "fames", "ac", "turpis", "egestas", "integer", "eget", "aliquet", "nibh", "praesent", "tristique", "magna", "sit", "amet", "purus", "gravida", "quis", "blandit", "turpis", "cursus", "in", "hac", "habitasse", "platea", "dictumst", "quisque", "sagittis", "purus", "sit", "amet", "volutpat", "consequat", "mauris", "nunc", "congue", "nisi", "vitae", "suscipit", "tellus", "mauris", "a", "diam",
    "maecenas", "sed", "enim", "ut", "sem", "viverra", "aliquet", "eget", "sit", "amet", "tellus", "cras", "adipiscing", "enim", "eu", "turpis", "egestas", "pretium", "aenean", "pharetra", "magna", "ac", "placerat", "vestibulum", "lectus", "mauris", "ultrices", "eros", "in", "cursus", "turpis", "massa", "tincidunt", "dui", "ut", "ornare", "lectus", "sit", "amet", "est", "placerat", "in", "egestas", "erat", "imperdiet", "sed", "euismod", "nisi", "porta", "lorem", "mollis", "aliquam", "ut", "porttitor", "leo", "a", "diam", "sollicitudin", "tempor", "id", "eu", "nisl", "nunc", "mi", "ipsum", "faucibus", "vitae", "aliquet", "nec", "ullamcorper", "sit", "amet", "risus", "nullam", "eget", "felis", "eget", "nunc", "lobortis", "mattis", "aliquam", "faucibus", "purus", "in", "massa", "tempor", "nec", "feugiat", "nisl", "pretium", "fusce", "id", "velit", "ut", "tortor", "pretium", "viverra", "suspendisse", "potenti", "nullam", "ac", "tortor", "vitae", "purus", "faucibus", "ornare", "suspendisse", "sed", "nisi", "lacus", "sed", "viverra", "tellus", "in", "hac", "habitasse", "platea", "dictumst", "vestibulum", "rhoncus", "est", "pellentesque", "elit", "ullamcorper", "dignissim", "cras", "tincidunt", "lobortis", "feugiat", "vivamus", "at", "augue", "eget", "arcu", "dictum", "varius", "duis", "at", "consectetur", "lorem",
    "donec", "massa", "sapien", "faucibus", "et", "molestie", "ac", "feugiat", "sed", "lectus", "vestibulum", "mattis", "ullamcorper", "velit", "sed", "ullamcorper", "morbi", "tincidunt", "ornare", "massa", "eget", "egestas", "purus", "viverra", "accumsan", "in", "nisl", "nisi", "scelerisque", "eu", "ultrices", "vitae", "auctor", "eu", "augue", "ut", "lectus", "arcu", "bibendum", "at", "varius", "vel", "pharetra", "vel", "turpis", "nunc", "eget", "lorem", "dolor", "sed", "viverra", "ipsum", "nunc", "aliquet", "bibendum", "enim", "facilisis", "gravida", "neque", "convallis", "a", "cras", "semper", "auctor", "neque", "vitae", "tempus", "quam", "pellentesque", "nec", "nam", "aliquam", "sem", "et", "tortor", "consequat", "id", "porta", "nibh", "venenatis", "cras", "sed", "felis", "eget", "velit", "aliquet", "sagittis", "id", "consectetur", "purus", "ut", "faucibus", "pulvinar", "elementum", "integer", "enim", "neque", "volutpat", "ac", "tincidunt", "vitae", "semper", "quis", "lectus", "nulla", "at", "volutpat", "diam", "ut", "venenatis", "tellus", "in", "metus", "vulputate", "eu", "scelerisque", "felis", "imperdiet", "proin", "fermentum", "leo", "vel", "orci", "porta", "non", "pulvinar", "neque", "laoreet", "suspendisse", "interdum", "consectetur", "libero", "id", "faucibus", "nisl", "tincidunt", "eget", "nullam", "non", "nisi", "est", "sit", "amet", "facilisis", "magna",
    "etiam", "tempor", "orci", "eu", "lobortis", "elementum", "nibh", "tellus", "molestie", "nunc", "non", "blandit", "massa", "enim", "nec", "dui", "nunc", "mattis", "enim", "ut", "tellus", "elementum", "sagittis", "vitae", "et", "leo", "duis", "ut", "diam", "quam", "nulla", "porttitor", "massa", "id", "neque", "aliquam", "vestibulum", "morbi", "blandit", "cursus", "risus", "at", "ultrices", "mi", "tempus", "imperdiet", "nulla", "malesuada", "pellentesque", "elit", "eget", "gravida", "cum", "sociis", "natoque", "penatibus", "et", "magnis", "dis", "parturient", "montes", "nascetur", "ridiculus", "mus", "mauris", "vitae", "ultricies", "leo", "integer", "malesuada", "nunc", "vel", "risus", "commodo", "viverra", "maecenas", "accumsan", "lacus", "vel", "facilisis", "volutpat", "est", "velit", "egestas", "dui", "id", "ornare", "arcu", "odio", "ut", "sem", "nulla", "pharetra", "diam", "sit", "amet", "nisl", "suscipit", "adipiscing", "bibendum", "est", "ultricies", "integer", "quis", "auctor", "elit",
    "sed", "vulputate", "mi", "sit", "amet", "mauris", "commodo", "quis", "imperdiet", "massa", "tincidunt", "nunc", "pulvinar", "sapien", "et", "ligula", "ullamcorper", "malesuada", "proin", "libero", "nunc", "consequat", "interdum", "varius", "sit", "amet", "mattis", "vulputate", "enim", "nulla", "aliquet", "porttitor", "lacus", "luctus", "accumsan", "tortor", "posuere", "ac", "ut", "consequat", "semper", "viverra", "nam", "libero", "justo", "laoreet", "sit", "amet", "cursus", "sit", "amet", "dictum", "sit", "amet", "justo", "donec", "enim", "diam", "vulputate", "ut", "pharetra", "sit", "amet", "aliquam", "id", "diam", "maecenas", "ultricies", "mi", "eget", "mauris", "pharetra", "et", "ultrices", "neque", "ornare", "aenean", "euismod", "elementum", "nisi", "quis", "eleifend", "quam", "adipiscing", "vitae", "proin", "sagittis", "nisl", "rhoncus", "mattis", "rhoncus", "urna", "neque", "viverra", "justo", "nec", "ultrices", "dui", "sapien", "eget", "mi", "proin", "sed", "libero", "enim", "sed", "faucibus", "turpis", "in", "eu", "mi", "bibendum", "neque", "egestas", "congue", "quisque", "egestas", "diam", "in", "arcu", "cursus", "euismod", "quis", "viverra", "nibh", "cras", "pulvinar", "mattis", "nunc", "sed", "blandit", "libero", "volutpat", "sed", "cras", "ornare", "arcu", "dui", "vivamus", "arcu", "felis", "bibendum", "ut", "tristique", "et", "egestas", "quis", "ipsum", "suspendisse", "ultrices", "gravida", "dictum",
    "fusce", "ut", "placerat", "orci", "nulla", "pellentesque", "dignissim", "enim", "sit", "amet", "venenatis", "urna", "cursus", "eget", "nunc", "scelerisque", "viverra", "mauris", "in", "aliquam", "sem", "fringilla", "ut", "morbi", "tincidunt", "augue", "interdum", "velit", "euismod", "in", "pellentesque", "massa", "placerat", "duis", "ultricies", "lacus", "sed", "turpis", "tincidunt", "id", "aliquet", "risus", "feugiat", "in", "ante", "metus", "dictum", "at", "tempor", "commodo", "ullamcorper", "a", "lacus", "vestibulum", "sed", "arcu", "non", "odio", "euismod", "lacinia", "at", "quis", "risus", "sed", "vulputate", "odio", "ut", "enim", "blandit", "volutpat", "maecenas", "volutpat", "blandit", "aliquam", "etiam", "erat", "velit", "scelerisque", "in", "dictum", "non", "consectetur", "a", "erat", "nam", "at", "lectus", "urna", "duis", "convallis", "convallis", "tellus", "id", "interdum", "velit", "laoreet", "id", "donec", "ultrices", "tincidunt", "arcu", "non", "sodales", "neque", "sodales", "ut", "etiam", "sit", "amet", "nisl", "purus", "in", "mollis", "nunc",
    "sed", "id", "semper", "risus", "in", "hendrerit", "gravida", "rutrum", "quisque", "non", "tellus", "orci", "ac", "auctor", "augue", "mauris", "augue", "neque", "gravida", "in", "fermentum", "et", "sollicitudin", "ac", "orci", "phasellus", "egestas", "tellus", "rutrum", "tellus", "pellentesque", "eu", "tincidunt", "tortor", "aliquam", "nulla", "facilisi", "cras", "fermentum", "odio", "eu", "feugiat", "pretium", "nibh", "ipsum", "consequat", "nisl", "vel", "pretium", "lectus", "quam", "id", "leo", "in", "vitae", "turpis", "massa", "sed", "elementum", "tempus", "egestas", "sed", "sed", "risus", "pretium", "quam", "vulputate", "dignissim", "suspendisse", "in", "est", "ante", "in", "nibh", "mauris", "cursus", "mattis", "molestie", "a", "iaculis", "at", "erat",
    "pellentesque", "adipiscing", "commodo", "elit", "at", "imperdiet", "dui", "accumsan", "sit", "amet", "nulla", "facilisi", "morbi", "tempus", "iaculis", "urna", "id", "volutpat", "lacus", "laoreet", "non", "curabitur", "gravida", "arcu", "ac", "tortor", "dignissim", "convallis", "aenean", "et", "tortor", "at", "risus", "viverra", "adipiscing", "at", "in", "tellus", "integer", "feugiat", "scelerisque", "varius", "morbi", "enim", "nunc", "faucibus", "a", "pellentesque", "sit", "amet", "porttitor", "eget", "dolor", "morbi", "non", "arcu", "risus", "quis", "varius", "quam", "quisque", "id", "diam", "vel", "quam", "elementum", "pulvinar", "etiam", "non", "quam", "lacus", "suspendisse", "faucibus", "interdum", "posuere", "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "duis", "tristique", "sollicitudin", "nibh", "sit", "amet", "commodo", "nulla", "facilisi",
    "nullam", "vehicula", "ipsum", "a", "arcu", "cursus", "vitae", "congue", "mauris", "rhoncus", "aenean", "vel", "elit", "scelerisque", "mauris", "pellentesque", "pulvinar", "pellentesque", "habitant", "morbi", "tristique", "senectus", "et", "netus", "et", "malesuada", "fames", "ac", "turpis", "egestas", "maecenas", "pharetra", "convallis", "posuere", "morbi", "leo", "urna", "molestie", "at", "elementum", "eu", "facilisis", "sed", "odio", "morbi", "quis", "commodo", "odio", "aenean", "sed", "adipiscing", "diam", "donec", "adipiscing", "tristique", "risus", "nec", "feugiat", "in", "fermentum", "posuere", "urna", "nec", "tincidunt", "praesent", "semper", "feugiat", "nibh", "sed", "pulvinar", "proin", "gravida", "hendrerit", "lectus", "a", "molestie"
];

function xmur3(str) {
    for(var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353),
        h = h << 13 | h >>> 19;
    return function() {
        h = Math.imul(h ^ h >>> 16, 2246822507);
        h = Math.imul(h ^ h >>> 13, 3266489909);
        return (h ^= h >>> 16) >>> 0;
    }
}

function mulberry32(a) {
    return function() {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

export default Seedable;
