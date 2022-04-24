import styled from "styled-components";



export const Container = styled.main`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 2.5rem;

  > div:nth-child(1) {
    background-color: #2D2E3D;
    width: inherit;
    height: inherit;
  }
`;

export const Header = styled.header`

  padding: 2rem;
  h1 {
    color: white;
    margin-bottom: 0.25rem;
  }

  hr {
    opacity: 0.2;
    border: solid 1px black;
  }

`;


export const Section = styled.section`
  padding: 0 2rem 2rem 2rem;    

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  justify-content: flex-start;

  column-gap: 1rem;
  row-gap: 1rem;

    
  > div:last-child {
    background-color: #21222F;
    border-radius: 0.5rem;
    transition: all 350ms;
    cursor: pointer;

    width: 13.5rem;
    height: 13.5rem;

    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 25%;
      transition: all 350ms;
    }

    :hover {
      border: solid 1px black;

      img {
        opacity: 0.5;
      }
    }
    
  }

`;

