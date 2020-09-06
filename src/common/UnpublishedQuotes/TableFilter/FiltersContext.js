import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { statuses, likesOperators } from './options';

function getInitialValue(name) {
  if (name === 'totalLikes') {
    return `${likesOperators[0].value}:0`;
  }

  if (name === 'status') {
    return statuses[0].value;
  }

  return '';
}

const filterNames = ['status', 'totalLikes', 'submittedBy'];
const initialFilters = filterNames.map(name => ({
  name,
  selected: false,
  value: getInitialValue(name),
}));

export const FiltersContext = createContext();
export const useFilters = () => useContext(FiltersContext);

export function FiltersProvider({ children }) {
  const [filters, setFilters] = useState(initialFilters);
  const totalSelected = filters.filter(({ selected }) => selected).length;

  function select(name) {
    setFilters(prev =>
      prev.map(filter => {
        if (filter.name !== name) return filter;
        return { ...filter, selected: !filter.selected };
      })
    );
  }

  function resetAll() {
    setFilters(prev =>
      prev.map(filter => ({
        ...filter,
        selected: false,
        value: getInitialValue(filter.name),
      }))
    );
  }

  function reset(name) {
    setFilters(prev =>
      prev.map(filter => {
        if (filter.name !== name) return filter;
        return { ...filter, selected: false, value: getInitialValue(name) };
      })
    );
  }

  function get(name) {
    return filters.find(({ name: currName }) => currName === name);
  }

  // eslint-disable-next-line no-shadow
  function setValue(name, value) {
    setFilters(prev =>
      prev.map(filter => {
        if (filter.name !== name) return filter;
        return { ...filter, value };
      })
    );
  }

  const value = {
    filters,
    totalSelected,
    get,
    reset,
    resetAll,
    select,
    setValue,
  };

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
}

FiltersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
