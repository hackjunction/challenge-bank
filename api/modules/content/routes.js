const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const ContentController = require("./controller");

const syncContent = asyncHandler(async (req, res) => {
  ContentController.sync();
  return res.sendStatus(200);
});

const getSyncedContent = asyncHandler(async (req, res) => {
  const data = await ContentController.getSyncedContent(req.params.syncId);

  if (!data) {
    return res.status(200).json({
      status: "not-updated"
    });
  }
  return res.status(200).json({
    status: "updated",
    data
  });
});

router.route("/sync").get(syncContent);

router.route("/sync/:syncId").get(getSyncedContent);

module.exports = router;
