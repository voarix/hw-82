import "./App.css";
import { Container, CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Home from "../Containers/Home.tsx";
import AlbumArtist from "./features/albums/AlbumArtist.tsx";
import TrackAlbum from "./features/tracks/TrackAlbum.tsx";
import Register from "./features/users/Register.tsx";
import Login from "./features/users/Login.tsx";
import { ToastContainer } from "react-toastify";
import AppToolbar from "../components/UI/AppToolbar.tsx";

const App = () => {
  return (
    <>
      <CssBaseline />
      <ToastContainer autoClose={1000} />
      <header>
        <AppToolbar />
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/artists/:id" element={<AlbumArtist />} />
            <Route path="/albums/:albumId/tracks" element={<TrackAlbum />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="*"
              element={<Typography variant="h4">Not found page</Typography>}
            />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
