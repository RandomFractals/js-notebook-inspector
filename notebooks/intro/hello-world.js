// URL: https://observablehq.com/@tmcw/hello-world
// Title: Hello ${name}
// Author: Tom MacWright (@tmcw)
// Version: 7
// Runtime version: 1

const m0 = {
  id: "6759b582dec65059@7",
  variables: [
    {
      name: "hello",
      inputs: ["md","name"],
      value: (function(md,name){return(
md`# Hello ${name}`
)})
    },
    {
      name: "name",
      value: (function(){return(
'world'
)})
    }
  ]
};

const notebook = {
  id: "6759b582dec65059@7",
  modules: [m0]
};

export default notebook;
