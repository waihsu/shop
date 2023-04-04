import { Box, Typography } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const PageNotFound = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  });

  return (
    <Box sx={{ maxWidth: 400, mt: 16, mx: "auto" }}>
      <Stack spacing={1}>
        {/* For variant="text", adjust the height via font-size */}
        <Skeleton variant="text" sx={{ fontSize: "1rem", bgcolor: "red" }} />
        {/* For other variants, adjust the size with `width` and `height` */}
        <Skeleton
          variant="circular"
          sx={{ bgcolor: "red" }}
          width={60}
          height={60}
        />
        <Skeleton
          variant="rectangular"
          sx={{ bgcolor: "red" }}
          width="100%"
          height={60}
        />
        <Skeleton
          variant="rounded"
          sx={{ bgcolor: "red" }}
          width="100%"
          height={60}
        />
      </Stack>

      <Typography sx={{ color: "red", textAlign: "center", mt: 4 }}>
        Page NOt Found!!! <Link href="/">Go back Home</Link>
      </Typography>
    </Box>
  );
};

export default PageNotFound;
