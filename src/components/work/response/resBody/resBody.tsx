import React from 'react';
import { TabPanelDisappear, TabPanelHidden } from '../../../common/tabPanel';
import { ResponseContext } from '../response';
import Edit from '../../../common/editor/edit';
import { useReqBodyStyle } from '../../request/reqBody/reqBody';
import ResImage from '../../../../components/work/response/resBody/resImage';

export default function ResBody(): JSX.Element {
  const { response } = React.useContext(ResponseContext);
  const bodyStyle = useReqBodyStyle();
  return (
    <>
      <TabPanelDisappear className={bodyStyle.tableContainer} index={'image'} value={response.contentType}>
        <ResImage />
      </TabPanelDisappear>
      <TabPanelHidden className={bodyStyle.editFather} index={'text'} value={response.contentType}>
        <Edit className={bodyStyle.edit} code={response.getCode()} language={response.textType} readonly />
      </TabPanelHidden>
    </>
  );
}
