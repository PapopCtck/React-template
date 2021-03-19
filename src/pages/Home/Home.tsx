import { Component, ReactNode } from 'react';
import { Header } from '../../components';

export class Home extends Component {
  render(): ReactNode {
    return (
      <div> 
        <Header onLogin={() => null} onLogout={() => null} onCreateAccount={() => null} />
        Home
      </div>
    );
  }
}

export default Home;
