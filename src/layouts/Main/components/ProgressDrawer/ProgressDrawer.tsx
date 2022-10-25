import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";

import { ProgressHeader, ProgressItem } from "./components";
import {
  CustomFile,
  FileUpload,
  ProgressDrawerContext,
  ProgressDrawerDispatchContext,
} from "../../../../context/ProgressDrawerContext";
import { useCallback, useContext, useMemo } from "react";

const ProgressDrawer = (): JSX.Element => {
  const [expanded, setExpanded] = React.useState(false);
  const progressDetails: FileUpload[] = useContext(ProgressDrawerContext);
  const setProgressDetails = useContext(ProgressDrawerDispatchContext);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = (file: CustomFile) => {
    setProgressDetails((curr: any) =>
      curr.filter((item: FileUpload) => item.file != file)
    );
  };

  const canClear = useMemo(() => {
    return (
      progressDetails.filter((item: FileUpload) => item.errors.length > 0)
        .length > 0
    );
  }, [progressDetails]);

  const handleClear = useCallback((): void => {
    setProgressDetails((curr: any) =>
      curr.filter((item: FileUpload) => item.errors.length === 0)
    );
  }, [progressDetails]);

  return (
    <Box sx={{ position: "fixed", bottom: 15, right: 15 }}>
      <Card sx={{ width: { xs: 350, md: 500 } }}>
        <ProgressHeader
          expand={expanded}
          canClear={canClear}
          onClearAll={handleClear}
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
                <ProgressItem
                  onDelete={handleDelete}
                  key={idx}
                  file={file}
                  value={80}
                />
              );
            })}
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
};

export default ProgressDrawer;
