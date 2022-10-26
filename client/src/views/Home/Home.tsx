import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

import { DropZone, Files } from "./components";

import { Container } from "./../../components";
import Main from "./../../layouts/Main";
import useFile from "../../hooks/useFile/useFile";
import useTag from "../../hooks/useTag/useTag";

const Home = (): JSX.Element => {
  const { queries: fileQueries, mutations: fileMutations } = useFile();
  const { queries: tagQueries } = useTag();

  const { getFiles } = fileQueries;
  const { getTags } = tagQueries;

  const tags = getTags?.data || [];
  const files = getFiles?.data;

  const loading = getFiles?.isLoading;
  const error = getFiles?.error;

  const {
    createPublicLink,
    deletePublicLink,
    updateFile,
    deleteFile,
    uploadFile,
  } = fileMutations;

  return (
    <Main>
      <Container>
        <Box marginBottom={4}>
          <DropZone />
        </Box>
        <Box>
          {loading ? <Typography>Fetching data</Typography> : null}
          {!loading && error ? (
            <Typography>{`Error fetching data: ${error}`}</Typography>
          ) : null}
          {!loading && files ? (
            <Files
              files={files}
              tags={tags}
              onCreatePublicLink={createPublicLink}
              onDeletePublicLink={deletePublicLink}
              onFileUpdate={updateFile}
              onFileDelete={deleteFile}
            />
          ) : null}
        </Box>
      </Container>
    </Main>
  );
};

export default Home;
