const Funcionario = require('../models/Funcionarios')

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
    const funcionario = await Funcionario.paginate(search, { sort: `-${sort}`});
    return res.json(funcionario)
  },
  
  // Retoma Funcionario requisitado
  async show(req, res) {
    const { id = null } = req.params;
    const funcionario = await Funcionario.findById(id);
    return res.status(200).json(funcionario)
  },

  // gravar os funcionarios
  async store(req, res) {
    try {
      let funcionario = await Funcionario.create(req.body)
      const id = funcionario._id
      delete funcionario._id

      await Funcionario.findByIdAndUpdate( { _id: id }, funcionario )

      return res.status(200).json()
      } catch (err) {
        return res.status(400).json({error: err.message })
      }
  },
  
  // Exclui o funcionario
  async destroy(req, res) {
    try {
      const { id } = req.params

      await Funcionario.findByIdAndRemove(id)

      return res.status(200).json()
      } catch (err) {
        return res.status(400).json({error: err.message })
      }
  },

  // Altera o funcionario
  async update(req, res) {
    const { id } = req.params
    const funcionario = await Funcionario.findByIdAndUpdate( { _id: id }, req.body )
    return res.json(funcionario)
  },
}
