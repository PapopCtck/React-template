import { ReactElement } from 'react';
import { Header, IHeader } from '@/components';
import './page.css';

export interface PageProps {
  user?: Record<string,unknown>;
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
}

export const Page = ({ user, onLogin, onLogout, onCreateAccount }: IHeader): ReactElement => (
  <article>
    <Header user={user} onLogin={onLogin} onLogout={onLogout} onCreateAccount={onCreateAccount} />
    <section>
      <h2>Pages in Storybook</h2>
    </section>
  </article>
);
