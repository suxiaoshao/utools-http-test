import React from 'react';
import { TagEntity } from '../../database/entity/tag.entity';
import { HttpEntity } from '../../database/entity/http.entity';
import { HttpMapper } from '../../database/mapper/httpMapper';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import HistoryItem from '../../components/history/historyItem';
import { httpArray } from '../../util/store/httpArray';
import { HttpManager } from '../../util/http/httpManager';

const useStyle = makeStyles((theme) =>
  createStyles({
    main: {
      overflow: 'auto',
      padding: theme.spacing(1),
    },
    list: {
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

export default function HistoryContent(props: {
  className?: string;
  searchName: string;
  tags: TagEntity[];
}): JSX.Element {
  const style = useStyle();
  const [allHttp, setAllHttp] = React.useState<HttpEntity[]>([]);
  const update = React.useCallback(() => {
    HttpMapper.getAllHttp().then((value) => {
      httpArray.change(value);
      setAllHttp(value);
    });
  }, []);
  React.useEffect(() => {
    HttpMapper.getAllHttp().then((value) => {
      setAllHttp(value);
    });
  }, []);
  const selectedHttp = React.useMemo<HttpEntity[]>(() => {
    let filterHttp = allHttp.filter((value) => value.name && new RegExp(props.searchName).test(value.name));
    if (props.tags.length !== 0) {
      filterHttp = filterHttp.filter((http) =>
        props.tags.every((tag) => http.tags?.find((value) => value.tagId === tag.tagId)),
      );
    }
    return filterHttp;
  }, [allHttp, props.searchName, props.tags]);
  return (
    <div className={`${props.className} ${style.main}`}>
      {selectedHttp.length !== 0 ? (
        <List className={style.list}>
          {selectedHttp.map((value, index) => (
            <HistoryItem
              onChange={update}
              http={HttpManager.fromEntity(value)}
              key={value.httpId}
              last={index === selectedHttp.length - 1}
            />
          ))}
        </List>
      ) : undefined}
    </div>
  );
}
