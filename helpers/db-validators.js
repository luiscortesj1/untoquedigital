const {Vuelo} = require("../models/index");

const validator = {
  //verificar Vuelo
  existeVuelo:async (id) => {
    const existeVuelo = await Vuelo.findById(id);
    if (!existeVuelo) {
      throw new Error(`El Id: ${id} no existe`);
    }
  },
  borradoVuelo: async (id) => {
    const existeVuelo = await Vuelo.findById(id);
    if (existeVuelo.status== false) {
      throw new Error(`El Id: ${id} no existe`);
    }
  }
  
};

module.exports = validator;
