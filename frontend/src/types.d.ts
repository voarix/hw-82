export interface IArtist {
  _id: string;
  name: string;
  image: string | null;
  info?: string | undefined;
}

export interface IAlbum {
  _id: string;
  name: string;
  artist: {
    _id: string;
    name: string;
  };
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

export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface TrackHistory {
  user: string;
  track: string;
  datetime: string;
}

export interface TrackHistoryResponse {
  message: string;
  trackHistory: TrackHistory;
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

export interface GlobalError {
  error: string;
}
