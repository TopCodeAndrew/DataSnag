import "./App.css";
import DataDisplay from "./Components/DataDisplay";
import routes from "./routes";

function App() {
  return (
    <div className="App">
      {routes}
      {/* <DataDisplay identifierType="email" identifier={"andrew@gmail.com"} /> */}
    </div>
  );
}

export default App;
