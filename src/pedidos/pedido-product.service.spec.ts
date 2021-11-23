import { Test, TestingModule } from '@nestjs/testing';
import { PedidoProductService } from './pedido-product.service';

describe('PedidoProductService', () => {
  let service: PedidoProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PedidoProductService],
    }).compile();

    service = module.get<PedidoProductService>(PedidoProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
