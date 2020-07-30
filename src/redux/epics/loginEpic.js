import {mergeMap, map, mapTo} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';
import {ofType} from 'redux-observable';
import {
  processAuthenticateUser,
  AUTHENTICATED,
  NOT_AUTHENTICATED,
  REQUEST_AUTHENTICATE_USER,
} from '../actions/loginAction';

const loginEpic = (action$) =>
  action$.pipe(
    ofType(REQUEST_AUTHENTICATE_USER),
    map(({payload}) => {
      if (Object.keys(payload).length > 0)
        return processAuthenticateUser(AUTHENTICATED, payload);
      else return processAuthenticateUser(NOT_AUTHENTICATED, {});
    }),
  );
export default loginEpic;
