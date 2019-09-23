import { IDefault, Inject } from "./IDefault";
import * as mongoose from "mongoose";

export interface IUserModel extends IDefault, mongoose.Document {
  id: string;
  uid: string;
  bairro: string;
  cep: string;
  cidade: string;
  complemento: string;
  estado: string;
  googlePlace: string;
  numero: string;
  pais: string;
  rua: string;
  location: any;
}

let schema = {
  uid: { type: String, required: true, unique: true },
  bairro: { type: String, required: true },
  cep: { type: String, required: true },
  cidade: { type: String, required: true },
  complemento: { type: String },
  estado: { type: String, required: true },
  googlePlace: { type: String, required: true },
  numero: { type: String, required: true },
  pais: { type: String, required: true },
  rua: { type: String, required: true },
  cnpj: { type: String, required: true, unique: true },
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
};

Inject(schema);
export const UserMasterSchema = new mongoose.Schema(schema);
export const UserModel = mongoose.model<IUserModel>(
  "user",
  UserMasterSchema,
  "user",
  false
);
