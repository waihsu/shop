import * as React from "react";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

const RecipeCard = ({ recipe }) => {
  //   console.log(recipe);
  const { title, slug, tumbnail, cookieTime, method } = recipe.fields;

  return (
    <Card sx={{ minHeight: "280px", width: 420 }}>
      <CardCover>
        <img src={tumbnail.fields.file.url} loading="lazy" alt="" />
      </CardCover>
      <CardCover
        sx={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
        }}
      />
      <CardContent sx={{ justifyContent: "flex-end" }}>
        <Typography level="h2" fontSize="lg" textColor="#fff" mb={1}>
          {title}
        </Typography>
        <Typography textColor="neutral.300">
          CookieTimes: {cookieTime} min
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Link href={"/recipes/" + slug}>
            <Button sx={{ bgcolor: "cornsilk" }}>Read More</Button>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
