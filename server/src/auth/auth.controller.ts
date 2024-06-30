import {
    Body,
    Controller,
    Logger,
    Post,
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local.auth.guard";
import { RefreshGuard } from "./guards/refresh.auth.guard";
import { CreateUserDto } from "./dto/createUser.dto";
import { AuthUserDto } from "./dto/authUser.dto";
import { AccessAuthGuard } from "./guards/access.auth.guard";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post("login")
    logIn(@Body() authUserDto: AuthUserDto) {
        return this.authService.login(authUserDto);
    }

    @Post("signup")
    @UsePipes(new ValidationPipe())
    signUp(@Body() createUserDto: CreateUserDto) {
        return this.authService.signup(createUserDto);
    }

    @UseGuards(AccessAuthGuard)
    @Post("logout")
    logout(@Req() req: any) {
        this.logger.error(req);
        return this.authService.logout(req.user["username"]);
    }

    @UseGuards(RefreshGuard)
    @Post("refresh")
    refresh(@Req() req: any) {
        this.logger.error(req);
        return this.authService.refreshTokens(
            req.user["sub"],
            req.user["refreshToken"],
        );
    }
}
