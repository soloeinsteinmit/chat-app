import React from "react";
import styled from "styled-components";

const EmojiCard = () => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="emojis">
          <button>&#128516;</button>
          <button>&#128513;</button>
          <button>&#128518;</button>
          <button>&#128514;</button>
        </div>
        <div className="emojis">
          <button>&#128516;</button>
          <button>&#128513;</button>
          <button>&#128518;</button>
          <button>&#128514;</button>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 500px;
    scale: 0.5;
    background: rgba(41, 41, 41, 0.07);
    white-space: nowrap;
    overflow: hidden;
    border-radius: 50px;
    -webkit-box-shadow: -10px 0px 13px -7px #0000003a,
      10px 0px 13px -7px #0000003a, 5px 5px 15px 5px rgba(0, 0, 0, 0);
    box-shadow: -10px 0px 33px -7px #0000003a, 10px 0px 33px -7px #0000003a,
      5px 5px 35px 5px rgba(0, 0, 0, 0);
  }

  button {
    font-size: 70px;
    margin: 0 5px;
    border: none;
    background-color: transparent;
    cursor: grab;
  }
  button:hover {
    transform: scale(1.1);
    transition: 0.5s ease;
  }
  .emojis {
    display: inline-block;
    animation: 5s sliding infinite linear;
  }

  /* to pause on hover  */
  /* .card:hover .emojis{
  animation-play-state: paused;
} */

  @keyframes sliding {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-101%);
    }
  }
`;

export default EmojiCard;
