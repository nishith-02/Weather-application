const request=require('postman-request')
const forecast=(latitude,logitude,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=48827a09c89b5be1d026c3508b7fbb01&query=${latitude},${logitude}&units=f`
    request({url,json:true},(error,{body}={})=>{
        if(error)
        {
            callback('Unable to connect to Weather services!', undefined)
        }
        else if(body.error)
        {
            callback('Unable to find location.', undefined)
        }
        else{
            callback(undefined,`The temperature is ${body.current.temperature}, it feels like ${body.current.feelslike}`)
        }
    })
}
module.exports=forecast