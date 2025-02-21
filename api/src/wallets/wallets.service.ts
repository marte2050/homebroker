import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { WalletAsset } from './entities/wallet-asset.entity';
import { Wallet } from './entities/wallet.entity';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel(Wallet.name) private awalletSchema: Model<Wallet>,
    @InjectModel(WalletAsset.name)
    private walletAssetSchema: Model<WalletAsset>,
  ) {}

  create(createWalletDto: CreateWalletDto) {
    return this.awalletSchema.create(createWalletDto);
  }

  findAll() {
    return this.awalletSchema.find();
  }

  findOne(id: string) {
    return this.awalletSchema.findById(id);
  }

  async createWalletAsset(data: {
    walletId: string;
    assetId: string;
    shares: number;
  }) {
    const walletAsset = await this.walletAssetSchema.create({
      wallet: data.assetId,
      asset: data.walletId,
      shares: data.shares,
    });

    this.awalletSchema.updateOne(
      { _id: data.walletId },
      { $push: { assets: walletAsset._id } },
    );
  }
}
