import { cloneElement, ComponentType, ReactElement, ReactNode } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

interface IRoutesProps {
  children: ReactElement,
  notFoundComponent: ComponentType,
}

export const Routes = ({ children, notFoundComponent, ...rest }: IRoutesProps): ReactNode => <Route {...rest} render={({ match: { url } }) => (
  <Switch>
    {
      Array.isArray(children) ?
        children.map(child => cloneElement(child, { path: `${url}${child.props.path}` }))
        : cloneElement(children, { path: `${url}${children.props.path}` })
    }
    {
      notFoundComponent && <Route component={notFoundComponent} />
    }
  </Switch>
)} />;

Routes.propTypes = {
  children: PropTypes.node,
  notFoundComponent: PropTypes.element,
};
