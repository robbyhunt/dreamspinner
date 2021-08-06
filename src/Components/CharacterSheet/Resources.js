import React from "react";
import Styled from "@emotion/styled";

const Resource = Styled("div")`
  width: 100%;
  text-align: left;


  & > p {
    margin: 0;
  }
`;

const ResourceBar = Styled("div")`
  width: 100%;
  height: 20px;
  background-color: rgba(0,0,0,0.1);
  border-radius: 10px;
  color: #ffffff;
  font-weight: 600;
  text-align: center;
  position: relative;
`;

const ResourceFill = Styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => `${props.percentfilled}%`};
  height: 100%;
  border-radius: 10px;
  background-color: ${(props) => props.color}};
`;

const ResourceValues = Styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 20px);
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

  & > span {
    cursor: pointer;
    margin-bottom: 6px;
    font-size: 22px;
    transition: 200ms;

    :hover {
      opacity: 0.7;
    }
  }
`;

const Resources = ({ resources }) => {
  return resources.map((resource, index) => (
    <Resource key={index}>
      <p>{resource.name}:</p>
      <ResourceBar>
        <ResourceFill
          percentfilled={(resource.value / resource.maxValue) * 100}
          color={resource.color}
        />
        <ResourceValues>
          <span>-</span>
          <div>
            <span>{resource.value}</span>
            <span>{" / "}</span>
            <span>{resource.maxValue}</span>
          </div>
          <span>+</span>
        </ResourceValues>
      </ResourceBar>
    </Resource>
  ));
};

export default Resources;
