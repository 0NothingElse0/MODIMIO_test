import tokenServiceBase from "../services/tokenServiceBase.js";

class TokenHelper {
    async signAndRefreshToken(payload : any, id : number) {
        const tokens = tokenServiceBase.sign(payload);
        await tokenServiceBase.saveRefreshToken(id, tokens.refreshToken);
        await tokenServiceBase.saveAccessToken(id, tokens.accessToken);
        return tokens;
    }
}

export default new TokenHelper();