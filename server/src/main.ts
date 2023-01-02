import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { ClassValidatorException } from 'src/commons/filters/exceptions/ClassValidatorExceptions/ClassValidatorException';
import { ResponseInterceptor } from 'src/commons/interceptors/ResponseInterceptor';
import { AppExceptionFilter } from 'src/commons/filters/AppException.filter';
import { JwtAuthGuard } from 'src/commons/guard/jwt.guard';
import { RolesGuard } from 'src/commons/guard/roles.guard';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);

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
  app.useGlobalGuards(new JwtAuthGuard(reflector), new RolesGuard(reflector));

  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3006'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle('Internet banking')
    .setDescription('Internet banking API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
