const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

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
        delete ret.password;
        delete ret.createdAt;
        delete ret.updatedAt;
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

// Encrypt password
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = model('User', UserSchema);
