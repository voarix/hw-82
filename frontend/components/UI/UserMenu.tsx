import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { User } from "../../src/types";
import { useAppDispatch } from "../../src/app/hooks.ts";
import { logout } from "../../src/features/users/usersSlice.ts";
import { persistor } from "../../src/app/store.ts";

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

  const handleLogout = () => {
    dispatch(logout());
    persistor.purge();
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
