import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

export async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("api");
    await app.listen(3000);
}
