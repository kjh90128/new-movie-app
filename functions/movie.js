const axios = require('axios')
const { OMDB_API_KEY } = process.env

exports.handler = async function(event){
  console.log(event)
  const payload = JSON.parse(event.body)
  const {title, type, year, page, id} = payload
  const url = id ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
  //const url = `https://www.omdbapi.com/?apikey=${omdb_api_key}`

  try{
    const { data } = await axios.get(url)
    if(data.Error){
      return{
        statusCode: 400,
        body: data.Error
      }
    }
    return{
      statusCode: 200,
      body: JSON.stringify(data)
    }
  }catch(err){
    return{
      statusCode: err.response.status,
      body: err.message
    }
  }

  return new Promise((resolve,reject)=> {
    axios.get(url)
    .then(res=>{
      if(res.data.Error){
        reject(res.data.Error)
      }
      resolve(res)
    }).catch(err=>{
      reject(err.message)
    })
  })
}