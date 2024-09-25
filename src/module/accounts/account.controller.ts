import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AccountService } from "./account.service";
import { CreateAccountDTO } from "./dto/create-account.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreatedAccountDTO } from "./dto/created-account.dto";
import { AccountBalanceRequestDTO } from "./dto/request-get-balance.dto";
import { AccountGetBalanceResponseDTO } from "./dto/response-get-balance.dto";
import { IncomingFundRequestDTO } from "./dto/request-incoming-fund.dto";
import { ResponseIncomingFundDTO } from "./dto/response-incoming-fund.dto";
import { GetFundByIdRequestDTO } from "./dto/request-get-fund-by-id.dto";
import { ResponseIncomingOneFundDTO } from "./dto/response-incoming-one-fund.dto";

@ApiTags('Accounts')
@Controller('accounts')
export class AccountController {

    constructor(
        private readonly accountService: AccountService
    ) {}

    /**
     * Creates an account using the provided account data.
     * 
     * @param createAccountDTO - The data for creating the account.
     * @returns A promise that resolves to the created account.
     */
    @ApiResponse({ status: 201, description: 'Account created successfully', type: CreatedAccountDTO })
    @HttpCode(HttpStatus.CREATED)
    @Post('create-account')
    async createAccount(@Body() createAccountDTO: CreateAccountDTO): Promise<CreatedAccountDTO> {
        const response = await this.accountService.createAccount(createAccountDTO);
        return new CreatedAccountDTO(response)
    }
    
    /**
     * Retrieves the balance of an account.
     * 
     * @param getAccountBalance - The data for retrieving the account balance.
     * @returns A promise that resolves to the balance of the account.
     */
    @ApiResponse({ status: 200, description: 'Account balance retrieved successfully', type: AccountGetBalanceResponseDTO })
    @HttpCode(HttpStatus.OK)
    @Post('account-balance')
    async getAccountBalance(@Body() getAccountBalance: AccountBalanceRequestDTO): Promise<AccountGetBalanceResponseDTO> {
        const response = await this.accountService.getAccountBalance(getAccountBalance.account_id)
        return new AccountGetBalanceResponseDTO(response)
    }

    /**
     * Handles incoming fund requests.
     *
     * @param data - The data containing the incoming fund request details.
     * @returns A promise that resolves to the response of the incoming fund request.
     */
    @ApiResponse({ status: 200, description: 'Incoming fund processed successfully', type: ResponseIncomingFundDTO })
    @HttpCode(HttpStatus.OK)
    @Post('incoming-fund')
    async incomingFund(@Body() data: IncomingFundRequestDTO): Promise<ResponseIncomingFundDTO> {
        const response = await this.accountService.incomingFund(data)
        return new ResponseIncomingFundDTO(response)
    }

    @ApiResponse({ status: 200, description: 'Fund retrieved successfully', type: ResponseIncomingOneFundDTO })
    @HttpCode(HttpStatus.OK)
    @Post('get-fund')
    async getFund(@Body() data: GetFundByIdRequestDTO): Promise<ResponseIncomingOneFundDTO> {
        const response = await this.accountService.getFund(data.fund_id)
        return new ResponseIncomingOneFundDTO(response)
    }
}