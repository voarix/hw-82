import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import {
  selectAdminArtists,
  selectAdminDeleteLoading,
  selectAdminTogglePublishLoading,
  selectAdminFetchLoading,
} from "./artistsAdminSlice.ts";
import { useEffect } from "react";
import {
  deleteAdminArtist,
  editAdminPublishArtist,
  fetchAdminAllArtists,
} from "./artistsAdminThunks.ts";
import { Box, CircularProgress, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import PublishIcon from "@mui/icons-material/Publish";
import UnpublishedIcon from "@mui/icons-material/NotInterested";
import Grid from "@mui/material/Grid2";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IArtist } from "../../../types";

const AdminArtistsList = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectAdminArtists);
  const loading = useAppSelector(selectAdminFetchLoading);
  const deleteLoading = useAppSelector(selectAdminDeleteLoading);
  const publishLoading = useAppSelector(selectAdminTogglePublishLoading);

  useEffect(() => {
    dispatch(fetchAdminAllArtists());
  }, [dispatch]);

  const onDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this artist?")) {
      await dispatch(deleteAdminArtist(id));
      dispatch(fetchAdminAllArtists());
    }
  };

  const onTogglePublish = async (id: string) => {
    await dispatch(editAdminPublishArtist(id));
    dispatch(fetchAdminAllArtists());
  };

  const columns: GridColDef<IArtist>[] = [
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
      field: "info",
      headerName: "Info",
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

  return (
    <Grid container>
      <Grid>
        <DataGrid
          getRowId={(row) => row._id}
          rows={artists}
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

export default AdminArtistsList;
