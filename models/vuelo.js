const { Schema, model } = require("mongoose");

const FlightSchema = Schema({
  name: {
    type: String,
    requied: [true, "El nombre es obligatorio"],
    unique: true,
  },

  status: {
    type: Boolean,
    default: true,
    required: true,
  },

  price: {
    type: Number,
    default: 0, 
  },
  amount:{
    type: Number,
  },
  availableseats:{
    type: Number,
  },

  description: { type: String },

  
});

FlightSchema.methods.toJSON = function () {
  /* instancia con los valores (objecto literal) se saca __v y status, los demas datos se guardan en producto   */
  const { __v, status, ...data } = this.toObject();

  return data;
};

module.exports = model("Vuelo", FlightSchema);
 