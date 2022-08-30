const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const {
  crearVuelo,
  actualizarVuelo,
  borrarVuelo,
  obtenerVuelos,
  obtenerVuelo,
} = require("../controllers/flightsControllers");

const validator = require("../helpers/db-validators");
const {  validationCampos} = require("../middlewares");

//productos

router.get("/", obtenerVuelos);


router.get("/:id",[
   check('id','No es un ID de Mongo válido').isMongoId(),
   check('id').custom(validator.existeVuelo),
   validationCampos,
 ], obtenerVuelo);

//POST crear una categoria (privado)
router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").notEmpty(),
    check("amount", "Debe agregar la cantidad de pasajeros").notEmpty(),
    validationCampos,
  ],
  crearVuelo
);

//PUT actualizar una categoria (privado)
router.put(
  "/:id",
  [
    check("id", "No es un ID de Mongo válido").isMongoId(),
    check("id").custom(validator.existeVuelo),
    validationCampos,
  ],
  actualizarVuelo
);

//Delete eliminar una categoria (privado)
router.delete(
  "/:id",
  [
    check("id", "No es un ID de Mongo válido").isMongoId(),
    check("id").custom(validator.borradoVuelo),
    validationCampos,
  ],
  borrarVuelo
);

module.exports = router;
