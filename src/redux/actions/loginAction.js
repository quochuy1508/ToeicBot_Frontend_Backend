// authentication
export const REQUEST_AUTHENTICATE_USER = 'REQUEST_AUTHENTICATE_USER';
export const PROCESSING_AUTHENTICATE_USER = 'PROCESSING_AUTHENTICATE_USER';
export const AUTHENTICATING = `AUTHENTICATING`;
export const AUTHENTICATED = `AUTHENTICATED`;
export const NOT_AUTHENTICATED = `NOT_AUTHENTICATED`;
export const LOG_OUT = `LOG_OUT`;

export const requestAuthenticateUser = (data) => ({
  type: REQUEST_AUTHENTICATE_USER,
  payload: data,
});

export const processAuthenticateUser = (
  type = AUTHENTICATING,
  session = null,
) => {
  return {
    type: PROCESSING_AUTHENTICATE_USER,
    session,
    status: type,
  };
};

export const signOut = () => ({
  type: LOG_OUT,
});
