import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { useEffect } from "react";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import PublishIcon from "@mui/icons-material/Publish";
import UnpublishedIcon from "@mui/icons-material/NotInterested";
import Grid from "@mui/material/Grid2";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IAlbum } from "../../../types";
import {
  selectAdminAlbumDeleteLoading,
  selectAdminAlbums,
  selectAdminAlbumsFetchLoading,
  selectAdminAlbumTogglePublishLoading,
  selectAdminAlbumsFetchError,
  selectAdminAlbumDeleteError,
  selectAdminAlbumTogglePublishError,
} from "./albumsAdminSlice.ts";
import {
  deleteAdminAlbum,
  editAdminPublishAlbum,
  fetchAdminAllAlbums,
} from "./albumsAdminThunks.ts";
import { fetchAdminAllArtists } from "../artists/artistsAdminThunks.ts";

const AdminAlbumsList = () => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAdminAlbums);
  const loading = useAppSelector(selectAdminAlbumsFetchLoading);
  const deleteLoading = useAppSelector(selectAdminAlbumDeleteLoading);
  const publishLoading = useAppSelector(selectAdminAlbumTogglePublishLoading);
  const error = useAppSelector(selectAdminAlbumsFetchError);
  const deleteError = useAppSelector(selectAdminAlbumDeleteError);
  const publishError = useAppSelector(selectAdminAlbumTogglePublishError);

  useEffect(() => {
    dispatch(fetchAdminAllAlbums());
    dispatch(fetchAdminAllArtists());
  }, [dispatch]);

  const onDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this album?")) {
      await dispatch(deleteAdminAlbum(id));
      dispatch(fetchAdminAllAlbums());
    }
  };

  const onTogglePublish = async (id: string) => {
    await dispatch(editAdminPublishAlbum(id));
    dispatch(fetchAdminAllAlbums());
  };

  const columns: GridColDef<IAlbum>[] = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: false,
    },
    {
      field: "image",
      headerName: "Image",
      width: 150,
      editable: false,
    },
    {
      field: "artist",
      headerName: "Artist",
      width: 160,
      renderCell: (params) => params.row.artist.name,
    },
    {
      field: "date",
      headerName: "Date",
      width: 160,
      editable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            onClick={() => onTogglePublish(params.row._id)}
            disabled={publishLoading}
            color={params.row.isPublished ? "info" : "success"}
          >
            {params.row.isPublished ? <UnpublishedIcon /> : <PublishIcon />}
          </IconButton>
          <IconButton
            onClick={() => onDelete(params.row._id)}
            disabled={deleteLoading}
            color="error"
          >
            <ClearIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  if (loading || deleteLoading || publishLoading) {
    return (
      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (deleteError) {
    return (
      <Typography variant="h6" align="center" sx={{ width: "100%", mt: 5 }}>
        {"errors" in deleteError ? deleteError.message : deleteError.error}
      </Typography>
    );
  }

  if (publishError) {
    return (
      <Typography variant="h6" align="center" sx={{ width: "100%", mt: 5 }}>
        {"errors" in publishError ? publishError.message : publishError.error}
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" align="center" sx={{ width: "100%", mt: 5 }}>
        {"errors" in error ? error.message : "Something went wrong"}
      </Typography>
    );
  }

  return (
    <Grid container>
      <Grid>
        <DataGrid
          getRowId={(row) => row._id}
          rows={albums}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
        />
      </Grid>
    </Grid>
  );
};

export default AdminAlbumsList;