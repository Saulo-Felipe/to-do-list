import { createContext, ReactNode, useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { v4 as uuid } from "uuid";
import { Task } from "../components/Tasks";
import { api } from "../services/api";
import { getToken } from "../tools/getToken";


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
  previewNewCategory: CategoryInfo;
  setPreviewNewCategory: (data: CategoryInfo) => void;
  newCategoryModalIsOpen: boolean;
  setNewCategoryModalIsOpen: (open: boolean) => void;
  allCategories: CategoryInfo[];
  setAllCategories: (args: CategoryInfo[]) => void;
  tools: () => {
    createCategory: () => void,
    refreshCategories: () => void,
    deleteCategory: (arg: string) => void
  }
}

type ServerCategory = {
  PkUserId: number;
  backgroundColor: string;
  contentColor: string;
  iconId: string;
  id: number;
  name: string;
}

type AllCategories = {
  data: {
    success: boolean;
    error: boolean;
    message: string;
    categories: ServerCategory[];
  }
}

type DeletedCategoryData = {
  data: {
    success: boolean;
    error: boolean;
    message: string;
  }
}


const CategoriesContext = createContext({} as UseCategoriesType);

export function CategoriesProvider({ children }: CategoriesProviderProps) {
  const [previewNewCategory, setPreviewNewCategory] = useState({
    categoryID: "",
    bgColor: "#0045a0",
    textColor: "#ffffff",
    content: "",
    emojiID: "book"
  });

  const [newCategoryModalIsOpen, setNewCategoryModalIsOpen] = useState(false);
  const [allCategories, setAllCategories] = useState<CategoryInfo[]>([]);


  function refreshLocalCategories() {
    let currentData = JSON.parse(localStorage.getItem("@to-do-list/categories") || "[]");

    setAllCategories(currentData);
  }
  async function refreshCategories() {
    let {data}: AllCategories = await api.post("/get-categories");

    if (!data.success)
      return toast.error(data.message);

    let newValues: CategoryInfo[] = [];
    for (var c = 0; c < data.categories.length; c++) {
      const index = data.categories[c];

      newValues.push({
        categoryID: String(index.id),
        bgColor: index.backgroundColor,
        textColor: index.contentColor,
        content: index.name,
        emojiID: index.iconId
      });
    }

    setAllCategories(newValues);
  }

  function createLocalCategory() {    
    let currentData = JSON.parse(localStorage.getItem("@to-do-list/categories") || "[]");

    currentData.push({...previewNewCategory, categoryID: uuid()});

    localStorage.setItem("@to-do-list/categories", JSON.stringify(currentData));

    setAllCategories(currentData);

    setPreviewNewCategory({
      categoryID: "",
      bgColor: "#0045a0",
      textColor: "#ffffff",
      content: "",
      emojiID: "book"
    });
    
    setNewCategoryModalIsOpen(false);
    refreshLocalCategories();
  }
  async function createCategory() {
    const {data} = await api.post("/create-category", { ...previewNewCategory });

    toast.success(data.message, { autoClose: 3000 });

    if (data.success) {
      setPreviewNewCategory({
        categoryID: "",
        bgColor: "#0045a0",
        textColor: "#ffffff",
        content: "",
        emojiID: "book"
      })
      setNewCategoryModalIsOpen(false);
      refreshCategories();
    }
  }
  
  function deleteLocalCategory(categoryID: string) {
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
    refreshLocalCategories();
  }
  async function deleteCategory(categoryId: string) {
    const { data }: DeletedCategoryData | any = await api.post("/delete-category", {categoryId})

    if (data.error)
      return toast.error(data.message, { autoClose: 2000 })

    toast.success(data.message, { autoClose: 2000 });

    refreshCategories();
  }

  function tools() {
    if (getToken())
      return {
        createCategory,
        refreshCategories,
        deleteCategory
      }
    else
      return {
        createCategory: createLocalCategory,
        refreshCategories: refreshLocalCategories,
        deleteCategory: deleteLocalCategory,
      }
  }



  return (
    <CategoriesContext.Provider value={{
      previewNewCategory,
      setPreviewNewCategory,
      newCategoryModalIsOpen,
      setNewCategoryModalIsOpen,
      allCategories,
      setAllCategories,
      tools
    }}>
      <>
        { children }
        <ToastContainer />
      </>
    </CategoriesContext.Provider>
  );
}


export function useCategories() {
  const context = useContext(CategoriesContext);

  return context;
}