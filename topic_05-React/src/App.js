import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import TodoRoutes from "./pages/Todos/TodoRoutes";

function App() {
  // const name = "Ivan Lazarevski";
  // const url = "https://reactjs.org/";
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos/*" element={<TodoRoutes />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
