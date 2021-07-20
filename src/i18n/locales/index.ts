import tha from './common.json';
import eng from './common.en.json';
import homeTH from '@/pages/Home/locales/home.json';
import homeEN from '@/pages/Home/locales/home.en.json';

const th: Record<string,Record<string,unknown>> = <Record<string,Record<string,unknown>>> tha;
const en: Record<string,Record<string,unknown>> = <Record<string,Record<string,unknown>>> eng;

th.home = homeTH;
en.home = homeEN;

export {
  th,
  en,
};
