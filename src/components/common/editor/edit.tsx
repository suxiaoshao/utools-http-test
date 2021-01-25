import React from 'react';
import { editor } from 'monaco-editor';
import monankai from './monankai';

editor.defineTheme('monankai', monankai);

export default function Edit(
  props:
    | {
        className?: string;
        code: string;
        language: string;
        onChangeCode(newCode: string): void;
        readonly?: false;
      }
    | {
        className?: string;
        code: string;
        language: string;
        readonly: true;
      },
): JSX.Element {
  const editRef = React.useRef<HTMLDivElement>(null);
  const [edit, setEdit] = React.useState<editor.IStandaloneCodeEditor | undefined>();
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
  React.useEffect(() => {
    return () => {
      edit?.dispose();
    };
  }, [edit]);
  React.useEffect(() => {
    if (!props.readonly) {
      edit?.onMouseLeave(() => {
        props.onChangeCode(edit?.getValue());
      });
    }
    // eslint-disable-next-line
  }, [edit, props.readonly]);
  React.useEffect(() => {
    if (props.code !== edit?.getValue()) {
      edit?.setValue(props.code);
    }
  }, [edit, props.code]);
  React.useEffect(() => {
    edit?.setModel(editor.createModel(props.code, props.language));
    // eslint-disable-next-line
  }, [edit, props.language]);
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
