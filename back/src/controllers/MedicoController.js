const Medico = require('../models/Medicos')

module.exports = {
  // Lista os Doctors do mais atual para o mais antigo
  async index(req, res) {
    let { sort = 'createdAt', termo = '' } = req.query;
    const search = {
      $or: [
        { nome: { $regex: '.*' + termo + '.*' } }
      ]
    }
    sort = sort ? sort : 'createdAt'
    const medico = await Medico.paginate(search, { sort: `-${sort}`});
    return res.json(medico)
  },
  
  // Retoma Medico requisitado
  async show(req, res) {
    const { id = null } = req.params;
    const medico = await Medico.findById(id);
    return res.status(200).json(medico)
  },

  // gravar os medicoes
  async store(req, res) {
    try {
      let medico = await Medico.create(req.body)
      const id = medico._id
      delete medico._id

      await Medico.findByIdAndUpdate( { _id: id }, medico )

      return res.status(200).json()
      } catch (err) {
        return res.status(400).json({error: err.message })
      }
  },
  
  // Exclui o medico
  async destroy(req, res) {
    try {
      const { id } = req.params

      await Medico.findByIdAndRemove(id)

      return res.status(200).json()
      } catch (err) {
        return res.status(400).json({error: err.message })
      }
  },

  // Altera o medico
  async update(req, res) {
    const { id } = req.params
    const medico = await Medico.findByIdAndUpdate( { _id: id }, req.body )
    return res.json(medico)
  },
}
