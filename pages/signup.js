import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { supabase } from "@/libs/supabase";
import { useState } from "react";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import { LoadingButton } from "@mui/lab";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  const handleClick = async (e) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    setLoading(false);
    if (data) {
      setSuccess("Verify your account from email.");
    }
    if (error) {
      console.log(error.message);
    }
  };

  return (
    <Box
      sx={{
        mt: 20,
        maxWidth: 400,
        mx: "auto",
        p: 2,
      }}>
      <Box sx={{}}>
        <Typography>Sign up</Typography>

        <Box>
          <TextField
            sx={{ width: "100%", mt: 2 }}
            id="outlined-basic"
            label="email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            sx={{ width: "100%", mt: 2 }}
            id="outlined-basic"
            label="password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Box sx={{ mt: 2, maxWidth: "100%", display: "flex", gap: 4 }}>
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={handleClick}>
            Create
          </LoadingButton>
          <Avatar sx={{ bgcolor: "red", cursor: "pointer" }}>G</Avatar>
          <Avatar sx={{ bgcolor: "blue", cursor: "pointer" }}>F</Avatar>
        </Box>
        <Typography sx={{ mt: 2, color: "blue", cursor: "pointer" }}>
          <Link href="/">I've already account.</Link>
        </Typography>
        <Typography sx={{ mt: 2, textAlign: "center", color: "green" }}>
          {success}
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUp;
