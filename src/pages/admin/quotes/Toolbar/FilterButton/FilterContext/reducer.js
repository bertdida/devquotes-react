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
      return resetAll(state);

    case actions.SET_VALUE:
      return setValue(payload, state);

    case actions.TOGGLE_SELECT:
      return toggleSelect(payload, state);

    case actions.VALIDATE:
      return validate(payload, state);

    case actions.PARSE_QUERY_PARAMS:
      return parseQueryParams(payload, state);

    case actions.QUOTE_STATUSES_LOADED:
      return quoteStatusesLoaded(payload, state);

    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
}

function reset({ id }, state) {
  const options = state.options.map(option => {
    if (option.id !== id || option.name === 'status') return option;
    return initialState.options.find(initialFilter => initialFilter.id === id);
  });

  return { ...state, options };
}

function resetAll(state) {
  const options = state.options.map(option => {
    if (option.name === 'status') {
      return { ...option, errors: [], isSelected: false };
    }

    return initialState.options.find(
      initialFilter => initialFilter.id === option.id
    );
  });

  return { ...state, options };
}

function setValue({ id, value }, state) {
  const options = state.options.map(option => {
    if (option.id !== id) return option;
    return { ...option, value, errors: [] };
  });

  return { ...state, options };
}

function toggleSelect({ id }, state) {
  const options = state.options.map(option => {
    if (option.id !== id) return option;
    return { ...option, isSelected: !option.isSelected };
  });

  return { ...state, options };
}

function validate({ onSuccess }, state) {
  let hasError = false;
  const options = state.options.map(option => {
    if (!option.isSelected) return option;

    const { value, name } = option;

    if (name === 'likes' && !parseLikesValue(value)[1]) {
      hasError = true;
      return { ...option, errors: ['Please enter a value'] };
    }

    if (name === 'submitted_by' && !value.trim()) {
      hasError = true;
      return { ...option, errors: ['Please enter a value'] };
    }

    return option;
  });

  if (!hasError && typeof onSuccess === 'function') {
    onSuccess();
  }

  return { ...state, options };
}

function parseQueryParams({ params }, state) {
  const query = queryString.parse(params);
  const options = state.options.map(option => {
    const value = query[option.name];
    const hasValue = value !== undefined;

    return {
      ...option,
      isSelected: hasValue,
      value: hasValue ? value : option.value,
    };
  });

  return { ...state, options };
}

function quoteStatusesLoaded({ response }, state) {
  const statuses = response.data.data.map(({ data }) => data);
  const options = state.options.map(option => {
    if (option.name !== 'status') return option;
    return { ...option, items: statuses };
  });

  return { ...state, options, isLoading: false };
}
