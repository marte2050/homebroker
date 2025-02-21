import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import crypto from 'crypto';
import mongoose, { HydratedDocument } from 'mongoose';
import { Asset, AssetDocument } from 'src/assets/entities/asset.entity';
import { Wallet, WalletDocument } from './wallet.entity';

@Schema({ timestamps: true })
export class WalletAsset {
  @Prop({ default: () => crypto.randomUUID() })
  _id: string;

  @Prop({ type: mongoose.Schema.Types.Int32 })
  shares: number;

  @Prop({ type: String, ref: Wallet.name })
  wallet: WalletDocument | string;

  @Prop({ type: String, ref: Asset.name })
  asset: AssetDocument | string;

  @Prop()
  createdAt!: Date;

  @Prop()
  updatedAt!: Date;
}

export type WalletAssetDocument = HydratedDocument<WalletAsset>;
export const WalletAssetSchema = SchemaFactory.createForClass(WalletAsset);
WalletAssetSchema.index({ wallet: 1, asset: 1 }, { unique: true });
