const mongoose = require("mongoose");
const Users = require("./Users");
const Roles = require("./Roles");

const schema = mongoose.Schema(
  {
    role_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: Roles,
    },
    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: Users,
    },
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
