import "./App.css";
import DataDisplay from "./Components/DataDisplay";

function App() {
  return (
    <div className="App">
      <DataDisplay identifierType="email" identifier="lloyd@lloydjsmith.com" />
    </div>
  );
}

export default App;
