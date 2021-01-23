import React from 'react';
import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
} from '@material-ui/core';
import { Cookie } from '../../util/http/cookie';
import { makeStyles } from '@material-ui/core/styles';
import { DateTimePicker } from '@material-ui/pickers';
import { CookieMapper } from '../../database/mapper/cookieMapper';

const useStyle = makeStyles(() =>
  createStyles({
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    formTime: {
      display: 'flex',
    },
    formSwitch: {
      flex: '0 0 auto',
      marginLeft: -12,
    },
    formInput: {
      flex: '1 1 0',
    },
    formLabel: {
      margin: 0,
    },
  }),
);

export default function CookieForm(props: {
  activeCookie: Cookie | null;
  onChangeCookie(newCookie: Cookie | null): void;
  onSaveCookie(): void;
}): JSX.Element {
  const [cookie, setCookie] = React.useState<Cookie | null>(null);
  const style = useStyle();
  React.useEffect(() => {
    setCookie(props.activeCookie);
  }, [props.activeCookie]);
  return (
    <>
      {cookie !== null && (
        <Dialog open={true}>
          <DialogTitle>修改/添加 cookie</DialogTitle>
          <DialogContent>
            <form className={style.form}>
              <TextField
                label={'name'}
                value={cookie?.name}
                onChange={(event) => {
                  cookie.name = event.target.value;
                  setCookie(cookie.clone());
                }}
                error={cookie.name === ''}
                helperText={cookie.name === '' ? 'name 不能为空' : undefined}
              />
              <TextField
                label={'value'}
                value={cookie?.value}
                onChange={(event) => {
                  cookie.value = event.target.value;
                  setCookie(cookie.clone());
                }}
                error={cookie.value === ''}
                helperText={cookie.value === '' ? 'value 不能为空' : undefined}
              />
              <TextField
                label={'domain'}
                value={cookie?.domain}
                onChange={(event) => {
                  cookie.domain = event.target.value;
                  setCookie(cookie.clone());
                }}
                error={cookie.domain === ''}
                helperText={cookie.domain === '' ? 'domain 不能为空' : undefined}
              />
              <TextField
                label={'path'}
                value={cookie?.path}
                onChange={(event) => {
                  cookie.path = event.target.value;
                  setCookie(cookie.clone());
                }}
                error={cookie.path.match(/^\//) === null}
                helperText={cookie.path.match(/^\//) === null ? `path 需要以 '/' 开头` : undefined}
              />
              <div className={style.formTime}>
                {cookie.maxAge !== null ? (
                  <>
                    <Switch
                      className={style.formSwitch}
                      checked={true}
                      onChange={() => {
                        cookie.maxAge = null;
                        setCookie(cookie.clone());
                      }}
                    />
                    <TextField
                      type={'number'}
                      label={'max-age'}
                      value={cookie?.maxAge}
                      onChange={(event) => {
                        cookie.maxAge = parseInt(event.target.value);
                        setCookie(cookie.clone());
                      }}
                      className={style.formInput}
                    />
                  </>
                ) : (
                  <>
                    <FormControlLabel
                      className={style.formLabel}
                      labelPlacement="start"
                      control={
                        <Switch
                          checked={false}
                          onChange={() => {
                            cookie.maxAge = 0;
                            setCookie(cookie.clone());
                          }}
                        />
                      }
                      label={'max-age'}
                    />
                  </>
                )}
              </div>
              <div className={style.formTime}>
                {cookie.expires !== null ? (
                  <>
                    <Switch
                      className={style.formSwitch}
                      checked={true}
                      onChange={() => {
                        cookie.expires = null;
                        setCookie(cookie.clone());
                      }}
                    />
                    <DateTimePicker
                      label={'expires'}
                      value={cookie?.expires}
                      onChange={(date) => {
                        cookie.expires = date?.toDate() ?? new Date();
                      }}
                      className={style.formInput}
                    />
                  </>
                ) : (
                  <>
                    <FormControlLabel
                      className={style.formLabel}
                      labelPlacement="start"
                      control={
                        <Switch
                          checked={false}
                          onChange={() => {
                            cookie.expires = new Date();
                            setCookie(cookie.clone());
                          }}
                        />
                      }
                      label={'expires'}
                    />
                  </>
                )}
              </div>
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              color={'secondary'}
              onClick={() => {
                props.onChangeCookie(null);
              }}
            >
              取消
            </Button>
            <Button
              color={'primary'}
              disabled={!cookie.check()}
              onClick={async () => {
                await CookieMapper.saveCookies([cookie?.getCookieEntity()]);
                props.onSaveCookie();
              }}
            >
              保存
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
