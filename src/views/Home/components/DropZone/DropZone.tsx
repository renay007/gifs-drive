import React from "react";
import { useDropzone } from "react-dropzone";

import { DropZone } from "./styles";

const _DropZone = (): JSX.Element => {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ accept: { "image/gif": [] } });
  return (
    <DropZone {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop GIF files here, or click to select files</p>
    </DropZone>
  );
};

export default _DropZone;
