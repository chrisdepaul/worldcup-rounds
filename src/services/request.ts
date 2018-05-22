// Copyright 2004-present Facebook. All Rights Reserved.

const request = require('request');

export const myRequest = (url) => {
  return request.get(url).then(response => response.json())
}
