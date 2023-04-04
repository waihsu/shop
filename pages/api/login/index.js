import { supabase } from "@/libs/supabase";

export default async function handler(req, res) {
  // console.log(req.body);
  const { email, password } = JSON.parse(req.body);
  // console.log(password);

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (!data.user) {
    return res.status(200).json({ error });
  }
  const user = data.user;
  return res.status(200).json({ user: user });
}
