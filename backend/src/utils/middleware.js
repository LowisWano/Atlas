const jwt = require("jsonwebtoken");
const z = require("zod").z;
const { getUser } = require("../services/auth.service");

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  }
  next();
};

const tokenValidator = async (request, response, next) => {
  const token = request.token;

  if (!token) {
    return response
      .status(401)
      .json({ error: "Access Denied. No Token Provided." });
  }

  try {
    const decodedToken = jwt.verify(request.token, process.env.JWT_SECRET);

    if (!decodedToken.username) {
      return response.status(401).json({ error: "Invalid Token Credentials." });
    }

    const user = await getUser(decodedToken.username);

    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    request.user = decodedToken;
    next();
  } catch (error) {
    next(error);
  }
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "JsonWebTokenError") {
    response.status(401).json({ error: "token invalid" });
  } else if (error instanceof z.ZodError) {
    response.status(400).send({ error: error.issues });
  }else {
    response.status(500).send('Internal Server Error');
  }

  next(error);
};

module.exports = {
  tokenExtractor,
  unknownEndpoint,
  errorHandler,
  tokenValidator,
  requestLogger,
};
