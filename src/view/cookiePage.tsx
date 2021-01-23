import React from 'react';
import MyDrawer from '../components/myDrawer';
import { CookieMapper } from '../database/mapper/cookieMapper';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import CookieCard from '../components/cookie/cookieCard';
import { Cookie } from '../util/http/cookie';
import CookieForm from '../components/cookie/cookieForm';
import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';

const useStyle = makeStyles((theme) =>
  createStyles({
    main: {
      overflow: 'auto',
      position: 'relative',
      padding: theme.spacing(3),
    },
    fab: {
      position: 'absolute',
      right: theme.spacing(2),
      bottom: theme.spacing(2),
      zIndex: theme.zIndex.modal - 1,
    },
  }),
);

export default function CookiePage(): JSX.Element {
  const style = useStyle();
  const [domains, setDomains] = React.useState<string[]>([]);
  const [activeCookie, setActiveCookie] = React.useState<Cookie | null>(null);
  const update = React.useCallback(() => {
    CookieMapper.getDomainList().then((value) => {
      setDomains(value);
    });
  }, []);
  React.useEffect(() => {
    update();
  }, [update]);
  return (
    <MyDrawer className={style.main}>
      {domains.map((value) => (
        <CookieCard domain={value} key={value} onUpdate={update} />
      ))}
      <CookieForm
        activeCookie={activeCookie}
        onChangeCookie={(newCookie) => {
          setActiveCookie(newCookie);
        }}
        onSaveCookie={() => {
          update();
          setActiveCookie(null);
        }}
      />
      <Fab
        className={style.fab}
        onClick={() => {
          setActiveCookie(new Cookie('', '', '', '/', Date.now(), null, null));
        }}
        color={'primary'}
      >
        <Add />
      </Fab>
    </MyDrawer>
  );
}
