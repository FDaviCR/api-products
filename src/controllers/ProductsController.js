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
  async expiredProducts(request, response){
    try {
      const input = request.body
      const json = [];

      fs.createReadStream(products)
        .pipe(csv())
        .on('data', (row) => {
          json.push(row)
        })
        .on('end', async () => {
          const filteredResult = await filterByExpiration(json, input.due)
          const sortedResult = await orderByName(filteredResult)

          response.status(200).send(sortedResult)
        });
    } catch (error) {
      response.status(400).send({'error': 'Aconteceu um erro!'})
    }
  }
};