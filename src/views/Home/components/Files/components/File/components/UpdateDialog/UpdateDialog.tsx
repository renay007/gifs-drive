import React from "react";

import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AddLinkIcon from "@mui/icons-material/AddLink";
import Autocomplete from "@mui/material/Autocomplete";

import { FileType, Tag } from "./../../types";

const UpdateDialog = ({
  open,
  onCreateLink,
  onDeleteLink,
  onCancel,
  onConfirm,
  file,
  tags,
}: {
  open: boolean;
  onCancel: () => void;
  onCreateLink: () => void;
  onDeleteLink: () => void;
  onConfirm: (values: FileType) => void;
  tags: Tag[];
  file: FileType;
}): JSX.Element => {
  const [values, setValues] = React.useState<FileType>(file);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleChange =
    (prop: keyof FileType) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleTags = (event: any, newValue: string[]) => {
    setValues({ ...values, tags: newValue.map((el) => ({ name: el })) });
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm(values);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Update</DialogTitle>
      <DialogContent>
        <TextField
          label="File Name"
          fullWidth
          value={values.name}
          onChange={handleChange("name")}
          sx={{ mt: 2, mb: 4 }}
          InputProps={{
            endAdornment: <InputAdornment position="end">.gif</InputAdornment>,
          }}
        />
        <Autocomplete
          multiple
          limitTags={2}
          autoSelect
          freeSolo={true}
          options={tags.map((el) => el.name)}
          value={values.tags.map((el) => el.name)}
          onChange={handleTags}
          renderInput={(params) => <TextField {...params} placeholder="Tags" />}
          sx={{ mb: 4, width: { xs: "200px", md: "500px" } }}
        />
        <FormControl fullWidth variant="outlined" disabled sx={{ mb: 4 }}>
          <InputLabel htmlFor="outlined-adornment-public-url">
            Public URL
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-public-url"
            type={"text"}
            value={values.public_url || ""}
            onChange={handleChange("public_url")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={onCreateLink}>
                  <AddLinkIcon />
                </IconButton>
                {file.public_url && (
                  <IconButton onClick={onDeleteLink}>
                    <DeleteIcon />
                  </IconButton>
                )}
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <LoadingButton
          onClick={handleConfirm}
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

export default UpdateDialog;
