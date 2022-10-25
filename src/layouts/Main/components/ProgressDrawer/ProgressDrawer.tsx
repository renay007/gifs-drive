import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";

import { ProgressHeader, ProgressItem } from "./components";
import {
  FileUpload,
  ProgressDrawerContext,
} from "../../../../context/ProgressDrawerContext";
import { useContext } from "react";

const ProgressDrawer = (): JSX.Element => {
  const [expanded, setExpanded] = React.useState(false);
  const progressDetails: FileUpload[] = useContext(ProgressDrawerContext);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Box sx={{ position: "fixed", bottom: 15, right: 15 }}>
      <Card sx={{ width: { xs: 350, md: 500 } }}>
        <ProgressHeader
          expand={expanded}
          onExpandClick={handleExpandClick}
          title="Tap to see your files in progress"
          subheader=""
        />
        <Collapse in={expanded} timeout="auto">
          <CardContent
            sx={{ overflow: "auto", maxHeight: 400, minHeight: 100 }}
          >
            {progressDetails.map((file: FileUpload, idx: number) => {
              return (
                <ProgressItem key={idx} name={file?.file?.name} value={80} />
              );
            })}
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
};

export default ProgressDrawer;
