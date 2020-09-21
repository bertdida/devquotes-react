import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { useStyles } from './SearchField.style';

function ResultItem({ result }) {
  const classes = useStyles();

  return (
    <ListItem key={result.id} button>
      <Box display="flex" flexDirection="column">
        <small>{result.author}</small>
        <ListItemText
          className={classes.quotation}
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
};

export function Results({ results }) {
  const classes = useStyles();

  if (results === null) {
    return null;
  }

  if (results.length === 0) {
    return (
      <List className={classes.resultsWrapper}>
        <ListItem button disableRipple>
          No matching results.
        </ListItem>
      </List>
    );
  }

  return (
    <List className={classes.resultsWrapper}>
      {results.map(result => (
        <ResultItem key={result.id} result={result} />
      ))}
    </List>
  );
}

Results.propTypes = {
  results: PropTypes.array,
};
