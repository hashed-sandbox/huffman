'use strict';

// used as _.flatten in allocateCodes()
const _ = require('lodash');

// an array allocated huffman codes to by allocateCodes()
let codes = [];

function allocateCodes(symbols) {
  // sort symbols ascendingly according to their probabilities
  const sorted = symbols.sort((a, b) => a.prob > b.prob);

  sorted[0].indices.forEach((index) => codes[index] = '1' + codes[index]);
  sorted[1].indices.forEach((index) => codes[index] = '0' + codes[index]);

  const newSymbol = {
    prob: sorted[0].prob + sorted[1].prob,
    indices: _.flatten([sorted[0].indices, sorted[1].indices])
  };

  const reduced = [newSymbol].concat(sorted.slice(2));

  return (reduced.length === 1) ? reduced : allocateCodes(reduced);
}

function huffman(probs, order = 1) {
  let symbols = probs.map((v, i) => {
    return { prob: v, indices: [i] };
  });

  codes = symbols.map(() => '');

  allocateCodes(symbols);

  return codes;
}

module.exports = huffman;
