import { render } from '../../utils/test';
import App from './App';
import 'antd/dist/antd.css';

test('mounts to the DOM', () => {
  render(<App />);
  const layout = document.querySelector('.ant-layout');
  expect(layout).toBeInTheDocument();
});
