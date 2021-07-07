export function setupI18nMock(): void {
  jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate HoC receive the t function as a prop
    withTranslation: () => (Component: { defaultProps: any; }) => {
      Component.defaultProps = { ...Component.defaultProps, t: () => '' };
      return Component;
    },
    useTranslation: () => ({
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => null),
      },
    }),
  }));
}
