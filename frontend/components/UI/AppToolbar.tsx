import { AppBar, Container, styled, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import AnonymousMenu from "./AnonymousMenu";
import { useAppSelector } from "../../src/app/hooks";
import { selectUser } from "../../src/features/users/usersSlice";
import UserMenu from "./UserMenu.tsx";

const Link = styled(NavLink)({
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "inherit",
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Toolbar>
        <Container maxWidth="xl">
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/">Spotify</Link>
            </Typography>
            {user ? <UserMenu user={user} /> : <AnonymousMenu />}
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
