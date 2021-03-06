import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  form: {
    display: 'none',
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    '&--isShown': {
      display: 'block',
    },
    '&__inputRoot': {
      color: 'inherit',
    },
    '&__input': {
      paddingRight: '40px !important',
    },
    '&__backIcon': {
      display: 'block',
    },
    '&__searchIcon': {
      display: 'none',
    },
    '&__clearIcon': {
      position: 'absolute',
      right: 0,
      width: 40,
      borderRadius: 0,
      backgroundColor: 'transparent',
    },
  },

  button: {
    color: 'inherit',
    padding: theme.spacing(1),
    '&--disableHoverEffect': {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  },

  results: {
    position: 'absolute',
    top: `calc(100% + ${theme.spacing(1)}px)`,
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'inherit',
    boxShadow: theme.shadows[1],
    color: theme.palette.text.primary,
    '&__quotation': {
      width: '100%',
      display: 'table',
      tableLayout: 'fixed',
    },
  },

  [theme.breakpoints.up('md')]: {
    searchIcon: {
      display: 'none',
    },
    form: {
      display: 'block',
      position: 'relative',
      width: 'initial',
      maxWidth: 250,
      '&__backIcon': {
        display: 'none',
      },
      '&__searchIcon': {
        display: 'block',
      },
    },
    button: {
      padding: 6,
    },
    results: {
      right: 0,
      minWidth: 500,
    },
  },
}));
