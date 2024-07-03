import {
    Body,
    Controller,
    Get,
    Logger,
    Post,
    Req,
    Res,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local.auth.guard";
import { RefreshGuard } from "./guards/refresh.auth.guard";
import { CreateUserDto } from "./dto/createUser.dto";
import { AuthUserDto } from "./dto/authUser.dto";
import { AccessAuthGuard } from "./guards/access.auth.guard";
import { Response } from "express";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post("login")
    logIn(@Body() authUserDto: AuthUserDto, @Res() res: Response) {
        return this.authService.login(authUserDto, res);
    }

    @Post("signup")
    @UsePipes(new ValidationPipe())
    signUp(@Body() createUserDto: CreateUserDto) {
        return this.authService.signup(createUserDto);
    }

    @ApiBearerAuth()
    @UseGuards(AccessAuthGuard)
    @Post("logout")
    logout(@Req() req: any) {
        return this.authService.logout(req.user["username"]);
    }

    @ApiBearerAuth()
    @UseGuards(RefreshGuard)
    @Get("refresh")
    refresh(@Req() req: any, @Res() res: Response) {
        return this.authService.refreshTokens(
            req.user.sub,
            req.user.refreshToken,
            res,
        );
    }
}
