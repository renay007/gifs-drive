import React, { useContext, useEffect } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import {
  CustomFile,
  CustomFileError,
  FileUpload,
  ProgressDrawerDispatchContext,
} from "../../../../context/ProgressDrawerContext";

import { DropZone } from "./styles";

const sanitize = (file: FileUpload | FileRejection) => {
  const { name, size, type } = file.file;
  const dateAdded = new Date();

  const _errors: CustomFileError[] = file.errors.map((err) => {
    const { code, message } = err;
    return { code, message };
  });
  const _file: CustomFile = { name, size, type, dateAdded };

  return { file: _file, errors: _errors };
};

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
    const accepted = acceptedFiles.map((file) => ({ file, errors: [] }));
    const acceptedJSON: FileUpload[] = accepted.map(sanitize);
    const rejectedJSON: FileUpload[] = fileRejections.map(sanitize);

    if (acceptedJSON.length > 0 || rejectedJSON.length > 0)
      setProgressDetails((curr: any) => {
        return [...acceptedJSON, ...rejectedJSON, ...curr];
      });
  }, [acceptedFiles, fileRejections]);

  return (
    <DropZone {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop GIF files here, or click to select files</p>
    </DropZone>
  );
};

export default _DropZone;
