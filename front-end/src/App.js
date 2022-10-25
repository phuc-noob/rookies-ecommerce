import './assets/styles/App.css';
import { Routes, Route } from "react-router-dom";
import "font-awesome/css/font-awesome.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardLayout from "./pages/home/HomeLayout";
import HomePage from "./pages/home/HomePage";

function App() {
  return (
    <Routes>
			<Route path="/" element={<DashboardLayout />}>
				<Route path="/" element={<HomePage />} />
			</Route>
		</Routes>
  );
}

export default App;
