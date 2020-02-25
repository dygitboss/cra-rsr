import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import Test from './components/Test/Test';

const App = () => (
  <Provider store={store}>
    <Test />
  </Provider>
);

export default App;
