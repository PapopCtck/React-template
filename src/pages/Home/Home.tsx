import { Component, ReactNode } from 'react';
import { Header } from '../../components';

import { WithTranslation, withTranslation } from 'react-i18next';
class Home extends Component<WithTranslation> {
  render(): ReactNode {
    const { t } = this.props;
    return (
      <div> 
        <Header onLogin={() => null} onLogout={() => null} onCreateAccount={() => null} />
        {t('Welcome to React')}
      </div>
    );
  }
}

export default withTranslation('home')(Home);
