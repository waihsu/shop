import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import Chip from "@mui/joy/Chip";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Favorite from "@mui/icons-material/Favorite";
import CreateNewFolder from "@mui/icons-material/CreateNewFolder";
import { Button } from "@mui/material";
import Link from "next/link";

export default function ShirtCard({ shirt }) {
  //   console.log(shirt);
  const { title, slug, price, tumbnail } = shirt.fields;
  return (
    <Card
      sx={{
        width: 300,
        border: 1,
        borderColor: "goldenrod",
        p: 2,
        bgcolor: "initial",
        boxShadow: "none",
        "--Card-padding": "0px",
      }}>
      <Box sx={{ position: "relative" }}>
        <AspectRatio ratio="6/8">
          <figure>
            <img
              src={"https:" + tumbnail.fields.file.url}
              loading="lazy"
              alt="Yosemite by Casey Horner"
            />
          </figure>
        </AspectRatio>
        <CardCover
          className="gradient-cover"
          sx={{
            "&:hover, &:focus-within": {
              opacity: 1,
            },
            opacity: 0,
            transition: "0.1s ease-in",
            background:
              "linear-gradient(180deg, transparent 62%, rgba(0,0,0,0.00345888) 63.94%, rgba(0,0,0,0.014204) 65.89%, rgba(0,0,0,0.0326639) 67.83%, rgba(0,0,0,0.0589645) 69.78%, rgba(0,0,0,0.0927099) 71.72%, rgba(0,0,0,0.132754) 73.67%, rgba(0,0,0,0.177076) 75.61%, rgba(0,0,0,0.222924) 77.56%, rgba(0,0,0,0.267246) 79.5%, rgba(0,0,0,0.30729) 81.44%, rgba(0,0,0,0.341035) 83.39%, rgba(0,0,0,0.367336) 85.33%, rgba(0,0,0,0.385796) 87.28%, rgba(0,0,0,0.396541) 89.22%, rgba(0,0,0,0.4) 91.17%)",
          }}>
          {/* The first box acts as a container that inherits style from the CardCover */}
          <Box>
            <Box
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                flexGrow: 1,
                alignSelf: "flex-end",
              }}>
              <Typography level="h2" noWrap sx={{ fontSize: "lg" }}>
                <Link
                  href={"/shirts/" + slug}
                  overlay
                  underline="none"
                  sx={{
                    color: "#fff",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    display: "block",
                  }}>
                  T-Shirt-{title}
                </Link>
              </Typography>
              <IconButton size="sm" color="neutral" sx={{ ml: "auto" }}>
                <CreateNewFolder />
              </IconButton>
              <IconButton size="sm" color="neutral">
                <Favorite />
              </IconButton>
            </Box>
          </Box>
        </CardCover>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 1,
          mt: 1.5,
          alignItems: "center",
        }}>
        <Box>
          <Typography sx={{ fontSize: "sm", fontWeight: "md" }}>
            For: {title}
          </Typography>
          <Link href={"/shirts/" + slug}>
            <Chip
              variant="outlined"
              color="neutral"
              size="sm"
              sx={{
                borderRadius: "sm",
                py: 0.25,
                px: 0.5,
              }}>
              Featured
            </Chip>
          </Link>
        </Box>
        <Box>
          <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
            Price: {price}Ks
          </Typography>
          <Button variant="contained">Order</Button>
        </Box>
      </Box>
    </Card>
  );
}
