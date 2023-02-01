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

async function update(id, project) {

  Object.keys(project).forEach(key => project[key] === undefined && delete project[key]);
  const values = Object.values(project);
  const keys = Object.keys(project);

  let sqlQuery = "UPDATE projects SET "
  for (let i = 0; i < keys.length; i++) {
    sqlQuery += `${keys[i]}=?`;
    if (i < keys.length - 1) {
      sqlQuery += `, `;
    } else {
      sqlQuery += ` WHERE id=${id}`;
    }
  }

  console.log("project", project);
  console.log("query", sqlQuery);
  console.log("values", values);
  console.log("keys", keys);

  const result = await db.query(sqlQuery, values);

  let message = `Error in updating project`;

  if (result.affectedRows) {
    message = `Updated project successfully`;
  }

  return message;
}

async function remove(id) {
  const result = await db.query(`DELETE FROM projects WHERE id=${id}`);

  let message = `Error in deleting project`;
  if (result.affectedRows) message = `Successfully deleted project`;

  return { message };
}

module.exports = {
  getMultriple,
  create,
  update,
  remove
}