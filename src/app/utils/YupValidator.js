import * as Yup from "yup";

export default function YupValidator(obj, key) {
  switch (key) {
    case "USERNAME":
      try {
        const usernameSchema = Yup.string().required("Username is required");
        const usernameValid = usernameSchema.validateSync(obj);
        return { value: usernameValid };
      } catch (error) {
        return { error: error.message };
      }

    case "EMAIL":
      try {
        const emailSchema = Yup.string()
          .email("Invalid email")
          .required("Email is required");
        const emailValid = emailSchema.validateSync(obj);
        return { value: emailValid };
      } catch (error) {
        return { error: error.message };
      }

    case "PASSWORD":
      try {
        const passwordSchema = Yup.string()
          .required("Password is required")
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must contain 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
          );
        const passwordValid = passwordSchema.validateSync(obj);
        return { value: passwordValid };
      } catch (error) {
        return { error: error.message };
      }

    default:
      return { error: "Invalid key" };
  }
}
