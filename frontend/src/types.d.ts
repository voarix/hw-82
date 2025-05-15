export interface IArtist {
  _id: string;
  name: string;
  image?: string | null;
  info?: string | undefined;
  isPublished: boolean;
  user: string;
}

export interface ArtistMutation {
  name: string;
  info?: string;
  image?: File | null;
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
  isPublished: boolean;
}

export interface AlbumMutation {
  name: string;
  artist: string;
  date: number | string;
  info?: string;
  image?: File | null;
}

export interface ITrack {
  _id: string;
  name: string;
  album: {
    _id: string;
    name: string;
    date: string;
  };
  duration: string;
  number: number;
  youtubeLink?: string;
  isPublished: boolean;
}

export interface ITrackAdmin {
  _id: string;
  name: string;
  album: {
    _id: string;
    name: string;
    artist: {
      _id: string;
      name: string;
    };
  };
  duration: string;
  number: number;
  youtubeLink?: string;
  isPublished: boolean;
}

export interface TrackMutation {
  name: string;
  album: string;
  duration: string;
  youtubeLink?: string;
}

export interface User {
  _id: string;
  username: string;
  displayName: string;
  token: string;
  role: string;
  googleId?: string;
  avatar?: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  confirmPassword: string;
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

export interface TrackHistoryResponse {
  _id: string;
  user: string;
  track: {
    _id: string;
    name: string;
    album: {
      _id: string;
      name: string;
      artist: {
        _id: string;
        name: string;
      };
    };
    duration: string;
    number: number;
  };
  datetime: string;
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
