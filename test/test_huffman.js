'use strict';

const assert = require('power-assert');
const huffman = require('../huffman');

const tests = [
  {
    order: 1,
    probs: [
      0.25, 0.2, 0.3, 0.15, 0.08, 0.02
    ],
    expected: [
      '01', '11', '00', '100', '1010', '1011'
    ]
  },
];

describe('huffman()', function() {

  it('should works well in the 1st order', function() {

    tests.forEach((subtest) => {
      const codes = huffman(subtest.probs, subtest.order);

      codes.forEach((code, i) => {
        assert.strictEqual(code, subtest.expected[i]);
      });
    });

  });

});