import { Module } from "@nestjs/common";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { AccountModel } from "./models/account.model";
import { IncomingFundsModel } from "./models/incoming-funds";
import { UserModel } from "../users/models/user.model";

@Module({
    imports: [
        SequelizeModule.forFeature([
            AccountModel,
            IncomingFundsModel,
            UserModel
        ]),
    ],
    controllers: [AccountController],
    providers: [AccountService],
})

export class AccountModule {}