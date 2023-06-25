const qr = require("qr-image")

const generatePromotionQR = async (req, res) => {
   const qrImage = qr.image(
      `${process.env.SERVER_URL}/usePromotionQR/${req.params.type}/${req.params.name.replace(".png", "")}`,
      {
         size: 5,
         margin: 5,
      }
   )
   res.type("png")
   qrImage.pipe(res)
}

module.exports = generatePromotionQR
