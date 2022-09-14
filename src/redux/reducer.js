let signupdata = JSON.parse(localStorage.getItem("signupdata")) || [];
const initialstate = { isAuth: false, data: [] };

export const reducer = (state = initialstate, { type, payload }) => {
  // console.log(type, payload);
  switch (type) {
    case "SIGNUP": {
      if (
        !payload.name ||
        !payload.mobile ||
        !payload.email ||
        !payload.password
      ) {
        alert("All Field are Compulsory");
      } else {
        signupdata = [...signupdata, payload];
        localStorage.setItem("signupdata", JSON.stringify(signupdata));
        alert("Signup Succesfull");
      }
      return state;
    }
    case "LOGIN": {
      let email = signupdata.filter((el) => el.email === payload.email);
      let data = signupdata.filter(
        (el) => el.email === payload.email && el.password === payload.password
      );

      if (email.length !== 0 && data.length !== 0) {
        alert("Login Successfull");
        state = { ...state, isAuth: true };
      } else if (email.length !== 0) {
        alert("Invalid Credential");
      } else {
        alert("Signup First");
      }
      return state;
    }
    case "LOGOUT": {
      localStorage.removeItem("login");
      state = { ...state, isAuth: false };
      return state;
    }
    case "SETDATA": {
      state = { ...state, data: payload };
      return state;
    }
    case "DELETE": {
      state = {
        ...state,
        data: state.data.filter((el) => el.id !== payload.id),
      };
      return state;
    }
    case "SEARCH": {
      let key = payload.type;
      if (payload.type === "category") {
        state = {
          ...state,
          data: state.data.filter((el) => {
            let regex = new RegExp(`${payload.text}`, "gi");
            return el.category["name"].match(regex);
          }),
        };
      }
      // payload.type==="title"
      else if (payload.type === "description") {
        state = {
          ...state,
          data: state.data.filter((el) => {
            let regex = new RegExp(`${payload.text}`, "gi");
            return el.description.match(regex);
          }),
        }}
        else if (payload.type === "title") {
          state = {
            ...state,
            data: state.data.filter((el) => {
              let regex = new RegExp(`${payload.text}`, "gi");
              return el.title.match(regex);
            }),
          };
      } else {
        state = {
          ...state,
          data: state.data.filter((el) => el[key] == payload.text),
        };
      }
      return state;
    }
    case "SORT": {
      let key = payload.type || "id";
      // console.log(key);
      if (payload.type === "category") {
        if (payload.checked === false) {
          state = {
            ...state,
            data: state.data.sort((a, b) => {
              if (a[key]["name"] > b[key]["name"]) return 1;
              if (a[key]["name"] < b[key]["name"]) return -1;
              if (a[key]["name"] === b[key]["name"]) return 0;
            }),
          };
        } else {
          state = {
            ...state,
            data: state.data.sort((a, b) => {
              if (a[key]["name"] < b[key]["name"]) return 1;
              if (a[key]["name"] > b[key]["name"]) return -1;
              if (a[key]["name"] == b[key]["name"]) return 0;
            }),
          };
        }
      } else {
        if (payload.checked === false) {
          state = {
            ...state,
            data: state.data.sort((a, b) => {
              if (a[key] > b[key]) return 1;
              if (a[key] < b[key]) return -1;
              if (a[key] == b[key]) return 0;
            }),
          };
        } else {
          state = {
            ...state,
            data: state.data.sort((a, b) => {
              if (a[key] < b[key]) return 1;
              if (a[key] > b[key]) return -1;
              if (a[key] == b[key]) return 0;
            }),
          };
        }
      }
      return state;
    }
    case "SET": {
      state = {
        ...state,
        data: state.data.map((el) =>
          el.id === payload.id ? { ...payload } : el
        ),
      };
      return state;
    }
    default: {
      return state;
    }
  }
};
