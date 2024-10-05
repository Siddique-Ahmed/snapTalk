import { ToastContainer } from "react-toastify";
import "./App.css";
import DarkMoodContext from "./Context/DarkMoodContext";
import Layout from "./Layout/Layout";

function App() {
  return (
    <DarkMoodContext>
      <ToastContainer />
      <Layout />
    </DarkMoodContext>
  );
}

export default App;
