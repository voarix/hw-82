import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { User } from "../../types";
import { useAppDispatch } from "../../app/hooks.ts";
import { logout } from "../../features/users/usersSlice.ts";
import { persistor } from "../../app/store.ts";
import { toast } from "react-toastify";

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
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
      dispatch(logout());
      await persistor.purge();
      toast.success("Logout is successful");
    } catch (e) {
      toast.error("Logout is failed");
      console.error(e);
    }
  };

  return (
    <>
      <Button onClick={handeClick} color="inherit">
        Hello, {user.username}
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
