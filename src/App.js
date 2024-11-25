import { Provider } from "react-redux";
import Template from "./components/Templates/Template/Template";
import store from "./redux/reducers/rootReducer";
import { Fade } from "react-awesome-reveal";

function App() {
  return (
    // redux store provider
    <Provider store={store}>
        <Fade>
          <Template/>
        </Fade>
    </Provider>
  );
}

export default App;