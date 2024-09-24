import { Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ParseService } from "./parse.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Parse')
@Controller('parse')
export class ParseController {

    constructor(
        private readonly parseService: ParseService
    ) {}

    @ApiResponse({ status: 200, description: 'Data parsed successfully' })
    @HttpCode(HttpStatus.OK)
    @Post('parse-data')
    async parse_data() {
        return await this.parseService.parse_data();
    }

}