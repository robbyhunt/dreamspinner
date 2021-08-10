import React, { useState } from "react";
import Styled from "@emotion/styled";

import { useSelector, useDispatch } from "react-redux";
import { changeInspiration } from "../../actionCreators";

import axios from "axios";

const QueryWrapper = Styled("div")`
  display: flex;
  width: calc(100% - 30px);
  margin-bottom: 20px;
  position: relative;
  margin-top: 20px;
`;

const SearchQuery = Styled("textarea")`
  width: 100%;
  resize: none;
  font-size: 18px;
  padding: 5px;
  height: 25px;
  border: 1px solid #dddddd;
  border-radius: 2px;
  transition: 200ms;

  :focus {
    outline: none;
    border: 1px solid #A5A5A5;
  }
`;

const ImageResult = Styled("div")`
  width: calc(100% - 30px);
  height: 400px;
  background-image: ${(props) => `url(${props.result})`};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border: 2px dashed #dddddd;
  border-radius: 2px;
`;

const Button = Styled("button")`
  border: none;
  border-radius: 0 1px 1px 0;
  outline: none;
  cursor: pointer;
  position: absolute;
  top: 1px;
  right: 1px;
  height: calc(100% -  2px);
  width: 25%;
  background-color: ${(props) => props.theme.colors.secondary};
  background-image: url(https://www.transparenttextures.com/patterns/black-linen-2.png);
  color: #ffffff;
  transition: 200ms;

  :disabled {
    cursor: not-allowed;
    opacity: 0.6;

    :hover {
      opacity: 0.6;
    }
  }

  :focus {
    outline: none;
  }

  :hover {
    opacity: 0.8;
  }
`;

const ImageButtonWrapper = Styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
`;

const ImageButton = Styled(Button)`
  position: relative;
  height: 27px;
  width: 55px;
  border-radius: 2px;

  :first-of-type {
    margin-right: 10px;
    width: 140px;
  }
`;

const Search = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState({});
  const [resultID, setResultID] = useState(parseInt(Math.random() * 35));

  const { inspiration } = useSelector((s) => s);
  const dispatch = useDispatch();

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
    await setResults({ ...searchResults.data });
    setIsLoading(false);
  };

  const saveImage = () => {
    let tempData = [...inspiration];
    tempData.push(results.value[resultID]);

    dispatch(changeInspiration(tempData));
  };

  return (
    <>
      <QueryWrapper>
        <SearchQuery
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter a search term here..."
        />
        <Button onClick={() => handleClick()} disabled={searchQuery === ""}>
          Search
        </Button>
      </QueryWrapper>
      {isLoading ? (
        "Loading..."
      ) : (
        <ImageResult
          result={results.value && results.value[resultID].thumbnailUrl}
        >
          {results.value && results.value[0] && (
            <ImageButtonWrapper>
              <ImageButton
                onClick={() => {
                  setResultID(parseInt(Math.random() * results.value.length));
                }}
              >
                Get another image
              </ImageButton>
              <ImageButton
                onClick={() => {
                  saveImage();
                }}
              >
                Save
              </ImageButton>
            </ImageButtonWrapper>
          )}
        </ImageResult>
      )}
    </>
  );
};

export default Search;
