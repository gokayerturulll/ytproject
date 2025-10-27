const express = require("express");
const moment = require("moment"); //tarih işlemlerini kolaylaştırır
const router = express.Router();
const AuditLogs = require("../db/models/AuditLogs");
const Response = require("../lib/Response");

router.post("/", async (req, res) => {
  //req bodyden veri almak daha kolay olduğu için get yerine post

  try {
    let body = req.body;
    let query = {};
    let skip = body.skip;
    let limit = body.limit;

    if (typeof body.skip !== "number") {
      skip = 0;
    }
    if (typeof body.limit !== "number" || body.limit > 500) body.limit = 500;
    if (body.begin_date && body.end_date) {
      query.created_at = {
        $gte: moment(body.begin_date), //greater  than equal
        $lte: moment(body.end_date), //less than equal
      };
    } else {
      query.created_at = {
        $gte: moment().subtract(1, "day").startOf("day"), //moment günün tarihini döner subtract1 son 1 günü döner
        $lte: moment(), //less than equal
      };
    }

    let auditLogs = await AuditLogs.find(query)
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit);
    res.json(Response.successResponse(auditLogs));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

module.exports = router;
