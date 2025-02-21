import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import crypto from 'crypto';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Wallet {
  @Prop({ default: () => crypto.randomUUID() })
  _id: string;

  @Prop({
    type: [mongoose.Schema.Types.String],
    set: (v: string) => [...new Set(v)],
    ref: Wallet.name,
  })
  assets: WalletDocument[] | string[];

  @Prop()
  createdAt!: Date;

  @Prop()
  updatedAt!: Date;
}

export type WalletDocument = HydratedDocument<Wallet>;
export const WalletSchema = SchemaFactory.createForClass(Wallet);
