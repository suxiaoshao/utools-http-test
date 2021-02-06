import React from 'react';
import MyDrawer from '../components/myDrawer';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import CookieCard from '../components/cookie/cookieCard';
import { Cookie } from '../util/http/cookie';
import CookieForm from '../components/cookie/cookieForm';
import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useSqlData } from '../util/store/sqlStore';

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
  const [sqlData] = useSqlData();
  const domains = React.useMemo<string[]>(() => {
    const filterData = sqlData.cookies.map((value) => {
      return value.domain;
    });
    return [...new Set(filterData)];
  }, [sqlData.cookies]);
  const [activeCookie, setActiveCookie] = React.useState<Cookie | null>(null);
  return (
    <MyDrawer className={style.main}>
      {domains.map((value) => (
        <CookieCard domain={value} key={value} />
      ))}
      <CookieForm
        activeCookie={activeCookie}
        onChangeCookie={(newCookie) => {
          setActiveCookie(newCookie);
        }}
        onSaveCookie={() => {
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
