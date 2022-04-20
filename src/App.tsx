import { Header } from "./components/Header";
import { MainContent } from "./components/MainContent";
import { Categories } from "./components/Categories";

import { GlobalCss } from "./styles/global";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Header />

      <MainContent>
        <Routes>
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </MainContent>
      
      <GlobalCss />
    </>
  );
}

export default App;
