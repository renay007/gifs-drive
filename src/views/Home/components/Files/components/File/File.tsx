import React from "react";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

export interface Tag {
  tag_id: string;
  name: string;
}

export interface FileType {
  file_id: string;
  name: string;
  secure_url: string;
  tags: Tag[];
}

interface FileProps {
  file: FileType;
}

const File = ({ file }: FileProps): JSX.Element => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          sx={{
            objectFit: "contain",
            height: 230,
          }}
          image={file.secure_url}
          alt={file.name}
        />
        <CardContent>
          <Typography
            gutterBottom
            noWrap
            variant="body2"
            color="text.secondary"
          >
            {file.name}
          </Typography>
          {file.tags.map((tag) => (
            <Chip
              key={tag.tag_id}
              sx={{ marginRight: 1, marginTop: 2 }}
              size="small"
              label={tag.name}
            />
          ))}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default File;
