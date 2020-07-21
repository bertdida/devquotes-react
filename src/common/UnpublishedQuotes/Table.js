import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { makeStyles } from '@material-ui/core/styles';
import { default as MuiTable } from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import PublishIcon from '@material-ui/icons/Publish';
import Tooltip from '@material-ui/core/Tooltip';
import Link from '@material-ui/core/Link';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';

import { QuoteDialog } from './QuoteDialog';

const useStyles = makeStyles({
  quotation: {
    maxWidth: 200,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    color: 'inherit',
  },
});

const headCells = [
  { id: 'quotation', label: 'Quotation' },
  { id: 'author', label: 'Author' },
  { id: 'actions', label: 'Actions' },
];

export function Table(props) {
  const { location, history, fetchQuotes } = props;
  const classes = useStyles();
  const [quotes, setQuotes] = useState([]);
  const { page: initialPage } = queryString.parse(location.search);
  const [page, setPage] = useState(initialPage);
  const [pagination, setPagination] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQuotes, setSelectedQuotes] = useState([]);

  const [quoteToShow, setQuoteToShow] = useState(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function show(event) {
    setAnchorEl(event.currentTarget);
  }

  function hideMenu() {
    setAnchorEl(null);
  }

  useEffect(() => {
    fetchQuotes(page || 1)
      .then(response => {
        const { data, ...rest } = response.data;
        setPagination(rest);
        setIsLoading(false);
        setQuotes(data.map(quote => quote.data));
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          return history.push('/404');
        }
      });
  }, [fetchQuotes, history, page]);

  const onClickQuotation = quote => () => {
    setQuoteToShow(quote);
    setShowQuoteModal(true);
  };

  return (
    <React.Fragment>
      <Paper>
        <Toolbar>
          <Typography variant="h6" component="div">
            Unpublished Quotes
          </Typography>
        </Toolbar>
        <TableContainer>
          <MuiTable>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    inputProps={{ 'aria-label': 'select all quotes' }}
                  />
                </TableCell>
                {headCells.map(headCell => (
                  <TableCell key={headCell.id}>{headCell.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {quotes.map(quote => (
                <TableRow hover role="checkbox" tabIndex={-1} key={quote.id}>
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <Link
                      color="initial"
                      component="button"
                      className={classes.quotation}
                      onClick={onClickQuotation(quote)}
                    >
                      {quote.quotation}
                    </Link>
                  </TableCell>
                  <TableCell>{quote.author}</TableCell>
                  <TableCell>
                    <Tooltip title="Publish Quote">
                      <IconButton aria-label="publish quote">
                        <PublishIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Mark as spam">
                      <IconButton aria-label="mark as spam">
                        <NotInterestedIcon />
                      </IconButton>
                    </Tooltip>

                    <IconButton
                      color="inherit"
                      onClick={show}
                      aria-label="open more options"
                    >
                      <MoreIcon />
                    </IconButton>

                    <Menu
                      open={open}
                      anchorEl={anchorEl}
                      onClose={hideMenu}
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
                      <MenuItem aria-label="delete quote">
                        Delete Quote
                      </MenuItem>

                      <MenuItem aria-label="mark user as spammer">
                        Mark user as spammer
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </MuiTable>
        </TableContainer>

        {!isLoading && (
          <TablePagination
            component="div"
            onChangePage={setPage}
            rowsPerPageOptions={[10, 25, 30]}
            count={pagination.total}
            page={pagination.curr_page - 1}
            rowsPerPage={pagination.per_page}
          />
        )}
      </Paper>

      <QuoteDialog
        quote={quoteToShow || {}}
        show={showQuoteModal}
        onHide={() => setShowQuoteModal(false)}
        onExited={() => setQuoteToShow(null)}
      />
    </React.Fragment>
  );
}

Table.propTypes = {
  fetchQuotes: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
