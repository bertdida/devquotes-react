import actions from './actions';

export default function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case actions.SIGN_IN:
      return signIn(payload, state);

    case actions.SIGN_OUT:
      return signOut(state);

    case actions.AUTHENTICATION_COMPLETE:
      return authenticationComplete(state);

    case actions.INCREMENT_LIKE:
      return incrementLike(state);

    case actions.DECREMENT_LIKE:
      return decrementLike(state);

    case actions.INCREMENT_SUBMITTED:
      return incrementSubmitted(state);

    case actions.DECREMENT_SUBMITTED:
      return decrementSubmitted(payload, state);

    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
}

function signIn({ response }, state) {
  return { ...state, user: response.data.data };
}

function signOut(state) {
  return { ...state, user: null };
}

function authenticationComplete(state) {
  return { ...state, isAuthenticating: false };
}

function incrementLike(state) {
  return {
    ...state,
    user: {
      ...state.user,
      total_likes: state.user.total_likes + 1,
    },
  };
}

function decrementLike(state) {
  return {
    ...state,
    user: {
      ...state.user,
      total_likes: state.user.total_likes - 1,
    },
  };
}

function incrementSubmitted(state) {
  return {
    ...state,
    user: {
      ...state.user,
      total_submitted: state.user.total_submitted + 1,
    },
  };
}

function decrementSubmitted(payload, state) {
  return {
    ...state,
    user: {
      ...state.user,
      total_submitted:
        state.user.total_submitted - (payload ? payload.count : 1),
    },
  };
}
