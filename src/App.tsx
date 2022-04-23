import { Header } from "./components/Header";
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

        <Routes>
          <Route path="/categories" element={<Categories />}/>
          
          <Route path=":categoryID/tasks" element={<Tasks />} />

        </Routes>
      </CategoriesProvider>
        
      <GlobalCss />
    </>
  );
}

export default App;
