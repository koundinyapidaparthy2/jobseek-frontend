import { Provider } from "react-redux";
import store from "./store/store";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}
