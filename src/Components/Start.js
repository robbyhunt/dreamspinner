/*global netlifyIdentity*/

import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { changeUser } from "../actionCreators";

import { isMobile } from "react-device-detect";
import axios from "axios";

import logo from "../img/mandala.png";
import Styled from "@emotion/styled";

const Wrapper = Styled("div")`
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  text-align: center;
  background-color: #ffffff;
  position: relative;
  background-color: ${(props) => props.theme.colors.secondary};
  background-image: url("http://www.transparenttextures.com/patterns/light-paper-fibers.png"
  background-position: center;
  overflow: hidden;
  position: relative;
`;

const Inner = Styled("div")`
  background-color: #0079a3;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%2300467f' fill-opacity='0.26'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(25px + 2vmin);
  color: #ffffff;
`;

const Title = Styled("h1")`
  color: #ffffff;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
  transition: 800ms;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin: 10px;
  text-transform: uppercase;
  letter-spacing: 5px;
  font-size: calc(28px + 2vmin);
  font-weight: 400;

  &:hover {
    filter: drop-shadow(0 0 15px rgba(0, 0, 0, 1));
    font-size: calc(30px + 2vmin);
  }
`;

const Tagline = Styled("h2")`  color: #ffffff;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
  transition: 800ms;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin: 10px 0 30px;
  letter-spacing: 5px;
  font-weight: 400;
  color: #e6e6e6;
  font-size: calc(1px + 3vmin);
  text-transform: none;
  max-width: 550px;

  &:hover {
    filter: drop-shadow(0 0 15px rgba(0, 0, 0, 1));
    font-size: calc(3px + 3vmin);
  }
`;

const Button = Styled("button")`
  color: ${(props) => props.theme.colors.primary};
  padding: 5px 20px;
  font-size: calc(12px + 2vmin);
  cursor: pointer;
  background-color: #ffffff;
  border-radius: 3px;
  border: none;
  margin-top: 20px;
  text-transform: uppercase;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: 800ms;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));
  letter-spacing: 5px;

  &:hover {
    filter: drop-shadow(0 0 15px rgba(0, 0, 0, 0.5));
    font-size: calc(15px + 2vmin);
    color: ${(props) => props.theme.colors.secondary};

    & > a {
      color: ${(props) => props.theme.colors.secondary};
    }
  }

  & > a {
    color: ${(props) => props.theme.colors.primary};
    text-decoration: none;
    transition: color 800ms;
  }
`;

const Logo = Styled("img")`
  height: 30vmin;
  min-height: 275px;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  filter: drop-shadow(0 0 15px rgba(0, 0, 0, 0.5));
  animation: spin infinite 50s linear;
  transition: 500ms;
  margin-bottom: 25px;

  &:hover {
    height: 31vmin;
    filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.5));
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Start = ({ onClick, isLoggedIn }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleMobileWindowSize = () => {
    let vh = document.documentElement.clientHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    if (isMobile) {
      let vh = document.documentElement.clientHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);

      window.addEventListener("resize", handleMobileWindowSize);
      return () => {
        window.removeEventListener("resize", handleMobileWindowSize);
      };
    }
  }, []);

  const dispatch = useDispatch();

  const HandleStart = async () => {
    setIsLoading(true);
    let accountInfo;
    if (isLoggedIn) {
      let token;
      await netlifyIdentity.refresh().then((returnedToken) => {
        token = returnedToken;
      });

      axios
        .post(
          "/.netlify/functions/createUser",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )
        // if success
        .then((res) => {
          accountInfo = res;
        })
        // if error
        .catch((err) => setIsError(err))
        // after each
        .then(() => {
          if (accountInfo === undefined) {
            setIsError(true);
            setIsLoading(false);
            console.log(`Error: ${isError}`);
          } else {
            dispatch(changeUser(accountInfo.data));
            onClick();
          }
        });
    } else {
      onClick();
    }
  };

  return (
    <Wrapper>
      <Inner>
        <Title>Dreamspinner</Title>
        <Tagline>A modern solo RPG and creative writing tool</Tagline>
        <Logo src={logo} alt="logo" />
        {isLoggedIn ? (
          isError ? (
            <span style={{ fontSize: 18 }}>
              {`Something went wrong. Please try logging out and back in again.`}
            </span>
          ) : (
            <Button onClick={HandleStart}>
              {isLoading ? "Loading..." : "Play"}
            </Button>
          )
        ) : (
          <Button onClick={HandleStart}>
            {isLoading ? "Loading..." : "Play as guest"}
          </Button>
        )}
        <Button data-netlify-identity-button></Button>
      </Inner>
    </Wrapper>
  );
};

export default Start;
