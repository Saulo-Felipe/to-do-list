import { createContext, ReactNode, useContext, useState } from "react";
import { v4 as uuid } from "uuid";


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

  return (
    <CategoriesContext.Provider value={{
      newCategoryState: {previewNewCategory, setPreviewNewCategory},
      modalOpen: { newCategoryModalIsOpen, setNewCategoryModalIsOpen },
      createLocalCategory,
      allCategories,
      refreshLocalCategory,
    }}>
      { children }
    </CategoriesContext.Provider>
  );
}


export function useCategories() {
  const context = useContext(CategoriesContext);

  return context;
}