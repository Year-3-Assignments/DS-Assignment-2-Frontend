const initialState = {
    loginForm: {
      values: {
        username: "",
        password: ""
      },
      errors: {
        username: "",
        password: ""
      }
    }
  };
  
  const setErrors = (username, password) => {
    let errors = { username: "", password: "" };
    if (!username && username.length === 0) {
      errors.username = "Username is required";
    } 

    if (!password && password.length === 0) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must have 8 characters";
    }
    return errors;
  };
  
  export default (state = initialState, action) => {
    if (action.type === "FORM_SUBMIT") {
      const { username, password } = action.payload;
      const values = {
        username,
        password
      };
      const errors = setErrors(username, password);
      return {
        loginForm: {
          values,
          errors
        }
      };
    }
    return state;
  };