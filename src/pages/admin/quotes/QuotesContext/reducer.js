import queryString from 'query-string';

import actions from './actions';

export default function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case actions.PARSE_QUERY_PARAMS:
      return parseQueryParams(payload, state);

    case actions.QUOTES_LOADING:
      return quotesLoading(state);

    case actions.QUOTES_LOADED:
      return quotesLoaded(payload, state);

    case actions.SELECT_ALL:
      return selectAll(state);

    case actions.DESELECT_ALL:
      return deselectAll(state);

    case actions.TOGGLE_SELECT:
      return toggleSelect(payload, state);

    case actions.QUOTE_DELETED:
      return quoteDeleted(payload, state);

    case actions.QUOTES_DELETED:
      return quotesDeleted(payload, state);

    case actions.QUOTE_UPDATED:
      return quoteUpdated(payload, state);

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function parseQueryParams({ params }, state) {
  return { ...state, queryParams: queryString.parse(params) };
}

function quotesLoading(state) {
  return { ...state, isLoading: true };
}

function quotesLoaded({ response }, state) {
  const { data, ...pagination } = response.data;
  const quotes = data.map(quote => quote.data);
  return { ...state, quotes, pagination, isLoading: false };
}

function selectAll({ quotes, ...rest }) {
  const newQuotes = quotes.map(quote => {
    if (quote.isDeleted) return quote;
    return { ...quote, isSelected: true };
  });

  return { ...rest, quotes: newQuotes };
}

function deselectAll({ quotes, ...rest }) {
  const newQuotes = quotes.map(quote => ({ ...quote, isSelected: false }));
  return { ...rest, quotes: newQuotes };
}

function toggleSelect({ id }, { quotes, ...rest }) {
  const newQuotes = quotes.map(currQuote => {
    if (currQuote.id !== id) return currQuote;
    return { ...currQuote, isSelected: !currQuote.isSelected };
  });

  return { ...rest, quotes: newQuotes };
}

function quoteDeleted({ id }, { quotes, ...rest }) {
  const newQuotes = quotes.map(currQuote => {
    if (currQuote.id !== id) return currQuote;
    return { ...currQuote, isSelected: false, isDeleted: true };
  });

  return { ...rest, quotes: newQuotes };
}

function quotesDeleted({ ids }, { quotes, ...rest }) {
  const newQuotes = quotes.map(currQuote => {
    if (!ids.includes(currQuote.id)) return currQuote;
    return { ...currQuote, isSelected: false, isDeleted: true };
  });

  return { ...rest, quotes: newQuotes };
}

function quoteUpdated({ response }, { quotes, ...rest }) {
  const { data } = response.data;
  const newQuotes = quotes.map(currQuote =>
    currQuote.id !== data.id ? currQuote : data
  );

  return { ...rest, quotes: newQuotes };
}
