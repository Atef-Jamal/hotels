import { Document, Model, model, models, Schema } from "mongoose";

export interface IPayment extends Document {}

const paymentSchema: Schema<IPayment> = new Schema<IPayment>({});

const Payment: Model<IPayment> =
  models.Payment || model<IPayment>("Payment", paymentSchema);
export default Payment;
