import React from 'react';
import { createStyles, Paper } from '@material-ui/core';
import { ResponseContext } from '../response';
import { useReqBodyStyle } from '../../request/reqBody/reqBody';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../../../assets/fail.svg';

const useStyle = makeStyles(() =>
  createStyles({
    imageFather: {
      overflow: 'auto',
    },
    image: {
      width: '100%',
    },
  }),
);
export default function ResImage(): JSX.Element {
  const {
    response: { buffer },
  } = React.useContext(ResponseContext);
  const bodyStyle = useReqBodyStyle();
  const style = useStyle();
  const [url, setUrl] = React.useState<string>(logo);
  React.useEffect(() => {
    setUrl(URL.createObjectURL(new Blob([buffer.buffer])));
  }, [buffer]);
  return (
    <Paper className={`${bodyStyle.tabPanel} ${style.imageFather}`}>
      <img className={style.image} src={url} alt="图片" />
    </Paper>
  );
}
