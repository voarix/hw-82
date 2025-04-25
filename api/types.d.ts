export interface ArtistMutation {
  name: string;
  image: string | null;
  info?: string;
}

export interface AlbumMutation {
  name: string;
  artist: string;
  date: Date;
  image: string | null;
}

export interface TrackMutation {
  name: string;
  album: string;
  duration: string;
  number: number;
}

export interface UserMutation {
  username: string;
  password: string;
  token: string;
}