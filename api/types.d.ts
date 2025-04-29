export interface ArtistMutation {
  name: string;
  image: string | null;
  info?: string;
}

export interface AlbumMutation {
  name: string;
  artist: string;
  date: number;
  image: string | null;
}

export interface TrackMutation {
  name: string;
  album: string;
  duration: string;
  number: number;
  youtubeLink?: string;
}

export interface UserMutation {
  username: string;
  password: string;
  token: string;
}