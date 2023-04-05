import ShirtCard from "@/comp/ShirtCard";
import client from "@/libs/contentFulClient";
import { Box } from "@mui/material";

const Shirts = ({ shirts }) => {
  //   console.log(shirts);
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        mt: 10,
        gap: 4,
      }}>
      {shirts &&
        shirts.map((shirt) => {
          return <ShirtCard key={shirt.sys.id} shirt={shirt} />;
        })}
    </Box>
  );
};

export default Shirts;

export const getServerSideProps = async () => {
  const res = await client.getEntries({ content_type: "shirt" });
  //   console.log(res);
  const shirts = res.items;

  return {
    props: {
      shirts,
    },
  };
};
