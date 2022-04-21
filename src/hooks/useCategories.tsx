import { createContext, ReactNode, useContext, useState } from "react";

type CategoriesProviderProps = {
  children: ReactNode;
}

type CategoryInfo = {
  emojiID: string;
  content: string;
  bgColor: string;
  textColor: string;
}

type UseCategoriesType = {
  newCategoryState: {
    categoryInfo: CategoryInfo;
    setCategoryInfo: (data: CategoryInfo) => void;
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
  const [categoryInfo, setCategoryInfo] = useState({
    bgColor: "#ffffff",
    textColor: "#000000",
    content: "",
    emojiID: "croissant"
  });

  const [newCategoryModalIsOpen, setNewCategoryModalIsOpen] = useState(false);
  const [allCategories, setAllCategories] = useState<CategoryInfo[]>([]);

  function refreshLocalCategory() {
    let currentData = JSON.parse(localStorage.getItem("@to-do-list") || "[]");

    setAllCategories(currentData);
  }

  function createLocalCategory(data: CategoryInfo) {
    try {
      let currentData = JSON.parse(localStorage.getItem("@to-do-list") || "[]");

      currentData.push(data);

      localStorage.setItem("@to-do-list", JSON.stringify(currentData));

      setAllCategories(currentData);

      setCategoryInfo({
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
      newCategoryState: {categoryInfo, setCategoryInfo},
      modalOpen: { newCategoryModalIsOpen, setNewCategoryModalIsOpen },
      createLocalCategory,
      allCategories,
      refreshLocalCategory
    }}>
      { children }
    </CategoriesContext.Provider>
  );
}


export function useCategories() {
  const context = useContext(CategoriesContext);

  return context;
}