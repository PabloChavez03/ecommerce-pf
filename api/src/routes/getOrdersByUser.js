const { Router } = require("express");
const { Order, Users } = require("../db");
const router = Router();

router.get("/:user_name", async (req, res) => {
  const { user_name } = req.params;

  const user = await Users.findOne({ where: { user_name }});

  // console.log(user.user_name)


  try {
    let findOrderPerUser = await Order.findAll({
      where: { UserUserName: user.user_name },
    });

    // console.log(findOrderPerUser)

    res.status(200).json(findOrderPerUser);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});

module.exports = router;
