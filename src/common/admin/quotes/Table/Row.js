import React, { useState } from 'react';
import Proptypes from 'prop-types';
import clsx from 'clsx';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { DeleteDialog } from 'common/Quote/DeleteDialog';

const useStyles = makeStyles({
  ellipsis: {
    maxWidth: 200,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    color: 'inherit',
  },
  noStretch: {
    width: '1%',
    whiteSpace: 'nowrap',
  },
  disabled: {
    opacity: 0.5,
    pointerEvents: 'none',
  },
});

function MoreOptions({ quote, publishQuote, flagAsSpam }) {
  const [anchorEl, setAnchorEl] = useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  async function _publishQuote() {
    await publishQuote(quote);
  }

  async function _flagAsSpam() {
    await flagAsSpam(quote);
  }

  return (
    <>
      <Tooltip title="More options">
        <IconButton aria-label="more options" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={_publishQuote}>Publish Quote</MenuItem>
        <MenuItem onClick={_flagAsSpam}>Flag as spam</MenuItem>
      </Menu>
    </>
  );
}

MoreOptions.propTypes = {
  quote: Proptypes.object.isRequired,
  publishQuote: Proptypes.func.isRequired,
  flagAsSpam: Proptypes.func.isRequired,
};

export function Row({ quote, toggleSelect, deleteQuote, ...rest }) {
  const { quotation, author, status, isSelected, isDeleted } = quote;
  const isPublished = status === 'published';

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const classes = useStyles();

  function confirmDelete() {
    setIsDeleteDialogOpen(true);
  }

  async function onConfirmDelete() {
    await deleteQuote(quote);
    setIsDeleteDialogOpen(false);
  }

  function onCloseDeleteDialog() {
    setIsDeleteDialogOpen(false);
  }

  function onChange() {
    toggleSelect(quote);
  }

  return (
    <>
      <TableRow className={clsx({ [classes.disabled]: isDeleted })}>
        <TableCell padding="checkbox">
          <Checkbox checked={isSelected === true} onChange={onChange} />
        </TableCell>
        <TableCell className={classes.ellipsis}>{quotation}</TableCell>
        <TableCell className={classes.noStretch}>{author}</TableCell>
        <TableCell className={classes.noStretch}>
          <Tooltip title="Delete Quote">
            <IconButton aria-label="delete quote" onClick={confirmDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Quote">
            <IconButton
              aria-label="edit quote"
              component={Link}
              to={`/quotes/${quote.id}/edit`}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          {!isPublished && <MoreOptions quote={quote} {...rest} />}
        </TableCell>
      </TableRow>

      <DeleteDialog
        open={isDeleteDialogOpen}
        onClose={onCloseDeleteDialog}
        erase={onConfirmDelete}
      />
    </>
  );
}

Row.propTypes = {
  quote: Proptypes.object.isRequired,
  toggleSelect: Proptypes.func.isRequired,
  deleteQuote: Proptypes.func.isRequired,
};
