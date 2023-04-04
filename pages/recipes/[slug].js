import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { Box, Button } from "@mui/material";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import client from "@/libs/contentFulClient";
import { memo } from "react";

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

const RecipesDetails = ({ recipe }) => {
  // const router = useRouter();
  // const [recipe, setRecipe] = useState({});
  // useEffect(() => {
  //   const getRecipes = async () => {
  //     const slug = router.query;
  //     const res = await fetch(`/api/recipes/` + slug);
  //     const data = await res.json();
  //     console.log(data.recipe);
  //     const recipe = data.recipe;
  //     setRecipe(recipe);
  //   };
  //   getRecipes();
  // }, []);
  // console.log(recipe);
  const {
    title,
    method,
    tumbnail,
    cookieTime,
    ingredient,
    slug,
    featureImage,
  } = recipe.fields;

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", px: 2, mt: 10 }}>
      <Card sx={{ width: 400 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Mr Shop"
          subheader={"Cookietimes:" + cookieTime + "min"}
        />
        <CardMedia
          component="img"
          height="194"
          image={"https:" + tumbnail.fields.file.url}
          alt="Paella dish"
        />
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
            Ingredients:
          </Typography>
          {ingredient.map((item) => {
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
        </Collapse>
      </Card>
    </Box>
  );
};

export default memo(RecipesDetails);

export const getStaticPaths = async () => {
  const res = await client.getEntries({ content_type: "recipes" });
  const recipes = res.items;

  const paths = recipes.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: "recipes",
    "fields.slug": params.slug,
  });
  const recipe = items[0];

  return {
    props: { recipe: recipe },
  };
};

// export const getStaticPaths = async () => {
//   const res = await fetch(`http://localhost:3000/api/recipes`);
//   const data = await res.json();
//   // console.log(data);
//   const paths = data.recipes.map((item) => {
//     return {
//       params: { slug: item.fields.slug },
//     };
//   });

//   return {
//     paths,
//     fallback: false,
//   };
// };

// export const getStaticProps = async ({ params }) => {
//   // console.log(params.slug);
//   const res = await fetch(`http://localhost:3000/api/recipes/${params.slug}`);

//   // console.log(res);
//   const data = await res.json();
//   // console.log(data.recipe.fields);
//   const recipe = data.recipe;
//   return {
//     props: { recipe: recipe },
//   };
// };
