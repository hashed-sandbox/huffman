'use strict';

// used as _.flatten in allocateCodes()
const _ = require('lodash');

// an array allocated huffman codes to by allocateCodes()
let codes = [];

function allocateCodes(symbols) {
  // sort symbols ascendingly according to their probabilities
  const sorted = symbols.sort((a, b) => {
    if (a.prob > b.prob) return 1;
    if (a.prob < b.prob) return -1;
    return 0;
  });

  sorted[0].indices.forEach((index) => codes[index] = '1' + codes[index]);
  sorted[1].indices.forEach((index) => codes[index] = '0' + codes[index]);

  const newSymbol = {
    prob: sorted[0].prob + sorted[1].prob,
    indices: _.flatten([sorted[0].indices, sorted[1].indices])
  };

  const reduced = [newSymbol].concat(sorted.slice(2));

  return (reduced.length === 1) ? reduced : allocateCodes(reduced);
}

function getHuffmanCodes(probs, order = 1) {
  const symbols = probs.map((prob, i) => {
    return { prob: prob, indices: [i] };
  });

  codes = symbols.map(() => '');

  allocateCodes(symbols);

  return codes;
}

function printInfo(probs, codes) {
  console.log('codes:');
  for (let i = 0; i < codes.length; i++) {
    console.log(`  s${i}: ${codes[i]} (${probs[i]})`);
  }

  let avg = 0.0;
  probs.forEach((prob, i) => avg += prob * codes[i].length);
  console.log(`average code length: ${avg}`);

  let entropy = 0.0;
  probs.forEach((prob) => entropy -= prob * Math.log2(prob));
  console.log(`entropy: ${entropy}`);
}

module.exports.getHuffmanCodes = getHuffmanCodes;
module.exports.printInfo = printInfo;
