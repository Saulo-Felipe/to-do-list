import { 
  CategoriesHeader, 
  CategoriesContent, 
  WithoutCategories, 
  CategoryModalForm,
  RoundColorPicker 
} from "./styles";

import { useState } from "react";
import Modal from "react-modal";
import { CategoryCard } from "./CategoryCard";

import Plane from "../../assets/plane.svg";
import Folder from "../../assets/folder.svg";
import MenuCategoryIcon from "../../assets/app.png";
import OptionsStruct from "../../assets/optionsStruct.svg";

import 'emoji-mart/css/emoji-mart.css'
import { Picker, Emoji } from 'emoji-mart'

/* <Emoji emoji="croissant" set='facebook' size={16} />

<Picker 
  set='facebook' 
  onSelect={(e) => console.log(e)}
  showPreview={false}
  showSkinTones={false}
/> */

export function Categories() {
  const [isOpenCategoryModal, setIsOpenCategoryModal] = useState<boolean>(false);

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

      <div onClick={() => setIsOpenCategoryModal(true)}>
        <img src={Folder} alt="nova categoria "/>
      </div>
    </WithoutCategories> 
  }
    <Modal 
      isOpen={isOpenCategoryModal}
      onRequestClose={() => setIsOpenCategoryModal(false)}
      overlayClassName={"modal-overlay"}
      className={"modal-content"}
    >
      <CategoryModalForm>

        <div>
          <img src={MenuCategoryIcon} alt="Nova categoria icone" />
          <h1>Adicione uma nova Categoria</h1>
        </div>

        <div>
          <input type="text" placeholder="Título da categoria" />
        </div>

        <div>
          <h4>Selecione as cores do cartão</h4>

          <RoundColorPicker>
            <div>
              <input type="color" alt="selecionar cor do fundo do cartão" />
            </div>

            <div>Cor de fundo</div>
          </RoundColorPicker>

          <RoundColorPicker>
            <div>
              <input type="color" alt="selecionar cor da letra do cartão" />
            </div>

            <div>Cor da letra</div>
          </RoundColorPicker>
        </div>

      </CategoryModalForm>
    </Modal>
  </>);
}