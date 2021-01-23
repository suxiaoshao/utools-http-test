import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import MySelector, { ItemListProp } from '../../common/mySelector';
import { RequestBodyChoose, RequestTextChoose } from '../../../util/http/httpRequest';
import { useReStyle } from '../../../util/hook/useRestyle';
import { RequestContext } from './request';

const bodyItemList: ItemListProp<RequestBodyChoose>[] = ([
  'none',
  'text',
  'form-data',
  'x-www-form-urlencoded',
] as const).map<ItemListProp<RequestBodyChoose>>((value: RequestBodyChoose) => {
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
export default function ReqToggle(props: { value: string; onchangeValue(newValue: string): void }): JSX.Element {
  const style = useReStyle();
  const { request, fatherUpdate } = React.useContext(RequestContext);
  return (
    <div className={style.toggle}>
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
