export class Token {
    constructor(token : {
        accessToken : string,
        refreshToken : string
    }) {
        this.accessToken = token.accessToken;
        this.refreshToken = token.refreshToken;
    }

    accessToken : string;
    refreshToken : string;
}