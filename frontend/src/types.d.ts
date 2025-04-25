export interface IArtist {
  _id: string;
  name: string;
  image: string | null;
  info?: string | undefined;
}

export interface IAlbum {
  _id: string;
  name: string;
  artist: string;
  date: number;
  image: string | null;
}

export interface ITrack {
  _id: string;
  name: string;
  album: string;
  duration: string;
  number: number;
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
