import { ApiProperty } from '@nestjs/swagger'
import { LoggedUserRoleDTO } from './role.dto'

export class ResponseUserLoginDTO {
    @ApiProperty({
        example: 1,
        description: 'The unique identifier of the user.'
    })
    id: number
    @ApiProperty({
        example: 'John',
        description: 'The first name of the user.'
    })
    first_name: string
    @ApiProperty({
        example: 'Doe',
        description: 'The last name of the user.'
    })
    last_name: string
    @ApiProperty({
        example: 'test@example.com',
        description: 'The email of the user.'
    })
    email: string
    @ApiProperty({
        example: 1,
        description: 'The unique identifier of the role of the user.'
    })
    role_id: number
    @ApiProperty({
        example: true,
        description: 'Whether the user is active.'
    })
    is_active: boolean
    @ApiProperty({
        example: false,
        description: 'Whether the user is deleted.'
    })
    is_deleted: boolean
    @ApiProperty({
        example: '2022-01-01T00:00:00.000Z',
        description: 'The date the user was created.'
    })
    created_at: Date
    @ApiProperty({
        example: '2022-01-01T00:00:00.000Z',
        description: 'The date the user was last updated.'
    })
    updated_at: Date
    @ApiProperty({
        example: {
            name: 'User',
            slug: 'user'
        },
        description: 'The role of the user as an object.'
    })
    role: LoggedUserRoleDTO
    @ApiProperty({
        example: 'eyJhbGcidwqiodjqowimzxcmoizxjc8932jf32nczkjcn',
        description: 'The access token of the user.'
    })
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
