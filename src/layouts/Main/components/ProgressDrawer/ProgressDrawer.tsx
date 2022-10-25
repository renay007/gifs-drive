import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";

import { ProgressHeader, ProgressItem } from "./components";
import { ProgressDrawerContext } from "../../../../context/ProgressDrawerContext";
import { useContext } from "react";

const ProgressDrawer = (): JSX.Element => {
  const [expanded, setExpanded] = React.useState(false);
  const progressDetails: any = useContext(ProgressDrawerContext);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { acceptedFiles, fileRejections } = progressDetails;
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
            {acceptedFiles.map((file: any) => {
              return <ProgressItem name={file?.path} value={80} />;
            })}
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
};

export default ProgressDrawer;
