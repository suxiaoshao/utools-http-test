import React from 'react';
import { InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { useReqBodyStyle } from './reqBody';
import { useTableAdd } from '../../../../util/hook/useTableAdd';
import { RequestXForm } from '../../../../util/http/requestXForm';
import UpdateTable from '../../../../components/work/request/updateTable';
import { useForceUpdate } from '../../../../util/hook/useForceUpdate';
import { RequestContext } from '../request';

export default function XForm(): JSX.Element {
  const bodyStyle = useReqBodyStyle();
  const {
    request: { xForms },
  } = React.useContext(RequestContext);
  const [setKeyFlag, setValueFlag, keyRef, valueRef] = useTableAdd([xForms.length]);
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
