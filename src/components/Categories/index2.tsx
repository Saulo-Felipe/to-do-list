import {
  CategoriesHeader,
  CategoriesContent,
  WithoutCategories,
} from "./styles2";

import { useEffect, useState } from "react";
import { CategoryCard } from "./CategoryCard";
import 'emoji-mart/css/emoji-mart.css';
import { Picker, Emoji } from 'emoji-mart';
import { NewCategoryModal } from "./NewCategoryModal";
import { useCategories } from "../../hooks/useCategories";

import Plane from "../../assets/plane.svg";
import Folder from "../../assets/folder.svg";
import OptionsStruct from "../../assets/optionsStruct.svg";


export function Categories() {
  const {newCategoryModalIsOpen, setNewCategoryModalIsOpen} = useCategories().modalOpen;
  const { allCategories, refreshLocalCategory } = useCategories();

  useEffect(() => {
    refreshLocalCategory();
  }, [])

  return (
    <>
      <CategoriesHeader>
        <div>
          <h1>Categorias</h1>

          <img src={OptionsStruct} alt="Estrutura das opções" />
        </div>

        <hr />
      </CategoriesHeader>

      <CategoriesContent>
        {
          allCategories.map((card, index) => {
            return (
              <CategoryCard key={index} data={{
                isModel: false,
                categoryID: card.categoryID,
                bgColor: card.bgColor,
                textColor: card.textColor,
                content: card.content,
                emojiID: card.emojiID
              }} />
            );
          })
        }

        <div className="new-category-card" onClick={() => setNewCategoryModalIsOpen(true)}>
          <img src={Folder} alt="nova categoria "/>
        </div>
      </CategoriesContent>

      {
        allCategories.length === 0 ?
          <WithoutCategories>
            <img src={Plane} alt="Falta de categorias (icone)" />
            <h1>Nenhuma categoria adicionada, adicione uma nova!</h1>
          </WithoutCategories>
        : <></>
      }

      <NewCategoryModal />
    </>
  );
}