import { Column, DataType, ForeignKey, Model, Table, BelongsTo, HasMany } from 'sequelize-typescript'
import { UserModel } from '@/module/users/models/user.model'
import { IncomingFundsModel } from './incoming-funds'

@Table({
    tableName: 'account',
    timestamps: false
})
export class AccountModel extends Model<AccountModel> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    account_id: number

    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    user_id: number

    @Column({
        type: DataType.DECIMAL(18, 2),
        defaultValue: 0
    })
    balance: number

    @BelongsTo(() => UserModel, {
        foreignKey: 'user_id',
        targetKey: 'id'
    })
    owner: UserModel

    @HasMany(() => IncomingFundsModel, {
        foreignKey: 'account_id',
        sourceKey: 'account_id'
    })
    incoming_funds: Array<IncomingFundsModel>
}
