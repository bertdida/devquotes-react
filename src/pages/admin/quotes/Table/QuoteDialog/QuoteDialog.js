import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LaunchIcon from '@material-ui/icons/Launch';
import MuiLink from '@material-ui/core/Link';
import { Link } from 'react-router-dom';

import { Title } from './Title';

export function QuoteDialog({ open, onClose, quote }) {
  let sourceHostname = null;
  if (quote.source) {
    sourceHostname = new URL(quote.source).hostname;
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <Title onClose={onClose} quote={quote} />

      <DialogContent dividers>
        <Typography gutterBottom>{quote.quotation}</Typography>

        <br />

        {sourceHostname && (
          <MuiLink color="textPrimary" target="_blank" href={quote.source}>
            {sourceHostname} <LaunchIcon fontSize="inherit" />
          </MuiLink>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button
          color="secondary"
          component={Link}
          to={`/admin/quotes/${quote.id}/edit`}
        >
          Edit Quote
        </Button>
      </DialogActions>
    </Dialog>
  );
}

QuoteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  quote: PropTypes.object.isRequired,
};
