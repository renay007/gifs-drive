import axios from "axios";
import { Response } from "../types";
import { FileType } from "../../views/Home/components/Files/components/File/types";

export type FileResponseWithDataArray = Response & { data: FileType[] };
export type FileResponseWithDataObject = Response & { data: FileType };
export type FileResponseWithNoData = Response & { data: null };

export const getFiles = (): Promise<FileResponseWithDataArray> =>
  axios.get("/api/files").then((res) => res.data);

export const updateFile = (
  file: FileType
): Promise<FileResponseWithDataObject> => {
  const { file_id: fileId, ...rest } = file;
  return axios.patch(`/api/files/${fileId}`, rest).then((res) => res.data);
};

export const deleteFile = (file: FileType): Promise<FileResponseWithNoData> => {
  const { file_id: fileId } = file;
  return axios.delete(`/api/files/${fileId}`).then((res) => res.data);
};

export const uploadFile = (
  form: FormData,
  config: any
): Promise<FileResponseWithDataObject> => {
  return axios.post("/api/files", form, config).then((res) => res.data);
};

export const createPublicLink = (
  file: FileType
): Promise<FileResponseWithDataObject> => {
  const { file_id: fileId } = file;
  return axios.post(`/api/files/${fileId}/link`).then((res) => res.data);
};

export const deletePublicLink = (
  file: FileType
): Promise<FileResponseWithDataObject> => {
  const { file_id: fileId } = file;
  return axios.delete(`/api/files/${fileId}/link`).then((res) => res.data);
};
