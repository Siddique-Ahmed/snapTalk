import "./App.css";
import DarkMoodContext from "./Context/DarkMoodContext";
import Layout from "./Layout/Layout";

function App() {
  return (
    <DarkMoodContext>
      <Layout />
    </DarkMoodContext>
  );
}

export default App;
