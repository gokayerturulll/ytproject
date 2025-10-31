const express = require("express");
const router = express.Router();
const { HTTP_CODES } = require("../config/Enum");
const emitter = require("../lib/Emitter");

emitter.addEmitter("notifications");

router.get("/", (req, res) => {
  res.writeHead(HTTP_CODES.OK, {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache,no-transform",
  });

  const listener = (data) => {
    res.write("data: " + JSON.stringify(data) + "\n");
  };
  emitter.getEmitter("notifications").on("messages", listener);
  //messages eventi gerçekleşirse listener fonksiyonu çalışır

  req.on("close", () => {
    emitter.getEmitter("notifications").off("messages", listener);
    //listenerı messages eventini dinleyenler arasından çıkarır
  });
});

module.exports = router;
