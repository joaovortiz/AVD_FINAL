const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const FuncionarioSchema = new mongoose.Schema({
  nome: String,
}, {
  timestamps: true
})
FuncionarioSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Funcionarios', FuncionarioSchema)
