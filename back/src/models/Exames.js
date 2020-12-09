const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const ExameSchema = new mongoose.Schema({
  nome: String,
}, {
  timestamps: true
})
ExameSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Exames', ExameSchema)
