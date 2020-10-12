import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  titleSkeleton: {
    padding: 0,
    '&__title': {
      width: '35%',
    },
    '&__subheader': {
      width: '25%',
    },
  },

  title: {
    margin: 0,
    padding: theme.spacing(2),
    position: 'relative',
    '&__closeButton': {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      right: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    '&__cardHeader': {
      padding: 0,
    },
  },
}));
