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
import { Delete } from '@material-ui/icons';
import { useTableAdd } from '../../../util/hook/useTableAdd';
import { useReStyle } from '../../../util/hook/useRestyle';
import { HttpContext } from '../workPanel';

export default function Params(): JSX.Element {
  const style = useReStyle();
  const { httpManager, fatherUpdate } = React.useContext(HttpContext);
  const [setKeyFlag, setValueFlag, keyRef, valueRef] = useTableAdd([httpManager.url]);
  const paramsList = React.useMemo<{ value: string; key: string }[]>(() => {
    const newUrl = httpManager.url
      .split('?')[1]
      ?.match(/(?<key>[^=&]*)=(?<value>[^=&]*)&?/g)
      ?.map((value) => {
        const data = value.match(/(?<key>[^=&]*)=(?<value>[^=&]*)&?/);
        return {
          value: String(data?.groups?.value),
          key: String(data?.groups?.key),
        };
      });
    if (newUrl === undefined) {
      return [];
    }
    return newUrl;
  }, [httpManager.url]);

  function setUrlFromParamsList(newParamsList: { value: string; key: string }[]) {
    if (newParamsList.length === 0) {
      httpManager.url = httpManager.url.split('?')[0];
      fatherUpdate();
    } else {
      const newUrl =
        httpManager.url.split('?')[0] +
        newParamsList.reduce<string>(
          (previousValue, currentValue) => `${previousValue}${currentValue.key}=${currentValue.value}&`,
          '?',
        );
      httpManager.url = newUrl.slice(0, newUrl.length - 1);
      fatherUpdate();
    }
  }

  return (
    <TableContainer component={Paper} className={style.tableContainer}>
      <Table stickyHeader size="small" className={style.table}>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox" />
            <TableCell>key</TableCell>
            <TableCell>value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paramsList.map((value, index) => (
            <TableRow key={index}>
              <TableCell padding="none">
                <IconButton
                  onClick={() => {
                    const newParamsList = [...paramsList];
                    newParamsList.splice(index, 1);
                    setUrlFromParamsList(newParamsList);
                  }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </TableCell>
              <TableCell>
                <InputBase
                  className={style.tableInput}
                  placeholder="key"
                  value={value.key}
                  inputRef={index === paramsList.length - 1 ? keyRef : undefined}
                  onChange={(event) => {
                    const newParamsList = [...paramsList];
                    newParamsList[index].key = event.target.value;
                    setUrlFromParamsList(newParamsList);
                  }}
                />
              </TableCell>
              <TableCell>
                <InputBase
                  className={style.tableInput}
                  placeholder="value"
                  value={value.value}
                  inputRef={index === paramsList.length - 1 ? valueRef : undefined}
                  onChange={(event) => {
                    const newParamsList = [...paramsList];
                    newParamsList[index].value = event.target.value;
                    setUrlFromParamsList(newParamsList);
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell padding="checkbox" />
            <TableCell>
              <InputBase
                className={style.tableInput}
                placeholder="key"
                value={''}
                onChange={(event) => {
                  if (event.target.value !== '') {
                    let url = '';
                    if (!httpManager.url.includes('?')) {
                      url += '?';
                    }
                    if (paramsList.length !== 0) {
                      url += '&';
                    }
                    url += `${event.target.value}=`;
                    setKeyFlag();
                    httpManager.url += url;
                    fatherUpdate();
                  }
                }}
              />
            </TableCell>
            <TableCell>
              <InputBase
                className={style.tableInput}
                placeholder="value"
                value={''}
                onChange={(event) => {
                  if (event.target.value !== '') {
                    let url = '';
                    if (!httpManager.url.includes('?')) {
                      url += '?';
                    }
                    if (paramsList.length !== 0) {
                      url += '&';
                    }
                    url += `=${event.target.value}`;
                    setValueFlag();
                    httpManager.url += url;
                    fatherUpdate();
                  }
                }}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
