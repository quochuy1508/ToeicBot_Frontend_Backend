import {PROCESSING_AUTHENTICATE_USER, LOG_OUT} from '../actions/loginAction';

const users = (state = {}, action) => {
  switch (action.type) {
    case PROCESSING_AUTHENTICATE_USER:
      return {
        ...state,
        session: action.session,
      };
    case LOG_OUT:
      return {};
    default:
      return state;
  }
};

export default users;
