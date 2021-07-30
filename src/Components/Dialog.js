import React, { Component } from "react";
import styled from "@emotion/styled";

const Container = styled("div")`
  border-radius: 0px;
  background-color: #ffffff;
  position: absolute;
  top: 50px;
  left: 50px;
  z-index: 10;
  border-radius: 10px;
  filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.4));
`;

const Title = styled("div")`
  font-weight: bold;
  padding: 10px 0;
  background-color: #00467f;
  background-image: url(https://www.transparenttextures.com/patterns/black-linen-2.png);
  cursor: move;
  color: #ffffff;
  border-radius: 10px 10px 0 0;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 400;
  letter-spacing: 3px;
`;

const Contents = styled("div")``;

const CloseButton = styled("div")`
  font-size: 12px;
  width: 100px;
  color: black;
  border: 2px solid black;
  border-radius: 25px;
  padding: 10px;
  margin: 10px;
  margin-left: 140px;
  cursor: pointer;
`;

export default class Dialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      diffX: 0,
      diffY: 0,
      dragging: false,
      styles: {},
    };

    this._dragStart = this._dragStart.bind(this);
    this._dragging = this._dragging.bind(this);
    this._dragEnd = this._dragEnd.bind(this);
  }

  _dragStart(e) {
    this.setState({
      diffX: e.screenX - e.currentTarget.getBoundingClientRect().left,
      diffY: e.screenY - e.currentTarget.getBoundingClientRect().top,
      dragging: true,
    });
  }

  _dragging(e) {
    if (this.state.dragging) {
      var left = e.screenX - this.state.diffX;
      var top = e.screenY - this.state.diffY;

      this.setState({
        styles: {
          left: left,
          top: top,
        },
      });
    }
  }

  _dragEnd() {
    this.setState({
      dragging: false,
    });
  }

  render() {
    const { children, title, canClose = true } = this.props;
    return (
      <Container
        style={this.state.styles}
        onMouseMove={this._dragging}
        onMouseUp={this._dragEnd}
      >
        <Title onMouseDown={this._dragStart}>{title}</Title>
        <Contents>{children}</Contents>
        {canClose && (
          <CloseButton onClick={this.props.onClose}>Close</CloseButton>
        )}
      </Container>
    );
  }
}
