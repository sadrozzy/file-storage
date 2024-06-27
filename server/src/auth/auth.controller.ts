import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
    Logger,
} from "@nestjs/common";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { Public } from "./auth.guard.decorator";
import {
    ApiBearerAuth,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from "@nestjs/swagger";
import { SignUpDto } from "./dto/SignUp.dto";
import { SignInDto } from "./dto/SignIn.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post("signin")
    @ApiOperation({ summary: "Вход в аккаунт" })
    @ApiResponse({ status: HttpStatus.OK, type: SignInDto })
    signIn(@Body() dto: SignInDto) {
        return this.authService.signIn(dto);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post("signup")
    @ApiOperation({ summary: "Регистрация аккаунта" })
    @ApiResponse({ status: HttpStatus.OK, type: SignInDto })
    signUp(@Body() dto: SignUpDto) {
        return this.authService.signUp(dto);
    }

    @UseGuards(AuthGuard)
    @Get("profile")
    @ApiBearerAuth()
    @ApiResponse({
        status: HttpStatus.OK,
        type: SignUpDto,
    })
    getProfile(@Request() req: any) {
        return req.user;
    }
}
