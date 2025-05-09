import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Grid from "@mui/material/Grid2";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { ArtistMutation, ValidationError, GlobalError } from "../../../types";
import { artistSchema } from "../../../zodSchemas/artistSchema.ts";
import FileInput from "../../../components/UI/FileInput.tsx";

interface Props {
  onSubmitArtist: (artistData: ArtistMutation) => void;
  loading: boolean;
  error: ValidationError | GlobalError | null;
}

const ArtistForm: React.FC<Props> = ({ onSubmitArtist, loading, error }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ArtistMutation>({
    resolver: zodResolver(artistSchema),
    defaultValues: {
      name: "",
      info: "",
      image: null,
    },
  });

  const fileInputChangeHandler = (
    eFile: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { files } = eFile.target;

    if (files) {
      setValue("image", files[0]);
    }
  };

  const getFieldError = (fieldName: keyof ArtistMutation) => {
    if (!error) return undefined;

    if ("errors" in error && error.errors[fieldName]) {
      return error.errors[fieldName].message;
    }

    return undefined;
  };

  const onSubmit = (data: ArtistMutation) => {
    onSubmitArtist(data);
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        mt: 3,
        p: 3,
        boxShadow: 3,
        maxWidth: 600,
        mx: "auto",
        borderRadius: 1,
      }}
    >
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid size={{ sm: 12 }}>
          <TextField
            style={{ width: "100%" }}
            id="name"
            label="Artist Name"
            {...register("name")}
            error={!!errors.name || !!getFieldError("name")}
            helperText={errors.name?.message || getFieldError("name")}
          />
        </Grid>

        <Grid size={{ sm: 12 }}>
          <TextField
            style={{ width: "100%" }}
            multiline
            rows={3}
            id="info"
            label="Info"
            {...register("info")}
            error={!!errors.info || !!getFieldError("info")}
            helperText={errors.info?.message || getFieldError("info")}
          />
        </Grid>

        <Grid size={{ sm: 12 }}>
          <FileInput
            name="image"
            label="Artist Image"
            onChange={fileInputChangeHandler}
            errors={!!errors.image || !!getFieldError("image")}
            helperText={errors.image?.message || getFieldError("image")}
          />
        </Grid>

        <Grid size={{ sm: 12 }}>
          <Button
            disabled={loading}
            style={{ width: "100%" }}
            type="submit"
            color="primary"
            variant="contained"
          >
            {loading ? <CircularProgress /> : "Create"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ArtistForm;
