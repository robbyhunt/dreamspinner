import React, { Component } from "react";
import styled from "@emotion/styled";
import CloseIcon from "../../img/icons/close.svg";

const Container = styled("div")`
  border-radius: 10px;
  position: absolute;
  z-index: 10;

  @media (max-width: 800px) {
    top: 0;
    left: 0;
    margin-top: 46px;
    border-radius: 0px;
  }

  @media (max-width: 459px) {
    margin-top: 72px;
  }
`;

const DragBuffer = styled("div")`
  position: absolute;
  top: -250px;
  left: -250px;
  width: calc(100% + 500px);
  height: calc(100% + 500px);
  pointer-events: ${(props) => (props.isdragging ? "auto" : "none")};

  @media (max-width: 800px) {
    display: none;
  }
`;

const Inner = styled("div")`
  border-radius: 10px;
  position: relative;
  pointer-events: all;
  filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.4));

  @media (max-width: 800px) {
    filter: none;
  }
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

  @media (max-width: 800px) {
    border-radius: 0px;
  }
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
    let pressEvent;
    // if event is touch
    if (e.targetTouches) {
      pressEvent = e.targetTouches[0];
    } else {
      pressEvent = e;
    }
    this.setState({
      diffX: pressEvent.clientX - e.currentTarget.getBoundingClientRect().left,
      diffY: pressEvent.clientY - e.currentTarget.getBoundingClientRect().top,
      dragging: true,
      styles: { ...this.state.styles, zIndex: 999 },
    });
  }

  _dragging(e) {
    if (this.state.dragging) {
      let left;
      let top;
      let dragEvent;

      // if event is touch
      if (e.targetTouches) {
        dragEvent = e.targetTouches[0];
      } else {
        dragEvent = e;
      }
      left = dragEvent.clientX - this.state.diffX;
      top = dragEvent.clientY - this.state.diffY;

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
        style={{
          left:
            document.documentElement.clientWidth > 800 &&
            this.state.styles.left,
          top:
            document.documentElement.clientWidth > 800 && this.state.styles.top,
          zIndex:
            document.documentElement.clientWidth > 800 &&
            this.state.styles.zIndex,
        }}
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
