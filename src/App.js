import "./App.css";
import DataDisplay from "./Components/DataDisplay";

function App() {
  return (
    <div className="App">
      <DataDisplay identifierType="email" identifier="im-aj@comcast.net" />
    </div>
  );
}

export default App;
