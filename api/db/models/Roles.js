const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    role_name: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    created_by: { type: mongoose.SchemaTypes.ObjectId },
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
