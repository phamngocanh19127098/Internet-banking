import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { ClassValidatorException } from 'src/commons/filters/exceptions/ClassValidatorExceptions/ClassValidatorException';
import { ResponseInterceptor } from 'src/commons/interceptors/ResponseInterceptor';
import { AppExceptionFilter } from 'src/commons/filters/AppException.filter';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory(errors) {
        return new ClassValidatorException(errors);
      },
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AppExceptionFilter(app.get(HttpAdapterHost)));

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Internet banking')
    .setDescription('Internet banking API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
