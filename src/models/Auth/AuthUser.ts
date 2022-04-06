import BaseEntity from "../Base/BaseEntity";

class AuthUser extends BaseEntity {
    name: string = "";
    email: string = "";
    username: string = "";
    phone_number: string = "";
    emergency_phone_number: string = "";
    password: string = "";
    password_hash: string = "";
    password_reset_token: string = "";
    password_reset_expires: Date | null = null;
    name_initials: string = "";
}

export default AuthUser;