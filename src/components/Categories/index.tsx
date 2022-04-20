import { 
  CategoriesHeader, 
  CategoriesContent, 
  WithoutCategories, 
} from "./styles";

import { useState } from "react";
import Modal from "react-modal";
import { CategoryCard } from "./CategoryCard";
import 'emoji-mart/css/emoji-mart.css';
import { Picker, Emoji } from 'emoji-mart';
import { NewCategoryModal } from "./NewCategoryModal";


import Plane from "../../assets/plane.svg";
import Folder from "../../assets/folder.svg";
import OptionsStruct from "../../assets/optionsStruct.svg";

/* <Emoji emoji="croissant" set='facebook' size={16} />*/



export function Categories() {
  const [newCategoryModalIsOpen, setNewCategoryModalIsOpen] = useState<boolean>(false);

  const fakeData = [
    // {
    //   bgColor: "blue",
    //   textColor: "black",
    //   content: "segundo card teste",
    //   emojiID: "cart"
    // },
    // {
    //   bgColor: "black",
    //   textColor: "white",
    //   content: "Teste de cartão dinamico kkk",
    //   emojiID: "croissant"
    // },
    // {
    //   bgColor: "pink",
    //   textColor: "red",
    //   content: "terceiro teste de texto longo para evitar possiveis erros dos uusuarios leigos e dementes",
    //   emojiID: "croissant"
    // }
  ]

  return (<>{
    fakeData.length > 0 
    ? 
      <>
        <CategoriesHeader>
          <div>
            <h1>Categorias</h1>

            <img src={OptionsStruct} alt="Estrutura das opções" />
          </div>

          <hr />
        </CategoriesHeader>

        <CategoriesContent>
          <CategoryCard data={{
            bgColor: "black",
            textColor: "white",
            content: "Teste de cartão dinamico kkk",
            emojiID: "croissant"
          }} />
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