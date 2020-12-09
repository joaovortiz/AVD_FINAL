const { Router } = require('express')
const multer = require('multer')
const MedicoController = require('./controllers/MedicoController')
const AgenteController = require('./controllers/AgenteController')
const FuncionarioController = require('./controllers/FuncionarioController')
const ExameController = require('./controllers/ExameController')
const PPPController = require('./controllers/PppController')
const uploadConfig = require('./config/upload')
const routes = new Router();

const upload = multer(uploadConfig)

routes.get('/medicos', MedicoController.index)
routes.post('/medicos', MedicoController.store)
routes.put('/medicos/:id', MedicoController.update)
routes.delete('/medicos/:id', MedicoController.destroy)
routes.get('/medicos/:id', MedicoController.show)

routes.get('/agentes', AgenteController.index)
routes.post('/agentes', AgenteController.store)
routes.put('/agentes/:id', AgenteController.update)
routes.delete('/agentes/:id', AgenteController.destroy)
routes.get('/agentes/:id', AgenteController.show)

routes.get('/funcionarios', FuncionarioController.index)
routes.post('/funcionarios', FuncionarioController.store)
routes.put('/funcionarios/:id', FuncionarioController.update)
routes.delete('/funcionarios/:id', FuncionarioController.destroy)
routes.get('/funcionarios/:id', FuncionarioController.show)

routes.get('/ppps', PPPController.index)
routes.post('/ppps', PPPController.store)
routes.put('/ppps/:id', PPPController.update)
routes.delete('/ppps/:id', PPPController.destroy)
routes.get('/ppps/:id', PPPController.show)

routes.get('/exames', ExameController.index)
routes.post('/exames', ExameController.store)
routes.put('/exames/:id', ExameController.update)
routes.delete('/exames/:id', ExameController.destroy)
routes.get('/exames/:id', ExameController.show)

module.exports = routes