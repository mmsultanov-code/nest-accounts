import { LoggedUserRoleDTO } from './role.dto'

export class ResponseUserLoginDTO {
    id: number
    first_name: string
    last_name: string
    email: string
    role_id: number
    is_active: boolean
    is_deleted: boolean
    created_at: Date
    updated_at: Date
    role: LoggedUserRoleDTO
    access_token: string

    constructor(user: {
        id: number
        first_name: string
        last_name: string
        email: string
        role_id: number
        is_active: boolean
        is_deleted: boolean
        created_at: Date
        updated_at: Date
        role: LoggedUserRoleDTO
        access_token: string
    }) {
        this.id = user.id
        this.first_name = user.first_name
        this.last_name = user.last_name
        this.email = user.email
        this.role_id = user.role_id
        this.is_active = user.is_active
        this.is_deleted = user.is_deleted
        this.created_at = user.created_at
        this.updated_at = user.updated_at
        this.role = {
            name: user.role.name,
            slug: user.role.slug
        }
        this.access_token = user.access_token
    }
}
