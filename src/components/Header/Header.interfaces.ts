export interface IHeader {
  user?: Record<string,unknown>;
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
}
