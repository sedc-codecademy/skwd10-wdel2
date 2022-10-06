import "./App.css";
import Header from "./components/Header/Header";

function App() {
  const name = "Ivan Lazarevski";
  const url = "https://reactjs.org/";
  return (
    <>
    <Header />
      <h1>Hello, {name}</h1>
      <a className="link-tag" href={url}>
        Visit React
      </a>
    </>
  );
}

export default App;
