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

interface FileProps {
  file: FileType;
  tags: Tag[];
  onCreatePublicLink?: (file: FileType) => void;
  onDeletePublicLink?: (file: FileType) => void;
  onFileDelete?: (file: FileType) => void;
  onFileUpdate?: ({
    file,
    values,
  }: {
    file: FileType;
    values: FileType;
  }) => void;
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

  const handleDelete = async (file: FileType) => {
    try {
      await onFileDelete(file);
      setOpenDeleteDialog(false);
    } catch (error) {
      throw error;
    }
  };

  const handleOpenUpdateDialog = () => {
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
  };

  const handleUpdate = async ({
    file,
    values,
  }: {
    file: FileType;
    values: FileType;
  }) => {
    try {
      await onFileUpdate({ file, values });
      setOpenUpdateDialog(false);
    } catch (error) {
      throw error;
    }
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
              sx={{ overflow: "scroll" }}
              spacing={1}
            >
              {file.tags.map((tag) => (
                <Chip
                  key={tag.name}
                  // sx={{ marginRight: 1, marginTop: 2 }}
                  size="small"
                  label={tag.name}
                />
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
        onConfirm={() => handleDelete(file)}
        file={file}
      />
      <UpdateDialog
        open={openUpdateDialog}
        onCreateLink={() => onCreatePublicLink(file)}
        onDeleteLink={() => onDeletePublicLink(file)}
        onCancel={handleCloseUpdateDialog}
        onConfirm={(values) => handleUpdate({ file, values })}
        file={file}
        tags={tags}
      />
    </div>
  );
};

export default File;
