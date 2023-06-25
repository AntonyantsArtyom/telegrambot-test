const User = require("../models/User")

const usePromotion = async (req, res) => {
   if (req.params.type == "week") {
      const currentPromotionStatus = await User.findOne({ username: req.params.name }).then((data) => data.weekPromoton)
      if (currentPromotionStatus != "был использован") {
         await User.updateOne({ username: req.params.name }, { weekPromoton: "был использован" })
         res.send("бонус зачтен")
         return 0
      }
   }
   if (req.params.type == "friend") {
      const currentPromotionStatus = await User.findOne({ username: req.params.name }).then(
         (data) => data.friendPromotion
      )
      if (currentPromotionStatus != "был использован") {
         await User.updateOne({ username: req.params.name }, { friendPromotion: "был использован" })
         res.send("бонус зачтен")
         return 0
      }
   }
   res.send("бонусы уже использовались")
}

module.exports = usePromotion
