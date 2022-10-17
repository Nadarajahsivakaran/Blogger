import connection from "../db.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  await connection.query(
    "SELECT * FROM users where email= ?",
    [email],
    function(err, exit_user) {
      if (err) throw err;

      if (exit_user.length > 0)
        res.status(406).json({ message: "User Already exist!" });
      else {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash_password = bcrypt.hashSync(password, salt);

        const user = [first_name, last_name, email, hash_password];
        var sql =
          "INSERT INTO users (first_name,last_name,email,password) VALUES (?,?,?,?)";
        connection.query(sql, user, function(err) {
          if (err) throw err;
          res.status(201).json({ message: "User Created Successfully" });
        });
      }
    }
  );
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  await connection.query(
    "SELECT * FROM users where email= ?",
    [email, password],
    function(err, check_user) {
      if (err) throw err;

      if (check_user.length > 0) {
        bcrypt
          .compare(password, check_user[0].password)
          .then((validPassword) => {
          
            if (validPassword)
              res.status(200).json({ message: "User Loggedin Successfully",user:check_user[0].id });
            else {
              res.status(404).json({ message: "Email or Password Invalid!" });
            }
          });
      } else {
        res.status(404).json({ message: "Email or Password Invalid!" });
      }
    }
  );
};
