import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from '../users/users.module'
import { PermissionsModule } from '../permissions/permissions.module'
import { RolesModule } from '../roles/roles.module'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { UserModel } from '../users/models/user.model'
import { PermissionsModel } from '../permissions/models/permissions.model'
import { RolesModel } from '../roles/models/roles.model'
import { RolePermissionsModel } from '../permissions/models/role-permissions.model'
import { AuthModule } from '../auth/auth.module'

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
