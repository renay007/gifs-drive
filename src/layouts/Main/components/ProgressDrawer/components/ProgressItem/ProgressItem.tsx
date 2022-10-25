import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import ImageIcon from "@mui/icons-material/Image";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";

interface ProgressItemProps extends LinearProgressProps {
  name: string;
  value: number;
}

const ProgressItem = (props: ProgressItemProps): JSX.Element => {
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
            {props.name}
          </Typography>
        </Box>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress
            color={props.value >= 100 ? "success" : "primary"}
            variant="determinate"
            {...props}
          />
        </Box>
      </Box>
      <Box>
        {props.value >= 100 ? (
          <IconButton>
            <ClearIcon fontSize="medium" />
          </IconButton>
        ) : (
          <Box sx={{ minWidth: 35, ml: 2 }}>
            <Typography variant="body2" color="text.secondary">{`${Math.round(
              props.value
            )}%`}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProgressItem;
