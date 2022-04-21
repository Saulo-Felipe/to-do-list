import styled from "styled-components";

export const Header = styled.header`
  padding: 7rem 7rem 0 7rem;

  > div:nth-child(1) {
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      width: 3rem;
      cursor: pointer;
    }

    h1 {
      margin-left: 0.75rem;
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
  padding: 1rem 7rem 7rem 7rem;

  hr {
    margin: 0.5rem 0 1rem;
  }
  
  h1 {
    font-size: 2rem;
  }

  > div:nth-child(3) {
    display: flex;
    align-items: center;
    background-color: #c9c9c9;
    margin-bottom: 1rem;

    padding: 0.5rem;

    border-bottom: solid 1px white;
    :hover {
      background-color: #dfdfdf94;
    }
    > label:nth-child(1) {
      background-color: white;
      border-radius: 50%;
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin-right: 0.25rem;

      i {
        font-size: 1.3rem;
      }
    }

    > div:nth-child(2) {
      width: 100%;

      input {
        height: 2.5rem;
        width: 100%;
        border: none;

        padding-left: 0.5rem;

        font-size: 1rem;

        background-color: #f7f7f795;
        cursor: default;

        :focus {
          border: none;
          outline: none;
          cursor: text;

          background-color: white;
        }
      }
    }
  }

`;

export const Task = styled.div`
  & + div {
    border-top: solid 1px white ;
  }

  background-color: #d9d9d995;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0.5rem;
  border-radius: 0.5mm;

  transition: all 250ms;

  :hover {
    background-color: #c1c1c195;
  }


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
    
    .task-check {
      border-radius: 50%;
      width: 1.6rem;
      height: 1.6rem;
      margin-right: 0.5rem;
      cursor: pointer;

      display: flex;
      align-items: center;

      i {
        font-size: 1rem;
        margin: auto;
      }
    }

    .task-check-false {
      background-color: #d1d1d1;
      border: solid 1px #a5a5a5;
      transition: all 100ms;

      :hover > i {
        opacity: 1;
      }

      > i {
        opacity: 0;
      }
      
    }

    .task-check-true {
      background-color: #1000a1;
      border: solid 1px #0b0070;

      i {
        color: white;
      }
    }

    .task-txt-true {
      text-decoration: line-through;
    }
    .task-txt-false {
      text-decoration: none !important;
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