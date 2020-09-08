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
import { default as MuiTableRow } from '@material-ui/core/TableRow';
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
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import { red } from '@material-ui/core/colors';

import { useSnackbar, Snackbar } from 'common/hooks/useSnackbar';
import { DeleteDialog } from 'common/Quote/DeleteDialog';
import { deleteQuote } from 'common/Quote/api-calls';
import { QuoteDialog } from './QuoteDialog';
import { updateQuote, fetchQuotes } from './api-calls';
import { TableFilter } from './TableFilter';

const useStyles = makeStyles(theme => ({
  tableContainer: {
    position: 'relative',
    minHeight: 400,
  },
  backdrop: {
    position: 'absolute',
    top: theme.spacing(7),
    zIndex: 1,
    alignItems: 'initial',
    paddingTop: theme.spacing(5),
    backgroundColor: 'rgb(255 255 255 / 50%)',
  },
  ellipsis: {
    maxWidth: 200,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    color: 'inherit',
  },
  textDanger: {
    color: red['500'],
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const headCells = [
  { id: 'quotation', label: 'Quotation' },
  { id: 'author', label: 'Author' },
  { id: 'actions', label: 'Actions' },
];

function TableRow(props) {
  const { quote, isSelected, handleSelect, onClickQuotation } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const classes = useStyles();
  const isRowSelected = isSelected(quote);
  const isPublished = quote.status === 'published';

  const [isDeleted, setIsDeleted] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  function show(event) {
    setAnchorEl(event.currentTarget);
  }

  function hideMenu() {
    setAnchorEl(null);
  }

  async function _publishQuote() {
    if (!isPublished) {
      props.publishQuote(quote);
    }
  }

  function confirmDelete() {
    setOpenDeleteDialog(true);
    hideMenu();
  }

  async function erase() {
    await props.eraseQuote(quote);

    setIsDeleted(true);
    setOpenDeleteDialog(false);
  }

  const isPublishedLabel = isPublished ? 'Quote is published' : 'Publish Quote';

  return (
    <React.Fragment>
      <MuiTableRow hover role="checkbox" tabIndex={-1} selected={isRowSelected}>
        <TableCell padding="checkbox">
          <Checkbox onChange={handleSelect(quote)} checked={isRowSelected} />
        </TableCell>
        <TableCell>
          <Tooltip title={quote.quotation}>
            <Link
              color="initial"
              component="button"
              className={classes.ellipsis}
              onClick={onClickQuotation(quote)}
            >
              {quote.quotation}
            </Link>
          </Tooltip>
        </TableCell>
        <TableCell className={classes.ellipsis}>{quote.author}</TableCell>

        {isDeleted ? (
          <TableCell>
            <div className={classes.textDanger}>
              <p>Deleted</p>
            </div>
          </TableCell>
        ) : (
          <TableCell>
            <Tooltip title={isPublishedLabel}>
              <IconButton aria-label={isPublishedLabel} onClick={_publishQuote}>
                {isPublished ? <DoneIcon /> : <PublishIcon />}
              </IconButton>
            </Tooltip>

            {isPublished ? (
              <Tooltip title="Delete Quote">
                <IconButton aria-label="delete quote" onClick={confirmDelete}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Mark as spam">
                <IconButton aria-label="mark as spam">
                  <NotInterestedIcon />
                </IconButton>
              </Tooltip>
            )}

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
              {!isPublished && (
                <MenuItem aria-label="delete quote" onClick={confirmDelete}>
                  Delete Quote
                </MenuItem>
              )}

              <MenuItem aria-label="mark user as spammer">
                Mark user as spammer
              </MenuItem>
            </Menu>
          </TableCell>
        )}
      </MuiTableRow>

      <DeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        erase={erase}
      />
    </React.Fragment>
  );
}

TableRow.propTypes = {
  quote: PropTypes.object.isRequired,
  isSelected: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  onClickQuotation: PropTypes.func.isRequired,
  publishQuote: PropTypes.func.isRequired,
  eraseQuote: PropTypes.func.isRequired,
};

export function Table(props) {
  const { location, history } = props;
  const classes = useStyles();
  const [quotes, setQuotes] = useState([]);
  const { page: initialPage } = queryString.parse(location.search);
  const [page, setPage] = useState(initialPage);
  const [pagination, setPagination] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQuotes, setSelectedQuotes] = useState([]);

  const [quoteToShow, setQuoteToShow] = useState(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [filters, setFilters] = useState(null);
  const snackbar1 = useSnackbar(false);
  const snackbar2 = useSnackbar(false);

  useEffect(() => {
    setIsLoading(true);
    setSelectedQuotes([]);

    fetchQuotes({ page: page || 1, filters })
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filters]);

  useEffect(() => {
    let isMounted = true;
    history.listen(_location => {
      const query = queryString.parse(_location.search);
      if (isMounted) {
        setPage(query.page);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [history]);

  const onClickQuotation = quote => () => {
    setQuoteToShow(quote);
    setShowQuoteModal(true);
  };

  function isSelected(quote) {
    return selectedQuotes.some(({ id }) => id === quote.id);
  }

  const handleSelect = quote => () => {
    if (!isSelected(quote)) {
      setSelectedQuotes(prevSelected => [...prevSelected, quote]);
      return;
    }

    setSelectedQuotes(prevSelected =>
      prevSelected.filter(({ id }) => id !== quote.id)
    );
  };

  function handleSelectAllClick(event) {
    setSelectedQuotes(event.target.checked ? quotes : []);
  }

  function handleChangePage(event, newPage) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    history.push({
      pathname: '/manage-quotes',
      search: newPage === 0 ? null : `?page=${newPage + 1}`,
    });
  }

  async function publishQuote(quote) {
    if (quote.status === 'published') {
      return;
    }

    const newQuote = { ...quote, status: 'published' };
    await updateQuote(newQuote);
    setQuotes(prevQuotes =>
      prevQuotes.map(currQuote => {
        if (currQuote.id !== quote.id) {
          return currQuote;
        }

        return newQuote;
      })
    );

    snackbar1.show();
  }

  async function eraseQuote(quote) {
    await deleteQuote(quote.id);
    snackbar2.show();
  }

  function onSubmit(newFilters) {
    if (newFilters.length > 0 || filters !== null) {
      history.push({ search: null });
      setFilters(newFilters);
    }
  }

  function deleteMultiple() {
    const ids = selectedQuotes.map(({ id }) => id);
    console.log(ids);
  }

  const numSelected = selectedQuotes.length;
  const numQuotes = quotes.length;

  return (
    <React.Fragment>
      <Paper>
        <Toolbar className={classes.toolbar}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subtitle1" component="div">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography variant="h6" component="div">
              Manage Quotes
            </Typography>
          )}

          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton aria-label="delete" onClick={deleteMultiple}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <TableFilter onSubmit={onSubmit} onReset={() => setFilters(null)} />
          )}
        </Toolbar>
        <TableContainer className={classes.tableContainer}>
          <Backdrop open={isLoading} className={classes.backdrop}>
            <CircularProgress color="inherit" />
          </Backdrop>

          <MuiTable>
            <TableHead>
              <MuiTableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={numSelected > 0 && numSelected < numQuotes}
                    checked={numQuotes > 0 && numSelected === numQuotes}
                    onChange={handleSelectAllClick}
                    inputProps={{ 'aria-label': 'select all quotes' }}
                  />
                </TableCell>
                {headCells.map(headCell => (
                  <TableCell key={headCell.id}>{headCell.label}</TableCell>
                ))}
              </MuiTableRow>
            </TableHead>

            <TableBody>
              {quotes.map(quote => (
                <TableRow
                  key={quote.id}
                  quote={quote}
                  isSelected={isSelected}
                  handleSelect={handleSelect}
                  onClickQuotation={onClickQuotation}
                  publishQuote={publishQuote}
                  eraseQuote={eraseQuote}
                />
              ))}
            </TableBody>
          </MuiTable>
        </TableContainer>

        {!isLoading && (
          <TablePagination
            component="div"
            onChangePage={handleChangePage}
            rowsPerPageOptions={[]}
            count={pagination.total}
            page={pagination.curr_page - 1} // zero based
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

      <Snackbar
        open={snackbar1.isShown}
        onClose={snackbar1.onClose}
        message="Quote published."
      />

      <Snackbar
        open={snackbar2.isShown}
        onClose={snackbar2.onClose}
        message="Quote deleted."
      />
    </React.Fragment>
  );
}

Table.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
