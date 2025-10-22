const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    created_by: { type: mongoose.SchemaTypes.ObjectId, required: true },
  },
  {
    versionKey: false, //mongooseda kayıt oluşturunca versionKey oluşur oluşmaması için
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

class Categories extends mongoose.Model {}

schema.loadClass(Categories);
module.exports = mongoose.model("categories", schema);
