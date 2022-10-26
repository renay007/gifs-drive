import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import ImageIcon from "@mui/icons-material/Image";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";
import {
  CustomFile,
  FileUpload,
} from "../../../../../../context/ProgressDrawerContext";

interface ProgressItemProps extends LinearProgressProps {
  file: FileUpload;
  value: number;
  onDelete: (file: CustomFile) => void;
}

const ProgressItem = ({
  file,
  value,
  onDelete,
}: ProgressItemProps): JSX.Element => {
  const hasError = file.errors.length !== 0;
  const { message } = file.errors[0] || {};
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 4,
      }}
    >
      <ImageIcon fontSize="large" sx={{ mr: 2 }} />
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 35, mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {file.file.name}
          </Typography>
        </Box>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress
            color={file.errors.length === 0 ? "success" : "error"}
            sx={{ mb: 1 }}
            variant="determinate"
            value={value}
          />
          <Typography variant="body2" color="error">
            {hasError ? `${message}` : ""}
          </Typography>
        </Box>
      </Box>
      <Box>
        {value >= 100 || hasError ? (
          <IconButton onClick={() => onDelete(file.file)}>
            <ClearIcon fontSize="medium" />
          </IconButton>
        ) : (
          <Box sx={{ minWidth: 35, ml: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {!hasError ? `${Math.round(value)}%` : ""}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProgressItem;
