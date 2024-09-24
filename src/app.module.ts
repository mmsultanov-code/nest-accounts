import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './module/users/users.module'
import { PermissionsModule } from './module/permissions/permissions.module'
import { RolesModule } from './module/roles/roles.module'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { UserModel } from './module/users/models/user.model'
import { PermissionsModel } from './module/permissions/models/permissions.model'
import { RolesModel } from './module/roles/models/roles.model'
import { RolePermissionsModel } from './module/permissions/models/role-permissions.model'
import { AuthModule } from './module/auth/auth.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        SequelizeModule.forRootAsync({
            useFactory: () => ({
                dialect: 'postgres',
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                username: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_NAME,
                autoLoadModels: true,
                synchronize: true,
                models: [UserModel, PermissionsModel, RolesModel, RolePermissionsModel]
            })
        }),
        UsersModule,
        PermissionsModule,
        RolesModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
