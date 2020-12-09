const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const MedicoSchema = new mongoose.Schema({
  nome: String,
}, {
  timestamps: true
})
MedicoSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Medicos', MedicoSchema)
