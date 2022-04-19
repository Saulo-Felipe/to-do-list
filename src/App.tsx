import { GlobalCss } from "./styles/global";
import { Header } from "./components/Header";
import { MainContent } from "./components/MainContent";

function App() {
  return (
    <>
      <Header />

      <MainContent />
      
      <GlobalCss />
    </>
  );
}

export default App;
