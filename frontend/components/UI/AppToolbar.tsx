import { AppBar, Container, styled, Toolbar, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import AnonymousMenu from "./AnonymousMenu";
import { useAppSelector } from "../../src/app/hooks";
import { selectUser } from "../../src/features/users/usersSlice";
import UserMenu from "./UserMenu.tsx";
import React from "react";

const Link = styled(NavLink)({
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "inherit",
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  const onTrackHistory = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      navigate("/login");
    }
  };

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
            <Grid
              container
              justifyContent="space-between"
              spacing={4}
              alignItems="center"
            >
              <Link to="/track-history" onClick={onTrackHistory}>
                Track History
              </Link>
              {user ? <UserMenu user={user} /> : <AnonymousMenu />}
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
