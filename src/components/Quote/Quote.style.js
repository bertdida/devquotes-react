import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => {
  const isDarkTheme = theme.palette.type === 'dark';

  return {
    quote: {
      padding: theme.spacing(2),
      margin: theme.spacing(2, 0),
      '&:hover': {
        boxShadow: theme.shadows[8],
      },
      '&__inner': {
        display: 'flex',
        flexDirection: 'column-reverse',
        marginBottom: theme.spacing(2),
      },
      '&__author': {
        fontStyle: 'normal',
        marginBottom: theme.spacing(2),
      },
      '&__like': {
        marginRight: 'auto',
        borderRadius: 25,
      },
      '&__twitter': {
        color: isDarkTheme ? '#fff' : '#1da1f2',
      },
      '&__facebook': {
        color: isDarkTheme ? '#fff' : '#298aff',
      },
    },

    [theme.breakpoints.up('sm')]: {
      quote: {
        padding: theme.spacing(3),
        margin: theme.spacing(3, 0),
      },
    },
  };
});
