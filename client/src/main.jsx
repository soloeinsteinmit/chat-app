import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// import { Provider } from "react-redux";
// import store from "@app/store.js";
import { AuthContextProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  // <Provider store={store}>
  <>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </>

  // </Provider>
);
