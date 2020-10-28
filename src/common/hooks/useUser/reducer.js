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
  const { user } = state;
  const { stats: prevStats } = user;
  const stats = { ...prevStats, total_likes: prevStats.total_likes + 1 };

  return { ...state, user: { ...user, stats } };
}

function decrementLike(state) {
  const { user } = state;
  const { stats: prevStats } = user;
  const stats = { ...prevStats, total_likes: prevStats.total_likes - 1 };

  return { ...state, user: { ...user, stats } };
}

function incrementSubmitted(state) {
  const { user } = state;
  const { stats: prevStats } = user;
  const stats = {
    ...prevStats,
    total_submitted: prevStats.total_submitted + 1,
  };

  return { ...state, user: { ...user, stats } };
}

function decrementSubmitted(payload = {}, state) {
  const { user } = state;
  const { stats: prevStats } = user;
  const stats = {
    ...prevStats,
    total_submitted: prevStats.total_submitted - (payload.count || 1),
  };

  return { ...state, user: { ...user, stats } };
}
