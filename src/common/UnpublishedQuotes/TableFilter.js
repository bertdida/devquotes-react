import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
  const { title, children } = props;
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  function handleClick() {
    setOpen(prev => !prev);
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
};

const StyledBadge = withStyles(theme => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

export function TableFilter() {
  const filter = {
    statuses: ['Published', 'Unpublished', 'Pending Review', 'Spam'],
    totalLikes: ['Is greater than', 'Is equal to', 'Is less than'],
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [status, setStatus] = useState(filter.statuses[0]);
  const [totalLikes, setTotalLikes] = useState(filter.totalLikes[0]);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
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

  return (
    <React.Fragment>
      <Tooltip title="Filter Quotes">
        <IconButton aria-label="filter quotes" onClick={handleClick}>
          <StyledBadge badgeContent={3} color="secondary">
            <FilterListIcon />
          </StyledBadge>
        </IconButton>
      </Tooltip>

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
          <CollapsibleListItem title="Status">
            <FormControl margin="dense" fullWidth>
              <Select autoFocus value={status} onChange={onChangeStatus}>
                {filter.statuses.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CollapsibleListItem>

          <CollapsibleListItem title="Total Likes">
            <FormControl margin="dense" fullWidth>
              <Select
                autoFocus
                value={totalLikes}
                onChange={onChangeTotalLikes}
              >
                {filter.totalLikes.map((option, index) => (
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

          <CollapsibleListItem title="Submitted By">
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
