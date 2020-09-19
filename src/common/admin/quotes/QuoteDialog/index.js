import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Link from '@material-ui/core/Link';
import LaunchIcon from '@material-ui/icons/Launch';

import { Title } from './Title';

const useStyles = makeStyles({
  buttonDanger: {
    color: red['500'],
  },
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export function QuoteDialog({ show, onHide, quote }) {
  const classes = useStyles();

  const handleClose = () => {
    onHide();
  };

  let sourceHostname = null;
  if (quote.source) {
    sourceHostname = new URL(quote.source).hostname;
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={show}
      fullWidth
    >
      <Title onClose={handleClose} quote={quote} />

      <DialogContent dividers>
        <Typography gutterBottom>{quote.quotation}</Typography>

        <br />

        {sourceHostname && (
          <Link
            color="initial"
            target="_blank"
            rel="noreferrer"
            href={quote.source}
          >
            {sourceHostname} <LaunchIcon fontSize="inherit" />
          </Link>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Publish Quote</Button>
        <Button onClick={handleClose} className={classes.buttonDanger}>
          Mark as spam
        </Button>
      </DialogActions>
    </Dialog>
  );
}

QuoteDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  quote: PropTypes.object.isRequired,
};
