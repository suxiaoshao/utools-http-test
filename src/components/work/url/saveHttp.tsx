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
import { HttpContext } from '../workPanel';
import { httpArray } from '../../../util/store/httpArray';
import { TagEntity } from '../../../database/entity/tag.entity';
import TagsForm from '../../../components/common/tag/tagsForm';
import { HttpMapper } from '../../../database/mapper/httpMapper';
import { HttpEntity } from '../../../database/entity/http.entity';

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
}): JSX.Element {
  const { httpManager } = React.useContext(HttpContext);
  const style = useStyles();
  const [selectedTags, setSelectedTags] = React.useState<TagEntity[]>([]);
  React.useEffect(() => {
    HttpMapper.getTagsByHttpId(httpManager.httpId).then((value) => {
      setSelectedTags(value);
    });
  }, [props.open, httpManager.httpId]);
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
            {(httpManager.name ?? httpManager.url) || '暂未命名'}
          </Typography>
          <Tooltip title={<Typography variant={'body2'}>保存</Typography>}>
            <div>
              <IconButton
                edge="end"
                onClick={async () => {
                  const httpEntity = httpManager.getHttpEntity([...selectedTags]);
                  const newHttp = await HttpMapper.saveHttp(httpEntity);
                  props.onSave(newHttp);
                }}
                color="primary"
                disabled={httpManager.name === ''}
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
          value={httpManager.name}
          label={'名字'}
          error={httpManager.name === ''}
          helperText={httpManager.name === '' ? 'name 不能为空' : undefined}
          onChange={(event) => {
            httpManager.name = event.target.value;
            httpArray.update();
          }}
        />
        <TagsForm className={style.div} onSelectedTasChanges={setSelectedTags} selectedTags={selectedTags} />
      </div>
    </Dialog>
  );
}
