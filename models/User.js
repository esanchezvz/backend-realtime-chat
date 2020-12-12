const { Schema, model } = require('mongoose');

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'El campo de nombre es requerido.'],
    },
    email: {
      type: String,
      required: [true, 'El campo de email es requerido.'],
      unique: [true],
    },
    password: {
      type: String,
      required: [true, 'El campo de contraseña es requerido.'],
      select: false,
    },
    online: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      getters: true,
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
    toObject: {
      virtuals: true,
      getters: true,
    },
    id: false,
    timestamps: true,
  }
);

UserSchema.virtual('uid').get(function () {
  return this._id.toHexString();
});

module.exports = model('User', UserSchema);
