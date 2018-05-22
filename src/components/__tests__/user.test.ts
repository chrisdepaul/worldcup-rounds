// Copyright 2004-present Facebook. All Rights Reserved.

'use strict';
// ORDER DOES NOT MATTER
jest.mock('../../services/logger'); 
jest.mock('../../services/request');
// IF YOU WANT CALLS FROM WITHIN A FUNCTION TO BE MOCKED, YOU MUST MOCK AT THE BEGINNING
// DEFINING A MOCK WITHING THE TEST DOES NOT WORK. FOR EXAMPLE: 
// jest.doMock('../../services/logger, () => ({
//    log: jest.fn((msg) => console.log(`mock: ${msg}))
// }
// THIS WILL NOT CHANGE THE LOG IN THE USER FUNCTION
//
// HOWEVER, YOU COULD DO THIS (or jest.doMock) AT THE TOP OF THE PAGE AND IT'LL WORK
// jest.mock('../../services/logger', () => {
//   return ({
//     log: jest.fn((msg) => console.log(`MOCK: ${msg}`))
//   })
// })
const {log} = require('../../services/logger');
const user = require('../user')

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetModules();
});

// Testing promise can be done using `.resolves`.
it('works with resolves', () => {
  expect(user.getUserName(5)).resolves.toEqual('Paul');
  expect(log.mock.calls.length).toBe(1)
});

// The assertion for a promise must be returned.
it('works with promises', () => {
  user.getUserName(4).then(data => expect(data).toEqual('Mark'));
  expect(log.mock.calls.length).toBe(1)
});

// async/await can be used.
it('works with async/await', async () => {
  const data = await user.getUserName(4);
  expect(log.mock.calls.length).toBe(1);
  expect(data).toEqual('Mark');
});

// async/await can also be used with `.resolves`.
it('works with async/await and resolves', async () => {
  expect.assertions(1);
  await expect(user.getUserName(5)).resolves.toEqual('Paul');
});

// Testing for async errors using `.rejects`.
it('tests error with rejects', () => {
  expect.assertions(1);
  return expect(user.getUserName(3)).rejects.toEqual({
    error: 'User with 3 not found.',
  });
});

// Testing for async errors using Promise.catch.
test('tests error with promises', async () => {
  expect.assertions(1);
  return user.getUserName(2).catch(e =>
    expect(e).toEqual({
      error: 'User with 2 not found.',
    })
  );
});

// Or using async/await.
it('tests error with async/await', async () => {
  expect.assertions(1);
  try {
    await user.getUserName(1);
  } catch (e) {
    expect(e).toEqual({
      error: 'User with 1 not found.',
    });
  }
});

// Or using async/await with `.rejects`.
it('tests error with async/await and rejects', async () => {
  expect.assertions(1);
  await expect(user.getUserName(3)).rejects.toEqual({
    error: 'User with 3 not found.',
  });
});
