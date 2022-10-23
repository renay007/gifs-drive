import React from "react";
import Box from "@mui/material/Box";

import { DropZone, Files } from "./components";

import { Container } from "./../../components";
import Main from "./../../layouts/Main";

const files = [
  {
    file_id: "3d5bf82b-e228-4b1f-8497-8d9309de34ff",
    name: "Minions",
    secure_url:
      "http://localhost:5000/cdn/private/view/files/ZTI5ZmNkMmZkYjU2NjU5Njk4OGRkMmZkYWNmYjc2YTM6MWVjNTI1YzlkMjU2NTZiMzdhMTBjODY0NzQwZDgxMzQwNjQyMjhhMmFkZjhkZmE2NTdhY2E3YzI5NTViZmQ3ZjEzOGYyMDI4Yzg2MDI0YjE0NzRlNGE2MzE1OTk5ZmE0",
    tags: [
      {
        tag_id: "2a44d24f-f799-4a02-8cfd-564eea02a66f",
        name: "programing",
      },
      {
        tag_id: "8f4798f0-d884-49f4-86b2-66f66d6744a7",
        name: "serious",
      },
      {
        tag_id: "9525a8a0-3c73-4c03-a9e1-8666d3e20e6b",
        name: "animated",
      },
    ],
  },
  {
    file_id: "7349ea64-caa1-4c7a-8e9f-a9ba9a394938",
    name: "Cute Minion",
    secure_url:
      "http://localhost:5000/cdn/private/view/files/NDcyYzA3ZWMxNjBjYjM0OGYzMmYzYmI5NzI5OWFlZmI6MzgyODA2MGE3ZWZjOTY5ZDQ1NjhkNmQ1YmNmMmQ5NWQ4MTgwNWFiOTk5ZDAxZjg4NTRmY2Q3MTY2ZTE3ZGI4MDRjY2VkYjZjYjRiZmNjYWRkZjU3MWE3YjMyN2Q3YzEz",
    tags: [
      {
        tag_id: "e0d604be-a09d-4a18-9ec8-e4d3f926cbae",
        name: "funny",
      },
    ],
  },
];

const Home = (): JSX.Element => {
  return (
    <Main>
      <Container>
        <Box marginBottom={4}>
          <DropZone />
        </Box>
        <Box>
          <Files files={files} />
        </Box>
      </Container>
    </Main>
  );
};

export default Home;
