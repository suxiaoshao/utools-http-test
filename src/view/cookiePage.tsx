import React from 'react';
import MyDrawer from '../components/myDrawer';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import CookieCard from '../components/cookie/cookieCard';
import { Cookie } from '../util/http/cookie';
import CookieForm from '../components/cookie/cookieForm';
import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { useSqlData } from '../util/store/sqlStore';
import LoadingPage from '../components/common/loadingPage';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description cookieCard 的样式
 * */
const useStyle = makeStyles((theme) =>
  createStyles({
    /**
     * @author sushao
     * @version 0.2.2
     * @since 0.2.2
     * @description 主页样式,设置滚动,位置和边框
     * */
    main: {
      overflow: 'auto',
      position: 'relative',
      padding: theme.spacing(3),
    },
    /**
     * @author sushao
     * @version 0.2.2
     * @since 0.2.2
     * @description 页面按钮的样式,设置位置和 z 坐标
     * */
    fab: {
      position: 'absolute',
      right: theme.spacing(2),
      bottom: theme.spacing(2),
      zIndex: theme.zIndex.modal - 1,
    },
  }),
);
/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description cookie 页面的组件
 * */
export default function CookiePage(): JSX.Element {
  /**
   * @description 样式
   * */
  const style = useStyle();
  /**
   * @description 数据库数据
   * */
  const [sqlData] = useSqlData();
  /**
   * @description 数据库中 cookies 的 domains 的不重复集合
   * */
  const domains = React.useMemo<string[]>(() => {
    const filterData = sqlData.cookies.map((value) => {
      return value.domain;
    });
    return [...new Set(filterData)];
  }, [sqlData.cookies]);
  /**
   * @description 被修改或者将被添加的 cookie,诺为 null 说明没有数据要被修改或者被添加
   * */
  const [formCookie, setFormCookie] = React.useState<Cookie | null>(null);
  return (
    <MyDrawer className={style.main}>
      {/* loading 页面 */}
      <LoadingPage />
      {/* cookieCard domain 相同的一起展示 */}
      {domains.map((value) => (
        <CookieCard domain={value} key={value} />
      ))}
      {/* 需要修改或者添加的 cookie ,formCookie 为空的时候不展示 */}
      <CookieForm
        formCookie={formCookie}
        onChangeCookie={(newCookie) => {
          setFormCookie(newCookie);
        }}
      />
      {/* 添加新 cookie ,点击的话设置 formCookie 为一个新 cookie */}
      <Fab
        className={style.fab}
        onClick={() => {
          setFormCookie(new Cookie('', '', '', '/', Date.now(), null, null));
        }}
        color={'primary'}
      >
        <Add />
      </Fab>
    </MyDrawer>
  );
}
