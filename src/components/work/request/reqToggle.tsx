import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import MySelector, { ItemListProp } from '../../common/mySelector';
import { RequestBodyChoose, RequestTextChoose } from '../../../utils/http/httpRequest';
import { useReStyle } from '../../../utils/hooks/useRestyle';
import { RequestContext } from './request';

const bodyItemList: ItemListProp<RequestBodyChoose>[] = (
  ['none', 'text', 'form-data', 'x-www-form-urlencoded'] as const
).map<ItemListProp<RequestBodyChoose>>((value) => {
  return {
    text: value,
    value: value,
  };
});
const textItemList: ItemListProp<RequestTextChoose>[] = (['json', 'html', 'xml', 'javascript', 'plain'] as const).map(
  (value) => {
    return {
      text: value,
      value: value,
    };
  },
);

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description request 的切换按钮
 * */
export default function ReqToggle(props: {
  /**
   * 当前被激活的页面名
   * */
  value: string;
  /**
   * 被激活页面触发的方法
   * */
  onchangeValue(newValue: string): void;
}): JSX.Element {
  const style = useReStyle();
  const { request, fatherUpdate } = React.useContext(RequestContext);
  return (
    <div className={style.toggle}>
      {/* 切换页面按钮 */}
      <ToggleButtonGroup
        value={props.value}
        size="small"
        exclusive
        onChange={(event, value: string | null) => {
          if (value !== null) {
            props.onchangeValue(value);
          }
        }}
      >
        <ToggleButton className={style.toggleButton} value="params">
          Params
        </ToggleButton>
        <ToggleButton className={style.toggleButton} value="headers">
          Headers
        </ToggleButton>
        <ToggleButton className={style.toggleButton} value="body">
          Body
        </ToggleButton>
      </ToggleButtonGroup>
      {/* 页面为 body 时 ,切换内容按钮*/}
      {props.value === 'body' && (
        <>
          <MySelector<RequestBodyChoose>
            variant="outlined"
            value={request.bodyChoose}
            onValueChange={(newValue) => {
              request.bodyChoose = newValue;
              fatherUpdate();
            }}
            itemList={bodyItemList}
          />
          {/* 内容为 text 时,切换语言按钮 */}
          {request.bodyChoose === 'text' && (
            <MySelector<RequestTextChoose>
              variant="outlined"
              value={request.textChoose}
              onValueChange={(newValue) => {
                request.textChoose = newValue;
                fatherUpdate();
              }}
              itemList={textItemList}
            />
          )}
        </>
      )}
    </div>
  );
}
