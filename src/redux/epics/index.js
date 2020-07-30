import {combineEpics} from 'redux-observable';

import loginEpic from './loginEpic';

const rootEpic = combineEpics(loginEpic);

export default rootEpic;
