import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('free-buyer')
    .setDescription(
      'A API free-buyer permite aos usuários criar uma conta, realizar login e acessar rotas para controle e consulta de entregas e pedidos. A API consome outra API para auto completar os endereços cadastrados. Algumas rotas não necessitam autenticação, como as rotas para listar todos os usuários e produtos cadastrados. No entanto, todas as outras rotas requerem autenticação. As rotas de autenticação permitem consultar o perfil do usuário, excluir a conta, criar um produto para venda, buscar uma ordem de pedido através de um produto, buscar um produto específico, excluir um produto, criar um pedido, listar pedidos pendentes de pagamento, listar pedidos pendentes de entrega, atualizar o status do pedido para aceitar e fazer a entrega, cancelar/não aceitar um pedido, consultar as entregas e atualizar o status de um pedido recebido para entregue. Para usar a API free-buyer, é necessário obter credenciais de autenticação e seguir as diretrizes de uso da API. A documentação detalha as rotas disponíveis, os parâmetros necessários e as respostas esperadas. É recomendável que os usuários da API leiam atentamente a documentação antes de utilizá-la.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true }),
    new ValidationPipe({
      transform: true,
      transformOptions: { groups: ['transform'] },
    }),
  );
  await app.listen(3000);
}
bootstrap();
