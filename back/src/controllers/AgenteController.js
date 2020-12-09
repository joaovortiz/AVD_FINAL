const Agente = require('../models/Agentes')

module.exports = {
  // Lista os Patients do mais atual para o mais antigo
  async index(req, res) {
    let { sort = 'createdAt', termo = '' } = req.query;
    const search = {
      $or: [
        { nome: { $regex: '.*' + termo + '.*' } }
      ]
    }
    sort = sort ? sort : 'createdAt'
    const agente = await Agente.paginate(search, { sort: `-${sort}`});
    return res.json(agente)
  },
  
  // Retoma Agente requisitado
  async show(req, res) {
    const { id = null } = req.params;
    const agente = await Agente.findById(id);
    return res.status(200).json(agente)
  },

  // gravar os agentes
  async store(req, res) {
    try {
      let agente = await Agente.create(req.body)
      const id = agente._id
      delete agente._id

      await Agente.findByIdAndUpdate( { _id: id }, agente )

      return res.status(200).json()
      } catch (err) {
        return res.status(400).json({error: err.message })
      }
  },
  
  // Exclui o agente
  async destroy(req, res) {
    try {
      const { id } = req.params

      await Agente.findByIdAndRemove(id)

      return res.status(200).json()
      } catch (err) {
        return res.status(400).json({error: err.message })
      }
  },

  // Altera o agente
  async update(req, res) {
    const { id } = req.params
    const agente = await Agente.findByIdAndUpdate( { _id: id }, req.body )
    return res.json(agente)
  },
}
