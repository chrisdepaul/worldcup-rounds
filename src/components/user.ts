// Copyright 2004-present Facebook. All Rights Reserved.

import { myRequest } from '../services/request';
import {log} from '../services/logger'

export const getUserName = (userID) => {
  log(userID)
  return myRequest('/users/' + userID).then((user)  => user.name);
}
