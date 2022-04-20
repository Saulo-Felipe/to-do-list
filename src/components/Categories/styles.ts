import styled from "styled-components";


export const CategoriesHeader = styled.header`

  div:nth-child(1) {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-size: 2rem;
      margin-bottom: 0.75rem;
    }

    img {
      width: 30px;
      height: 15px;
      cursor: pointer;
    }
  }
`;

export const CategoriesContent = styled.section`
  padding: 2rem 0 0 0;
`;

export const WithoutCategories = styled.section`
  /* border: solid 1px red; */
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;


  div:nth-child(1) {
    display: flex;
    align-items: center;
    justify-content: center;
    
    img {
      width: 83px;
      height: 83px;
      margin-right: 0.5rem;
    }
    
    h1 {
      font-size: 2.5rem;
      color: #B4B4B4;
    }
  }

  div:nth-child(2) {
    margin-top: 3rem;
    background-color: white;
    border-radius: 0.75rem;

    width: 12rem;
    height: 12rem;

    display: flex;
    justify-content: center;
    align-items: center;

    box-shadow: 0 0 10px rgb(0, 0, 0, 0.4);
    cursor: pointer;
    transition: all 300ms;

    img {
      opacity: 0.5;
    }

    &:hover {
      box-shadow: 0 0 15px rgb(0, 0, 0, 0.5);
    }
  }
`;