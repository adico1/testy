'use strict';

const Utils = require('../../../lib/utils');
const { suite, test } = require('../../../testy');
const { asserter, expectSuccess, expectFailureDueTo } = require('../../support/assertion_helpers');

suite('collection assertions', () => {
  const nonEmptySet = new Set([1]);
  const emptySet = new Set([]);
  
  test('includes passes if the object is in the array', () => {
    asserter.that(['hey']).includes('hey');
    
    expectSuccess();
  });
  
  test('includes does not pass if the actual object is not an array', () => {
    asserter.that([]).includes('hey');
    
    expectFailureDueTo('Expected [] to include hey');
  });
  
  test('doesNotInclude fails if the object is in the array', () => {
    asserter.that(['hey']).doesNotInclude('hey');
    
    expectFailureDueTo("Expected [ 'hey' ] to not include hey");
  });
  
  test('doesNotInclude passes if the object is not an array', () => {
    asserter.that([]).doesNotInclude('hey');
    
    expectSuccess();
  });
  
  test('includesExactly passes with a single object included', () => {
    asserter.that(['hey']).includesExactly('hey');
    
    expectSuccess();
  });
  
  test('includesExactly fails if the collection has more objects than expected', () => {
    asserter.that(['hey', 'ho']).includesExactly('hey');
    
    expectFailureDueTo("Expected [ 'hey', 'ho' ] to include exactly [ 'hey' ]");
  });
  
  test('includesExactly fails if the collection has less objects than expected', () => {
    asserter.that(['hey']).includesExactly('hey', 'ho');
    
    expectFailureDueTo("Expected [ 'hey' ] to include exactly [ 'hey', 'ho' ]");
  });
  
  test('includesExactly fails if none of the objects are included at all', () => {
    asserter.that(['hey']).includesExactly('ho');
    
    expectFailureDueTo("Expected [ 'hey' ] to include exactly [ 'ho' ]");
  });
  
  test('includesExactly passes with many items no matter the order', () => {
    asserter.that(['hey', 'ho']).includesExactly('ho', 'hey');
    
    expectSuccess();
  });
  
  test('includesExactly passes on a Set', () => {
    asserter.that(new Set(['hey', 'ho'])).includesExactly('ho', 'hey');
    
    expectSuccess();
  });
  
  test('isEmpty passes on an empty array', () => {
    asserter.that([]).isEmpty();
    
    expectSuccess();
  });
  
  test('isEmpty does not pass if the array has elements', () => {
    asserter.that(['hey']).isEmpty();
    
    expectFailureDueTo("Expected [ 'hey' ] to be empty");
  });
  
  test('isEmpty passes with an empty string', () => {
    asserter.that('').isEmpty();
    
    expectSuccess();
  });
  
  test('isEmpty shorthand works', () => {
    asserter.isEmpty([]);
    
    expectSuccess();
  });
  
  test('isNotEmpty passes on an array with element', () => {
    asserter.that(['hey']).isNotEmpty();
    
    expectSuccess();
  });
  
  test('isNotEmpty does not pass if the array is empty', () => {
    asserter.that([]).isNotEmpty();
    
    expectFailureDueTo('Expected [] to be not empty');
  });
  
  test('isNotEmpty passes with a string with content', () => {
    asserter.that('hey').isNotEmpty();
    
    expectSuccess();
  });
  
  test('isNotEmpty shorthand works', () => {
    asserter.isNotEmpty(['hey']);
    
    expectSuccess();
  });
  
  test('isEmpty passes on an empty set', () => {
    asserter.that(emptySet).isEmpty();
    
    expectSuccess();
  });
  
  test('isEmpty does not pass on a set with elements', () => {
    asserter.that(nonEmptySet).isEmpty();
    
    expectFailureDueTo(`Expected ${Utils.prettyPrint(nonEmptySet)} to be empty`);
  });
  
  test('isNotEmpty does not pass on an empty set', () => {
    asserter.that(emptySet).isNotEmpty();
    
    expectFailureDueTo(`Expected ${Utils.prettyPrint(emptySet)} to be not empty`);
  });
  
  test('isNotEmpty passes on a set with elements', () => {
    asserter.that(nonEmptySet).isNotEmpty();
    
    expectSuccess();
  });
});
