import { users as User } from "../models/index.js";

export const getUserIfItExists = async (req, res) => {
  console.log(req.User);
  const { id } = req.User;
  try {
    User.find({ id })
      .then((data) => {
        console.log(data);
        if (data) res.send(data);
        else res.send({ message: `No user found with id ${id}` });
      });
  } catch (err) {
    res.status(404).send({ message: `No user found with id ${id}` });
  }
};

export const create = async (data) => {
  await getUserIfItExists(data);
};

export default create;
