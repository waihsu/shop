export const FetchRecipe = async () => {
  const res = await fetch("/api/recipes");
  //   console.log(res);
  const data = await res.json();
  return {
    props: {
      recipes: data.recipes,
    },
  };
};
