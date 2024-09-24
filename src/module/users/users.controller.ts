import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDTO } from './dto/create-user.dto'
import { ResponseCreatedUserDTO } from './dto/response-created-user.dto'
import { ResponseAllUsersDTO } from './dto/response-all-users.dto'
import { ResponseOneUserDTO } from './dto/response-one-user.dto'
import { UpdateUserDTO } from './dto/update-user.dto'
import { AuthGuard } from '../auth/guards/auth.guard'
import { HasPermissions } from '@/common/decorators/has-permissions.decorator'
import { PermissionsGuard } from '@/common/guards/roles.guard'

@UseGuards(AuthGuard, PermissionsGuard)
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    /**
     * Creates a new user.
     *
     * @param createUserDTO - The data for creating the user.
     * @returns A Promise that resolves to the created user.
     */
    @HasPermissions('user_create', 'user_all', 'super_admin_create', 'super_admin_all')
    @HttpCode(HttpStatus.CREATED)
    @Post()
    async create(@Body() createUserDTO: CreateUserDTO): Promise<ResponseCreatedUserDTO> {
        const result = await this.userService.create(createUserDTO)
        return new ResponseCreatedUserDTO(result)
    }

    /**
     * Retrieves all users.
     *
     * @returns A promise that resolves to an array of ResponseAllUsersDTO objects.
     */
    @HasPermissions('user_index', 'user_all', 'super_admin_index', 'super_admin_all')
    @HttpCode(HttpStatus.OK)
    @Get()
    async get_all_users(): Promise<Array<ResponseAllUsersDTO>> {
        const result = await this.userService.get_all()
        return new Array<ResponseAllUsersDTO>(...result)
    }

    /**
     * Retrieves a user by their ID.
     *
     * @param id - The ID of the user.
     * @returns A Promise that resolves to a ResponseOneUserDTO object representing the user.
     */
    @HasPermissions('user_show', 'user_all', 'super_admin_show', 'super_admin_all')
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    async get_user_by_id(@Param('id') id: number): Promise<ResponseOneUserDTO> {
        return this.userService.get_by_id(id)
    }

    /**
     * Updates a user.
     *
     * @param id - The ID of the user to update.
     * @param updateUserDTO - The data to update the user with.
     * @returns A promise that resolves to the updated user.
     */
    @HasPermissions('user_update', 'user_all', 'super_admin_update', 'super_admin_all')
    @HttpCode(HttpStatus.OK)
    @Patch(':id')
    async update_user(@Param('id') id: number, @Body() updateUserDTO: Partial<UpdateUserDTO>): Promise<ResponseOneUserDTO> {
        const result = await this.userService.update(id, updateUserDTO)
        return new ResponseOneUserDTO(result)
    }

    /**
     * Deletes a user by their ID.
     *
     * @param id - The ID of the user to delete.
     * @returns A promise that resolves to void.
     */
    @HasPermissions('user_delete', 'user_all', 'super_admin_delete', 'super_admin_all')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    async delete_user(@Param('id') id: number): Promise<void> {
        return this.userService.delete(id)
    }
}
