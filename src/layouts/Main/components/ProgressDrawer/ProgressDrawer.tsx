import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";

import { ProgressHeader, ProgressItem } from "./components";

const ProgressDrawer = (): JSX.Element => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box sx={{ position: "absolute", bottom: 15, right: 15 }}>
      <Card sx={{ width: { xs: 350, md: 500 } }}>
        <ProgressHeader
          expand={expanded}
          onExpandClick={handleExpandClick}
          title="Uploading ..."
          subheader="2 of 9"
        />
        <Collapse in={expanded} timeout="auto">
          <CardContent
            sx={{ overflow: "auto", maxHeight: 400, minHeight: 100 }}
          >
            <ProgressItem value={80} />
            <ProgressItem value={50} />
            <ProgressItem value={90} />
            <ProgressItem value={50} />
            <ProgressItem value={100} />
            <ProgressItem value={50} />
            <ProgressItem value={90} />
            <ProgressItem value={50} />
            <ProgressItem value={100} />
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
};

export default ProgressDrawer;
