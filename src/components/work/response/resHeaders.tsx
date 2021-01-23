import React from 'react';
import { InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { useReStyle } from '../../../util/hook/useRestyle';
import { ResponseContext } from './response';

export default function ResHeaders(): JSX.Element {
  const style = useReStyle();
  const {
    response: { headers },
  } = React.useContext(ResponseContext);
  return (
    <TableContainer className={style.tableContainer} component={Paper}>
      <Table size="small" stickyHeader className={style.table}>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" />
            <TableCell>key</TableCell>
            <TableCell>value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {headers.map((value, index) => (
            <TableRow key={index}>
              <TableCell padding="checkbox" />
              <TableCell>
                <InputBase className={style.tableInput} value={value.key} />
              </TableCell>
              <TableCell>
                <InputBase className={style.tableInput} value={value.value} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
