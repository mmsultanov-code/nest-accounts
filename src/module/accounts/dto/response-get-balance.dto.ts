import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class AccountGetBalanceResponseDTO {
    @ApiProperty({ example: 1, description: 'The id of the account' })
    @Expose()
    account_id: number;

    @ApiProperty({ example: 1000, description: 'The balance of the account' })
    @Expose()
    balance: number;

    constructor(data: { account_id: number; balance: number }) {
        this.account_id = data.account_id;
        this.balance = data.balance;
    }
}