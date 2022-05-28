import { createGlobalStyle } from "styled-components";

export const GlobalCss = createGlobalStyle`
  :root {
    --background: #21222F;
    --default-font: 'Quicksand', sans-serif;;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%; // 15px
     }

    @media (max-with: 720px) {
      font-size: 87.5%; // 14px
    }
  }

  body {
    background-color: var(--background);
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: var(--default-font);
    font-weight: 400;
  }
  
  h1, h2, h3, h4, h5, h6 strong {
    font-weight: 700;
  }

  small {
    font-size: 0.5rem;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgb(0, 0, 0, 0.6);

    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;

    @media (max-width: 720px) {
      align-items: baseline;
      padding-top: 0.5rem;
    }

  }

  .modal-content {
    width: 100%;
    max-width: 750px;
    background-color: #fff;
    padding: 2rem 3rem;
    position: relative;
    border-radius: 0.25rem;
    z-index: 99;
   
    .google-button-oauth {
      border: solid 1px gray !important ;
      width: 100%;
      margin-top: 0.5rem;
    }

    > .close-modal-icon {
      width: 1.5rem;
      position: absolute;
      right: 1rem;
      top: 1rem;
      cursor: pointer;
    }

    @media (max-width: 720px) {
      padding: 1.5rem;
      width: 95%;
    }
  }

  hr {
    background-color: #AEAEAE;
    opacity: 0.3;
  }
  
  a {
    text-decoration: none;
    color: unset;
  }

  .loading-rotate {
    animation-name: loadingRotate;
    animation-duration: 500ms;
    animation-iteration-count: infinite;
    transition: all 0.5s;
    cursor: not-allowed;
  }

  @keyframes loadingRotate {
    0% { transform: rotate(0deg) }
    100% { transform: rotate(360deg) }
  }

  .loading-background {
    animation-name: loadingBackground;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    transition: all 1s linear;
    animation-timing-function: linear;
    position: absolute;
    height: 120%;
    width: 10%;
    transform: rotate(20deg);
    top: -10%;
    left: 0;
    background-image: linear-gradient(90deg, transparent, #ffffff7d, transparent);
  }

  @keyframes loadingBackground {
    0% { left: -10% }
    25% { left: 25% }
    50% { left: 50% }
    75% { left: 75% }
    100% { left: 110% }
  }
`