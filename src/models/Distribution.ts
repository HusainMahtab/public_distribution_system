import mongoose from 'mongoose';

const distributionSchema = new mongoose.Schema({
  serialNumber: { type: String, required: true, unique: true },
  cardNumber: { type: String, required: true, unique:true },
  cardHolder: { type: String, required: true },
  unit: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Distribution = mongoose.models.Distribution || mongoose.model('Distribution', distributionSchema);

export default Distribution;