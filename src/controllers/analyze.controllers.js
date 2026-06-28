import { pool } from "../config/db.js";

async function storeAnalyzedProfileInfo(req, res) {
  let { username, name, followers, following, public_repos, bio } = req.body;

  try {
    if (
      !username ||
      !name ||
      !followers ||
      !following ||
      !public_repos ||
      !bio
    ) {
      return res.status(400).json({ message: "All attributes are required" });
    }

    //   db queries
    const createTableQuery = `CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(30) NOT NULL,
    public_repos SMALLINT UNSIGNED NOT NULL,
    followers MEDIUMINT UNSIGNED NOT NULL,
    following MEDIUMINT UNSIGNED NOT NULL,
    bio TEXT
    );`;

    await pool.execute(createTableQuery);

    const insertQuery = `INSERT INTO users (username, name, public_repos, followers, following, bio)
      VALUES (?, ?, ?, ?, ?, ?)`;

    const [rows] = await pool.execute(insertQuery, [
      username,
      name,
      public_repos,
      followers,
      following,
      bio,
    ]);

    if (rows.affectedRows) {
      return res
        .status(201)
        .json({ message: "User details added successfully" });
    } else {
      return res.status(400).json({ message: "Error adding user details" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAnalyzedProfiles(req, res) {
  try {
    const sqlQuery = `SELECT * FROM users`;

    const [rows] = await pool.execute(sqlQuery);

    if (rows.length) {
      return res.status(200).json({ users: rows });
    } else {
      return res.status(404).json({ message: "No Users found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAnalyzedProfile(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }

    const sqlQuery = `SELECT * FROM users WHERE id = ?`;

    const [rows] = await pool.execute(sqlQuery, [id]);

    if (rows.length) {
      return res.status(200).json({ user: rows[0] });
    } else {
      return res.status(404).json({ message: "No Users found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { storeAnalyzedProfileInfo, getAnalyzedProfiles, getAnalyzedProfile };
