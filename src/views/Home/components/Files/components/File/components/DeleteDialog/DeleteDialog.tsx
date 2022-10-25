import React, { useState } from "react";

import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";

import { FileType } from "./../../types";

const DeleteDialog = ({
  open,
  onCancel,
  onConfirm,
  file,
}: {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  file: FileType;
}): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm();
    } catch (error) {
      console.log("failed to delete:handleConfirm", error);
    } finally {
      setLoading(false);
    }
  };

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
          onClick={handleConfirm}
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

export default DeleteDialog;
