import React from 'react';
import PropTypes from 'prop-types';
import { default as MuiPopover } from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import { default as MuiButton } from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';

import { Status, TotalLikes, SubmittedBy } from './Items';
import { useFilterDispatch, useFilterState, actions } from '../Context';

function Button({ children, ...rest }) {
  return (
    <MuiButton size="small" variant="contained" {...rest}>
      {children}
    </MuiButton>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export function Popover({ open, onClose, anchorEl }) {
  const history = useHistory();
  const state = useFilterState();
  const dispatch = useFilterDispatch();

  function onClickSubmit() {
    dispatch({ type: actions.VALIDATE, payload: { onSuccess: submit } });
  }

  function submit() {
    const queries = state.reduce((carry, filter) => {
      if (!filter.isSelected) return carry;
      return [...carry, queryString.stringify({ [filter.name]: filter.value })];
    }, []);

    if (queries) {
      history.push({ search: queries.join('&') });
    }

    onClose();
  }

  function onClickReset() {
    const selected = state.filter(({ isSelected }) => isSelected);

    if (selected.length > 0) {
      dispatch({ type: actions.RESET_ALL });
      history.push({ search: null });
    }

    onClose();
  }

  return (
    <MuiPopover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      keepMounted
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <List
        style={{ width: 300 }}
        aria-labelledby="filters"
        subheader={
          <ListSubheader component="div" id="filters">
            Filters
          </ListSubheader>
        }
      >
        {[Status, TotalLikes, SubmittedBy].map((Item, index) => (
          <Item key={index} />
        ))}
      </List>

      <Box display="flex" justifyContent="flex-end" p={2}>
        <Box marginRight={1}>
          <Button onClick={onClickReset}>Clear</Button>
        </Box>

        <Button color="primary" onClick={onClickSubmit}>
          Done
        </Button>
      </Box>
    </MuiPopover>
  );
}

Popover.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.instanceOf(Element),
};