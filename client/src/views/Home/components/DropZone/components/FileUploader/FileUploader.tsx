import React, { useEffect } from "react";
import { AxiosRequestConfig } from "axios";
import useFile from "../../../../../../hooks/useFile/useFile";

interface CustomError {
  code: string;
  message: string;
}

interface Props {
  id: string;
  file: File;
  onProgress?: (id: string, progress: number) => void;
  onUploadFail?: (id: string, error: any) => void;
}

const FileUploader = ({
  id,
  file,
  onProgress,
  onUploadFail,
}: Props): JSX.Element => {
  const { mutations } = useFile();
  useEffect(() => {
    const upload = async () => {
      try {
        await onFileUpload({ id, file, onProgress });
      } catch (error) {
        if (onUploadFail) onUploadFail(id, error);
      }
    };
    upload();
  }, [file]);

  const onFileUpload = async ({ id, file, onProgress }: Props) => {
    const data = new FormData();
    data.append("file", file);
    const config: AxiosRequestConfig = {
      onUploadProgress(progressEvent) {
        if (onProgress)
          onProgress(id, Math.round(progressEvent.progress || 0) * 100);
      },
    };
    return await mutations.uploadFile({ data, config });
  };

  return <></>;
};

export default FileUploader;
