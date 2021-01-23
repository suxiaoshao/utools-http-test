import React from 'react';
import {
  IconButton,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { Header, OtherHeader } from '../../../util/http/header';
import { Check, Clear } from '@material-ui/icons';
import { useTableAdd } from '../../../util/hook/useTableAdd';
import UpdateTable from '../../../components/work/request/updateTable';
import { useForceUpdate } from '../../../util/hook/useForceUpdate';
import { useReStyle } from '../../../util/hook/useRestyle';
import { RequestContext } from './request';
import { HttpContext } from '../workPanel';

export default function ReqHeaders(): JSX.Element {
  const style = useReStyle();
  const { request } = React.useContext(RequestContext);
  const {
    httpManager: { url },
  } = React.useContext(HttpContext);
  const [otherHeaders, setOtherHeaders] = React.useState<OtherHeader[]>([]);
  const [setKeyFlag, setValueFlag, keyRef, valueRef] = useTableAdd([request.headers.length]);
  const forceUpdate = useForceUpdate();
  React.useEffect(() => {
    request.getOtherHeaders(url).then((value) => {
      setOtherHeaders(value);
    });
  }, [url, request]);
  return (
    <TableContainer className={style.tableContainer} component={Paper}>
      <Table stickyHeader size="small" className={style.table}>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" />
            <TableCell>key</TableCell>
            <TableCell>value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {otherHeaders.map((value) => (
            <TableRow key={value.key}>
              <TableCell padding="none">
                <IconButton disabled>
                  {value.isDelete ? <Clear fontSize="small" /> : <Check fontSize="small" />}
                </IconButton>
              </TableCell>
              <TableCell>
                <InputBase className={style.tableInput} value={value.key} />
              </TableCell>
              <TableCell>
                <InputBase
                  className={`${style.tableInput} ${value.isDelete ? style.tableInputDelete : ''}`}
                  value={value.value}
                />
              </TableCell>
            </TableRow>
          ))}
          <UpdateTable mapList={request.headers} keyRef={keyRef} valueRef={valueRef} />
          <TableRow>
            <TableCell padding="checkbox" />
            <TableCell>
              <InputBase
                value=""
                placeholder="key"
                onChange={(event) => {
                  setKeyFlag();
                  request.headers.push(new Header(event.target.value, ''));
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
                  request.headers.push(new Header('', event.target.value));
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
