import { useEffect } from "react";
import { useCategories } from "../../hooks/useCategories";
import { CategoryCard } from "./CategoryCard";

import { Header, Section, Container } from "./styles";
import ImgFolder from "../../assets/folder.svg";

export function Categories() {
  const { setNewCategoryModalIsOpen } = useCategories().modalOpen;
  const { allCategories, refreshLocalCategory } = useCategories();
  
  useEffect(() => {
    refreshLocalCategory();
  }, [])

  return (
    <Container>
      <div>
        <Header>
          <h1>Categorias</h1>
          <hr />
        </Header>

        <Section>
          {
            allCategories.map((card, index) =>
              <CategoryCard key={index} data={{
                isModel: false,
                categoryID: card.categoryID,
                bgColor: card.bgColor,
                textColor: card.textColor,
                content: card.content,
                emojiID: card.emojiID
              }} />
            )
          }

          <div className="new-category-card" onClick={() => setNewCategoryModalIsOpen(true)}>
            <img src={ImgFolder} alt="nova categoria "/>
          </div>
        </Section>
      </div>
    </Container>
  );
}