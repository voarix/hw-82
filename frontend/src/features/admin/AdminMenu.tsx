import Grid from "@mui/material/Grid2";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  return (
    <Grid container direction="column">
      <Grid>
        <Typography variant="h4">Admin menu</Typography>
      </Grid>

      <Grid>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/admin/artists">
              <ListItemText primary="Artists" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/admin/albums">
              <ListItemText primary="Albums" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/admin/tracks">
              <ListItemText primary="Tracks" />
            </ListItemButton>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};

export default AdminMenu;
