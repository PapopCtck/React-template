import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { th,en } from './locales';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: en,
  th: th,
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'th',
    fallbackLng: 'th',
    keySeparator: false, // we do not use keys in form messages.welcome
    ns: ['common','home'],
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
