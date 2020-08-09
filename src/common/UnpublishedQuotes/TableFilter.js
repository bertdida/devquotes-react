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

function FilterButton({ onClick, disabled, filtersCount }) {
  const Div = ({ children }) => <div>{children}</div>;
  const Wrapper = disabled ? Div : Tooltip;

  Div.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <Wrapper title="Filter Quotes">
      <IconButton
        aria-label="filter quotes"
        onClick={onClick}
        disabled={disabled}
      >
        <StyledBadge
          badgeContent={filtersCount === 0 ? null : filtersCount}
          color="secondary"
        >
          <FilterListIcon />
        </StyledBadge>
      </IconButton>
    </Wrapper>
  );
}

FilterButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  filtersCount: PropTypes.number.isRequired,
};

export function TableFilter() {
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState({
    statuses: [],
    totalLikes: ['Is greater than', 'Is equal to', 'Is less than'],
  });

  const [status, setStatus] = useState();
  const [totalLikes, setTotalLikes] = useState(options.totalLikes[0]);
  const [filtersCount, setfiltersCount] = useState(0);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  useEffect(() => {
    setIsLoading(true);

    fetchQuoteStatuses().then(({ data }) => {
      const { data: statuses } = data;
      setIsLoading(false);
      setStatus(statuses[0].data.id);
      setOptions(prev => ({ ...prev, statuses }));
    });
  }, []);

  function handleClick(event) {
    if (!isLoading) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function onChangeStatus(event) {
    setStatus(event.target.value);
  }

  function onChangeTotalLikes(event) {
    setTotalLikes(event.target.value);
  }

  function onChangeCheckbox(isSelected) {
    setfiltersCount(prev => (isSelected ? prev + 1 : prev - 1));
  }

  return (
    <React.Fragment>
      <FilterButton
        onClick={handleClick}
        disabled={isLoading}
        filtersCount={filtersCount}
      />

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
          <CollapsibleListItem
            title="Status"
            onChangeCheckbox={onChangeCheckbox}
          >
            <FormControl margin="dense" fullWidth>
              <Select autoFocus value={status} onChange={onChangeStatus}>
                {options.statuses.map(({ data: option }) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.display_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CollapsibleListItem>

          <CollapsibleListItem
            title="Total Likes"
            onChangeCheckbox={onChangeCheckbox}
          >
            <FormControl margin="dense" fullWidth>
              <Select
                autoFocus
                value={totalLikes}
                onChange={onChangeTotalLikes}
              >
                {options.totalLikes.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl margin="dense" fullWidth>
              <TextField defaultValue={0} type="number" />
            </FormControl>
          </CollapsibleListItem>

          <CollapsibleListItem
            title="Submitted By"
            onChangeCheckbox={onChangeCheckbox}
          >
            <FormControl margin="dense" fullWidth>
              <TextField autoFocus />
            </FormControl>
          </CollapsibleListItem>
        </List>

        <div className={classes.buttonWrapper}>
          <Button
            size="small"
            variant="contained"
            className={classes.clearButton}
          >
            Clear
          </Button>
          <Button size="small" variant="contained" color="primary">
            Done
          </Button>
        </div>
      </Popover>
    </React.Fragment>
  );
}