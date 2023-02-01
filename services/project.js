const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultriple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM projects LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data, meta
  }
}

async function create(project) {
  // const result = await db.query(`INSERT INTO 'projects'
  // (title, github_link, live_link, description, image_url, achievements)
  // VALUES
  // ('${project.title}', '${project.github_link}', '${project.live_link}', '${project.description}', '${project.image_url}', '${project.achievements}')`);

  const result = await db.query(`INSERT INTO projects
  (title, github_link, live_link, description, image_url, achievements)
  VALUES
  (?, ?, ?, ?, ?, ?)`, [project.title, project.github_link, project.live_link, project.description, project.image_url, project.achievements]);

  // const result = await db.query(`SELECT title FROM projects`);

  let message = `Error in creating project`;

  if (result.affectedRows) {
    message = "Created project successfully";
  }

  return message;
}

module.exports = {
  getMultriple,
  create
}