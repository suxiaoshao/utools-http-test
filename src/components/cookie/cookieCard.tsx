import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Chip,
  createStyles,
  IconButton,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add, DeleteForever, ExpandMore } from '@material-ui/icons';
import { Cookie } from '../../util/http/cookie';
import CookieForm from '../../components/cookie/cookieForm';
import { useSqlData } from '../../util/store/sqlStore';
import { CookieEntity } from '../../database/entity/cookie.entity';
import { sqlWorker } from '../../database/mapper/sql.main';
import { SqlRunMessage } from '../../database/mapper/sql.interface';

const useStyle = makeStyles((theme) =>
  createStyles({
    button: {
      textTransform: 'none',
      margin: theme.spacing(1),
    },
    column: {
      flex: '1 1 0',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    iconButton: {
      margin: '-12px 0 -12px -16px',
    },
  }),
);

export default function CookieCard(props: { domain: string }): JSX.Element {
  const style = useStyle();
  const [sqlData] = useSqlData();
  const cookies = React.useMemo<CookieEntity[]>(() => {
    return sqlData.cookies.filter((value) => value.domain === props.domain);
  }, [props.domain, sqlData]);
  const [activeCookie, setActiveCookie] = React.useState<Cookie | null>(null);
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <IconButton
          className={style.iconButton}
          onClick={async () => {
            const message: SqlRunMessage = {
              code: 2,
              sql: `delete from cookie where domain='${props.domain}'`,
            };
            sqlWorker.postMessage(message);
          }}
        >
          <DeleteForever />
        </IconButton>
        <div className={style.column}>
          <Typography className={style.heading}>{props.domain}</Typography>
        </div>
        <div className={style.column}>
          <Typography className={style.secondaryHeading}>{`${cookies.length} cookies`}</Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        {cookies.map((value) => (
          <Chip
            className={style.button}
            avatar={<Avatar>{value.name[0]}</Avatar>}
            key={value.name}
            label={value.name}
            onDelete={async () => {
              value.delete();
            }}
            onClick={() => {
              setActiveCookie(value.toCookie());
            }}
          />
        ))}
        <IconButton
          color="primary"
          onClick={() => {
            setActiveCookie(new Cookie('', '', props.domain, '/', Date.now(), null, null));
          }}
        >
          <Add />
        </IconButton>
      </AccordionDetails>
      <CookieForm
        activeCookie={activeCookie}
        onChangeCookie={(newCookie) => {
          setActiveCookie(newCookie);
        }}
        onSaveCookie={() => {
          setActiveCookie(null);
        }}
      />
    </Accordion>
  );
}
