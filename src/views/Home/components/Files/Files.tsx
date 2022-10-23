import React from "react";

import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import File, { FileType } from "./components/File/File";

const Files = ({ files }: { files: FileType[] }): JSX.Element => {
  return (
    <Box>
      <Box marginBottom={4}>
        <Typography fontWeight={700} variant={"h4"}>
          Files
        </Typography>
        <Typography color={"text.secondary"}>
          Your favorite files, all in one place.
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {files.map((file) => (
          <Grid key={file.file_id} item xs={6} md={3}>
            <File file={file} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Files;
