import { HttpException, Injectable } from "@nestjs/common";

import { AccountModel } from "./models/account.model";
import { InjectModel } from "@nestjs/sequelize";

import { CreateAccountInterface } from "./interface/account.interface";
import { UserModel } from "../users/models/user.model";
import { GetBalanceResponseInterface } from "./interface/response-get-balance.interface";
import { IncomingFundsModel } from "./models/incoming-funds";
import { ResponseIncomingFundInterface } from "./interface/response-incoming-fund.interface";
import { ResponseIncomingOneFundInterface } from "./interface/response-incoming-one-fund.interface";

@Injectable()
export class AccountService {

    constructor(
        @InjectModel(AccountModel) private readonly accountModel: typeof AccountModel,
        @InjectModel(IncomingFundsModel) private readonly incomingFundsModel: typeof IncomingFundsModel,
        @InjectModel(UserModel) private readonly userModel: typeof UserModel
    ) {}

    /**
     * Retrieves a user by their ID.
     *
     * @param user_id - The ID of the user to retrieve.
     * @returns A Promise that resolves to the user object if found, or throws an HttpException if not found.
     * @throws HttpException if an error occurs while retrieving the user.
     */
    private async get_user_by_id(user_id: number) {
        try {
            const user = await this.userModel.findOne({
                where: {
                    id: user_id
                }
            });
            if (!user) {
                throw new HttpException('User not found', 404);
            }
            return user;
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    /**
     * Creates a new account.
     *
     * @param createAccountDTO - The data for creating the account.
     * @returns The created account.
     * @throws {HttpException} If an error occurs during the creation process.
     */
    async createAccount(createAccountDTO: CreateAccountInterface) {
        const transaction = await this.accountModel.sequelize.transaction();
        try {
            const user = await this.get_user_by_id(createAccountDTO.user_id);
            const response = await this.accountModel.create(createAccountDTO);
            await transaction.commit();
            return response;
        } catch (error) {
            await transaction.rollback();
            throw new HttpException(error.message, error.status);
        }
    }

    /**
     * Retrieves the balance of an account.
     *
     * @param account_id - The ID of the account.
     * @returns A promise that resolves to the balance of the account.
     * @throws {HttpException} If the account is not found.
     */
    async getAccountBalance(account_id: number): Promise<GetBalanceResponseInterface> {
        try {
            const account = await this.accountModel.findOne({ where: { account_id } });
            if (!account) {
                throw new HttpException('Account not found', 404);
            }
            return account;
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }

    /**
     * Increases the balance of an account by a specified amount.
     * 
     * @param data - The data object containing the account ID and the amount to be added.
     * @returns The updated account object.
     * @throws {HttpException} If the account is not found or an error occurs while saving the account.
     */
    async incomingFund(data: { account_id: number; amount: number }): Promise<ResponseIncomingFundInterface> {
        const transaction = await this.accountModel.sequelize.transaction();
        try {
            const account = await this.accountModel.findOne({ where: { account_id: data.account_id } });
            if (!account) {
                throw new HttpException('Account not found', 404);
            }
            const funds = await this.incomingFundsModel.findAll({
                where: {
                    account_id: data.account_id
                }
            });
            const total_funds = funds.reduce((acc, fund) => {
                return acc + Number(fund.amount)
            }, 0);
            const new_total_funds = total_funds + data.amount;
            account.balance = new_total_funds;
            await account.save();
            await this.incomingFundsModel.create({
                account_id: data.account_id,
                amount: data.amount
            });
            await transaction.commit();
            return {
                fund_id: funds.length + 1,
                account_id: data.account_id,
                amount: data.amount,
                balance: new_total_funds
            };
        } catch (error) {
            await transaction.rollback();
            throw new HttpException(error.message, error.status);
        }
    }

    /**
     * Retrieves a fund by its ID.
     *
     * @param fund_id - The ID of the fund to retrieve.
     * @returns A promise that resolves to the retrieved fund.
     * @throws {HttpException} If the fund is not found.
     */
    async getFund(fund_id: number): Promise<ResponseIncomingOneFundInterface> {
        try {
            const fund = await this.incomingFundsModel.findOne({
                where: {
                    fund_id
                }
            });
            if (!fund) {
                throw new HttpException('Fund not found', 404);
            }
            return fund;
        } catch (error) {
            throw new HttpException(error.message, error.status);
        }
    }
}