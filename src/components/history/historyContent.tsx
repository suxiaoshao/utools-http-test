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

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description historyContent 组件的 prop
 * */
export interface HistoryContentProp {
  /**
   * 组件的类名
   * */
  className?: string;
  /**
   * 搜索关键字,为空时全匹配
   * */
  searchName: string;
  /**
   * 被选中的标签,为空时全匹配
   * */
  selectedTags: TagEntity[];
  /**
   * 匹配的方法 ,为 undefined 时全匹配
   * */
  method: MyMethod | undefined;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description historyContent 组件
 * */
export default function HistoryContent(props: HistoryContentProp): JSX.Element {
  const style = useStyle();
  /**
   * 数据库数据
   * */
  const [sqlData] = useSqlData();
  /**
   * 被筛选出来的 http 历史
   * */
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
      {selectedHttp.map((value) => (
        <HistoryItem http={value} key={value.httpId} />
      ))}
    </div>
  );
}
