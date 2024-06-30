import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Patch,
    Post,
    UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { UserId } from "../decorators/usersId.decorator";
import { AccessAuthGuard } from "../auth/guards/access.auth.guard";
import { UpdateUserDto } from "./dto/updateUser.dto";

@ApiTags("Users")
@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(":id")
    findById(@Param("id") id: number) {
        return this.usersService.findUserById(id);
    }

    @Patch(":username")
    update(
        @Param("username") username: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.usersService.updateUser(username, updateUserDto);
    }

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
