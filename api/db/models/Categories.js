const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
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

class Roles extends mongoose.Model {}

schema.loadClass(Roles);
module.exports = mongoose.model("roles", schema);
