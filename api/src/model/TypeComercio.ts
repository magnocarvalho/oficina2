import { IDefault, Inject } from "./IDefault";
import * as mongoose from "mongoose";

export interface ITypeComercio extends IDefault, mongoose.Document {
  id: string;
  value: string;
}

let schema = {
  value: { type: String, required: true }
};

Inject(schema);
export const TypeMasterSchema = new mongoose.Schema(schema);
export const TypeComercio = mongoose.model<ITypeComercio>(
  "type",
  TypeMasterSchema,
  "type",
  false
);
