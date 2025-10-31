const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    role_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    permissions: { type: String, default: true },
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

class UserRoles extends mongoose.Model {}

schema.loadClass(UserRoles);
module.exports = mongoose.model("user_roles", schema);
