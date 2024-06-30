import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Patch,
    Post,
    Req,
    UnauthorizedException,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { UserId } from "../decorators/usersId.decorator";
import { AccessAuthGuard } from "../auth/guards/access.auth.guard";
import { UpdateUserDto } from "./dto/updateUser.dto";

@ApiTags("Users")
@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    private readonly logger = new Logger(UsersService.name);

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(":id")
    findById(@Param("id") id: number) {
        return this.usersService.findUserById(id);
    }

    @ApiBearerAuth()
    @UseGuards(AccessAuthGuard)
    @Patch(":id")
    update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(id, updateUserDto);
    }

    @ApiBearerAuth()
    @UseGuards(AccessAuthGuard)
    @Delete(":id")
    deleteById(@Param("id") id: number) {
        return this.usersService.deleteUser(id);
    }

    @ApiBearerAuth()
    @UseGuards(AccessAuthGuard)
    @Post("me")
    profile(@UserId() id: number) {
        return this.usersService.findUserById(id);
    }

    @ApiBearerAuth()
    @UseGuards(AccessAuthGuard)
    @Delete("me/delete")
    delete(@UserId() id: number) {
        return this.usersService.deleteUser(id);
    }
}
