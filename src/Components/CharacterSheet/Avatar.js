import React, { useState } from "react";
import Styled from "@emotion/styled";

import EditIcon from "../../img/icons/edit.svg";
import DeleteIcon from "../../img/icons/delete.svg";

const Wrapper = Styled("div")`
  width: 100%;
  position: relative;
  margin-bottom: 10px;
`;

const Name = Styled("p")`
  font-size: 24px;
  font-weight: 500;
  margin: 0;
`;

const Edit = Styled("div")`
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: 0px;
  opacity: 1;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: url(${EditIcon});
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  height: 16px;
  width: 16px;
  transition: 200ms;
  
  :hover {
    opacity: 0.7;
  }
`;

const NameEdit = Styled("textarea")`
  resize: none;
  height: 25px;
  width: 80%;
  padding: 0 5px;
  outline: none;
  border: 1px solid #efefefef;
  background-color: rgba(0,0,0,0);

  :focus {
    outline: none;
    border: 1px solid #efefefef;
  }
`;

const AvatarContainer = Styled("div")`
  width: 100%;
  height: 0;
  padding-top: 100%;
  position: relative;
  border: 2px dashed #efefefef;

  & > img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  & > div {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: rgba(0,0,0,0.5);

    & > form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      & > input {
        margin-top: 10px;
        width: 80%;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        padding: 5px 10px; 
        background-color: #efefefef;
        transition: 200ms;
      
        &:hover {
          background-color: #dddddd;
        }
      
        &:focus {
          outline: none;
        }
      }
    }
    
  }
`;

const Delete = Styled(Edit)`
  top: 37px;
  z-index: 1;
  right: 2px;
  left: null;
  background-image: url(${DeleteIcon});
`;

const Avatar = ({ name, avatar, hook, sheetIndex }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const setData = hook[1];
    let tempData = [...hook[0]];
    tempData[sheetIndex].name = e.target.value;

    setData(tempData);
  };

  const imageUpload = async (e) => {
    setIsLoading(true);
    let file = e.target.files[0];
    await imageUploadToImgur(file);
  };

  const imageUploadToImgur = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("key", "d178d3f129ea510206fc9c8301d27a9d");
    fetch("https://api.imgbb.com/1/upload", {
      method: "post",
      body: formData,
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.success) {
          const setData = hook[1];
          let tempData = [...hook[0]];
          tempData[sheetIndex].avatar = data.data.url;
          setData(tempData);
        } else {
          console.log("upload failed");
          console.log(data);
        }
        setIsLoading(false);
      });
  };

  const handleDelete = () => {
    const setData = hook[1];
    let tempData = [...hook[0]];
    tempData[sheetIndex].avatar = "";

    setData(tempData);
  };

  return (
    <Wrapper>
      <Edit onClick={() => setIsEditable(!isEditable)} />
      {isEditable ? (
        <NameEdit
          value={name}
          placeholder="Character Name"
          onChange={(e) => handleChange(e)}
        />
      ) : (
        <Name>{name}</Name>
      )}
      <Delete
        onClick={() => handleDelete()}
        style={{ display: !avatar && "none" }}
      />
      <AvatarContainer>
        {avatar ? (
          <>
            <img src={avatar} alt={`${name} avatar`} />
          </>
        ) : (
          <div>
            <form>
              <label htmlFor="fileBrowser">Upload an avatar...</label>
              <input
                type="file"
                id="fileBrowser"
                label="Avatar Upload"
                onChange={imageUpload}
              />
            </form>
          </div>
        )}
      </AvatarContainer>
    </Wrapper>
  );
};

export default Avatar;
