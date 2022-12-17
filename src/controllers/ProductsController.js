
module.exports = {
  async dueTomorrow(request, response){
    response.status(200).send({
    })
  },

  async expiredProducts(request, response){
    const data = request.body

    console.log(data)
  }
};