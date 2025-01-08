export const Signup = (req, res, next) => {
  try {
    res.status(200).send({
      status: "success",
      message: "User signup functionality is working",
    });
  } catch (error) {
    res.status(500).send({
      status: "fail",
      message: "An error occured in the signup route",
    });
  }
};

export const Login = (req, res, next) => {
  try {
    res.status(200).send({
      status: "success",
      message: "User Login functionality is working",
    });
  } catch (error) {
    res.status(500).send({
      status: "fail",
      message: "An error occured in the signup route",
    });
  }
};
