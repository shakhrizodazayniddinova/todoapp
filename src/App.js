import { Provider } from "react-redux";
import Template from "./components/Templates/Template/Template";
import store from "./redux/reducers/rootReducer";

function App() {
  return (
    // redux store provider
    <Provider store={store}>
        <Template/>
    </Provider>
  );
}

export default App;