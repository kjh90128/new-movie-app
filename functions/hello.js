exports.handler = async function(event, context){
  return{
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello World",
      name:'test',
      age:85,
      email:'test@test.com'
    })
  }
}