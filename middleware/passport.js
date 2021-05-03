const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('user')
const keys = require('../config/keys')
    //для проверки авторизированных пользователей
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jsonWebToken
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done)=>{
          try {
              const user = await User.findById(payload.userId).select('login role id')

              if (user){
                  done(null, user)
              }  else {
                  done(null, false)
              }
          } catch (e){
              console.log(e)
          }

        })
    )
}