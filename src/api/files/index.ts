import axios from "axios";
import { Response } from "../types";
import { FileType } from "../../views/Home/components/Files/components/File/types";

export type FileResponseWithDataArray = Response & { data: FileType[] };
export type FileResponseWithDataObject = Response & { data: FileType };
export type FileResponseWithNoData = Response & { data: null };

export const getFiles = (): Promise<FileResponseWithDataArray> =>
  axios.get("/api/files").then((res) => res.data);

export const updateFile = ({
  id,
  data,
}: {
  id: string;
  data: FileType;
}): Promise<FileResponseWithDataObject> => {
  const form = JSON.stringify(data);
  console.log("fileId", id, "data", data);
  const options = { headers: { "Content-Type": "application/json" } };
  return axios.patch(`/api/files/${id}`, form, options).then((res) => res.data);
};

export const deleteFile = ({
  id,
}: {
  id: string;
}): Promise<FileResponseWithNoData> => {
  return axios.delete(`/api/files/${id}`).then((res) => res.data);
};

export const uploadFile = ({
  data,
  config,
}: {
  data: FormData;
  config: any;
}): Promise<FileResponseWithDataObject> => {
  return axios.post("/api/files", data, config).then((res) => res.data);
};

export const createPublicLink = ({
  id,
}: {
  id: string;
}): Promise<FileResponseWithDataObject> => {
  return axios.post(`/api/files/${id}/link`).then((res) => res.data);
};

export const deletePublicLink = ({
  id,
}: {
  id: string;
}): Promise<FileResponseWithDataObject> => {
  return axios.delete(`/api/files/${id}/link`).then((res) => res.data);
};
