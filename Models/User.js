const mongoose = require('mongoose')
const User = mongoose.Schema({
    userId: String,
    blacklisted: { type: Boolean, default: false },
    count: { type: Number, default: 0 },
    ccount: { type: Number, default: 0 },
    badge: {
        dev: { type: Boolean, default: false },
        owner: { type: Boolean, default: false },
        suppoter: { type: Boolean, default: false },
        bug: { type: Boolean, default: false },
        premium: { type: Boolean, default: false },
    },
    Id: {
        type: String
      },
      isPremium: {
        type: Boolean,
        default: false,
      },
      premium: {
        redeemedBy: {
          type: Array,
          default: null,
        },
    
        redeemedAt: {
          type: Number,
          default: null,
        },
    
        expiresAt: {
          type: Number,
          default: null,
        },
    
        plan: {
          type: String,
          default: null,
        },
    },

})

module.exports = mongoose.model("user", User)