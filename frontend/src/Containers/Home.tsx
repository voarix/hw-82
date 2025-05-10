import ArtistList from "../features/artists/components/ArtistList.tsx";
import Grid from "@mui/material/Grid2";
import { Button } from "@mui/material";
import { useAppSelector } from "../app/hooks.ts";
import { selectUser } from "../features/users/usersSlice.ts";
import { Link } from "react-router-dom";

const Home = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <Grid>
        {user && user.role === "admin" ? (
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#fff",
              color: "purple",
              "&:hover": {
                backgroundColor: "#eee",
              },
              mt: 2,
            }}
            component={Link}
            to="/admin/artists"
          >
            Admin page
          </Button>
        ) : (
          ""
        )}
      </Grid>

      <ArtistList />
    </>
  );
};

export default Home;
