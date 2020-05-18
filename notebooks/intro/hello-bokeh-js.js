// URL: https://observablehq.com/@bryangingechen/hello-bokeh-js
// Title: Hello, Bokeh.js!
// Author: Bryan Gin-ge Chen (@bryangingechen)
// Version: 165
// Runtime version: 1

const m0 = {
  id: "9dbe456796d44142@165",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Hello, Bokeh.js!

*See [this forum thread](https://talk.observablehq.com/t/bokehjs/1785).*

Bokeh is a library for interactive visualizations. While it is mainly used with Python, it has a JavaScript library "Bokeh.js" which performs the rendering and event-handling in the browser. As mentioned in [the docs](https://bokeh.pydata.org/en/latest/docs/user_guide/bokehjs.html):

> The Bokeh Python library, and libraries for Other Languages such as R, Scala, and Julia, are primarily a means to interact with BokehJS conveniently at a high level, without needing to explicitly worry about JavaScript or web development. However, BokehJS has its own API, and it is possible to do pure JavaScript development using BokehJS directly. 

We can use it in Observable as follows:`
)})
    },
    {
      name: "Bokeh",
      inputs: ["html","require"],
      value: (async function(html,require)
{
  const ver = '1.1.0';
  if (!document.getElementById('bokehjs-css'))
    document.head.appendChild(html`<link id='bokehjs-css' href='https://cdn.pydata.org/bokeh/release/bokeh-${ver}.min.css' rel=stylesheet>`);
  await require(`https://cdn.pydata.org/bokeh/release/bokeh-${ver}.min.js`).catch(() => {})
  const Bokeh = window.Bokeh;
  await require(`https://cdn.pydata.org/bokeh/release/bokeh-api-${ver}.min.js`).catch(() => {});
  return Bokeh;
}
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Feel free to import from this notebook as well:
\`\`\`js
import {Bokeh} from '@bryangingechen/hello-bokeh-js'
\`\`\`
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Here are a few examples copied from [the docs](https://bokeh.pydata.org/en/latest/docs/user_guide/bokehjs.html). The first few seem to work fine, but the others seem to be broken:

- [Simple line plot](#lowLevel)
- [Colorful scatterplot](#bokehPlotting)
- [Pie charts](#pieCharts) (cannot resize using options)
- [Bar charts](#barCharts) (doesn't display)
- ["Minimal complete example"](#minimalComplete) (added data points are not drawn)

A further note: the Bokeh charts seem to be re-rendered whenever other divs on the page are resized, which leads to a bit of lag when editing in Observable. 

Uncomment the appropriate line in the following cell for more console logging while testing:
`
)})
    },
    {
      value: (function()
{
//   Bokeh.set_log_level('trace');
//   Bokeh.set_log_level('debug');
//   Bokeh.set_log_level('info');
//   Bokeh.set_log_level('warn');
//   Bokeh.set_log_level('error');
//   Bokeh.set_log_level('fatal');
//   Bokeh.set_log_level('off');
}
)
    },
    {
      name: "lowLevel",
      inputs: ["md"],
      value: (function(md){return(
md`A simple line plot from the ["Low Level models"](https://bokeh.pydata.org/en/latest/docs/user_guide/bokehjs.html#low-level-models) section:`
)})
    },
    {
      inputs: ["Bokeh","html"],
      value: (function(Bokeh,html)
{
  // create some data and a ColumnDataSource
  var x = Bokeh.LinAlg.linspace(-0.5, 20.5, 10);
  var y = x.map(function (v) { return v * 0.5 + 3.0; });
  var source = new Bokeh.ColumnDataSource({ data: { x: x, y: y } });

  // create some ranges for the plot
  var xdr = new Bokeh.Range1d({ start: -0.5, end: 20.5 });
  var ydr = new Bokeh.Range1d({ start: -0.5, end: 20.5 });

  // make the plot
  var plot = new Bokeh.Plot({
    title: "BokehJS Plot",
    x_range: xdr,
    y_range: ydr,
    plot_width: 400,
    plot_height: 400,
    background_fill_color: "#F2F2F7"
  });

  // add axes to the plot
  var xaxis = new Bokeh.LinearAxis({ axis_line_color: null });
  var yaxis = new Bokeh.LinearAxis({ axis_line_color: null });
  plot.add_layout(xaxis, "below");
  plot.add_layout(yaxis, "left");

  // add grids to the plot
  var xgrid = new Bokeh.Grid({ ticker: xaxis.ticker, dimension: 0 });
  var ygrid = new Bokeh.Grid({ ticker: yaxis.ticker, dimension: 1 });
  plot.add_layout(xgrid);
  plot.add_layout(ygrid);

  // add a Line glyph
  var line = new Bokeh.Line({
    x: { field: "x" },
    y: { field: "y" },
    line_color: "#666699",
    line_width: 2
  });
  plot.add_glyph(line, source);

  // add the plot to a document and display it
  var doc = new Bokeh.Document();
  doc.add_root(plot);
  var div = html``;
  Bokeh.embed.add_document_standalone(doc, div);
  return div;
}
)
    },
    {
      name: "bokehPlotting",
      inputs: ["md"],
      value: (function(md){return(
md`A colorful scatterplot from [Bokeh.Plotting](https://bokeh.pydata.org/en/latest/docs/user_guide/bokehjs.html#bokeh-plotting):`
)})
    },
    {
      inputs: ["Bokeh","html"],
      value: (function(Bokeh,html)
{
  var plt = Bokeh.Plotting;

  // set up some data
  var M = 100;
  var xx = [];
  var yy = [];
  var colors = [];
  var radii = [];
  for (var y = 0; y <= M; y += 4) {
    for (var x = 0; x <= M; x += 4) {
      xx.push(x);
      yy.push(y);
      colors.push(plt.color(50+2*x, 30+2*y, 150));
      radii.push(Math.random() * 0.4 + 1.7)
    }
  }

  // create a data source
  var source = new Bokeh.ColumnDataSource({
    data: { x: xx, y: yy, radius: radii, colors: colors }
  });

  // make the plot and add some tools
  var tools = "pan,crosshair,wheel_zoom,box_zoom,reset,save";
  var p = plt.figure({ title: "Colorful Scatter", tools: tools });

  // call the circle glyph method to add some circle glyphs
  var circles = p.circle({ field: "x" }, { field: "y" }, {
    source: source,
    radius: radii,
    fill_color: colors,
    fill_alpha: 0.6,
    line_color: null
  });
  
  // show the plot
  var div = html``;
  plt.show(p,div);
  return div;

}
)
    },
    {
      name: "pieCharts",
      inputs: ["md"],
      value: (function(md){return(
md`Some pie charts from [Bokeh.Charts.pie](https://bokeh.pydata.org/en/latest/docs/user_guide/bokehjs.html#bokeh-charts-pie):`
)})
    },
    {
      inputs: ["Bokeh","html"],
      value: (function(Bokeh,html)
{
  var plt = Bokeh.Plotting;
  var pie_data = {
    labels: ['Work', 'Eat', 'Commute', 'Sport', 'Watch TV', 'Sleep'],
    values: [8, 2, 2, 4, 0, 8],
  };

  var p1 = Bokeh.Charts.pie(pie_data);
  var p2 = Bokeh.Charts.pie(pie_data, {
    inner_radius: 0.2,
    start_angle: Math.PI / 2
  });
  var p3 = Bokeh.Charts.pie(pie_data, {
    inner_radius: 0.2,
    start_angle: Math.PI / 6,
    end_angle: 5 * Math.PI / 6
  });
  var p4 = Bokeh.Charts.pie(pie_data, {
    inner_radius: 0.2,
    palette: "Oranges9",
    slice_labels: "percentages"
  });

  var div = html``;
  plt.show(plt.gridplot([[p1, p2, p3, p4]], {plot_width:250, plot_height:250}), div);
  return div;
}
)
    },
    {
      name: "barCharts",
      inputs: ["md"],
      value: (function(md){return(
md`Bar charts from [Bokeh.Charts.bar](https://bokeh.pydata.org/en/latest/docs/user_guide/bokehjs.html#bokeh-charts-bar):`
)})
    },
    {
      inputs: ["Bokeh","html"],
      value: (function(Bokeh,html)
{
  var plt = Bokeh.Plotting;

  var bar_data = [
    ['City', '2010 Population', '2000 Population'],
    ['New York City, NY', 8175000, 8008000],
    ['Los Angeles, CA', 3792000, 3694000],
    ['Chicago, IL', 2695000, 2896000],
    ['Houston, TX', 2099000, 1953000],
    ['Philadelphia, PA', 1526000, 1517000],
  ];

  var p1 = Bokeh.Charts.bar(bar_data, {
    axis_number_format: "0.[00]a"
  });
  var p2 = Bokeh.Charts.bar(bar_data, {
    axis_number_format: "0.[00]a",
    stacked: true
  });
  var p3 = Bokeh.Charts.bar(bar_data, {
    axis_number_format: "0.[00]a",
    orientation: "vertical"
  });
  var p4 = Bokeh.Charts.bar(bar_data, {
    axis_number_format: "0.[00]a",
    orientation: "vertical",
    stacked: true
  });

  const div = html``;
  plt.show(plt.gridplot([[p1, p2, p3, p4]], {plot_width:350, plot_height:350}),div);
  return div;
}
)
    },
    {
      name: "minimalComplete",
      inputs: ["md"],
      value: (function(md){return(
md`A ["Minimal Complete Example"](https://bokeh.pydata.org/en/latest/docs/user_guide/bokehjs.html#minimal-complete-example):`
)})
    },
    {
      inputs: ["Bokeh","html"],
      value: (function(Bokeh,html)
{
  // arrays to hold data
  var source = new Bokeh.ColumnDataSource({
    data: { x: [], y: [] }
  });
  // make the plot and add some tools
  var tools = "pan,crosshair,wheel_zoom,box_zoom,reset,save";

  var plot = Bokeh.Plotting.figure({title:'Example of Random data', tools: tools, height: 300, width: 300});

  var scatterData = plot.line({ field: "x" }, { field: "y" }, {
    source: source,
    line_width: 2
  });

  function addPoint() {
    // The data can be added, but generally all fields must be the
    // same length.
    source.data.x.push(Math.random());
    source.data.y.push(Math.random());
    // Also, the DataSource object must be notified when it has changed.
    source.change.emit();
  }

  // Show the plot, appending it to the end of the current
  // section of the document we are in.
  const container = html`<div id="chart"></div><button id="button">Add some data!</button>`;
  const button = container.querySelector('#button');
  button.onclick = addPoint;

  Bokeh.Plotting.show(plot,container.querySelector('#chart'));

  return container;
}
)
    }
  ]
};

const notebook = {
  id: "9dbe456796d44142@165",
  modules: [m0]
};

export default notebook;
