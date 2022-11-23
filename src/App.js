import Navbar from "./Components/Navbar";
import { Create } from "./Components/Create";
import { Interview } from "./Components/Interview";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import { Change } from "./Components/Change";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<Interview />} />
          <Route path={"/create"} element={<Create />} />
          <Route path={"/change"} element={<Change />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
