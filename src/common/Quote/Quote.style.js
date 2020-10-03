import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  skeleton: {
    padding: theme.spacing(2),
    margin: theme.spacing(2, 0),
    minHeight: 215,
    '&__author': {
      height: theme.spacing(3),
      width: '50%',
      maxWidth: 300,
      marginBottom: theme.spacing(1),
    },
    '&__quotation': {
      height: 40,
      maxWidth: 700,
    },
    '&__button': {
      transform: 'none',
      width: 70,
      height: 35,
      borderRadius: 40,
      marginLeft: theme.spacing(1),
    },
  },

  [theme.breakpoints.up('sm')]: {
    skeleton: {
      padding: theme.spacing(3),
      margin: theme.spacing(3, 0),
      '&__button': {
        height: 40,
      },
    },
  },
}));
