const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const AgenteSchema = new mongoose.Schema({
  nome: String,
}, {
  timestamps: true
})
AgenteSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Agentes', AgenteSchema)
