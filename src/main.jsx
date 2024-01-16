import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";
import ScrollToTop from "./utils/ScrollToTop";

import { companyLogo } from "./static/imagesB2B/index.js";
import { config } from "./constants.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <ScrollToTop />
      <Suspense
        fallback={
          <div
            // style={{
            //   "background-image":
            //     "radial-gradient( circle 800px at 50% 50%,  #4b6cb7 0%, #182848 100.2% )",
            // }}
            className="w-full h-[100vh] "
          >
            <div className="h-full w-full flex justify-center items-center">
              <img
                src={config.COMPANY_LOGO}
                alt="Logo"
                className="object-contain w-60"
              />
            </div>
          </div>
        }
      >
        <App />
      </Suspense>
    </Router>
  </Provider>
);
