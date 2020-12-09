const Exame = require('../models/Exames')

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
    const exame = await Exame.paginate(search, { sort: `-${sort}`});
    return res.json(exame)
  },
  
  // Retoma Exame requisitado
  async show(req, res) {
    const { id = null } = req.params;
    const exame = await Exame.findById(id);
    return res.status(200).json(exame)
  },

  // gravar os exames
  async store(req, res) {
    try {
      let exame = await Exame.create(req.body)
      const id = exame._id
      delete exame._id

      await Exame.findByIdAndUpdate( { _id: id }, exame )

      return res.status(200).json()
      } catch (err) {
        return res.status(400).json({error: err.message })
      }
  },
  
  // Exclui o exame
  async destroy(req, res) {
    try {
      const { id } = req.params

      await Exame.findByIdAndRemove(id)

      return res.status(200).json()
      } catch (err) {
        return res.status(400).json({error: err.message })
      }
  },

  // Altera o exame
  async update(req, res) {
    const { id } = req.params
    const exame = await Exame.findByIdAndUpdate( { _id: id }, req.body )
    return res.json(exame)
  },
}
