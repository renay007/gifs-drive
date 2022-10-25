import React, { useContext, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { ProgressDrawerContext, ProgressDrawerDispatchContext } from "../../../../context/ProgressDrawerContext";

import { DropZone } from "./styles";

const _DropZone = (): JSX.Element => {
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: { "image/gif": [] },
    maxFiles: 10,
    maxSize: 10485760,
  });
  const setProgressDetails = useContext(ProgressDrawerDispatchContext);
  useEffect(() => {
    setProgressDetails({ acceptedFiles, fileRejections });
  }, [acceptedFiles, fileRejections]);
  return (
    <DropZone {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop GIF files here, or click to select files</p>
    </DropZone>
  );
};

export default _DropZone;
