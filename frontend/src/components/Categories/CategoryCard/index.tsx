import { useState } from "react";
import { Emoji } from "emoji-mart";
import { Link, useNavigate } from "react-router-dom";

import { Container, Header, Card, Dropdown } from "./styles";
import { useCategories } from "../../../hooks/useCategories";


type CategoryCardProps = {
  data: {
    isModel: boolean;
    categoryID: string;
    emojiID: string;
    content: string;
    bgColor: string;
    textColor: string;
  }
}

export function CategoryCard({ data }: CategoryCardProps) {
  const Navigate = useNavigate();
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const { tools } = useCategories();

  function goToTaskPage() {
    if (!data.isModel)
      Navigate(`/${data.categoryID}/tasks`)
  }

  function toggleDropdown() {
    if (dropdownIsOpen)
      setDropdownIsOpen(false);
    else 
      setDropdownIsOpen(true);
  }

  function deleteCategory() {
    setDropdownIsOpen(false);
    tools().deleteCategory(data.categoryID);
  }

  return (
    <Card onMouseLeave={() => setDropdownIsOpen(false)}>
      <div onClick={goToTaskPage}>
        <Container style={{ backgroundColor: data.bgColor }}>
          <header>
            <Emoji emoji={data.emojiID} set='facebook' size={52} />
          </header>

          <section style={{ color: data.textColor }}>
            {data.content.length === 0 ? "Título da categoria" : data.content}
          </section>
        </Container>
      </div>
      
      {
        data.isModel
        ? <></>
        :
        <Header className="active-category-header">
          <i className="fa-solid fa-ellipsis-vertical" onClick={toggleDropdown}></i>

          <Dropdown isOpen={dropdownIsOpen}>
            <div onClick={deleteCategory}><i className="fa-solid fa-trash"></i> Deletar categoria</div>
          </Dropdown>
        </Header>
      }
    </Card>
  );
}