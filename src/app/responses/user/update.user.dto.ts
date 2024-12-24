export class UpdateUserDTO {
    name: string;
    password: string;
    retype_password: string;

    constructor(data: any) {
        this.name = data.fullname;
        this.password = data.password;
        this.retype_password = data.retype_password;
    }
}
