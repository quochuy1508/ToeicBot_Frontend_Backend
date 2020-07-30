import {PROCESSING_AUTHENTICATE_USER} from '../actions/loginAction';

const users = (state = {}, action) => {
  switch (action.type) {
    case PROCESSING_AUTHENTICATE_USER:
      return {
        ...state,
        session: action.session,
      };

    default:
      return state;
  }
};

export default users;
