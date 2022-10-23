import * as React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { red } from "@mui/material/colors";
import { CardHeader } from "@mui/material";

import { ExpandMore } from "./styles";

interface Props {
  title: string;
  subheader: string;
  expand: boolean;
  onExpandClick: () => void;
}

const ProgressDrawer = ({
  title,
  subheader,
  expand,
  onExpandClick,
}: Props): JSX.Element => {
  return (
    <CardHeader
      avatar={<CloudUploadIcon fontSize="large" htmlColor={red[500]} />}
      action={
        <ExpandMore
          expand={expand}
          onClick={onExpandClick}
          aria-expanded={expand}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      }
      title={title}
      subheader={subheader}
    />
  );
};

export default ProgressDrawer;
