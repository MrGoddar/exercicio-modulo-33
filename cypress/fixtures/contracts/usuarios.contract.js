import Joi from 'joi';

const usuariosSchema = Joi.object({
  quantidade: Joi.number().required(),
  usuarios: Joi.array().items(
    Joi.object({
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      administrador: Joi.string().required(),
      _id: Joi.string().required()
    })
  ).required()
});

export default usuariosSchema;