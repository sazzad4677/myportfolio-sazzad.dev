import { Route, Routes } from "react-router-dom";
import "./App.css";
import NoMatchRoute from "./component/NoMatchRoute/NoMatchRoute";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App bg-libertyBlue">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NoMatchRoute />} />
      </Routes>
    </div>
  );
}

export default App;
