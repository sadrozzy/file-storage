import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("api");
    app.use(cookieParser());
    app.enableCors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    });
    // app.use("/api/uploads", express.static(join(__dirname, "uploads")));

    const config = new DocumentBuilder()
        .setTitle("File storage API")
        .setVersion("0.1")
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup("api/docs", app, document);

    await app.listen(4000);
}

bootstrap();
