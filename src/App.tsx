import { Header } from "./components/Header";
import { MainContent } from "./components/MainContent";
import { Categories } from "./components/Categories";
import { Tasks } from "./components/Tasks";

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
            
            <Route path=":categoryID/tasks" element={<Tasks />} />

          </Routes>
        </MainContent>
      </CategoriesProvider>
        
      <GlobalCss />
    </>
  );
}

export default App;
