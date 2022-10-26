import React, { useCallback, useContext, useEffect, useState } from "react";
import { FileError, FileRejection, useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import {
  CustomFile,
  CustomFileError,
  FileUpload,
  ProgressDrawerDispatchContext,
} from "../../../../context/ProgressDrawerContext";

import { FileUploader } from "./components";
import { DropZone } from "./styles";

interface OnFileUpload {
  id: string;
  file: File;
  errors: FileError[];
}

const sanitize = (param: OnFileUpload) => {
  const { file, id, errors } = param;
  const { name, size, type } = file;
  const dateAdded = new Date();
  const _errors: CustomFileError[] = errors.map((err) => {
    const { code, message } = err;
    return { code, message };
  });
  const _file: CustomFile = { id, name, size, type, dateAdded };
  return { file: _file, errors: _errors };
};

const _DropZone = (): JSX.Element => {
  const [files, setFiles] = useState<OnFileUpload[]>([]);
  const setProgressDetails = useContext(ProgressDrawerDispatchContext);

  // const onDrop = useCallback(
  //   (acceptedFiles: File[], fileRejections: FileRejection[]) => {
  //     console.log("accepted", acceptedFiles);
  //     console.log("rejected", fileRejections);
  //     const accepted: OnFileUpload[] = acceptedFiles.map((file) => ({
  //       id: uuidv4(),
  //       file,
  //       errors: [],
  //     }));
  //     const rejected: OnFileUpload[] = fileRejections.map((file) => ({
  //       id: uuidv4(),
  //       file: file.file,
  //       errors: file.errors,
  //     }));

  //     setFiles(accepted);

  //     const acceptedJSON: FileUpload[] = accepted.map(sanitize);
  //     const rejectedJSON: FileUpload[] = rejected.map(sanitize);
  //     setProgressDetails((curr: FileUpload[]) => {
  //       return [...acceptedJSON, ...rejectedJSON, ...curr];
  //     });
  //   },
  //   []
  // );

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
    maxSize: 10485760 * 100,
  });

  useEffect(() => {
    console.log("accepted", acceptedFiles);
    console.log("rejected", fileRejections);
    const accepted: OnFileUpload[] = acceptedFiles.map((file) => ({
      id: uuidv4(),
      file,
      errors: [],
    }));
    const rejected: OnFileUpload[] = fileRejections.map((file) => ({
      id: uuidv4(),
      file: file.file,
      errors: file.errors,
    }));

    setFiles(accepted);

    const acceptedJSON: FileUpload[] = accepted.map(sanitize);
    const rejectedJSON: FileUpload[] = rejected.map(sanitize);
    setProgressDetails((curr: FileUpload[]) => {
      return [...acceptedJSON, ...rejectedJSON, ...curr];
    });
  }, [acceptedFiles, fileRejections]);

  const onProgress = (id: string, progress: number) => {
    setProgressDetails((curr: FileUpload[]) =>
      curr.map((savedFile) => {
        if (savedFile.file.id === id) {
          return {
            ...savedFile,
            progress,
          };
        }
        return savedFile;
      })
    );
  };

  const onUploadFail = (id: string, error: any) => {
    setProgressDetails((curr: FileUpload[]) =>
      curr.map((savedFile) => {
        if (savedFile.file.id === id) {
          return {
            ...savedFile,
            errors: [error, ...savedFile.errors],
          };
        }
        return savedFile;
      })
    );
  };

  return (
    <>
      <DropZone {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop GIF files here, or click to select files</p>
      </DropZone>
      <>
        {files.map((file, idx) => (
          <FileUploader
            id={file.id}
            key={idx}
            file={file.file}
            onUploadFail={onUploadFail}
            onProgress={onProgress}
          />
        ))}
      </>
    </>
  );
};

export default _DropZone;
