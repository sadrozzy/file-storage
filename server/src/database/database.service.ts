import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class DatabaseService extends PrismaClient {
  async onModuleInit() {
    const prisma = new PrismaClient();
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
