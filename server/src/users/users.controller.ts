import { Controller, Get } from "@nestjs/common";
import { ApiBasicAuth, ApiTags } from "@nestjs/swagger";
import { UserId } from "../decorators/usersId.decorator";
import { UsersService } from "./users.service";

@ApiTags("User")
@Controller("user")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiBasicAuth()
    @Get("profile")
    getProfile(@UserId() id: number) {
        return this.usersService.findById(id);
    }
}
