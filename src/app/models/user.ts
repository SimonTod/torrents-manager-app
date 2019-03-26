export class User {
    id: number;
    username: string;
    last_login: Date;

    constructor(obj?: any) {
        this.id             = obj && obj.id             || null;
        this.username       = obj && obj.username       || null;
        this.last_login     = obj && obj.last_login     || null;
    }
}