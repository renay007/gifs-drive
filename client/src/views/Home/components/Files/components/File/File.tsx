import React from "react";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

import { FileType, Tag } from "./types";
import { DeleteDialog, UpdateDialog } from "./components";
import Stack from "@mui/material/Stack";

export interface FileProps {
  file: FileType;
  tags: Tag[];
  onCreatePublicLink?: ({ id }: { id: string }) => void;
  onDeletePublicLink?: ({ id }: { id: string }) => void;
  onFileDelete?: ({ id }: { id: string }) => void;
  onFileUpdate?: ({ id, data }: { id: string; data: FileType }) => void;
}

const File = ({
  file,
  tags,
  onCreatePublicLink = () => {},
  onDeletePublicLink = () => {},
  onFileDelete = () => {},
  onFileUpdate = () => {},
}: FileProps): JSX.Element => {
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDelete = async (data: { id: string }) => {
    try {
      await onFileDelete(data);
      setOpenDeleteDialog(false);
    } catch (error) {}
  };

  const handleOpenUpdateDialog = () => {
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
  };

  const handleUpdate = async (obj: { id: string; data: FileType }) => {
    try {
      await onFileUpdate(obj);
      setOpenUpdateDialog(false);
    } catch (error) {}
  };

  return (
    <div>
      <Card>
        <CardActionArea onClick={handleOpenUpdateDialog}>
          <CardMedia
            component="img"
            sx={{
              objectFit: "contain",
              height: 230,
            }}
            image={file.secure_url}
            alt={file.name}
          />
          <CardContent>
            <Typography
              gutterBottom
              noWrap
              variant="body2"
              color="text.secondary"
            >
              {file.name}
            </Typography>
            <Stack
              direction="row"
              paddingY={2}
              height={16}
              sx={{ overflow: "scroll" }}
              spacing={1}
            >
              {file.tags.map((tag) => (
                <Chip key={tag.name} size="small" label={tag.name} />
              ))}
            </Stack>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleOpenDeleteDialog}>
            Delete
          </Button>
        </CardActions>
      </Card>
      <DeleteDialog
        open={openDeleteDialog}
        onCancel={handleCloseDeleteDialog}
        onConfirm={() => handleDelete({ id: file.file_id })}
        file={file}
      />
      <UpdateDialog
        open={openUpdateDialog}
        onCreateLink={() => onCreatePublicLink({ id: file.file_id })}
        onDeleteLink={() => onDeletePublicLink({ id: file.file_id })}
        onCancel={handleCloseUpdateDialog}
        onConfirm={(values) => handleUpdate({ id: file.file_id, data: values })}
        file={file}
        tags={tags}
      />
    </div>
  );
};

export default File;
