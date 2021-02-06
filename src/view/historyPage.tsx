import React from 'react';
import MyDrawer from '../components/myDrawer';
import { createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HistoryFilter from '../components/history/historyFilter';
import { TagEntity } from '../database/entity/tag.entity';
import HistoryContent from '../components/history/historyContent';
import { MyMethod } from '../util/http/httpManager';

const useStyle = makeStyles(() =>
  createStyles({
    main: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 1 0',
    },
  }),
);

export default function HistoryPage(): JSX.Element {
  const style = useStyle();
  const [searchName, setSearchName] = React.useState<string>('');
  const [selectedTags, setSelectedTags] = React.useState<TagEntity[]>([]);
  const [method, setMethod] = React.useState<MyMethod | undefined>(undefined);
  return (
    <MyDrawer className={style.main}>
      <HistoryFilter
        tags={selectedTags}
        onChangeTags={setSelectedTags}
        searchName={searchName}
        onSearchChange={setSearchName}
        method={method}
        ocChangeMethod={setMethod}
      />
      <HistoryContent method={method} searchName={searchName} selectedTags={selectedTags} className={style.content} />
    </MyDrawer>
  );
}
