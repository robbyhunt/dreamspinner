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
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
          <span>{resource.value}</span>
          <span>{" / "}</span>
          <span>{resource.maxValue}</span>
        </ResourceValues>
      </ResourceBar>
    </Resource>
  ));
};

export default Resources;
