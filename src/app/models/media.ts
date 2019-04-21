import { User } from './user';
import { Comment } from './comment';

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
    comments: Array<Comment>;
}

export class MediaType {
    type: string;
    name: string;
}
