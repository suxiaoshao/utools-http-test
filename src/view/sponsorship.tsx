import React from 'react';
import MyDrawer from '../components/myDrawer';
import alipay from '../assets/alipay.jpg';
import wepay from '../assets/wepay.jpg';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import Alipay from '../components/common/icon/alipay';
import WePay from '../components/common/icon/wepay';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(() =>
  createStyles({
    main: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    img: {
      maxWidth: '50%',
      maxHeight: '80%',
    },
  }),
);

export default function Sponsorship(): JSX.Element {
  const [imgSrc, setImgSrc] = React.useState<string>(alipay);
  const style = useStyle();
  return (
    <MyDrawer className={style.main}>
      <img src={imgSrc} className={style.img} />
      <ToggleButtonGroup
        exclusive
        value={imgSrc}
        onChange={(event, value) => {
          if (value !== null) {
            setImgSrc(value);
          }
        }}
      >
        <ToggleButton value={alipay}>
          <Alipay />
        </ToggleButton>
        <ToggleButton value={wepay}>
          <WePay />
        </ToggleButton>
      </ToggleButtonGroup>
    </MyDrawer>
  );
}
