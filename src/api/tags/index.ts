import axios from "axios";
import { Response } from "../types";
import { Tag } from "../../views/Home/components/Files/components/File/types";

export type TagResponseWithDataArray = Response & { data: Tag[] };
export type TagResponseWithDataObject = Response & { data: Tag };

export const getTags = (): Promise<TagResponseWithDataArray> =>
  axios.get("/api/tags").then((res) => res.data);
