import "./App.css";
import { Container, CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Home from "./Containers/Home.tsx";
import AlbumArtist from "./features/albums/AlbumArtist.tsx";
import TrackAlbum from "./features/tracks/TrackAlbum.tsx";
import Register from "./features/users/Register.tsx";
import Login from "./features/users/Login.tsx";
import { ToastContainer } from "react-toastify";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import TrackHistory from "./features/trackHistory/TrackHistory.tsx";
import ProtectedRoute from "./components/UI/ProtectedRoute.tsx";
import { useAppSelector } from "./app/hooks.ts";
import { selectUser } from "./features/users/usersSlice.ts";
import NewArtist from "./features/artists/NewArtist.tsx";
import NewAlbum from "./features/albums/NewAlbum.tsx";
import NewTrack from "./features/tracks/NewTrack.tsx";
import AdminLayout from "./features/admin/AdminLayout.tsx";
import AdminArtistsList from "./features/admin/artists/AdminArtistsList.tsx";

const App = () => {
  const user = useAppSelector(selectUser);

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
            <Route path="/track-history" element={<TrackHistory />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/add-artist"
              element={
                <ProtectedRoute isAllowed={Boolean(user)}>
                  <NewArtist />
                </ProtectedRoute>
              }
            />

            <Route
              path="/add-album"
              element={
                <ProtectedRoute isAllowed={Boolean(user)}>
                  <NewAlbum />
                </ProtectedRoute>
              }
            />

            <Route
              path="/add-track"
              element={
                <ProtectedRoute isAllowed={Boolean(user)}>
                  <NewTrack />
                </ProtectedRoute>
              }
            />

            <Route
              path="admin"
              element={
                <ProtectedRoute isAllowed={user && user.role === "admin"}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="" element={""} />
              <Route path="artists" element={<AdminArtistsList />} />
            </Route>

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
