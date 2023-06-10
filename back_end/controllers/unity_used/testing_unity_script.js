const unityF = require("./unity_function");
const colors = require("colors");
test_fFindMissingFieldNested = () => {
  // note testcase must have no undefined
  console.log("Testing fFindMissingFieldNested:".red);
  req = {
    A10000: "",
    A20000: {
      A21000: "",
      A22000: "",
      A23000: {
        A23100: "",
        A23200: {
          A23210: "",
          A23220: {
            A23221: "",
          },
        },
      },
      E20000: {
        E21000: "",
        E22000: "",
        E23000: {
          E23100: "",
          E23200: {
            E23210: "",
            E23220: {
              E23220: "",
            },
          },
        },
      },
    },

    B10000: 1,
    B20000: true,
    B30000: "B30000",

    D00000: [
      {
        C20000: {
          C21000: "",
          C22000: "",
          C23000: {
            C23100: "",
            C23200: {
              C23210: "",
              C23220: {
                C23221: "",
              },
            },
          },
        },
      },
      {
        C20000: {
          C22000: "",
          C23000: {
            C23100: "",
            C23200: {
              C23220: {
                C23221: "",
              },
            },
          },
        },
      },
    ],
  };
  needed = [
    "A10000",
    "B10000",
    "B20000",
    "B30000",
    "A20000.A22000",
    "A20000.A23000.A23200",
    "A20000.A23000.A23221",
    "E20000",
    "E20000.E23221"
  ];
  wrong = ["000000", "A20000.A23000.a", "A20000.b.A23200","E20000.a","E23220.a"];
  testcase = [...needed, ...wrong];
  //   console.log(testcase)
  unityF.fFindMissingFieldNested(req, testcase);
};

module.exports = { test_fFindMissingFieldNested };
