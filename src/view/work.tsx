import React from 'react';
import MyDrawer from '../components/myDrawer';
import { createStyles, Tabs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import WorkPanel from '../components/work/workPanel';
import { useHttpArray } from '../util/store/httpArray';
import { useWorkIndex } from '../util/store/workIndex';
import { TabPanelHidden } from '../components/common/tabPanel';
import WorkTab from '../components/work/workTab';

const useStyle = makeStyles(() =>
  createStyles({
    main: {
      display: 'flex',
      flexDirection: 'column',
    },
    tabs: {
      flex: '0 0 auto',
      width: '100%',
    },
    panel: {
      flex: '1 1 0',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      maxHeight: 'calc(100% - 48px)',
    },
    speedDial: {
      position: 'fixed',
      right: 20,
      bottom: 20,
      zIndex: 100,
    },
  }),
);

export default function Work(): JSX.Element {
  const [workIndex] = useWorkIndex();
  const style = useStyle();
  const [httpArray] = useHttpArray();
  return (
    <MyDrawer className={style.main}>
      <Tabs
        className={style.tabs}
        value={workIndex}
        variant="scrollable"
        scrollButtons="on"
        indicatorColor="primary"
        textColor="primary"
      >
        {httpArray.map((item, index) => (
          <WorkTab index={index} httpManager={item} key={index} />
        ))}
      </Tabs>
      {httpArray.map((item, index) => (
        <TabPanelHidden className={style.panel} key={index} index={workIndex} value={index}>
          <WorkPanel http={item} />
        </TabPanelHidden>
      ))}
    </MyDrawer>
  );
}