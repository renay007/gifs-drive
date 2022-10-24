import React from "react";
import Box from "@mui/material/Box";
import { useQuery } from "@tanstack/react-query";
import { Typography } from "@mui/material";

import { DropZone, Files } from "./components";

import { getTags, TagResponseWithDataArray } from "../../api/tags";
import { getFiles, FileResponseWithDataArray } from "../../api/files";
import { Container } from "./../../components";
import Main from "./../../layouts/Main";

const Home = (): JSX.Element => {
  const {
    isLoading: loadingTags,
    error: tagError,
    data: tagsResponse,
  } = useQuery<TagResponseWithDataArray, Error>(["tags"], getTags);

  const {
    isLoading: loadingFiles,
    error: fileError,
    data: filesResponse,
  } = useQuery<FileResponseWithDataArray, Error>(["files"], getFiles);

  const loading = loadingTags || loadingFiles;

  const error =
    tagError || fileError || !tagsResponse?.success || !filesResponse?.success;

  let message = error
    ? tagError?.message ||
      fileError?.message ||
      tagsResponse?.message ||
      filesResponse?.message
    : "";

  return (
    <Main>
      <Container>
        <Box marginBottom={4}>
          <DropZone />
        </Box>
        <Box>
          {loading ? <Typography>Fetching data</Typography> : null}
          {!loading && error ? (
            <Typography>{`Error fetching data: ${message}`}</Typography>
          ) : null}
          {!loading && tagsResponse?.success && filesResponse?.success ? (
            <Files files={filesResponse.data} tags={tagsResponse?.data} />
          ) : null}
        </Box>
      </Container>
    </Main>
  );
};

export default Home;
