module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "green-1": "#29D38A",
        "green-2": "#002333",
        "green-3": "#4bc834",
        "green-4": "#1e6100",
        "purple-1": "#140035",
      },
      backgroundImage: {
        heroBg: "url('../src/sourceCode/assets/images/heroBg.jpg')",
        mobile:
          "url('https://cdn.dribbble.com/users/1341982/screenshots/5741035/media/7036a4555d6a01c44f15f1ac631d2e3b.gif')",
        footer:
          "url('https://image.shutterstock.com/image-vector/one-continuous-drawing-line-clean-260nw-1703287381.jpg')",
        section2:
          "url('https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z3JlZW4lMjBlbmVyZ3l8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60')",
        log: "url('../src/assets/desk.png')",
        loginBg: "url('../src/sourceCode/assets/images/loginBg.jpg')",
        signupBg: "url('../src/sourceCode/assets/images/signupBg.jpg')",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      borderWidth: {
        1: "1px",
      },
      width: {
        128: "32rem",
      },
    },
  },
  plugins: [],
};
