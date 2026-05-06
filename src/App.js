import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProjectPage from "./pages/ProjectPage";
import TaskPage from "./pages/TaskPage";
import "./App.css";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/projects" element={<ProjectPage />} />

        <Route path="/tasks" element={<TaskPage />} />

      </Routes>

    </BrowserRouter>

  );
}

export default App;