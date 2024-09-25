import { Column, DataType, ForeignKey, Model, Table, BelongsTo } from 'sequelize-typescript'
import { AccountModel } from './account.model'

@Table({
    tableName: 'incoming_fund',
    timestamps: false
})
export class IncomingFundsModel extends Model<IncomingFundsModel> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    fund_id: number

    @ForeignKey(() => AccountModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    account_id: number

    @Column({
        type: DataType.DECIMAL(18, 2),
        allowNull: false
    })
    amount: number

    @BelongsTo(() => AccountModel, {
        foreignKey: 'account_id',
        targetKey: 'account_id'
    })
    accounts: AccountModel
}
