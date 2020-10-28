import queryString from 'query-string';

import actions from './actions';
import initialState from './initialState';
import { parseLikesValue } from '../utils';

export default function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case actions.RESET:
      return reset(payload, state);

    case actions.RESET_ALL:
      return initialState;

    case actions.SET_VALUE:
      return setValue(payload, state);

    case actions.TOGGLE_SELECT:
      return toggleSelect(payload, state);

    case actions.VALIDATE:
      return validate(payload, state);

    case actions.PARSE_QUERY_PARAMS:
      return parseQueryParams(payload, state);

    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
}

function reset({ id }, state) {
  return state.map(item => {
    if (item.id !== id) return item;
    return initialState.find(initialFilter => initialFilter.id === id);
  });
}

function setValue({ id, value }, state) {
  return state.map(item => {
    if (item.id !== id) return item;
    return { ...item, value, errors: [] };
  });
}

function toggleSelect({ id }, state) {
  return state.map(item => {
    if (item.id !== id) return item;
    return { ...item, isSelected: !item.isSelected };
  });
}

function validate({ onSuccess }, state) {
  let hasError = false;
  const newState = state.map(filter => {
    if (!filter.isSelected) return filter;

    const { value, name } = filter;

    if (name === 'likes' && !parseLikesValue(value)[1]) {
      hasError = true;
      return { ...filter, errors: ['Please enter a value'] };
    }

    if (name === 'submitted_by' && !value.trim()) {
      hasError = true;
      return { ...filter, errors: ['Please enter a value'] };
    }

    return filter;
  });

  if (!hasError && typeof onSuccess === 'function') onSuccess();
  return newState;
}

function parseQueryParams({ params }, state) {
  const query = queryString.parse(params);
  return state.map(filter => {
    const value = query[filter.name];
    const hasValue = value !== undefined;

    return {
      ...filter,
      isSelected: hasValue,
      value: hasValue ? value : filter.value,
    };
  });
}
