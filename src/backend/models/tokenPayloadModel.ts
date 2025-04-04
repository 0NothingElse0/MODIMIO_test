export class tokenPayload {
    constructor(payload : {
        id : number
    }) {
        this.id = payload.id;
    }

    id : number;
}