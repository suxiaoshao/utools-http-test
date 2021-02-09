import React from 'react';
import { useReStyle } from '../../../util/hook/useRestyle';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { ResponseContext } from './response';
import MySelector from '../../../components/common/mySelector';
import { ResponseContentType, ResponseTextType } from '../../../util/http/httpResponse';

const contentItemList = (['text', 'image'] as const).map((value) => {
  return {
    value: value,
    text: value,
  };
});
const textItemList = (['plain', 'json', 'xml', 'html', 'css', 'javascript'] as const).map((value) => {
  return {
    value: value,
    text: value,
  };
});
/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description response 的页面切换按钮
 * */
export default function ResToggle(props: { value: string; onchangeValue(newValue: string): void }): JSX.Element {
  const style = useReStyle();
  const { response, fatherUpdate } = React.useContext(ResponseContext);
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
        <ToggleButton className={style.toggleButton} value="body">
          Body
        </ToggleButton>
        <ToggleButton className={style.toggleButton} value="cookies">
          Cookies
        </ToggleButton>
        <ToggleButton className={style.toggleButton} value="headers">
          Headers
        </ToggleButton>
      </ToggleButtonGroup>
      {props.value === 'body' && (
        <>
          <MySelector<ResponseContentType>
            value={response.contentType}
            onValueChange={(newValue) => {
              response.contentType = newValue;
              fatherUpdate();
            }}
            itemList={contentItemList}
          />
          {response.contentType === 'text' && (
            <MySelector<ResponseTextType>
              value={response.textType}
              onValueChange={(newValue) => {
                response.textType = newValue;
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
