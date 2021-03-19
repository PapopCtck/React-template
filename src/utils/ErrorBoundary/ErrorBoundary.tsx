import { Component, ErrorInfo } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import commonConstant from '../../common/commonConstant';

class ErrorBoundary extends Component<RouteComponentProps> {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.history.push(commonConstant.pathError500, { error, errorInfo }); 
  }

  render() {
    return this.props.children; 
  }
}

export default withRouter(ErrorBoundary);
