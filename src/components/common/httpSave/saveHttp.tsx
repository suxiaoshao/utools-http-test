import React from 'react';
import {
  AppBar,
  createStyles,
  Dialog,
  IconButton,
  Slide,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import { makeStyles } from '@material-ui/core/styles';
import { Close, SaveAlt } from '@material-ui/icons';
import { httpArray } from '../../../util/store/httpArray';
import TagsForm from '../tag/tagsForm';
import { HttpEntity } from '../../../database/entity/http.entity';
import { HttpManager } from '../../../util/http/httpManager';
import { useSnackbar } from 'notistack';
import { useSqlData } from '../../../util/store/sqlStore';
import { TagEntity } from '../../../database/entity/tag.entity';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) =>
  createStyles({
    appBar: {
      position: 'relative',
      display: 'flex',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
      marginRight: theme.spacing(2),
    },
    main: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: theme.palette.background.default,
    },
    input: {
      width: '40%',
      marginTop: theme.spacing(1),
      flex: '0 0 auto',
    },
    div: {
      flex: '1 1 0',
      width: '100%',
    },
  }),
);
export default function SaveHttp(props: {
  open: boolean;
  onClose(): void;
  onSave(newHttpEntity: HttpEntity): void;
  httpManager: HttpManager;
}): JSX.Element {
  const { httpManager } = props;
  const style = useStyles();
  const [sqlData] = useSqlData();
  const [selectedTags, setSelectedTags] = React.useState<TagEntity[]>([]);
  const [name, setName] = React.useState<string>(httpManager.name);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  React.useEffect(() => {
    setSelectedTags(sqlData.https.find((value) => value.httpId === httpManager.httpId)?.tags ?? []);
  }, [props.open, httpManager.httpId, sqlData.https]);
  return (
    <Dialog fullScreen open={props.open} onClose={props.onClose} TransitionComponent={Transition}>
      <AppBar className={style.appBar} color="inherit">
        <Toolbar variant="dense">
          <Tooltip title={<Typography variant={'body2'}>取消</Typography>}>
            <IconButton edge="start" color="secondary" onClick={props.onClose}>
              <Close />
            </IconButton>
          </Tooltip>
          <Typography variant="h6" className={style.title}>
            {(name ?? httpManager.url) || '暂未命名'}
          </Typography>
          <Tooltip title={<Typography variant={'body2'}>保存</Typography>}>
            <div>
              <IconButton
                edge="end"
                onClick={async () => {
                  httpManager.name = name;
                  const httpEntity = httpManager.getHttpEntity([...selectedTags]);
                  try {
                    await httpEntity.save();
                    props.onSave(httpEntity);
                  } catch (e) {
                    enqueueSnackbar('保存失败', {
                      variant: 'error',
                      // eslint-disable-next-line react/display-name
                      action: (key) => (
                        <IconButton
                          size="small"
                          onClick={() => {
                            closeSnackbar(key);
                          }}
                        >
                          <Close />
                        </IconButton>
                      ),
                      autoHideDuration: 2000,
                    });
                  }
                }}
                color="primary"
                disabled={name === ''}
              >
                <SaveAlt />
              </IconButton>
            </div>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <div className={style.main}>
        <TextField
          className={style.input}
          variant="filled"
          value={name}
          label={'名字'}
          error={name === ''}
          helperText={name === '' ? 'name 不能为空' : undefined}
          onChange={(event) => {
            setName(event.target.value);
            httpArray.update();
          }}
        />
        <TagsForm className={style.div} onSelectedTasChanges={setSelectedTags} selectedTags={selectedTags} />
      </div>
    </Dialog>
  );
}
