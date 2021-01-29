import React from 'react';
import { TagEntity } from '../../database/entity/tag.entity';
import { HttpEntity } from '../../database/entity/http.entity';
import { HttpMapper } from '../../database/mapper/httpMapper';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import HistoryItem from '../../components/history/historyItem';
import { httpArray } from '../../util/store/httpArray';
import { MyMethod } from '../../util/http/httpManager';

const useStyle = makeStyles(() =>
  createStyles({
    main: {
      overflow: 'auto',
    },
  }),
);

export default function HistoryContent(props: {
  className?: string;
  searchName: string;
  tags: TagEntity[];
  method: MyMethod | undefined;
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
    // 筛选名字
    let filterHttp = allHttp.filter((value) => value.name && new RegExp(props.searchName).test(value.name));

    // 筛选标签
    if (props.tags.length !== 0) {
      filterHttp = filterHttp.filter((http) =>
        props.tags.every((tag) => http.tags?.find((value) => value.tagId === tag.tagId)),
      );
    }

    // 筛选方法
    if (props.method !== undefined) {
      filterHttp = filterHttp.filter((http) => http.method === props.method);
    }
    return filterHttp;
  }, [allHttp, props.method, props.searchName, props.tags]);
  return (
    <div className={`${props.className} ${style.main}`}>
      {selectedHttp.map((value, index) => (
        <HistoryItem onChange={update} http={value} key={value.httpId} last={index === selectedHttp.length - 1} />
      ))}
    </div>
  );
}
