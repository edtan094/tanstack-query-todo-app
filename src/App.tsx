import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Task from "./Task";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/tasks/:id" element={<Task />} />
      </Routes>
    </div>
  );
}

export default App;
