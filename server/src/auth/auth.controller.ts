import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
    Post,
    Request,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "./auth.guard";
import { Public } from "./auth.guard.decorator";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/SignIn.dto";
import { SignUpDto } from "./dto/SignUp.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post("signin")
    @UsePipes(new ValidationPipe())
    signIn(@Body() dto: SignInDto) {
        return this.authService.signIn(dto);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post("signup")
    @UsePipes(new ValidationPipe())
    signUp(@Body() dto: SignUpDto) {
        return this.authService.signUp(dto);
    }

    @UseGuards(AuthGuard)
    @Get("profile")
    getProfile(@Request() req: any) {
        return req.user;
    }
}
