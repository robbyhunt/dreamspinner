import React, { useState } from "react";
import Styled from "@emotion/styled";
// import { useSelector } from "react-redux";
import axios from "axios";

import Dialog from "../common/Dialog";
import ResizableContainer from "../common/ResizableContainer";

const Wrapper = Styled("div")`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 0 0 10px 10px;
  `;

const ImageResult = Styled("div")`
  width: 100%;
  height: 400px;
  background-image: ${(props) => `url(${props.result})`};
  background-color: red;
  background-size: contain;
  background-repeat: no-repeat;
`;

const Inspiration = ({ hook }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [resultID, setResultID] = useState(parseInt(Math.random() * 35));

  // const { characters } = useSelector((s) => s);
  // const dispatch = useDispatch();

  const handleClick = async () => {
    setIsLoading(true);
    let searchResults = await axios.get(
      `https://api.bing.microsoft.com/v7.0/images/search?q=${searchQuery}`,
      {
        headers: {
          "Ocp-Apim-Subscription-Key": process.env.REACT_APP_BING_KEY,
        },
      },
      {}
    );
    await setResults(searchResults.data);
    setIsLoading(false);
  };

  const initialLeft =
    document.documentElement.clientWidth > 1000
      ? "calc(80vw - 40vw)"
      : "calc(80vw - 350px)";

  return (
    <Dialog
      title="Inspiration"
      onClose={hook[1]}
      initialPosition={{ top: "15vh", left: initialLeft }}
    >
      <ResizableContainer
        minSize={{ width: "605px", height: "300px" }}
        maxSize={{ width: "1100px", height: "90vh" }}
        initialSize={{ width: "40vw", height: "55vh" }}
      >
        <Wrapper>
          <textarea
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleClick}>click me</button>
          <button
            onClick={() => {
              setResultID(parseInt(Math.random() * 35));
            }}
          >
            click me too
          </button>
          {isLoading ? (
            "Loading..."
          ) : (
            <ImageResult
              result={results.value && results.value[resultID].thumbnailUrl}
            />
          )}
        </Wrapper>
      </ResizableContainer>
    </Dialog>
  );
};

export default Inspiration;
