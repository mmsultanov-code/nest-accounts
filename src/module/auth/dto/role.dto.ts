export class LoggedUserRoleDTO {
    name: string
    slug: string

    constructor(role: { name: string; slug: string }) {
        this.name = role.name
        this.slug = role.slug
    }
}
