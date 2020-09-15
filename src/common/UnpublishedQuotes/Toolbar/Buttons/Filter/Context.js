import React, { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';

import options from './options';
import { parseLikesValue } from './utils';

export const FiltersContext = createContext();
export const useFilters = () => useContext(FiltersContext);

export function FiltersProvider({ children }) {
  const [filters, setFilters] = useState(options);
  const totalSelected = filters.filter(({ selected }) => selected).length;

  const history = useHistory();

  useEffect(() => {
    const query = queryString.parse(history.location.search);
    setFilters(prev =>
      prev.map(filter => {
        // eslint-disable-next-line no-shadow
        const value = query[filter.name];
        const hasValue = value !== undefined;

        return {
          ...filter,
          selected: hasValue,
          value: hasValue ? value : filter.value,
        };
      })
    );
  }, [history.location.search]);

  function toggleSelect(name) {
    setFilters(prev =>
      prev.map(filter => {
        if (filter.name !== name) return filter;
        return { ...filter, selected: !filter.selected };
      })
    );
  }

  function resetAll() {
    setFilters(options);
  }

  function resetByName(name) {
    setFilters(prev =>
      prev.map(filter => {
        if (filter.name !== name) return filter;
        return options.find(currOption => currOption.name === name);
      })
    );
  }

  function getByName(name) {
    return filters.find(({ name: currName }) => currName === name);
  }

  // eslint-disable-next-line no-shadow
  function setValueByName(name, value) {
    setFilters(prev =>
      prev.map(filter => {
        if (filter.name !== name) return filter;
        return { ...filter, value, errors: [] };
      })
    );
  }

  function validate() {
    let isValid = true;

    setFilters(prev =>
      prev.map(filter => {
        if (!filter.selected) return filter;

        // eslint-disable-next-line no-shadow
        const { value, name } = filter;

        if (name === 'likes') {
          // eslint-disable-next-line no-unused-vars
          const [_, total] = parseLikesValue(value);

          if (total === '') {
            isValid = false;
            return { ...filter, errors: ['Please enter a value'] };
          }
        }

        if (name === 'submitted_by' && (value.length === 0 || !value.trim())) {
          isValid = false;
          return { ...filter, errors: ['Please enter a value'] };
        }

        return filter;
      })
    );

    return isValid;
  }

  const value = {
    filters,
    totalSelected,
    get: getByName,
    reset: resetByName,
    resetAll,
    select: toggleSelect,
    setValue: setValueByName,
    validate,
  };

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
}

FiltersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
