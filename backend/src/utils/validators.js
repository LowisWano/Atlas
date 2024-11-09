const z = require("zod").z;

const parseCreateUserInputs = (req, res, next) => {
  const { name, username, password } = req.body;

  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });
  
  try {
    schema.parse({ name, username, password });
    next();
  } catch (error) {
    next(error)
  }
}

module.exports = {
  parseCreateUserInputs
}