import React from 'react';
import MyDrawer from '../components/myDrawer';
import { createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HistoryFilter from '../components/history/historyFilter';
import { TagEntity } from '../database/entity/tag.entity';
import HistoryContent from '../components/history/historyContent';
import { MyMethod } from '../util/http/httpManager';
import LoadingPage from '../components/common/loadingPage';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 获取样式
 * */
const useStyle = makeStyles(() =>
  createStyles({
    main: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    },
    content: {
      flex: '1 1 0',
    },
  }),
);
/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 历史记录页面
 * */
export default function HistoryPage(): JSX.Element {
  const style = useStyle();
  /**
   * 搜索名
   * */
  const [searchName, setSearchName] = React.useState<string>('');
  /**
   * 被选择的标签
   * */
  const [selectedTags, setSelectedTags] = React.useState<TagEntity[]>([]);
  /**
   * 选择的方法
   * */
  const [method, setMethod] = React.useState<MyMethod | undefined>(undefined);
  return (
    <MyDrawer className={style.main}>
      <LoadingPage />
      {/* 筛选表单 */}
      <HistoryFilter
        tags={selectedTags}
        onChangeTags={setSelectedTags}
        searchName={searchName}
        onSearchChange={setSearchName}
        method={method}
        ocChangeMethod={setMethod}
      />
      {/* 被筛选后的内容 */}
      <HistoryContent method={method} searchName={searchName} selectedTags={selectedTags} className={style.content} />
    </MyDrawer>
  );
}
