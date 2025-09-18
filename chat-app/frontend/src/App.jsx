import { Routes, Route } from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ChatDashBoard from "./pages/ChatDashBoard";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <ChatDashBoard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
