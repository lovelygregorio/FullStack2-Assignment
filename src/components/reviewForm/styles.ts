const styles = {
  root: {
    marginTop: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },

  form: {
    width: "100%",
    "& > * ": {
      marginTop: 2,
    },
  },

  textField: {
    width: "40ch",

    "& .MuiInputBase-input": {
      color: "#ffffff",
    },

    "& .MuiInputLabel-root": {
      color: "rgba(255,255,255,0.7)",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#ffffff",
    },

    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(255,255,255,0.4)",
      },

      "&:hover fieldset": {
        borderColor: "#ffffff",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#ffffff",
      },
    },
  },

  submit: {
    marginRight: 2,
  },

  snack: {
    width: "50%",
    "& > * ": {
      width: "100%",
    },
  },
};

export default styles;
