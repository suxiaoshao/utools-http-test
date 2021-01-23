import React from 'react';
import MyDrawer from '../components/myDrawer';
import { Collapse, createStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HistoryFilter from '../components/history/historyFilter';
import TagsForm from '../components/common/tag/tagsForm';
import { TagEntity } from '../database/entity/tag.entity';
import HistoryContent from '../components/history/historyContent';

const useStyle = makeStyles(() =>
  createStyles({
    main: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      height: `calc(100vh - 77px)`,
    },
  }),
);

export default function HistoryPage(): JSX.Element {
  const style = useStyle();
  const [searchName, setSearchName] = React.useState<string>('');
  const [filterOpen, setFilterOpen] = React.useState<boolean>(false);
  const [selectedTags, setSelectedTags] = React.useState<TagEntity[]>([]);
  return (
    <MyDrawer className={style.main}>
      <HistoryFilter
        filterOpen={filterOpen}
        onFilterOpenChange={setFilterOpen}
        searchName={searchName}
        onSearchChange={setSearchName}
      />
      <Collapse in={filterOpen} timeout="auto">
        <TagsForm className={style.content} selectedTags={selectedTags} onSelectedTasChanges={setSelectedTags} />
      </Collapse>
      <Collapse in={!filterOpen} timeout="auto">
        <HistoryContent searchName={searchName} tags={selectedTags} className={style.content} />
      </Collapse>
    </MyDrawer>
  );
}
