import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles({
  buttonDelete: {
    color: red['500'],
  },
  buttonWrapper: {
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
    color: red['500'],
  },
});

export function DeleteDialog({ open, onClose, onOk }) {
  const classes = useStyles();
  const [isDeleting, setIsDeleting] = useState(false);

  async function erase() {
    setIsDeleting(true);
    await onOk();

    onClose();
    setIsDeleting(false);
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete Quote?</DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Deleting a quote will permanently remove it from DevQuotes.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>No, Keep Quote</Button>

        <div className={classes.buttonWrapper}>
          <Button
            className={classes.buttonDelete}
            disabled={isDeleting}
            onClick={erase}
          >
            Yes, Delete Quote
          </Button>

          {isDeleting && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </DialogActions>
    </Dialog>
  );
}

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
};
