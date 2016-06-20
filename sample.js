'use strict';

const _ = require('lodash');

const getHuffmanCodes = require('./src/huffman').getHuffmanCodes;
const printInfo = require('./src/huffman').printInfo;

//////////////////////////////////////////////////

const probs = [
  0.25, 0.2, 0.3, 0.15, 0.08, 0.02
];

const codes = getHuffmanCodes(probs);
printInfo(probs, codes);

//////////////////////////////////////////////////

const probs_2nd = _.flatten(probs.map((prob1) => {
  return probs.map((prob2) => prob1 * prob2);
}));

const codes_2nd = getHuffmanCodes(probs_2nd);
printInfo(probs_2nd, codes_2nd);
