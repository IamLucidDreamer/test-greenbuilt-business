// Importing Context From Redux
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./sourceCode/store/store";

// Importing Ant Design System
import "antd/dist/antd.css";
import "./sourceCode/assets/styles/main.css";
import "./sourceCode/assets/styles/responsive.css";

// Importing Toast for Notifications
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Importing Components
import { Navigation } from "./sourceCode/features/navigation/Index";
import { Button } from "antd";

function App() {
  return (
    <Provider store={store}>
      {/* ToastContainer is Controlling all the Notifications  */}
      <ToastContainer />
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
