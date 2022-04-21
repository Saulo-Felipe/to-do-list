import { Header } from "./components/Header";
import { MainContent } from "./components/MainContent";
import { Categories } from "./components/Categories";

import { CategoriesProvider } from "./hooks/useCategories";

import { GlobalCss } from "./styles/global";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <CategoriesProvider>

        <Header />

        <MainContent>
          <Routes>
            
            <Route path="/categories" element={<Categories />}/>

          </Routes>
        </MainContent>
      </CategoriesProvider>
        
      <GlobalCss />
    </>
  );
}

export default App;
