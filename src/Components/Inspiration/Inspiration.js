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
  align-items: center;
  z-index: 10;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 0 0 10px 10px;
`;

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

const TabContainer = Styled("div")`
  position: absolute;
  top: 60px;
  right: -99px;
  display: flex;
  flex-direction: column;
  height: 100%;

  @media (max-width: 800px) {
    z-index: 11;
    right: -90px;
    top: 100px;
  }
`;

const Tab = Styled("div")`
  transform-origin: 0 0;
  transform: ${(props) =>
    props.isActive ? "rotate(90deg) translateY(-5px)" : "rotate(90deg)"};
  margin-bottom: 40px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 10px 10px 0 0;
  background-image: url(https://www.transparenttextures.com/patterns/black-linen-2.png);
  color: #ffffff;
  padding: 5px 10px 15px;
  cursor: pointer;
  user-select: none;
  transition: 200ms;

  -webkit-user-select: none;
  -ms-user-select: none;

  @media (max-width: 800px) {
    width: 60px;
    transform: ${(props) =>
      props.isActive ? "rotate(90deg) translateY(7px)" : "rotate(90deg)"};
    border-radius: 0 0 10px 10px;
    padding: 10px 10px 10px;
  }
`;

const Inspiration = ({ hook }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState({
    value: [
      {
        thumbnailUrl:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi2.wp.com%2Fborneoadventure.com%2Fv3%2Fwp-content%2Fuploads%2F2018%2F09%2Fproboscis-monkey.jpg",
      },
    ],
  });
  const [resultID, setResultID] = useState(0);
  //parseInt(Math.random() * 35)
  const [savedResults, setSavedResults] = useState([]);

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
    await setResults({ ...searchResults.data });
    setIsLoading(false);
  };

  const saveImage = () => {
    setSavedResults([...savedResults, results.value[resultID]]);
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
        minSize={{ width: "350px", height: "450px" }}
        maxSize={{ width: "1100px", height: "90vh" }}
        initialSize={{ width: "30vw", height: "55vh" }}
      >
        <Wrapper>
          {activeTab === 0 ? (
            <>
              <QueryWrapper>
                <SearchQuery
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter a search term here..."
                />
                <Button
                  onClick={() => handleClick()}
                  disabled={searchQuery === ""}
                >
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
                          setResultID(
                            parseInt(Math.random() * results.value.length)
                          );
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
          ) : null}
        </Wrapper>
      </ResizableContainer>
      <TabContainer>
        <Tab onClick={() => setActiveTab(0)} isActive={activeTab === 0}>
          Search
        </Tab>
        <Tab onClick={() => setActiveTab(1)} isActive={activeTab === 1}>
          Saved
        </Tab>
      </TabContainer>
    </Dialog>
  );
};

export default Inspiration;
