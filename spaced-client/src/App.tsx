import React from "react";
import Wrapper from "./router/MainRouter";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import BaseStyles from "./newStyles/BaseStyles";
import NormalizeStyles from "./newStyles/NormalizeStyles";

function App() {
  return (
    <Provider store={store}>
      <BaseStyles />
      <NormalizeStyles />
      <Wrapper />
    </Provider>
  );
}

export default App;
