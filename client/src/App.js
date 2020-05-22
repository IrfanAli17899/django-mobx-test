import React from 'react';
import './App.css';
import Router from './router';
import store from './store';
import { Provider } from 'mobx-react';

function App() {
  return (
    <div className="App">
      <Provider {...store}>
        <Router />
      </Provider>
    </div>
  );
}

export default App;
