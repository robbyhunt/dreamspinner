import React from "react";
import { ResizeProvider, ResizeConsumer } from "react-resize-context";
import styled from "@emotion/styled";

const Container = styled(ResizeConsumer)`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60vw;
  height: 70vh;
  min-width: ${(props) => props.minwidth};
  min-height: ${(props) => props.minheight};
  max-width: ${(props) => props.maxwidth};
  max-height: ${(props) => props.maxheight};
  resize: both;
  overflow: hidden;
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
    return (
      <ResizeProvider>
        <Container
          onSizeChanged={this.handleSizeChanged}
          updateDatasetBySize={this.getDatasetBySize}
          {...this.props}
        >
          {this.props.children}
        </Container>
      </ResizeProvider>
    );
  }
}
