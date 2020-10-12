import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  table: {
    position: 'relative',
    minHeight: 400,
    '&__backdrop': {
      position: 'absolute',
      top: theme.spacing(7),
      zIndex: 1,
      alignItems: 'initial',
      paddingTop: theme.spacing(5),
      backgroundColor: 'rgb(255 255 255 / 50%)',
    },
  },

  row: {
    '&__quotation': {
      cursor: 'pointer',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    '&__ellipsis': {
      maxWidth: 200,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      color: 'inherit',
    },
    '&__noStretch': {
      width: '1%',
      whiteSpace: 'nowrap',
    },
    '&__disabled': {
      opacity: 0.5,
      pointerEvents: 'none',
    },
  },
}));
