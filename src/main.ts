import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true
        })
    )
    const config = new DocumentBuilder()
        .setTitle('NestJS API')
        .setDescription('API for NestJS')
        .setVersion('1.0')
        .addTag('API')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('docs', app, document)
    await app.listen(Number(process.env.PORT) || 3000)
}
bootstrap()
