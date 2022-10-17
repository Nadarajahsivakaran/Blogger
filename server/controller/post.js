import connection from "../db.js";

export const createPost = async (req, res) => {
  const { title, comment, user_id } = req.body;
  const data = [title, comment, user_id];

  var sql = "INSERT INTO posts (title,comment,user_id) VALUES (?,?,?)";
  await connection.query(sql, data, function(err) {
    if (err) throw err;
    res.status(201).json({ message: "Post Saved Successfully" });
  });
};

export const viewPost = async (req, res) => {
  var sql =
    "SELECT posts.*, users.first_name FROM posts JOIN users ON users.id = posts.user_id";
  await connection.query(sql, function(err, data) {
    if (err) throw err;
    res.status(200).json(data);
  });
};

export const updatePost = async (req, res) => {
  const id = req.params.id;
  const { title, comment, user_id } = req.body;
  const data = [title, comment, user_id, id];
  var sql = "UPDATE posts SET title = ?, comment = ?, user_id = ? WHERE id = ?";
  await connection.query(sql, data, function(err, update_data) {
    if (err) throw err;
    res.status(201).json({ message: "Successfully Updated" });
  });
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  var sql = "DELETE FROM posts WHERE id = ?";
  await connection.query(sql, [id], function(err, data) {
    if (err) throw err;
    res.status(200).json({ message: "Successfully Deleted" });
  });
};
