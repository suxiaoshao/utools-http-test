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
import { CookieMapper } from '../../database/mapper/cookieMapper';
import CookieForm from '../../components/cookie/cookieForm';

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

export default function CookieCard(props: { domain: string; onUpdate(): void }): JSX.Element {
  const style = useStyle();
  const [cookies, setCookies] = React.useState<Cookie[]>([]);
  const [activeCookie, setActiveCookie] = React.useState<Cookie | null>(null);
  const updateCookies = React.useCallback(() => {
    CookieMapper.getCookieByDomain(props.domain).then((value) => {
      setCookies(value);
    });
  }, [props.domain]);
  React.useEffect(() => {
    updateCookies();
  }, [updateCookies]);
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <IconButton
          className={style.iconButton}
          onClick={async () => {
            await CookieMapper.deleteByDomain(props.domain);
            props.onUpdate();
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
              await CookieMapper.deleteCookie([value.getCookieEntity()]);
              updateCookies();
              props.onUpdate();
            }}
            onClick={() => {
              setActiveCookie(value.clone());
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
          updateCookies();
          props.onUpdate();
          setActiveCookie(null);
        }}
      />
    </Accordion>
  );
}
