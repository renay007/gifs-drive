import React from "react";
import { DropzoneState, useDropzone } from "react-dropzone";

import { DropZone } from "./styles";
import { Container } from "./../../components";
import Main from "../../layouts/Main";

const Home = (): JSX.Element => {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ accept: { "image/gif": [] } });
  return (
    <Main>
      <Container>
        <DropZone {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop GIF files here, or click to select files</p>
        </DropZone>
      </Container>
    </Main>
  );
};

export default Home;
