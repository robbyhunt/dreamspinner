import React from "react";
import { ResizeProvider, ResizeConsumer } from "react-resize-context";
import styled from "@emotion/styled";
import Resize from "../../img/icons/resize.svg";

const Container = styled(ResizeConsumer)`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.initialsize && props.initialsize.width};
  height: ${(props) => props.initialsize && props.initialsize.height};
  min-width: ${(props) => props.minsize && props.minsize.width};
  min-height: ${(props) => props.minsize && props.minsize.height};
  max-width: ${(props) => props.maxsize && props.maxsize.width};
  max-height: ${(props) => props.maxsize && props.maxsize.height};
  resize: both;
  overflow: hidden;

  ::-webkit-resizer {
    background-image: url(${Resize});
    background-size: 90%;
    background-position: 0px -1px;
    background-repeat: no-repeat;
  }
`;

export default class ResizableContainer extends React.PureComponent {
  state = {
    size: {},
  };

  getDatasetBySize = (size) => ({
    widthRange: size.width > 200 ? "large" : "small",
    heightRange: size.height > 200 ? "large" : "small",
  });

  handleSizeChanged = (size) => {
    this.setState({ size });
  };

  render() {
    const { initialSize, maxSize, minSize } = this.props;
    return (
      <ResizeProvider>
        <Container
          onSizeChanged={this.handleSizeChanged}
          updateDatasetBySize={this.getDatasetBySize}
          initialsize={initialSize}
          maxsize={maxSize}
          minsize={minSize}
        >
          {this.props.children}
        </Container>
      </ResizeProvider>
    );
  }
}
