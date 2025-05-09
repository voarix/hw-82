export interface ArtistMutation {
  name: string;
  image: string | null;
  info?: string;
  isPublished?: boolean;
  user: string;
}

export interface AlbumMutation {
  name: string;
  artist: string;
  date: number;
  image: string | null;
  isPublished?: boolean;
  user: string;
}

export interface TrackMutation {
  name: string;
  album: string;
  duration: string;
  number: number;
  youtubeLink?: string;
  isPublished?: boolean;
  user: string;
}

export interface UserFields {
  username: string;
  password: string;
  token: string;
  role: string;
  __confirmPassword: string;
}