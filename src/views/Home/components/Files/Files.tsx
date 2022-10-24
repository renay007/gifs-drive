import React from "react";

import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import File, { FileProps } from "./components/File/File";
import { FileType } from "./components/File/types";

export type FilesProps = Omit<FileProps, "file"> & { files: FileType[] };

const Files = (props: FilesProps): JSX.Element => {
  const { files, ...rest } = props;
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
            <File file={file} {...rest} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Files;
