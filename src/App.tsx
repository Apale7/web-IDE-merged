import "./App.css";
import RouterComponent from "./routes/routes";

function App() {
  document.title = '在线IDE v0.1'
  return (
    <div className="App">
      <RouterComponent></RouterComponent>
    </div>
  );
}

export default App;
