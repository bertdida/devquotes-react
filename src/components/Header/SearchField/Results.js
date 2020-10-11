import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory } from 'react-router-dom';

import { useStyles } from './SearchField.style';

function ResultItem({ result, onClick }) {
  const classes = useStyles();

  function _onClick() {
    onClick(result);
  }

  return (
    <ListItem key={result.id} button onClick={_onClick}>
      <Box display="flex" flexDirection="column">
        <small>{result.author}</small>
        <ListItemText
          className={`${classes.results}__quotation`}
          primaryTypographyProps={{
            noWrap: true,
          }}
        >
          {result.quotation}
        </ListItemText>
      </Box>
    </ListItem>
  );
}

ResultItem.propTypes = {
  result: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export function Results({ results, onHide }) {
  const classes = useStyles();
  const history = useHistory();

  function onClick(result) {
    onHide();
    history.push(`/quotes/${result.id}/${result.slug}`);
  }

  if (results === null) {
    return null;
  }

  if (results.length === 0) {
    return (
      <List className={classes.results}>
        <ListItem button disableRipple>
          No matching results.
        </ListItem>
      </List>
    );
  }

  return (
    <List className={classes.results}>
      {results.map(result => (
        <ResultItem key={result.id} result={result} onClick={onClick} />
      ))}
    </List>
  );
}

Results.propTypes = {
  results: PropTypes.array,
  onHide: PropTypes.func.isRequired,
};