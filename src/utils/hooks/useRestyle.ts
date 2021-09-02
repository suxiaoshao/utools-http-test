import { createStyles, makeStyles } from '@material-ui/core/styles';

/**
 * request 和 response 的共同样式
 * */
export const useReStyle = makeStyles((theme) =>
  createStyles({
    main: {
      flex: '1 1 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxHeight: 'calc(100% - 49px)',
      position: 'relative',
    },
    toggleButton: {
      textTransform: 'none',
    },
    toggle: {
      flex: '0 0 auto',
      display: 'flex',
      width: '100%',
      justifyContent: 'space-around',
    },
    page: {
      flex: '1 1 0',
      width: '100%',
      height: 'calc(100% - 35px)',
    },
    table: {
      maxHeight: '100%',
      width: '100%',
    },
    tableContainer: {
      margin: theme.spacing(1),
      height: `calc(100% - ${theme.spacing(1) * 2}px)`,
      width: `calc(100% - ${theme.spacing(1) * 2}px) !important`,
    },
    tableInput: {
      width: '100%',
    },
    tableInputDelete: {
      textDecoration: 'line-through',
    },
  }),
);
