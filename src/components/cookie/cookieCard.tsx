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
import { Cookie } from '../../utils/http/cookie';
import CookieForm from '../../components/cookie/cookieForm';
import { useSqlData } from '../../utils/store/sqlStore';
import { CookieEntity } from '../../database/entity/cookie.entity';
import { execSql } from '../../database/mapper/util';

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

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description cookieCard prop
 * */
export interface CookieCardProp {
  /**
   * 这个 cookie 集合的domain
   * */
  domain: string;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description cookieCard 组件
 * */
export default function CookieCard(props: CookieCardProp): JSX.Element {
  const style = useStyle();
  /**
   * 所有数据库信息
   * */
  const [sqlData] = useSqlData();
  /**
   * 获取所有 domain 为 props.domain 的 cookie
   * */
  const cookies = React.useMemo<CookieEntity[]>(() => {
    return sqlData.cookies.filter((value) => value.domain === props.domain);
  }, [props.domain, sqlData]);
  /**
   * 表单 cookie 数据
   * */
  const [formCookie, setFormCookie] = React.useState<Cookie | null>(null);
  return (
    <Accordion>
      {/* domain cookie 详情 */}
      <AccordionSummary expandIcon={<ExpandMore />}>
        {/* 删除这个 domain 的所有 cookie */}
        <IconButton
          className={style.iconButton}
          onClick={async () => {
            execSql(`delete from cookie where domain='${props.domain}'`);
          }}
        >
          <DeleteForever />
        </IconButton>
        {/* domain 名字 */}
        <div className={style.column}>
          <Typography className={style.heading}>{props.domain}</Typography>
        </div>
        {/* 这个domain 有几个 cookie */}
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
              setFormCookie(value.toCookie());
            }}
          />
        ))}
        {/* 给这个 domain 添加 cookie */}
        <IconButton
          color="primary"
          onClick={() => {
            setFormCookie(new Cookie('', '', props.domain, '/', Date.now(), null, null));
          }}
        >
          <Add />
        </IconButton>
      </AccordionDetails>
      <CookieForm
        formCookie={formCookie}
        onChangeCookie={(newCookie) => {
          setFormCookie(newCookie);
        }}
      />
    </Accordion>
  );
}
