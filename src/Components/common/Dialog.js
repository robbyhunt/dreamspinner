import React, { Component } from "react";
import styled from "@emotion/styled";
import CloseIcon from "../../img/icons/close.svg";

const Container = styled("div")`
  border-radius: 10px;
  position: absolute;
  z-index: 10;
`;

const DragBuffer = styled("div")`
  position: absolute;
  top: -250px;
  left: -250px;
  width: calc(100% + 500px);
  height: calc(100% + 500px);
  pointer-events: ${(props) => (props.isdragging ? "auto" : "none")};
`;

const Inner = styled("div")`
  border-radius: 10px;
  position: relative;
  pointer-events: all;
  filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.4));
`;

const Title = styled("div")`
  padding: 10px 0;
  background-color: ${(props) => props.theme.colors.secondary};
  background-image: url(https://www.transparenttextures.com/patterns/black-linen-2.png);
  cursor: ${(props) => (props.isdragging ? "grabbing" : "grab")};
  color: #ffffff;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 400;
  letter-spacing: 3px;
  border-radius: 10px 10px 0 0;
  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

const CloseButton = styled("div")`
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 5px;
  color: #ffffff;
  cursor: pointer;
  opacity: 0.8;
  transition: 200ms;
  background-image: url(${CloseIcon});
  background-size: 90%;
  background-position: center;
  background-repeat: no-repeat;
  height: 6px;
  width: 6px;

  :hover {
    opacity: 1;
  }
`;

const Contents = styled("div")``;

export default class Dialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      diffX: 0,
      diffY: 0,
      dragging: false,
      styles: { ...this.props.initialPosition },
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

      var leftPer = `${
        Math.round(((left * 100) / window.innerWidth) * 100) / 100
      }vw`;
      var topPer = `${
        Math.round(((top * 100) / window.innerHeight) * 100) / 100
      }vh`;

      this.setState({
        styles: {
          left: leftPer,
          top: topPer,
          right: null,
          zIndex: 999,
        },
      });
    }
  }

  _dragEnd() {
    this.setState({
      dragging: false,
      styles: {
        ...this.state.styles,
        zIndex: 10,
      },
    });
  }

  render() {
    const { children, title, onClose } = this.props;
    return (
      <Container
        style={this.state.styles}
        onMouseMove={this._dragging}
        onMouseUp={this._dragEnd}
        onTouchMove={this._dragging}
        onTouchEnd={this._dragEnd}
      >
        <DragBuffer isdragging={this.state.dragging} />
        <Inner>
          {onClose && <CloseButton onClick={() => onClose(false)} />}
          <Title
            onMouseDown={this._dragStart}
            onTouchStart={this._dragStart}
            isdragging={this.state.dragging}
          >
            {title}
          </Title>
          <Contents>{children}</Contents>
        </Inner>
      </Container>
    );
  }
}
