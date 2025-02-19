import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Wallet } from './entities/wallet.entity';

@Injectable()
export class WalletsService {
  constructor(@InjectModel(Wallet.name) private assetSchema: Model<Wallet>) {}

  create(createWalletDto: CreateWalletDto) {
    return this.assetSchema.create(createWalletDto);
  }

  findAll() {
    return this.assetSchema.find();
  }

  findOne(id: string) {
    return this.assetSchema.findById(id);
  }
}
