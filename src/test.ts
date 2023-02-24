
function Componetn(id: number) {
    console.log('init');
    return (target: Function) => {
        console.log('run');
        target.prototype.id = id;
    }
}


@Componetn(1)
export class User {
    id: number;

    upId (newId: number) {
        this.id = newId;
        return this.id;
    }
}

console.log(new User().id)