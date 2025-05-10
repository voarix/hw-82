import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { useEffect } from "react";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import PublishIcon from "@mui/icons-material/Publish";
import UnpublishedIcon from "@mui/icons-material/NotInterested";
import Grid from "@mui/material/Grid2";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ITrackAdmin } from "../../../types";
import {
  selectAdminTrackDeleteError,
  selectAdminTrackDeleteLoading,
  selectAdminTracks,
  selectAdminTracksFetchError,
  selectAdminTracksFetchLoading,
  selectAdminTrackTogglePublishError,
  selectAdminTrackTogglePublishLoading,
} from "./tracksAdminSlice.ts";
import {
  deleteAdminTrack,
  editAdminPublishTrack,
  fetchAdminAllTracks,
} from "./tracksAdminThunks.ts";

const AdminArtistsList = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectAdminTracks);
  const loading = useAppSelector(selectAdminTracksFetchLoading);
  const deleteLoading = useAppSelector(selectAdminTrackDeleteLoading);
  const publishLoading = useAppSelector(selectAdminTrackTogglePublishLoading);
  const error = useAppSelector(selectAdminTracksFetchError);
  const deleteError = useAppSelector(selectAdminTrackDeleteError);
  const publishError = useAppSelector(selectAdminTrackTogglePublishError);

  useEffect(() => {
    dispatch(fetchAdminAllTracks());
  }, [dispatch]);

  const onDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this track?")) {
      await dispatch(deleteAdminTrack(id));
      dispatch(fetchAdminAllTracks());
    }
  };

  const onTogglePublish = async (id: string) => {
    await dispatch(editAdminPublishTrack(id));
    dispatch(fetchAdminAllTracks());
  };

  const columns: GridColDef<ITrackAdmin>[] = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: false,
    },
    {
      field: "album",
      headerName: "Album",
      width: 150,
      editable: false,
      renderCell: (params) => params.row.album.name,
    },
    {
      field: "artist",
      headerName: "Artist",
      width: 160,
      editable: false,
      renderCell: (params) => params.row.album.artist.name,
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
          rows={tracks}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 30, 40]}
          disableRowSelectionOnClick
        />
      </Grid>
    </Grid>
  );
};

export default AdminArtistsList;
