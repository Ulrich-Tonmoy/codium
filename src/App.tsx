import SideBar from "./components/SideBar";
import TitleBar from "./components/TitleBar";
import { SourceProvider } from "./context/SourceContext";

function App() {
  return (
    <div className="wrapper">
      <TitleBar />
      <div
        id="editor"
        className="flex items-start h-screen overflow-hidden bg-primary"
      >
        <SourceProvider>
          <SideBar />
        </SourceProvider>
      </div>
    </div>
  );
}

export default App;
