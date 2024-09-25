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
import { AccountModule } from '../accounts/account.module'
import { AccountModel } from '../accounts/models/account.model'
import { IncomingFundsModel } from '../accounts/models/incoming-funds'
import { ParseModule } from '../parse/parse.module'

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
                models: [UserModel, PermissionsModel, RolesModel, RolePermissionsModel, AccountModel, IncomingFundsModel]
            })
        }),
        ParseModule,
        UsersModule,
        PermissionsModule,
        RolesModule,
        AuthModule,
        AccountModule,
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
