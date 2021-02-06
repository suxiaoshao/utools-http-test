import React from 'react';
import { TagEntity } from '../../database/entity/tag.entity';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import HistoryItem from '../../components/history/historyItem';
import { MyMethod } from '../../util/http/httpManager';
import { HttpEntity } from '../../database/entity/http.entity';
import { useSqlData } from '../../util/store/sqlStore';

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
  selectedTags: TagEntity[];
  method: MyMethod | undefined;
}): JSX.Element {
  const style = useStyle();
  const [sqlData] = useSqlData();
  const selectedHttp = React.useMemo<HttpEntity[]>(() => {
    let filterHttp: HttpEntity[] = [...sqlData.https];

    // 筛选名字和 url
    if (props.searchName !== '') {
      filterHttp = filterHttp.filter((value) => {
        //筛选名字
        if (value.name !== undefined && value.name.includes(props.searchName)) {
          return true;
        }
        //筛选 url
        return value.url !== undefined && value.url.includes(props.searchName);
      });
    }

    // 筛选标签
    if (props.selectedTags.length !== 0) {
      filterHttp = filterHttp.filter((http) =>
        props.selectedTags.every((tag) => http.tags?.find((value) => value.tagId === tag.tagId)),
      );
    }

    // 筛选方法
    if (props.method !== undefined) {
      filterHttp = filterHttp.filter((http) => http.method === props.method);
    }
    return filterHttp;
  }, [sqlData.https, props.method, props.searchName, props.selectedTags]);
  return (
    <div className={`${props.className} ${style.main}`}>
      {selectedHttp.map((value, index) => (
        <HistoryItem
          onChange={() => {
            console.log(111);
          }}
          http={value}
          key={value.httpId}
          last={index === selectedHttp.length - 1}
        />
      ))}
    </div>
  );
}
