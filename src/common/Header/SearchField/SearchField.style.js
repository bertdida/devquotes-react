import { fade, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  },
  colorInherit: {
    color: 'inherit',
  },
  button: {
    padding: theme.spacing(1),
  },
  resultsWrapper: {
    position: 'absolute',
    top: `calc(100% + ${theme.spacing(1)}px)`,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    color: theme.palette.text.primary,
  },
  quotation: {
    width: '100%',
    display: 'table',
    tableLayout: 'fixed',
  },
}));
