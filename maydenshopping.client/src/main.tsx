import { StrictMode } from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store.tsx";
import { BrowserRouter } from "react-router-dom";

export const ServerURL = "https://localhost:7131/";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"),
);
