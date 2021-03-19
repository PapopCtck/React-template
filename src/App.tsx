import { ReactElement, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
import liff from '@line/liff';
import { ThemeProvider } from '@emotion/react';

import defaultTheme from './themes/default';
import { setProfile } from './stores/actions';
import { GlobalStyle } from './components';
import commonConstant from './common/commonConstant';
import { history, ErrorBoundary } from './utils';
import { Home } from './pages';

function App(): ReactElement {
  const dispatch = useDispatch();
  // useLayoutEffect(() => {
  //   if (commonConstant.liffId){
  //     liff.init({ liffId: commonConstant.liffId },() => {
  //       if (!liff.isLoggedIn()) {
  //         liff.login();
  //       }
  //       liff.getProfile()
  //         .then(profile => {
  //           dispatch(setProfile(profile));
  //         });
  //     },() => {
  //       alert('Something went wrong, Please try again later');
  //     });
  //   }
  // }, []);

  return (
    <div className="App">
      <GlobalStyle theme={defaultTheme} />
      <Router history={history}>
        <ThemeProvider theme={defaultTheme}>
          <ErrorBoundary>
            <Switch>
              <Route path={commonConstant.pathHome} component={Home} />
            </Switch>
          </ErrorBoundary>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
