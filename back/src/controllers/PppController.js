const Ppp = require('../models/ppps')
const Exame = require('../models/Exames')
const Agente = require('../models/Agentes')
const Medico = require('../models/Medicos')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
const multer = require('multer');
const upload = multer({dest: 'uploads/resizes'})

module.exports = {
  // Lista os ppps do mais atual para o mais antigo
  async index(req, res) {
    let { page = 1, sort = 'createdAt', termo = '' } = req.query;
    const search = {
      $or: [
        { funcionario_id: { $regex: '.*' + termo + '.*' } },
        { exame_id: { $regex: '.*' + termo + '.*' } },
        { agente_id: { $regex: '.*' + termo + '.*' } },
        { medico_id: { $regex: '.*' + termo + '.*' } },
        { descricao: { $regex: '.*' + termo + '.*' } }
      ]
    }
    page = page ? page : 1
    sort = sort ? sort : 'createdAt'
    termo = termo ? termo : ''
    const ppp = await Ppp.paginate(search, { page , limit: 5, sort: `-${sort}`});
    return res.json(ppp)
  },
  
  // Retoma ppp requisitado
  async show(req, res) {
    const { id = null } = req.params;
    const ppp = await Ppp.findById(id);
    let array = []

    const someFunction = (myArray) => {
      const promises = myArray.map(async (o) => {
        const funcionario = await Funcionario.paginate({_id: o.funcionario_id});
        const exame = await Exame.paginate({_id: o.exame_id});
        const agente = await Agente.paginate({_id: o.agente_id});
        const medico = await Medico.paginate({_id: o.medico_id});
        return {
          _id: o._id,
          funcionario_id: o.funcionario_id,
          funcionario: funcionario.docs[0],
          exame_id: o.exame_id,
          exame: exame.docs[0],
          agente_id: o.agente_id,
          agente: agente.docs[0],
          medico_id: o.medico_id,
          medico: medico.docs[0],
          descricao: o.descricao,
          createdAt: o.createdAt,
          updatedAt: o.updatedAt,
          __v: o.__v
        }
      });
      return Promise.all(promises);
  }

    array = await someFunction(ppp.docs)
    ppp.docs = array
    return res.status(200).json(ppp)
  },

  // gravar os ppps
  async store(req, res) {
    try {
      let ppp = await Ppp.create(req.body)
      const id = ppp._id
      delete ppp._id
      const { filename: image} = req.file
      const [name, ext] = image.split('.')
      const fileName = `${name}_${id}.jpg`

      await sharp(req.file.path)
        .resize(500)
        .jpeg({ quality: 70})
        .toFile(
          path.resolve(req.file.destination, 
            'resizes', fileName)
        )
      fs.unlinkSync(req.file.path)

      //req.io.emit('ppp', ppp)

      ppp.image = fileName

      await Ppp.findByIdAndUpdate( { _id: id }, ppp )

      return res.status(200).json()
      } catch (err) {
          return res.status(400).json({error: err.message })
      }
  },
  
  // Exclui o ppp
  async destroy(req, res) {
    const { id } = req.params
    await Ppp.findByIdAndRemove(id)
    return res.send()
  },

  // Altera o ppp
  async update(req, res) {
    const { id } = req.params
    const ppp = await Ppp.findByIdAndUpdate( { _id: id }, req.body )
    return res.json(ppp)
  },
}
