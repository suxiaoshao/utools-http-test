import React from 'react';
import { InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { useReqBodyStyle } from './reqBody';
import { useTableAdd } from '../../../../utils/hooks/useTableAdd';
import { RequestXForm } from '../../../../utils/http/requestXForm';
import UpdateTable from '../../../../components/work/request/updateTable';
import { useForceUpdate } from '../../../../utils/hooks/useForceUpdate';
import { RequestContext } from '../request';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description x-www-form-urlencoded 数据输入表格
 * */
export default function XForm(): JSX.Element {
  const bodyStyle = useReqBodyStyle();
  const {
    request: { xForms },
  } = React.useContext(RequestContext);
  const { setKeyFlag, setValueFlag, keyRef, valueRef } = useTableAdd([xForms.length]);
  const forceUpdate = useForceUpdate();
  return (
    <TableContainer className={bodyStyle.tabPanel} component={Paper}>
      <Table stickyHeader size={'small'}>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" />
            <TableCell>key</TableCell>
            <TableCell>value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <UpdateTable mapList={xForms} keyRef={keyRef} valueRef={valueRef} />
          <TableRow>
            <TableCell padding="checkbox" />
            <TableCell>
              <InputBase
                value=""
                placeholder="key"
                onChange={(event) => {
                  setKeyFlag();
                  xForms.push(new RequestXForm(event.target.value, ''));
                  forceUpdate();
                }}
              />
            </TableCell>
            <TableCell>
              <InputBase
                value=""
                placeholder="value"
                onChange={(event) => {
                  setValueFlag();
                  xForms.push(new RequestXForm('', event.target.value));
                  forceUpdate();
                }}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
