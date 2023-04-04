import RecipeCard from "@/comp/RecipeCard";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "@mui/system";
import { memo } from "react";
import { useEffect } from "react";
import { FetchRecipe } from "@/hooks/fetchRecipes";
import { useState } from "react";
import client from "@/libs/contentFulClient";

const Home = ({ recipes }) => {
  // const [recipes, setRecipes] = useState([]);
  // useEffect(() => {
  //   const getRecipes = async () => {
  //     const res = await FetchRecipe();
  //     const data = res.props.recipes;
  //     // console.log(res);
  //     setRecipes(data);
  //   };
  //   getRecipes();
  // }, []);

  // console.log(recipes);
  const recipesLabel = recipes.map((recipe) => ({
    label: recipe.fields.title,
  }));
  // console.log(recipesLabel);
  return (
    <Box
      sx={{
        mt: 10,
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 10,
      }}>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={recipesLabel}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Recipes" />}
        />
      </Box>
      {recipes &&
        recipes.map((recipe) => (
          <RecipeCard key={recipe.sys.id} recipe={recipe} />
        ))}
    </Box>
  );
};

export default memo(Home);

export const getStaticProps = async () => {
  const data = await client.getEntries({ content_type: "recipes" });
  const recipes = data.items;

  return {
    props: {
      recipes: recipes,
    },
  };
};

// export const getStaticProps = async () => {
//   const res = await fetch(`http://localhost:3000/api/recipes`);
//   //   console.log(res);
//   const data = await res.json();
//   return {
//     props: {
//       recipes: data.recipes,
//     },
//   };
// };
