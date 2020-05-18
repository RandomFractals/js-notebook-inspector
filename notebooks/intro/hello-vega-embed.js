// URL: https://observablehq.com/@vega/hello-vega-embed
// Title: Hello Vega-Embed
// Author: Vega (@vega)
// Version: 280
// Runtime version: 1

const m0 = {
  id: "e6ada7799db3cf1f@280",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Hello Vega-Embed

[Vega-Embed](https://github.com/vega/vega-embed) is a convenience wrapper to embed Vega and Vega-Lite visualizations.

You can include Vega-Embed in your notebook with require (see notes at the bottom of this document on how to use specific versions of Vega and Vega-Lite).`
)})
    },
    {
      name: "embed",
      inputs: ["require"],
      value: (function(require){return(
require("vega-embed@6")
)})
    },
    {
      inputs: ["embed"],
      value: (function(embed){return(
`Embed: ${embed.version}, Vega: ${embed.vega.version}, Vega-Lite: ${embed.vl.version}`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`This notebook demonstrates how to use Vega-Embed in Observable: the \`embed\` function takes a Vega or Vega-Lite specification and returns a promise to the rendered view in a DIV element.`
)})
    },
    {
      name: "viewof view",
      inputs: ["embed"],
      value: (function(embed){return(
embed({
  $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
  width: 360,
  data: {
    values: [
      {a: 'A', b: 28}, {a: 'B', b: 55}, {a: 'C', b: 43},
      {a: 'D', b: 91}, {a: 'E', b: 81}, {a: 'F', b: 53},
      {a: 'G', b: 19}, {a: 'H', b: 87}, {a: 'I', b: 52}
    ],
    name: 'source'
  },
  selection: {
    a: {type: 'single'}
  },
  mark: 'bar',
  encoding: {
    x: {field: 'a', type: 'ordinal'},
    y: {field: 'b', type: 'quantitative'},
    tooltip: {field: 'b', type: 'quantitative'},
    color: {
      condition: {selection: 'a', value: 'steelblue'},
      value: 'grey'
    }
  }
})
)})
    },
    {
      name: "view",
      inputs: ["Generators","viewof view"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`The button to the top right of the chart provides links to common actions such as opening the specification in the [Vega Editor](https://vega.github.io/editor/).

<img src="https://github.com/vega/vega-embed/raw/master/embed.gif" style="max-width:100%;height:180px">`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`The returned *element*.value is the [Vega view](https://vega.github.io/vega/docs/api/view/). This means you can use Observable’s [\`viewof\`](https://beta.observablehq.com/@mbostock/a-brief-introduction-to-viewof) operator to access the view from other cells in your notebook, for example to [stream changes to the chart’s data](https://beta.observablehq.com/@domoritz/reactive-vega-lite)!`
)})
    },
    {
      inputs: ["view"],
      value: (function(view){return(
view.insert('source', {a: 'J', b: 42}).run()
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Vega-Embed can be customized by passing [options](https://github.com/vega/vega-embed#options) as the second argument. You can change the renderer, [change the theme](https://beta.observablehq.com/@domoritz/vega-themes-demo), override the Vega loader, and more.

Let's change the renderer from Canvas to SVG by passing \`{renderer: 'svg'}\`.`
)})
    },
    {
      inputs: ["embed"],
      value: (function(embed){return(
embed({
  $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
  data: {url: 'https://vega.github.io/vega-datasets/data/cars.json'},
  mark: 'point',
  encoding: {
    x: {field: 'Horsepower', type: 'quantitative'},
    y: {field: 'Miles_per_Gallon', type: 'quantitative'}
  }
}, {renderer: 'svg'})
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Vega-Lite

With [Vega-Lite](https://vega.github.io/vega-lite/), you can create interactive plots such as the Overview+Detail plot below in a few lines of declarative JSON.`
)})
    },
    {
      inputs: ["embed"],
      value: (function(embed){return(
embed({
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "data": {"url": "https://vega.github.io/vega-datasets/data/sp500.csv"},
  "vconcat": [{
    "width": 480,
    "mark": "area",
    "encoding": {
      "x": {
        "field": "date",
        "type": "temporal",
        "scale": {"domain": {"selection": "brush"}},
        "axis": {"title": ""}
      },
      "y": {"field": "price","type": "quantitative"}
    }
  }, {
    "width": 480,
    "height": 60,
    "mark": "area",
    "selection": {
      "brush": {"type": "interval", "encodings": ["x"]}
    },
    "encoding": {
      "x": {
        "field": "date",
        "type": "temporal",
        "axis": {"format": "%Y"}
      },
      "y": {
        "field": "price",
        "type": "quantitative",
        "axis": {"tickCount": 3, "grid": false}
      }
    }
  }]
}
)
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`To learn more about Vega-Lite, check out the [examples](https://vega.github.io/vega-lite/examples/), and [documentation](https://vega.github.io/vega-lite/docs/).`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Vega

[Vega](https://vega.github.io/vega/) is an declarative format for custom designs such as [this interactive timeline](https://vega.github.io/vega/examples/global-development/) for global health and economic development data: **grab a point to drag it through time**!`
)})
    },
    {
      inputs: ["embed"],
      value: (function(embed){return(
embed('https://vega.github.io/vega/examples/global-development.vg.json', {loader: {baseURL: 'https://vega.github.io/vega-datasets/'}})
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Requiring Specific Versions

If you want to use a specifc version of Vega and Vega-Lite, you can import Vega-Embed after setting [require aliases](https://github.com/d3/d3-require#require_alias).`
)})
    },
    {
      name: "embedWithSpecificVersions",
      inputs: ["require"],
      value: (function(require){return(
require.alias({
  "vega": "vega@5.9.0",
  "vega-lite": "vega-lite@4.0.0"
})("vega-embed@6")
)})
    }
  ]
};

const notebook = {
  id: "e6ada7799db3cf1f@280",
  modules: [m0]
};

export default notebook;
