import { Header } from "./components/Header";
import { Categories } from "./components/Categories";
import { Tasks } from "./components/Tasks";
import { Routes, Route } from "react-router-dom";
import { CategoriesProvider } from "./hooks/useCategories";
import { NotFound } from "./components/NotFound";

import { GlobalCss } from "./styles/global";
import "react-toastify/dist/ReactToastify.css";
import "emoji-mart/css/emoji-mart.css";


export default function App() {
  return (
    <>
      <CategoriesProvider>

        <Header />

        <Routes>
          <Route path="/categories" element={<Categories />}/>
          
          <Route path=":categoryID/tasks" element={<Tasks />} />

          <Route path="*" element={<NotFound />} />

        </Routes>
      </CategoriesProvider>
        
      <GlobalCss />
    </>
  );
}
