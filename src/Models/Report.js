import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  generationDate: {
    type: Date,
    required: false,
    default: new Date(),
  },
  environments: [String],
  backendMicroservices: [
    {
      framework: String,
      capabilities: [String],
      amountEntities: Number,
      amountRoutes: Number,
    },
  ],
  entities: [{ amountAtributes: Number, amountRelations: Number }],
});

export default mongoose.model("Report", ReportSchema);
