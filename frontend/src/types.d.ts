interface IArtist {
  _id: string;
  name: string;
  image: string | null;
  info?: string | undefined;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}
