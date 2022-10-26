import * as React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { red } from "@mui/material/colors";

import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import DeleteIcon from "@mui/icons-material/Delete";

import { ExpandMore } from "./styles";
import Button from "@mui/material/Button";

interface Props {
  title: string;
  subheader: string;
  expand: boolean;
  canClear: boolean;
  onClearAll: () => void;
  onExpandClick: () => void;
}

const ProgressDrawer = ({
  title,
  subheader,
  expand,
  canClear,
  onClearAll,
  onExpandClick,
}: Props): JSX.Element => {
  return (
    <CardHeader
      avatar={<CloudUploadIcon fontSize="large" htmlColor={red[500]} />}
      action={
        <CardActions disableSpacing>
          {expand && canClear ? (
            <Button
              startIcon={<DeleteIcon />}
              onClick={onClearAll}
              size="small"
              color="primary"
            >
              Clear
            </Button>
          ) : null}
          <ExpandMore
            expand={expand}
            onClick={onExpandClick}
            aria-expanded={expand}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      }
      title={title}
      subheader={subheader}
    />
  );
};

export default ProgressDrawer;
