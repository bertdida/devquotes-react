import actions from './actions';

let uniqueId = 0;

export default function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case actions.PUSH_SNACK:
      return pushSnack(payload, state);

    case actions.CLOSE_CURRENT:
      return closeCurrent(state);

    case actions.OPEN_NEXT:
      return openNext(state);

    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
}

function pushSnack({ message, ...rest }, state) {
  uniqueId += 1;
  const id = uniqueId;
  const snack = { id, message, open: true, ...rest };

  if (state.current) {
    return { ...state, queue: [...state.queue, snack] };
  }

  return { ...state, current: snack };
}

function closeCurrent(state) {
  return { ...state, current: { ...state.current, open: false } };
}

function openNext(state) {
  const { queue } = state;

  if (queue.length) {
    return { current: queue[0], queue: queue.slice(1) };
  }

  return { current: null, queue: [] };
}
