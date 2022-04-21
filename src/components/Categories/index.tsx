import { 
  CategoriesHeader, 
  CategoriesContent, 
  WithoutCategories, 
} from "./styles";

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

  return (<>{
    allCategories.length > 0 
    ? <>
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
                bgColor: card.bgColor,
                textColor: card.textColor,
                content: card.content,
                emojiID: card.emojiID
              }} />
            );
          })
        }
      </CategoriesContent>        
    </>
    :
    <WithoutCategories>
      <div>
        <img src={Plane} alt="Falta de categorias (icone)" />
        <h1>Nenhuma categoria adicionada, adicine uma nova!</h1>
      </div>

      <div onClick={() => setNewCategoryModalIsOpen(true)}>
        <img src={Folder} alt="nova categoria "/>
      </div>
    </WithoutCategories> 
  }

  <NewCategoryModal state={{ newCategoryModalIsOpen, setNewCategoryModalIsOpen }} />

  </>);
}