import React, { useState, useEffect } from 'react';
import PropTypes, { func } from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import FilterListIcon from '@material-ui/icons/FilterList';
import Popover from '@material-ui/core/Popover';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';

import { fetchQuoteStatuses } from './api-calls';
import * as options from './options';

const useStyles = makeStyles(theme => {
  const { spacing } = theme;

  return {
    collapseInner: {
      padding: `${spacing(1)}px ${spacing(2)}px`,
    },
    list: {
      width: 300,
    },
    buttonWrapper: {
      padding: `0px ${spacing(1)}px ${spacing(2)}px ${spacing(1)}px`,
      display: 'flex',
      justifyContent: 'flex-end',
    },
    clearButton: {
      marginRight: spacing(1),
    },
  };
});

function CollapsibleListItem(props) {
  const { title, children, onChangeCheckbox } = props;
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  function handleClick() {
    setOpen(prev => !prev);
    onChangeCheckbox(!open);
  }

  return (
    <React.Fragment>
      <ListItem button onClick={handleClick} dense>
        <ListItemIcon>
          <Checkbox edge="start" checked={open} tabIndex={-1} disableRipple />
        </ListItemIcon>

        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <div className={classes.collapseInner}>{children}</div>
      </Collapse>
    </React.Fragment>
  );
}

CollapsibleListItem.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onChangeCheckbox: PropTypes.func.isRequired,
};

const StyledBadge = withStyles(theme => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

function FilterButton({ onClick, filtersCount }) {
  return (
    <Tooltip title="Filter Quotes">
      <IconButton aria-label="filter quotes" onClick={onClick}>
        <StyledBadge
          badgeContent={filtersCount === 0 ? null : filtersCount}
          color="secondary"
        >
          <FilterListIcon />
        </StyledBadge>
      </IconButton>
    </Tooltip>
  );
}

FilterButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  filtersCount: PropTypes.number.isRequired,
};

function StatusesListItem({ onChange, onChangeCheckbox }) {
  const { statuses } = options;
  const [value, setValue] = useState(statuses[0].value);

  function _onChangeCheckbox(isOpen) {
    onChange({ name: 'status', value: isOpen ? value : null });
    onChangeCheckbox(isOpen);

    if (!isOpen) {
      setValue(statuses[0].value);
    }
  }

  function _onChange({ target }) {
    const { value: newValue } = target;
    setValue(newValue);
    onChange({ name: 'status', value: newValue });
  }

  return (
    <CollapsibleListItem title="Status" onChangeCheckbox={_onChangeCheckbox}>
      <FormControl margin="dense" fullWidth>
        <Select autoFocus value={value} onChange={_onChange}>
          {statuses.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </CollapsibleListItem>
  );
}

StatusesListItem.propTypes = {
  onChange: PropTypes.func.isRequired,
  onChangeCheckbox: PropTypes.func.isRequired,
};

function TotalLikesItem({ onChange, onChangeCheckbox }) {
  const { likes } = options;
  const [count, setCount] = useState(0);
  const [operator, setoperator] = useState(likes[0].value);

  function _onChangeCheckbox(isOpen) {
    const value = `${operator}${count}`;
    onChange({ name: 'likes', value: isOpen ? value : null });
    onChangeCheckbox(isOpen);

    if (!isOpen) {
      setCount(0);
      setoperator(likes[0].value);
    }
  }

  function onChangeSelect({ target }) {
    const { value: newValue } = target;
    setoperator(newValue);
    onChange({ name: 'likes', value: `${newValue}${count}` });
  }

  function onChangeNumber({ target }) {
    const { value: newValue } = target;
    setCount(newValue);
    onChange({ name: 'likes', value: `${operator}${newValue}` });
  }

  return (
    <CollapsibleListItem
      title="Total Likes"
      onChangeCheckbox={_onChangeCheckbox}
    >
      <FormControl margin="dense" fullWidth>
        <Select autoFocus value={operator} onChange={onChangeSelect}>
          {likes.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl margin="dense" fullWidth>
        <TextField
          type="number"
          defaultValue={count}
          onChange={onChangeNumber}
        />
      </FormControl>
    </CollapsibleListItem>
  );
}

TotalLikesItem.propTypes = {
  onChange: PropTypes.func.isRequired,
  onChangeCheckbox: PropTypes.func.isRequired,
};

function SubmittedByItem({ onChange, onChangeCheckbox }) {
  const [value, setValue] = useState('');
  const [typingTimeout, setTypingTimeout] = useState(0);

  function _onChangeCheckbox(isOpen) {
    const _value = value.trim() === '' ? null : value;
    onChange({ name: 'submittedBy', value: isOpen ? _value : null });
    onChangeCheckbox(isOpen);

    if (!isOpen) {
      setValue('');
    }
  }

  function _onChange({ target }) {
    const { value: newValue } = target;

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setValue(newValue);
    setTypingTimeout(
      setTimeout(() => {
        onChange({ name: 'submittedBy', value: newValue });
      }, 1000)
    );
  }

  return (
    <CollapsibleListItem
      title="Submitted By"
      onChangeCheckbox={_onChangeCheckbox}
    >
      <FormControl margin="dense" fullWidth>
        <TextField autoFocus value={value} onChange={_onChange} />
      </FormControl>
    </CollapsibleListItem>
  );
}

SubmittedByItem.propTypes = {
  onChange: PropTypes.func.isRequired,
  onChangeCheckbox: PropTypes.func.isRequired,
};

export function TableFilter() {
  const items = [StatusesListItem, TotalLikesItem, SubmittedByItem];
  const [filter, setFilter] = useState({
    status: null,
    likes: null,
    submittedBy: null,
  });

  const [filtersCount, setfiltersCount] = useState(0);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function onChangeCheckbox(isSelected) {
    setfiltersCount(prev => (isSelected ? prev + 1 : prev - 1));
  }

  function onClickSubmit() {
    console.log(filter);
  }

  function onChangeFilter({ name, value }) {
    console.log(name, value);
    setFilter({ ...filter, [name]: value });
  }

  function onClickReset() {}

  return (
    <React.Fragment>
      <FilterButton onClick={handleClick} filtersCount={filtersCount} />

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
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
          className={classes.list}
          aria-labelledby="filters"
          subheader={
            <ListSubheader component="div" id="filters">
              Filters
            </ListSubheader>
          }
        >
          {items.map((Item, index) => (
            <Item
              key={index}
              onChange={onChangeFilter}
              onChangeCheckbox={onChangeCheckbox}
            />
          ))}
        </List>

        <div className={classes.buttonWrapper}>
          <Button
            size="small"
            variant="contained"
            className={classes.clearButton}
            onClick={onClickReset}
          >
            Clear
          </Button>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={onClickSubmit}
          >
            Done
          </Button>
        </div>
      </Popover>
    </React.Fragment>
  );
}
