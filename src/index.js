import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore'
import ReactDOM from 'react-dom';
import Router from './navigation/router' 

const store= configureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
