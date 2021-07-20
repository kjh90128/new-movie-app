const axios = require('axios')

exports.handler = async function(event){
  console.log(event)
  const payload = JSON.parse(event.body)
  const {title, type, year, page, id} = payload
  const omdb_api_key='7035c60c'
  const url = id ? `https://www.omdbapi.com/?apikey=${omdb_api_key}&i=${id}` : `https://www.omdbapi.com/?apikey=${omdb_api_key}&s=${title}&type=${type}&y=${year}&page=${page}`
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