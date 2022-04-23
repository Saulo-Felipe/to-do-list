import styled from "styled-components";


export const CategoriesHeader = styled.header`
  padding: 7rem 3rem 0 3rem;

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
  padding: 2rem 3rem 0rem 3rem;
  /* border: solid 1px red; */

  display: grid;
  grid-gap: unset;
  grid-template-columns: repeat(auto-fill, 15rem);
  /* justify-content: space-between; */

  gap: 2rem;

  .new-category-card {
    width: 15rem;
    height: 15rem;
    background-color: #dbdbdb;
    border-radius: 0.5rem;

    display: flex;
    align-items: center;
    justify-content: center;

    user-select: none;
    cursor: pointer;
    transition: all 250ms;

    img {
      opacity: 0.5;
    }

    :hover {
      box-shadow: 0 0 1.5rem rgb(0, 0, 0, 0.2);
    }
  }
`;

export const WithoutCategories = styled.section`
  /* border: solid 1px red; */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;

  h1 {
    font-size: 2rem;
    color: #a5a5a5;
  }
  img {
    width: 4rem;
    margin-right: 1rem;
  }

`;