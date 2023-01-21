export class UpdatePasswordEvent {
    constructor(
        private readonly username: string,
        private readonly currentPassword: string,
        private readonly newPassword: string
    ) {}

    toString() {
        return JSON.stringify({
            username: this.username,
            currentPassword: this.currentPassword,
            newPassword: this.newPassword
        })
    }
}