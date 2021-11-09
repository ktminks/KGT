export const getUserFromCookie = (req) => {
  const { user } = req;
  if (!user) throw Error("User not found");
  const { id, kittens } = user;
  return { user, id, kittens };
};

const getUpdatedUserCookie = (user) => {
  const {
    id, gid, name, email, kittens,
  } = user;
  const updatedUser = {
    id, gid, name, email, kittens,
  };
  return updatedUser;
};

export const updateUserCookie = (req, user, updatedUser) => {
  req.user = updatedUser ? getUpdatedUserCookie(updatedUser) : user;
};
