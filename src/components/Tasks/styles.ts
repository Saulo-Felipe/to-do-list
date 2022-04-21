import styled from "styled-components";

export const Header = styled.header`
  > div:nth-child(1) {
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      width: 3rem;
      cursor: pointer;
    }

    div {
      display: flex;
      align-items: center;
    }
  }

  hr {
    margin: 0.5rem 0;
  }
`;

export const Section = styled.section`


`;

export const Task = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0.5rem;
  border-radius: 0.5mm;

  i {
    font-size: 1.3rem;
    border-radius: 50%;
    padding: 0.25rem;
    transition: all 0.25s;
    cursor: pointer;

    &:hover {
      background-color: rgb(0, 0, 0, 0.08);
    }
  }
  i:nth-child(1) {
    color: #3a64ff;
    margin-right: 0.5rem;
  }
  i:nth-child(2) {
    color: #bb0000;
  }


  > div:nth-child(1) {
    display: flex;
    align-items: center;

    img {
      width: 1.8rem;
    }
  }
`;


export const NotHaveTasks = styled.div`
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: default;
  user-select: none;

  h1 {
    font-size: 2rem;
    color: #B2B2B2;
  }
`;