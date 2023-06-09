import CodeArea from "./components/CodeArea";
import SideBar from "./components/SideBar";
import TitleBar from "./components/TitleBar";

function App() {
  return (
    <div className="wrapper">
      <TitleBar />
      <div
        id="editor"
        className="flex items-start h-screen overflow-hidden bg-primary"
      >
        <SideBar />
        <CodeArea />
      </div>
    </div>
  );
}

export default App;
