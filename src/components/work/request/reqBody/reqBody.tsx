import React from 'react';
import ReqFormFata from './reqFormData';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import XForm from './XForm';
import Edit from '../../../common/editor/edit';
import { TabPanelDisappear } from '../../../common/tabPanel';
import { RequestContext } from '../request';

export const useReqBodyStyle = makeStyles((theme) =>
  createStyles({
    tabPanel: {
      width: '100%',
      height: '100%',
    },
    tableContainer: {
      margin: theme.spacing(1),
      height: `calc(100% - ${theme.spacing(1) * 2}px)`,
      width: `calc(100% - ${theme.spacing(1) * 2}px)`,
    },
    edit: {
      width: '100%',
      height: '100%',
      margin: 0,
      overflow: 'hidden',
    },
    editFather: {
      width: '100%',
      height: '100%',
      paddingTop: '3px',
    },
  }),
);

export default function ReqBody(): JSX.Element {
  const bodyStyle = useReqBodyStyle();
  const { request, fatherUpdate } = React.useContext(RequestContext);
  return (
    <>
      <TabPanelDisappear className={bodyStyle.tableContainer} index={'form-data'} value={request.bodyChoose}>
        <ReqFormFata />
      </TabPanelDisappear>
      <TabPanelDisappear
        className={bodyStyle.tableContainer}
        index={'x-www-form-urlencoded'}
        value={request.bodyChoose}
      >
        <XForm />
      </TabPanelDisappear>
      <TabPanelDisappear className={bodyStyle.editFather} index={'text'} value={request.bodyChoose}>
        <Edit
          code={request.text}
          language={request.textChoose}
          className={bodyStyle.edit}
          onChangeCode={(newCode) => {
            request.text = newCode;
            fatherUpdate();
          }}
        />
      </TabPanelDisappear>
    </>
  );
}
