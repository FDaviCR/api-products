const fs = require('fs')
const csv = require('csv-parser')

const products = './src/database/produtos.csv'

module.exports = {
  async jsonProducts(){
    const json = [];

    fs.createReadStream(products)
      .pipe(csv())
      .on('data', (row) => {
        json.push(row)
      })
      .on('end', () => {
        
        return json
      });
  }
}