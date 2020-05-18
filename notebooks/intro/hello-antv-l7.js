// URL: https://observablehq.com/@mbostock/hello-antv-l7
// Title: Hello, AntV L7
// Author: Mike Bostock (@mbostock)
// Version: 38
// Runtime version: 1

const m0 = {
  id: "db5c61eaedf15729@38",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Hello, AntV L7

A demo of [L7 Geospatial Visualization](https://l7.antv.vision/en).`
)})
    },
    {
      name: "map",
      inputs: ["html","L7","data"],
      value: (function*(html,L7,data)
{
  const container = html`<div style="height: 500px;">`;
  yield container; // Give the container dimensions.

  const scene = new L7.Scene({
    id: container,
    map: new L7.Mapbox({
      center: [-74.006, 40.7128],
      zoom: 14,
      style: "dark"
    })
  });

  scene.on("loaded", () => {
    const lineLayer = new L7.LineLayer()
      .source(data, {
        parser: {
          type: "json",
          coordinates: "path"
        }
      })
      .size(1.5)
      .shape("line")
      .color("color", v => `rgb(${v})`)
      .animate({
        interval: 0.6,
        trailLength: 1.5,
        duration: 6
      });

    scene.addLayer(lineLayer);
  });
}
)
    },
    {
      name: "data",
      value: (function(){return(
fetch("https://gw.alipayobjects.com/os/basement_prod/5592c737-1c70-4d6b-82c1-e74e5a019b04.json")
  .then(response => response.json())
)})
    },
    {
      name: "L7",
      inputs: ["require"],
      value: (function(require){return(
require("@antv/l7@2")
)})
    }
  ]
};

const notebook = {
  id: "db5c61eaedf15729@38",
  modules: [m0]
};

export default notebook;
