'use strict'
module.exports = async(obj ={}, dId)=>{
  try{
    let dObj, res = {alert: {type: 'error', msg: 'Your session expired'}}, identity, pObj, sessionId, data, sObj
    if(obj.sessionId) sessionId = await HP.DecryptId(obj.sessionId)
    if(sessionId){
      res.alert.msg = ''
      sObj = await redis.get(sessionId)
      if(sObj?.identity) identity = sObj.identity
      if(sObj?.data) pObj = sObj.data
    }
    console.log(pObj?.player?.allyCode)
    console.log(obj.allyCode)
    if(pObj?.player?.allyCode?.toString() === obj.allyCode.toString() && identity?.auth?.authToken){
      data = await Client.post(obj.method, obj.payload, identity)
      console.log(data)
    }
    if(data && data.code !== 5){
      res.sessionId = obj.sessionId
      //await redis.setTTL(sessionId, {id: sessionId, identity: identity, update: +sObj?.timeNow, data: pObj}, 43200)
    }
    return res
  }catch(e){
    console.error(e)
  }
}
