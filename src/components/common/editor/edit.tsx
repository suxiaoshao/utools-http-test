import React from 'react';
import { editor } from 'monaco-editor';
import monankai from './monankai';

editor.defineTheme('monankai', monankai);

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 可写情况下的 editProp
 * */
export interface NotReadOnlyEditProp {
  /**
   * 编辑器组建的类名
   * */
  className?: string;
  /**
   * 要显示的代码字符串
   * */
  code: string;
  /**
   * 使用哪种语言显示
   * */
  language: string;
  /**
   * 是否只读
   * */
  readonly?: false;

  /**
   * 当编辑器代码改变时触发的方法
   * */
  onChangeCode(newCode: string): void;
}

export interface ReadOnlyEditProp {
  /**
   * 编辑器组建的类名
   * */
  className?: string;
  /**
   * 要显示的代码字符串
   * */
  code: string;
  /**
   * 使用哪种语言显示
   * */
  language: string;
  /**
   * 是否只读
   * */
  readonly: true;
}

/**
 * @author sushao
 * @version 0.2.2
 * @since 0.2.2
 * @description 编辑器组件
 * */
export default function Edit(props: NotReadOnlyEditProp | ReadOnlyEditProp): JSX.Element {
  /**
   * 编辑器绑定的 dom 的引用
   * */
  const editRef = React.useRef<HTMLDivElement>(null);
  /**
   * 编辑器实体
   * */
  const [edit, setEdit] = React.useState<editor.IStandaloneCodeEditor | undefined>();
  /**
   * 编辑器要绑定的 dom 生成时,再这个 dom 上新建一个编辑器,并赋值给 edit
   * */
  React.useEffect(() => {
    if (editRef.current !== null) {
      setEdit(
        editor.create(editRef?.current, {
          value: props.code,
          theme: 'vs-dark',
          automaticLayout: true,
          language: props.language,
          fontSize: 16,
          minimap: {
            enabled: false,
          },
          readOnly: props.readonly,
        }),
      );
    }
    // eslint-disable-next-line
  }, [editRef]);
  /**
   * 编辑器退出时,使用 editor 的方法注销编辑器
   * */
  React.useEffect(() => {
    return () => {
      edit?.dispose();
    };
  }, [edit]);
  /**
   * props.readonly 改变时修改编辑器的只读属性
   * */
  React.useEffect(() => {
    if (!props.readonly) {
      edit?.onMouseLeave(() => {
        props.onChangeCode(edit?.getValue());
      });
    }
    // eslint-disable-next-line
  }, [edit, props.readonly]);
  /**
   * props.code 改变时,如果 props.code和编辑器本身储存的 code 不一样,则重设编辑器的值
   * */
  React.useEffect(() => {
    if (props.code !== edit?.getValue()) {
      edit?.setValue(props.code);
    }
  }, [edit, props.code]);
  /**
   * props.language改变时,重设编辑器的语言
   * */
  React.useEffect(() => {
    edit?.setModel(editor.createModel(props.code, props.language));
    // eslint-disable-next-line
  }, [edit, props.language]);
  /**
   * 以上任意一值改变时,观察是否是只读的,如果是:自动格式化代码
   * */
  React.useEffect(() => {
    if (props.readonly) {
      window.setTimeout(() => {
        edit?.updateOptions({
          readOnly: false,
        });
        edit?.trigger('anyString', 'editor.action.formatDocument', '');
        window.setTimeout(() => {
          edit?.updateOptions({
            readOnly: true,
          });
        }, Math.max(props.code.length / 50, 300));
      }, 100);
    }
  }, [edit, props.code, props.language, props.readonly]);
  return <div className={props.className} ref={editRef} />;
}
