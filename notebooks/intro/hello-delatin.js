// URL: https://observablehq.com/@fil/hello-delatin
// Title: Hello, delatin
// Author: Fil (@fil)
// Version: 218
// Runtime version: 1

const m0 = {
  id: "d7308c628ac58d15@218",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Hello, delatin


[Delatin](https://github.com/mapbox/delatin) is a fantastic new JavaScript library by [@mourner](/@mourner), that simplifies an elevation raster into a rationally small list of triangles, minimizing the error.`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## 1. Rendering with Zdog:`
)})
    },
    {
      name: "viewof illo",
      inputs: ["DOM","width","height","d3","data","tin","Zdog","color"],
      value: (function*(DOM,width,height,d3,data,tin,Zdog,color)
{
  const context = DOM.context2d(width, height, 1),
    element = context.canvas;

  const X = d3
      .scaleLinear()
      .domain([0, data.width])
      .range([-width / 2, width / 2]),
    Y = d3
      .scaleLinear()
      .domain([0, data.height])
      .range([-height / 2, height / 2]),
    H = (x, y) => tin.heightAt(Math.round(x), Math.round(y)),
    Z = (x, y) => 2 * (H(x, y) - 100);

  const illo = (element.value = new Zdog.Illustration({
    element,
    dragRotate: true,
    onDragMove: update,
    rotate: { x: Zdog.TAU * -.1 }
  }));
  const g = new Zdog.Anchor({addTo: illo, rotate: {x: Zdog.TAU / 4}});

  for (let i = 0; i < tin.triangles.length; i += 3) {
    const p0 = tin.triangles[i],
      p1 = tin.triangles[i + 1],
      p2 = tin.triangles[i + 2],
      x0 = tin.coords[2 * p0],
      y0 = tin.coords[2 * p0 + 1],
      x1 = tin.coords[2 * p1],
      y1 = tin.coords[2 * p1 + 1],
      x2 = tin.coords[2 * p2],
      y2 = tin.coords[2 * p2 + 1];

    new Zdog.Shape({
      addTo: g,
      path: [
        { x: X(x0), y: Y(y0), z: Z(x0, y0) },
        { x: X(x1), y: Y(y1), z: Z(x1, y1) },
        { x: X(x2), y: Y(y2), z: Z(x2, y2) }
      ],
      color: color(H((x0 + x1 + x2) / 3, (y0 + y1 + y2) / 3)),
      stroke: 1,
      fill: true
    });
  }
  function update() {
    illo.updateRenderGraph();
  }
  update();
  yield element;
}
)
    },
    {
      name: "illo",
      inputs: ["Generators","viewof illo"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## 2. Rendering with plain canvas commands:`
)})
    },
    {
      inputs: ["DOM","width","height","data","tin","color"],
      value: (function(DOM,width,height,data,tin,color)
{
  const context = DOM.context2d(width, height),
    scale = width / data.width;

  for (let i = 0; i < tin.triangles.length; i += 3) {
    const p0 = tin.triangles[i],
      p1 = tin.triangles[i + 1],
      p2 = tin.triangles[i + 2],
      x0 = tin.coords[2 * p0],
      y0 = tin.coords[2 * p0 + 1],
      x1 = tin.coords[2 * p1],
      y1 = tin.coords[2 * p1 + 1],
      x2 = tin.coords[2 * p2],
      y2 = tin.coords[2 * p2 + 1];

    context.beginPath();
    context.moveTo(scale * x0, scale * y0);
    context.lineTo(scale * x1, scale * y1);
    context.lineTo(scale * x2, scale * y2);
    context.lineTo(scale * x0, scale * y0);

    context.fillStyle = color(
      tin.heightAt(
        Math.round((x0 + x1 + x2) / 3),
        Math.round((y0 + y1 + y2) / 3)
      )
    );
    context.fill();
    context.stroke();
  }

  return context.canvas;
}
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`---

## Load and use Delatin`
)})
    },
    {
      name: "Delatin",
      value: (async function(){return(
(await import('https://unpkg.com/delatin@0.1/index.js?module?module')).default
)})
    },
    {
      name: "data",
      value: (function(){return(
fetch(
  "https://gist.githubusercontent.com/mbostock/4241134/raw/ee3244eaf405667623241b3d5e1477424623d12b/volcano.json"
).then(d => d.json())
)})
    },
    {
      name: "tin",
      inputs: ["Delatin","data"],
      value: (function(Delatin,data)
{
  const tin = new Delatin(data.values, data.width, data.height);
  tin.run(2);
  return tin;
}
)
    },
    {
      inputs: ["tin"],
      value: (function(tin){return(
tin.getMaxError()
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`---

Thanks to [Fabian Iwand](/@mootari) for suggestions.

_boring zone_`
)})
    },
    {
      name: "color",
      inputs: ["d3","interpolateTerrain","data"],
      value: (function(d3,interpolateTerrain,data){return(
d3
  .scaleSequential(interpolateTerrain)
  .domain(d3.extent(data.values))
  .nice()
)})
    },
    {
      name: "interpolateTerrain",
      inputs: ["d3"],
      value: (function(d3)
{
  const i0 = d3.interpolateHsvLong(d3.hsv(120, 1, 0.65), d3.hsv(60, 1, 0.9));
  const i1 = d3.interpolateHsvLong(d3.hsv(60, 1, 0.9), d3.hsv(0, 0, 0.95));
  return t => (t < 0.5 ? i0(t * 2) : i1((t - 0.5) * 2));
}
)
    },
    {
      name: "height",
      inputs: ["width","data"],
      value: (function(width,data){return(
((width * data.height) / data.width) | 0
)})
    },
    {
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require("d3@5", "d3-hsv")
)})
    },
    {
      name: "Zdog",
      inputs: ["require"],
      value: (function(require){return(
require("zdog@1/dist/zdog.dist.min.js")
)})
    }
  ]
};

const notebook = {
  id: "d7308c628ac58d15@218",
  modules: [m0]
};

export default notebook;
