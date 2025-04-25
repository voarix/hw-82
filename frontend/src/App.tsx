import "./App.css";
import { Container, CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Home from "../Containers/Home.tsx";
import AlbumArtist from "./features/albums/AlbumArtist.tsx";

const App = () => {
  return (
    <>
      <CssBaseline />
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/artists/:id" element={<AlbumArtist/>}/>
            <Route path="*" element={<Typography variant="h4">Not found page</Typography>}/>
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
