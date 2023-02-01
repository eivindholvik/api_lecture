const express = require("express");
const router = express.Router();
const project = require("../services/project");

router.get("/", async function (req, res, next) {
  try {
    res.json(await project.getMultriple(req.query.page));
  } catch (e) {
    console.error(`Error while getting projects ${e}`);
    next(e);
  }
});

router.post("/", async function (req, res, next) {
  try {
    res.json(await project.create(req.body));
  } catch (e) {
    console.error("error while creating project:", e.message);
    next(e)
  }
});

router.put("/:id", async function (req, res, next) {
  try {
    res.json(await project.update(req.params.id, req.body))
  } catch (e) {
    console.error(`Error while updating projects: ${e.message}`);
    next(e);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await project.remove(req.params.id));
  } catch (e) {
    console.error(e);
    next(e);
  }
})

module.exports = router;