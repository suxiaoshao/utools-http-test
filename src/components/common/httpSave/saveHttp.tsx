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
import TagsForm from '../tag/tagsForm';
import { HttpEntity } from '../../../database/entity/http.entity';
import { HttpManager } from '../../../utils/http/httpManager';
import { useSnackbar } from 'notistack';
import { useSqlData } from '../../../utils/store/sqlStore';
import { TagEntity } from '../../../database/entity/tag.entity';
import LoadingPage from '../loadingPage';

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description saveHttp 组件显示时展现的动画
 * */
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
      position: 'relative',
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

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description saveHttp 组件的 prop
 * */
export interface SaveHttpProp {
  /**
   * saveHttp 组件是否打开
   * */
  open: boolean;
  /**
   * 将要保存的 httpManager
   * */
  httpManager: HttpManager;

  /**
   * 触发关闭时调用的方法
   * */
  onClose(): void;

  /**
   * 触发保存时调用的方法
   * */
  onSave(newHttpEntity: HttpEntity): void;
}

export default function SaveHttp(props: SaveHttpProp): JSX.Element {
  /**
   * 将要保存的 httpManger
   * */
  const { httpManager } = props;
  const style = useStyles();
  /**
   * 数据库数据
   * */
  const [sqlData] = useSqlData();
  /**
   * 被选择的 tag
   * */
  const [selectedTags, setSelectedTags] = React.useState<TagEntity[]>([]);
  /**
   * http 保存名
   * */
  const [name, setName] = React.useState<string>(httpManager.name);
  /**
   * 显示通知的工具
   * */
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  /**
   * 一下任意一个东西被修改时,从数据库中读取这个 http 关联的 tag 赋值给被选择的 tag
   * */
  React.useEffect(() => {
    setSelectedTags(sqlData.https.find((value) => value.httpId === httpManager.httpId)?.tags ?? []);
  }, [props.open, httpManager.httpId, sqlData.https]);
  return (
    <Dialog fullScreen open={props.open} onClose={props.onClose} TransitionComponent={Transition}>
      <AppBar className={style.appBar} color="inherit">
        <Toolbar variant="dense">
          {/* 取消按钮 */}
          <Tooltip title={<Typography variant={'body2'}>取消</Typography>}>
            <IconButton edge="start" color="secondary" onClick={props.onClose}>
              <Close />
            </IconButton>
          </Tooltip>
          {/* http 名 */}
          <Typography variant="h6" className={style.title}>
            {(name ?? httpManager.url) || '暂未命名'}
          </Typography>
          {/* 保存按钮 */}
          <Tooltip title={<Typography variant={'body2'}>保存</Typography>}>
            <div>
              <IconButton
                edge="end"
                onClick={async () => {
                  /**
                   * 新建一个数据库 http 对象
                   * */
                  httpManager.name = name;
                  const httpEntity = httpManager.getHttpEntity([...selectedTags]);
                  /**
                   * 尝试保存,如果成功触发保存方法
                   * */
                  try {
                    await httpEntity.save();
                    props.onSave(httpEntity);
                  } catch (e) {
                    /**
                     * 如果失败,通知用户
                     * */
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
        <LoadingPage />
        {/* http 名字 文本框 */}
        <TextField
          className={style.input}
          variant="filled"
          value={name}
          label={'名字'}
          error={name === ''}
          helperText={name === '' ? 'name 不能为空' : undefined}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        {/* tag 选择组件 */}
        <TagsForm className={style.div} onSelectedTasChanges={setSelectedTags} selectedTags={selectedTags} />
      </div>
    </Dialog>
  );
}
