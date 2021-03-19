import { ReactElement, Suspense } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';

import defaultTheme from './themes/default';
import { GlobalStyle } from './components';
import commonConstant from './common/commonConstant';
import { history, ErrorBoundary } from './utils';
import { Home } from './pages';
import { useLineLiff } from './hooks';

function App(): ReactElement {
  useLineLiff();
  return (
    <div className="App">
      <GlobalStyle theme={defaultTheme} />
      <Router history={history}>
        <ThemeProvider theme={defaultTheme}>
          <ErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route path={commonConstant.pathHome} component={Home} />
              </Switch>
            </Suspense>
          </ErrorBoundary>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
