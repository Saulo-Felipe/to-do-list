import { createContext, ReactNode, useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { Task } from "../components/Tasks";


type CategoriesProviderProps = {
  children: ReactNode;
}

export type CategoryInfo = {
  categoryID: string;
  emojiID: string;
  content: string;
  bgColor: string;
  textColor: string;
}

type UseCategoriesType = {
  newCategoryState: {
    previewNewCategory: CategoryInfo;
    setPreviewNewCategory: (data: CategoryInfo) => void;
  },
  modalOpen: {
    newCategoryModalIsOpen: boolean;
    setNewCategoryModalIsOpen: (open: boolean) => void;
  },
  createLocalCategory: (data: CategoryInfo) => void;
  allCategories: CategoryInfo[];
  refreshLocalCategory: () => void;
  deleteLocalCategory: (categoryID: string) => void;
  createCategory: (category: CategoryInfo) => void;
}



const CategoriesContext = createContext({} as UseCategoriesType);

export function CategoriesProvider({ children }: CategoriesProviderProps) {
  const [previewNewCategory, setPreviewNewCategory] = useState({
    categoryID: "",
    bgColor: "#ffffff",
    textColor: "#000000",
    content: "",
    emojiID: "croissant"
  });

  const [newCategoryModalIsOpen, setNewCategoryModalIsOpen] = useState(false);
  const [allCategories, setAllCategories] = useState<CategoryInfo[]>([]);

  function refreshLocalCategory() {
    let currentData = JSON.parse(localStorage.getItem("@to-do-list/categories") || "[]");

    setAllCategories(currentData);
  }

  function createLocalCategory(data: CategoryInfo) {
    try {
      let currentData = JSON.parse(localStorage.getItem("@to-do-list/categories") || "[]");

      currentData.push({...data, categoryID: uuid()});

      localStorage.setItem("@to-do-list/categories", JSON.stringify(currentData));

      setAllCategories(currentData);

      setPreviewNewCategory({
        categoryID: "",
        bgColor: "#ffffff",
        textColor: "#000000",
        content: "",
        emojiID: "croissant"
      })
      setNewCategoryModalIsOpen(false);

      return true;
    }
    catch(e) {
      alert("Erro ao adicionar categoria. Entre na sua conta e adicione a categoria novamente.")
      return false;
    }
  }

  function deleteLocalCategory(categoryID: string) {
    try {
      let categories: CategoryInfo[] = JSON.parse(localStorage.getItem("@to-do-list/categories") || "[]");
      let tasks: Task[] = JSON.parse(localStorage.getItem("@to-do-list/categories") || "[]");

      for (let c = 0; c < categories.length; c++) {
        if (categories[c].categoryID === categoryID) {
          categories.splice(c, 1);

          localStorage.setItem("@to-do-list/categories", JSON.stringify(categories));
          break;
        }
      }

      for (let c = 0; c < tasks.length; c++) {
        if (tasks[c].categoryID === categoryID) {
          tasks.splice(c, 1);
        }
      }

      localStorage.setItem("@to-do-list/tasks", JSON.stringify(tasks));
    }
    catch(e) {
      alert("Erro ao adicionar categoria. Entre na sua conta e adicione a categoria novamente.")
      return false;
    }
  }

  function createCategory(category: CategoryInfo) {
    console.log("categoria: ", category);
  }

  return (
    <CategoriesContext.Provider value={{
      newCategoryState: {previewNewCategory, setPreviewNewCategory},
      modalOpen: {newCategoryModalIsOpen, setNewCategoryModalIsOpen},
      createLocalCategory,
      allCategories,
      refreshLocalCategory,
      deleteLocalCategory,

      createCategory,
    }}>
      { children }
    </CategoriesContext.Provider>
  );
}


export function useCategories() {
  const context = useContext(CategoriesContext);

  return context;
}