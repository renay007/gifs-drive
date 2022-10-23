import React from "react";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Chip from "@mui/material/Chip";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";

export interface Tag {
  tag_id: string;
  name: string;
}

export interface FileType {
  file_id: string;
  name: string;
  secure_url: string;
  tags: Tag[];
}

interface FileProps {
  file: FileType;
  onFileDelete?: (file: FileType) => void;
  onFileUpdate?: (file: FileType) => void;
}

const File = ({ file, onFileDelete, onFileUpdate }: FileProps): JSX.Element => {
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [loadingDeleteDialog, setLoadingDeleteDialog] = React.useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);
  const [loadingUpdateDialog, setLoadingUpdateDialog] = React.useState(false);

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setLoadingDeleteDialog(false);
  };

  const handleDelete = async (file: FileType) => {
    if (onFileDelete) {
      try {
        setLoadingDeleteDialog(true);
        await onFileDelete(file);
      } catch (error) {
        // Push error to snack
      } finally {
        setLoadingDeleteDialog(false);
      }
    } else {
      setOpenDeleteDialog(false);
    }
  };

  const handleOpenUpdateDialog = () => {
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
    setLoadingUpdateDialog(false);
  };

  const handleUpdate = async (file: FileType) => {
    if (onFileUpdate) {
      try {
        setLoadingUpdateDialog(true);
        await onFileUpdate(file);
      } catch (error) {
        // Push error to snack
      } finally {
        setLoadingUpdateDialog(false);
      }
    } else {
      setOpenUpdateDialog(false);
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
            {file.tags.map((tag) => (
              <Chip
                key={tag.tag_id}
                sx={{ marginRight: 1, marginTop: 2 }}
                size="small"
                label={tag.name}
              />
            ))}
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
        loading={loadingDeleteDialog}
        onCancel={handleCloseDeleteDialog}
        onConfirm={() => handleDelete(file)}
        file={file}
      />
      <UpdateDialog
        open={openUpdateDialog}
        loading={loadingUpdateDialog}
        onCancel={handleCloseUpdateDialog}
        onConfirm={() => handleUpdate(file)}
        file={file}
      />
    </div>
  );
};

const DeleteDialog = ({
  open,
  onCancel,
  onConfirm,
  file,
  loading,
}: {
  open: boolean;
  loading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  file: FileType;
}): JSX.Element => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete forever?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`"${file.name}" will be deleted forever and you won't be able to restore it.`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <LoadingButton
          onClick={onConfirm}
          loading={loading}
          loadingPosition="start"
          variant="contained"
          startIcon={<DeleteIcon />}
          autoFocus
        >
          Delete forever
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

const UpdateDialog = ({
  open,
  onCancel,
  onConfirm,
  file,
  loading,
}: {
  open: boolean;
  loading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  file: FileType;
}): JSX.Element => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <LoadingButton
          onClick={onConfirm}
          loading={loading}
          variant="contained"
          autoFocus
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default File;
