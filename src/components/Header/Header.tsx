import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../Button';
import Select from '../Select';
import { IHeader } from './Header.interfaces';
import { StyledHeader } from './Header.styles';

export const Header = ({ user, onLogin, onLogout, onCreateAccount }: IHeader): ReactElement => {
  const { t, i18n } = useTranslation('common');
  return (<StyledHeader>
    <div className="wrapper">
      <div className="app-name">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fillRule="evenodd">
            <path
              d="M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z"
              fill="#FFF"
            />
            <path
              d="M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z"
              fill="#555AB9"
            />
            <path
              d="M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z"
              fill="#91BAF8"
            />
          </g>
        </svg>
        <h1>{t('App name')}</h1>
      </div>

      <Select onChange={e => i18n.changeLanguage(e.target.value)} value={i18n.language} containerStyle={{ marginRight: '10px' }} block>
        <option value="th">TH - ภาษาไทย</option>
        <option value="en">EN - english</option>
      </Select>
      <div>
        {user ? (
          <Button size="small" onClick={onLogout} label={t('Log out')} />
        ) : (
          <>
            <Button size="small" onClick={onLogin} label={t('Log in')} />
            <Button buttonType="primary" size="small" onClick={onCreateAccount} label={t('Sign up')} />
          </>
        )}
      </div>
    </div>
  </StyledHeader>
  );};
