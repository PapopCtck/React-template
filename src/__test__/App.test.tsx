import { render } from './test-utils';
import App from '../App';


test('render without crashing',async () => {
  render(<App />);
});
