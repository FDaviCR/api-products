const fs = require('fs')
const csv = require('csv-parser')

const products = './src/database/produtos.csv'

async function filterByExpiration(json, due){
  const result = json.filter((element) => element.dias_para_vencimento == due)
  return result
}

async function orderByName(json){
  json.sort((a, b)=>{
    return a.name.localeCompare(b.name)
  })
  return json
}

module.exports = {
  async orderProducts(request, response){
    try {
      const due = request.params.due
      const json = []

      fs.createReadStream(products)
      .pipe(csv())
      .on('data', (row) => {
        json.push(row)
      })
      .on('end', async () => {
        const rawData = await filterByExpiration(json, due)
        const data = await orderByName(rawData)
        
        response.status(200).send({data})
      })
    } catch (error) {
      response.status(400).send({'error': 'Aconteceu um erro!'})
    }
  }
};