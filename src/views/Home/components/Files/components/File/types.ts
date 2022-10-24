export interface Tag {
  name: string;
}

export interface FileType {
  file_id: string;
  name: string;
  secure_url: string;
  public_url: string | null;
  tags: Tag[];
};
