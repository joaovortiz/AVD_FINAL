const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const pppSchema = new mongoose.Schema({
  funcionario_id: String,
  exame_id: String,
  agente_id: String,
  medico_id: String,
  descricao: String,
  image: String,
}, {
  timestamps: true
})
pppSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('ppps', pppSchema)
