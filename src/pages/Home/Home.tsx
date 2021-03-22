import { Component, ReactNode } from 'react';
import { Header } from '@/components';

class Home extends Component {
  render(): ReactNode {
    return (
      <div> 
        <Header onLogin={() => null} onLogout={() => null} onCreateAccount={() => null} />
        Welcome to React
      </div>
    );
  }
}

export default Home;
