import { User } from './user';

export class Media {
    id: number;
    name: string;
    type: MediaType;
    user: User;
    artist: string;
    season: number;
    episode: number;
    torrent_url: string;
    date: Date;
    status: string;
    downloadedPercentage: string;
    votes: Array<User>;
}

export class MediaType {
    type: string;
    name: string;
}
