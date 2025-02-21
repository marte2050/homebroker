import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AssetPresenter } from './assets.presenter';
import { CreateAssetDto } from './dto/create-asset.dto';
import { Asset } from './entities/asset.entity';

@Injectable()
export class AssetsService {
  constructor(@InjectModel(Asset.name) private assetSchema: Model<Asset>) {}

  async create(createAssetDto: CreateAssetDto) {
    const asset = await this.assetSchema.create(createAssetDto);
    return new AssetPresenter(asset);
  }

  async findAll() {
    const assets = await this.assetSchema.find();
    return assets.map((asset) => new AssetPresenter(asset));
  }

  async findOne(symbol: string) {
    const asset = await this.assetSchema.findOne({ symbol: symbol });
    return new AssetPresenter(asset!);
  }
}
