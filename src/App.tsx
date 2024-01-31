import { CodeArea, SideBar, TitleBar } from "@/components";
function App() {
  return (
    <div className="wrapper">
      <TitleBar />
      <div id="editor" className="flex items-start h-screen overflow-hidden bg-primary">
        <SideBar />
        <CodeArea />
      </div>
    </div>
  );
}

export default App;
