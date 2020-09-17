import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';

import { useFilterDispatch, actions } from '../../Context';

export function Collapsible({ title, item, children }) {
  const dispatch = useFilterDispatch();
  const { id, isSelected } = item;

  useEffect(() => {
    if (!isSelected) {
      dispatch({ type: actions.RESET, payload: { id } });
    }
  }, [dispatch, id, isSelected]);

  function onClick() {
    dispatch({ type: actions.TOGGLE_SELECT, payload: { id } });
  }

  return (
    <>
      <ListItem button onClick={onClick} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={isSelected}
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>

        <ListItemText primary={title} />
        {isSelected ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={isSelected} unmountOnExit>
        <Box paddingX={2} paddingY={1}>
          {children}
        </Box>
      </Collapse>
    </>
  );
}

Collapsible.propTypes = {
  title: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};
