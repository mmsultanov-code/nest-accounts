export class ResponseAllUsersDTO {
    first_name: string
    last_name: string
    email: string
    deleted_at: Date | null
    is_active: boolean
    is_deleted: boolean
    created_at: Date
    updated_at: Date

    constructor(data: ResponseAllUsersDTO) {
        this.first_name = data.first_name
        this.last_name = data.last_name
        this.email = data.email
        this.deleted_at = data.deleted_at
        this.is_active = data.is_active
        this.is_deleted = data.is_deleted
        this.created_at = data.created_at
        this.updated_at = data.updated_at
    }
}
