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

// eslint-disable-next-line import/no-cycle
import { useFilters } from '../FiltersContext';

export function CollapsibleListItem({ title, item, children }) {
  const { name, selected } = item;
  const { select, reset } = useFilters();

  useEffect(() => {
    if (!selected) reset(name);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  function onClick() {
    select(name);
  }

  return (
    <>
      <ListItem button onClick={onClick} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={selected}
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>

        <ListItemText primary={title} />
        {selected ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={selected} unmountOnExit>
        <Box paddingX={2} paddingY={1}>
          {children}
        </Box>
      </Collapse>
    </>
  );
}

CollapsibleListItem.propTypes = {
  title: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};
