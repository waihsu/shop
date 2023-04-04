import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/libs/supabase";
import { useRouter } from "next/router";
import LoadingButton from "@mui/lab/LoadingButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleClick = async (e) => {
    e.preventDefault();

    setLoading(true);
    // const { data, error } = await supabase.auth.signInWithPassword({
    //   email: email,
    //   password: password,
    // });

    const body = { email, password };
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(body),
    });

    const data = await res.json();
    // console.log(data);
    setLoading(false);
    if (data.user) {
      router.push("/");
      // console.log(data);
      setError("");
    }
    if (data.error) {
      // console.log(data);
      setError("Wrong username or password!!!");
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
        <Typography>Log in</Typography>

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
            Login
          </LoadingButton>
          <Avatar sx={{ bgcolor: "red", cursor: "pointer" }}>G</Avatar>
          <Avatar sx={{ bgcolor: "blue", cursor: "pointer" }}>F</Avatar>
        </Box>
        <Typography sx={{ mt: 2, color: "blue", cursor: "pointer" }}>
          Forget password
        </Typography>
        <Typography sx={{ textAlign: "center", mt: 2, color: "peru" }}>
          I don't have account.<Link href="/signup">Sign up now</Link>
        </Typography>
      </Box>
      {error && (
        <Typography sx={{ textAlign: "center", mt: 2, color: "red" }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default Login;
