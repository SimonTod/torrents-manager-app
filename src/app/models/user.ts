export class User {
    id: number;
    username: string;
    last_name: string;
    first_name: string;
    email: string;

    constructor(obj?: any) {
        this.id             = obj && obj.id             || null;
        this.username       = obj && obj.username       || null;
        this.last_name      = obj && obj.last_name      || null;
        this.first_name     = obj && obj.first_name     || null;
        this.email          = obj && obj.email          || null;
    }
}