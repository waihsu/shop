import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button } from "@mui/material";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import client from "@/libs/contentFulClient";
import AspectRatio from "@mui/joy/AspectRatio";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const RecipesDetails = ({ shirt }) => {
  //   console.log(shirt);
  const { title, method, tumbnail, details, slug, featureImage } = shirt.fields;

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        px: 2,
        mt: 10,
      }}>
      <Card sx={{ width: 400 }}>
        <AspectRatio ratio="6/8">
          <figure>
            <img
              src={"https:" + tumbnail.fields.file.url}
              loading="lazy"
              alt="Yosemite by Casey Horner"
            />
          </figure>
        </AspectRatio>
        <CardContent>
          <Box fontWeight="bold" sx={{ fontSize: 22 }}>
            Title:
            <Typography fontWeight="semibold" sx={{ fontSize: 18 }}>
              {title}
            </Typography>
          </Box>
          <Typography
            sx={{ mt: 1, fontSize: 16, fontWeight: "bold" }}
            paragraph>
            Details:
          </Typography>
          {details.map((item) => {
            return (
              <Typography
                key={item}
                sx={{ fontSize: 16, fontWeight: "semibold" }}>
                {item}
              </Typography>
            );
          })}
        </CardContent>
        <CardActions disableSpacing>
          <Button variant="contained">Order now</Button>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more">
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              {documentToReactComponents(method)}
            </Typography>
          </CardContent>
          <AspectRatio ratio="6/8">
            <figure>
              <img
                src={"https:" + featureImage.fields.file.url}
                loading="lazy"
                alt="Yosemite by Casey Horner"
              />
            </figure>
          </AspectRatio>
        </Collapse>
      </Card>
    </Box>
  );
};

export default RecipesDetails;

export const getStaticPaths = async () => {
  const res = await client.getEntries({ content_type: "shirt" });
  const shirts = res.items;

  const paths = shirts.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: "shirt",
    "fields.slug": params.slug,
  });
  if (!items.length) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const shirt = items[0];

  return {
    props: { shirt: shirt },
    revalidate: 1,
  };
};
