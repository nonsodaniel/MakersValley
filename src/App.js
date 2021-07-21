
import React from "react";
import Container from "./components/container/Container";
import { Provider } from "react-redux";
import store from './store/store'
import { BrowserRouter } from "react-router-dom";
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <div className="app">
        <Container />
      </div>
      </BrowserRouter> 
      </Provider>
  );
};

export default App;
