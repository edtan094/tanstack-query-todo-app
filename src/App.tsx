import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Task from "./Task";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path=""
          element={
            <ErrorBoundary fallback={<div>Error loading tasks</div>}>
              <Suspense fallback={<div>Loading tasks...</div>}>
                <Home />
              </Suspense>
            </ErrorBoundary>
          }
        />
        <Route
          path="/tasks/:id"
          element={
            <ErrorBoundary fallback={<div>Error loading task</div>}>
              <Suspense fallback={<div>Loading task...</div>}>
                <Task />
              </Suspense>
            </ErrorBoundary>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
