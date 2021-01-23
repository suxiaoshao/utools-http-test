import React, { useEffect } from 'react';
import './app.scss';
import { getDataFile } from './util/local';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Sponsorship from './view/sponsorship';
import Work from './view/work';
import { MyThemeProvider } from './components/myTheme';
import CookiePage from './view/cookiePage';
import HistoryPage from './view/historyPage';

export default function App(): JSX.Element {
  useEffect(() => {
    console.log(getDataFile());
  }, []);
  return (
    <Router>
      <MyThemeProvider>
        <Switch>
          <Route path="/" exact>
            <Work />
          </Route>
          <Route path="/sponsorship" exact>
            <Sponsorship />
          </Route>
          <Route path="/cookies" exact>
            <CookiePage />
          </Route>
          <Route path="/history" exact>
            <HistoryPage />
          </Route>
        </Switch>
      </MyThemeProvider>
    </Router>
  );
}
