import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { User } from "../../../types";
import { useAppDispatch } from "../../../app/hooks.ts";
import { unsetUser } from "../../../features/users/usersSlice.ts";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { fetchAllArtists } from "../../../features/artists/artistsThunks.ts";
import { logout } from "../../../features/users/usersThunks.ts";

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const [userOptionsEl, setUserOptionsEl] = useState<HTMLElement | null>(null);
  const dispatch = useAppDispatch();

  const handeClick = (event: React.MouseEvent<HTMLElement>) => {
    setUserOptionsEl(event.currentTarget);
  };

  const handleClose = () => {
    setUserOptionsEl(null);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      dispatch(unsetUser());
      navigate("/");
      await dispatch(fetchAllArtists());
      toast.success("Logout is successful");
    } catch (e) {
      toast.error("Logout is failed");
      console.error(e);
    }
  };

  return (
    <>
      <Link
        to="/add-track"
        style={{
          color: "white",
          textDecoration: "none",
          marginLeft: "6px",
          fontWeight: 500,
        }}
      >
        New Track
      </Link>
      <Link
        to="/add-artist"
        style={{
          color: "white",
          textDecoration: "none",
          marginLeft: "6px",
          fontWeight: 500,
        }}
      >
        New Artist
      </Link>
      <Link
        to="/add-album"
        style={{
          color: "white",
          textDecoration: "none",
          marginLeft: "6px",
          fontWeight: 500,
        }}
      >
        New Album
      </Link>
      <Button onClick={handeClick} color="inherit">
        Hello, {user.displayName}
      </Button>
      <Menu
        keepMounted
        anchorEl={userOptionsEl}
        open={!!userOptionsEl}
        onClose={handleClose}
      >
        <MenuItem>
          <Button onClick={handleLogout}>Log Out</Button>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
