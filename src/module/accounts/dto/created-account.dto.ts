import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class CreatedAccountDTO {
    @ApiProperty({ example: 1, description: 'The id of the account' })
    @Expose()
    account_id: number

    @ApiProperty({ example: 1000, description: 'The balance of the account' })
    @Expose()
    balance: number

    @ApiProperty({ example: 1, description: 'The id of the user' })
    @Expose()
    user_id: number

    constructor(data: { account_id: number; balance: number; user_id: number }) {
        this.account_id = data.account_id
        this.balance = data.balance
        this.user_id = data.user_id
    }
}
