import { Expose } from 'class-transformer'

/**
 * Represents the response data for a created user.
 */
export class ResponseCreatedUserDTO {
    @Expose()
    first_name: string
    @Expose()
    last_name: string
    @Expose()
    email: string

    constructor(data: { first_name: string; last_name: string; email: string }) {
        this.first_name = data.first_name
        this.last_name = data.last_name
        this.email = data.email
    }
}
