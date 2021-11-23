import { Test, TestingModule } from '@nestjs/testing';
import { PedidoProductController } from './pedido-product.controller';

describe('PedidoProductController', () => {
  let controller: PedidoProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PedidoProductController],
    }).compile();

    controller = module.get<PedidoProductController>(PedidoProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
