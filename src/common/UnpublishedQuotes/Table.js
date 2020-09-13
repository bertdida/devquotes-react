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
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Link from '@material-ui/core/Link';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import { red } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import FlagIcon from '@material-ui/icons/Flag';

import { useSnackbar, Snackbar } from 'common/hooks/useSnackbar';
import { DeleteDialog } from 'common/Quote/DeleteDialog';
import { deleteQuote } from 'common/Quote/api-calls';
import { Link as RouterLink } from 'react-router-dom';
import { QuoteDialog } from './QuoteDialog';
import { updateQuote, fetchQuotes, deleteQuotes } from './api-calls';

import { Toolbar } from './Toolbar';

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

  const classes = useStyles();
  const isRowSelected = isSelected(quote);
  const isPublished = quote.status === 'published';

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  function confirmDelete() {
    setOpenDeleteDialog(true);
  }

  async function erase() {
    await props.eraseQuote(quote);
    setOpenDeleteDialog(false);
  }

  const isDeleted = quote.is_deleted === true;

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
            {isPublished ? (
              <Tooltip title="Delete Quote">
                <IconButton aria-label="delete quote" onClick={confirmDelete}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Flag as spam">
                <IconButton aria-label="flag as spam">
                  <FlagIcon />
                </IconButton>
              </Tooltip>
            )}

            {!isPublished && (
              <Tooltip title="Delete Quote">
                <IconButton aria-label="delete quote" onClick={confirmDelete}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}

            <Tooltip title="Edit Quote">
              <IconButton
                aria-label="edit quote"
                component={RouterLink}
                to={`/quotes/${quote.id}/edit`}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
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
  eraseQuote: PropTypes.func.isRequired,
};

export function Table(props) {
  const { location, history } = props;
  const classes = useStyles();
  const [quotes, setQuotes] = useState([]);
  const [pagination, setPagination] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQuotes, setSelectedQuotes] = useState([]);

  const [params, setParams] = useState(null);

  const [quoteToShow, setQuoteToShow] = useState(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const snackbar1 = useSnackbar(false);
  const snackbar2 = useSnackbar(false);

  useEffect(() => {
    if (params === null) {
      return;
    }

    setIsLoading(true);
    setSelectedQuotes([]);

    const { page = 1, per_page = 25 } = params;
    fetchQuotes({ ...params, page, per_page })
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
  }, [params]);

  useEffect(() => {
    const query = queryString.parse(location.search);
    setParams(query);
  }, [location.search]);

  useEffect(() => {
    let isMounted = true;
    history.listen(_location => {
      const query = queryString.parse(_location.search);
      if (isMounted) {
        setParams({ ...query });
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
    const selected = quotes.filter(({ is_deleted }) => !is_deleted);
    setSelectedQuotes(event.target.checked ? selected : []);
  }

  function handleChangePage(event, newPage) {
    const query = queryString.parse(location.search);
    const newQuery = { ...query, page: newPage === 0 ? null : newPage + 1 };
    const newQueryString = queryString.stringify(newQuery, { skipNull: true });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    history.push({
      pathname: '/manage-quotes',
      search: newQueryString,
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
    const { id } = quote;
    await deleteQuote(id);

    setSelectedQuotes([]);
    setQuotes(prev =>
      prev.map(currQuote => ({ ...currQuote, is_deleted: currQuote.id === id }))
    );
    snackbar2.show();
  }

  async function eraseAll() {
    const ids = selectedQuotes.map(({ id }) => id);
    const response = await deleteQuotes(ids);
    const successIds = response.data.reduce((carry, status) => {
      if (status.success === true) {
        return [...carry, status.id];
      }

      return carry;
    }, []);

    setSelectedQuotes([]);
    setQuotes(prev =>
      prev.map(currQuote => ({
        ...currQuote,
        is_deleted: currQuote.is_deleted || successIds.includes(currQuote.id),
      }))
    );
    snackbar2.show();
  }

  const numSelected = selectedQuotes.length;
  const numQuotes = quotes.length;

  return (
    <React.Fragment>
      <Paper>
        <Toolbar totalSelectedQuotes={numSelected} deleteSelected={eraseAll} />

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
