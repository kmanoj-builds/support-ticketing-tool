import { Provider } from "react-redux";
import { RouterProvider } from "react-router/dom";

import { store } from "./app/store";
import { appRouter } from "./routes/router";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;