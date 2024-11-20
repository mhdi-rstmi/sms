import { Routes, Route } from "react-router-dom";
import { Dashboard, Login } from "./components";
import CourseDetails from "./components/dashboard/professor/CourseDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/course/:courseId" element={<CourseDetails />} />
    </Routes>
  );
}

export default App;