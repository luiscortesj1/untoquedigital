const { response } = require("express");
const { Vuelo } = require("../models/index");
 
//Obtener Productos - paginado - total - populate
const obtenerVuelos = async (req, res = response) => {
  const { limit = 5, offset = 0 } = req.query; //arguments
  const valStatus = { status: true }; // validar el status

  //para optimizar el tiempo en respuesta de las promesas
  //con el Promise las dos promesas se ejecutan al mismo tiempo en cambio con el await se ejecuta una a la vez
  const [total, vuelo] = await Promise.all([
    Vuelo.countDocuments(valStatus),
    Vuelo.find(valStatus)
      .skip(Number(offset))
      .limit(Number(limit)),
  ]);
  res.json({
    total,
    vuelo,
  });
};

const obtenerVuelo = async (req, res = response) => {
  const { id } = req.params;
  const vuelo = await Vuelo.findById(id);
  if (vuelo.status == false) {
    return res.status(404).json({
      msg: "Vuelo no disponible",
    });
  }
  res.json(vuelo);
};

// Crear Producto
const crearVuelo = async (req, res = response) => {
  const { status, user, ...body } = req.body;
  const vueloDB = await Vuelo.findOne({ name: body.name.toUpperCase() });
   
  if (vueloDB) {
    return res.status(400).json({
      msg: `El vuelo ${vueloDB.name}, ya existe`,
    });
  }

  //Generar la Data guardar
  const data = {
    ...body,
    name: body.name.toUpperCase(),
    availableseats: body.amount,
  };

  const vuelo = new Vuelo(data);

  //Guardar DB
  await vuelo.save();

  res.status(201).json(vuelo);
};

// Actualizar Producto
const actualizarVuelo = async (req, res = response) => {
  const { id } = req.params;
  const { status,  ...data } = req.body;

  if (data.name) {
    data.name = data.name.toUpperCase();
  }


  const vuelo = await Vuelo.findByIdAndUpdate(id, data, { new: true });

  res.json(vuelo);
};

// Eliminar Producto
const borrarVuelo = async (req, res = response) => { 
  const { id } = req.params;
  vueloBorrado = await Vuelo.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );
  return res.status(200).json({
    msg: `Vuelo ${vueloBorrado.name}, Borrado`,
  });
};

module.exports = {
  crearVuelo,
  actualizarVuelo,
  borrarVuelo,
  obtenerVuelos,
  obtenerVuelo,
};
