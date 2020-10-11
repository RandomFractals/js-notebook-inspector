// URL: https://observablehq.com/@randomfractals/deck-gl-heatmap
// Title: Chicago Crimes Heatmap
// Author: Taras Novak (@randomfractals)
// Version: 356
// Runtime version: 1

const m0 = {
  id: "3b81b175f29201e7@356",
  variables: [
    {
      inputs: ["md","endDay","startDay"],
      value: (function(md,endDay,startDay){return(
md`# Chicago Crimes Heatmap

[deck.gl HexagonLayer](https://deck.gl/docs/api-reference/aggregation-layers/hexagon-layer) 
heatmap of reported 2018 Chicago crimes in ${endDay - startDay} days.

*tip: toggle crimeType, startDay/endDay:*
`
)})
    },
    {
      name: "viewof crimeType",
      inputs: ["select"],
      value: (function(select){return(
select(['', 'HOMICIDE', 'KIDNAPPING', 'NARCOTICS', 'PROSTITUTION', 'ARSON', 
                          'THEFT', 'BATTERY', 'CRIMINAL DAMAGE', 'ASSAULT', 'SEX OFFENSE',
                          'OTHER OFFENSE', 'DECEPTIVE PRACTICE',
                          'BURGLARY', 'MOTOR VEHICLE THEFT', 'ROBBERY',
                          'CRIMINAL TRESPASS', 'WEAPONS VIOLATION',
                          'OFFENSE INVOLVING CHILDREN',
                          'PUBLIC PEACE VIOLATION',
                          'CRIM SEXUAL ASSAULT',
                          'INTERFERENCE WITH PUBLIC OFFICER',
                          'LIQUOR LAW VIOLATION', 'STALKING', 'GAMBLING'])
)})
    },
    {
      name: "crimeType",
      inputs: ["Generators","viewof crimeType"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof startDay",
      inputs: ["slider","days"],
      value: (function(slider,days){return(
slider({min: 0, max: days, step: 1, value: 0})
)})
    },
    {
      name: "startDay",
      inputs: ["Generators","viewof startDay"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof endDay",
      inputs: ["slider","days"],
      value: (function(slider,days){return(
slider({min: 0, max: days, step: 1, value: days})
)})
    },
    {
      name: "endDay",
      inputs: ["Generators","viewof endDay"],
      value: (G, _) => G.input(_)
    },
    {
      name: "mapContainer",
      inputs: ["html","width","crimeType","data","formatTime","dayToDate","startDay","endDay"],
      value: (function(html,width,crimeType,data,formatTime,dayToDate,startDay,endDay){return(
html `<div style="height:${width*.6}px">
  <div class="data-panel">
    <b><i>${crimeType}</i></b>
    <i>total:</i> <b>${data.length.toLocaleString()}</b>
    <br />
    <b>${formatTime(dayToDate(startDay))}</b> <i>through</i> <b>${formatTime(dayToDate(endDay))}, 2018</b>
    <br />
    <div class="data-list"></div>
  </div>
  <div id="tooltip"></div>
</div>`
)})
    },
    {
      name: "dataUrl",
      value: (function(){return(
'https://raw.githubusercontent.com/RandomFractals/ChicagoCrimes/master/data/2018/chicago-crimes-2018.arrow'
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Hexagon Layer Toggles`
)})
    },
    {
      name: "viewof blockRadius",
      inputs: ["slider"],
      value: (function(slider){return(
slider({min: 100, max: 1000, step: 100, value: 200})
)})
    },
    {
      name: "blockRadius",
      inputs: ["Generators","viewof blockRadius"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof upperPercentile",
      inputs: ["slider"],
      value: (function(slider){return(
slider({min: 90, max: 100, step: 1, value: 95})
)})
    },
    {
      name: "upperPercentile",
      inputs: ["Generators","viewof upperPercentile"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof hexagonCoverage",
      inputs: ["slider"],
      value: (function(slider){return(
slider({min: .2, max: 1, step: .1, value: .6})
)})
    },
    {
      name: "hexagonCoverage",
      inputs: ["Generators","viewof hexagonCoverage"],
      value: (G, _) => G.input(_)
    },
    {
      name: "viewof mapPitch",
      inputs: ["slider"],
      value: (function(slider){return(
slider({min: 0, max: 45, step: .1, value: 30})
)})
    },
    {
      name: "mapPitch",
      inputs: ["Generators","viewof mapPitch"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## DeckGL Map Setup`
)})
    },
    {
      name: "deckgl",
      inputs: ["deck","mapContainer","mapboxgl","mapPitch"],
      value: (function(deck,mapContainer,mapboxgl,mapPitch)
{
  return new deck.DeckGL({
    container: mapContainer,
    map: mapboxgl,
    mapboxAccessToken: 'pk.eyJ1IjoiZGF0YXBpeHkiLCJhIjoiY2tnM3ZhZWJjMDE1ajJxbGY1eTNlemduciJ9.YZ9CJEza0hvAQmTRBhubmQ',
    mapStyle: 'https://api.maptiler.com/maps/toner/style.json?key=bMizIsuAeRiZikCLHO9q',
    latitude: 41.85,    
    longitude: -87.68,
    zoom: 9,
    minZoom: 8,
    maxZoom: 15,
    pitch: mapPitch
  });
}
)
    },
    {
      name: "heatmap",
      inputs: ["deck","colorRange","data","blockRadius","hexagonCoverage","upperPercentile","lightSettings","onHover","onClick","deckgl"],
      value: (function(deck,colorRange,data,blockRadius,hexagonCoverage,upperPercentile,lightSettings,onHover,onClick,deckgl)
{
  const hexagonLayer = new deck.HexagonLayer({
    id: 'heatmap',
    colorRange,
    data,
    elevationRange: [0, 1000],
    elevationScale: 20,
    extruded: true,
    getPosition: d => [d.lng, d.lat],
    opacity: .2,
    radius: blockRadius,
    coverage: hexagonCoverage,
    upperPercentile,
    lightSettings,
    pickable: true,
    autoHighlight: true,
    onHover: onHover,
    onClick: onClick
  });
  deckgl.setProps({layers: [hexagonLayer]});
  return hexagonLayer;
}
)
    },
    {
      name: "tooltip",
      inputs: ["mapContainer"],
      value: (function(mapContainer){return(
mapContainer.querySelector('#tooltip')
)})
    },
    {
      name: "onHover",
      inputs: ["tooltip"],
      value: (function(tooltip){return(
function onHover (info) {
  const {x, y, object} = info;
  if (object) {
    tooltip.style.left = `${x}px`;    
    tooltip.style.top = `${y}px`;
    tooltip.innerHTML = `${object.points.length} crime reports`;
  } else { 
    tooltip.innerHTML = '';
  }
}
)})
    },
    {
      name: "dataList",
      inputs: ["mapContainer"],
      value: (function(mapContainer){return(
mapContainer.querySelector('.data-list')
)})
    },
    {
      name: "onClick",
      inputs: ["getDataPoints","dataList"],
      value: (function(getDataPoints,dataList){return(
function onClick(info) {
  const mapPoints = info.object.points;
  const dataPoints = getDataPoints(mapPoints);
  dataList.innerHTML = dataPoints.reduce(
    (html, d) => html + 
    `<hr>${d.block}<br />(${d.location})<br />${d.type}: ${d.info}<br />${d.date.toLocaleString()}`, ''
  );
  //console.log('clicked data points:', dataPoints);  
}
)})
    },
    {
      name: "colorRange",
      value: (function()
{
  return [
    [1, 152, 189],
    [73, 227, 206],
    [216, 254, 181],
    [254, 237, 177],
    [254, 173, 84],
    [209, 55, 78]
  ];
}
)
    },
    {
      name: "lightSettings",
      value: (function()
{
  return {
    lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
    ambientRatio: 0.4,
    diffuseRatio: 0.6,
    specularRatio: 0.2,
    lightsStrength: [0.8, 0.0, 0.8, 0.0],
    numberOfLights: 2
  };
}
)
    },
    {
      name: "tooltipStyle",
      inputs: ["html"],
      value: (function(html){return(
html `
<style>
#tooltip:empty {
  display: none;
}
#tooltip {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 11px;
  position: absolute;
  padding: 4px;
  margin: 8px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  max-width: 300px;
  font-size: 10px;
  z-index: 9;
  pointer-events: none;
}
</style>
`
)})
    },
    {
      name: "dataPanelStyle",
      inputs: ["html","width"],
      value: (function(html,width){return(
html `
<style type="text/css">
.data-panel {
  position: absolute;
  top: 0;
  font-family: Nunito, sans-serif;
  font-size: 12px;
  background-color: #f6f6f6;
  padding: 10px;
  border-radius: 3px;
  box-shadow: 1px 2px 4px #888;
  z-index: 10;
}
.data-list {
  max-height: ${width*.6 - 100}px;
  width: 180px;
  overflow: auto;
}
</style>
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Data`
)})
    },
    {
      name: "dataTable",
      inputs: ["loadData","dataUrl","arrow"],
      value: (function(loadData,dataUrl,arrow){return(
loadData(dataUrl).then(buffer => arrow.Table.from(new Uint8Array(buffer)))
)})
    },
    {
      name: "data",
      inputs: ["filterData","dataTable","crimeType","startDate","startDay","millisPerDay","endDay"],
      value: (function(filterData,dataTable,crimeType,startDate,startDay,millisPerDay,endDay){return(
filterData(dataTable, crimeType, 
                  new Date(startDate.getTime() + startDay*millisPerDay),
                  new Date(startDate.getTime() + endDay*millisPerDay))
)})
    },
    {
      name: "startDate",
      value: (function(){return(
new Date('1/1/2018')
)})
    },
    {
      name: "endDate",
      value: (function(){return(
new Date('8/8/2018')
)})
    },
    {
      name: "days",
      inputs: ["endDate","startDate","millisPerDay"],
      value: (function(endDate,startDate,millisPerDay){return(
Math.ceil((endDate - startDate) / millisPerDay)
)})
    },
    {
      name: "millisPerDay",
      value: (function(){return(
24 * 60 * 60 * 1000
)})
    },
    {
      name: "dayToDate",
      inputs: ["startDate","millisPerDay"],
      value: (function(startDate,millisPerDay){return(
function dayToDate(day) {
 return new Date(startDate.getTime() + day*millisPerDay) 
}
)})
    },
    {
      inputs: ["dayToDate"],
      value: (function(dayToDate){return(
dayToDate(1)
)})
    },
    {
      name: "formatTime",
      inputs: ["d3"],
      value: (function(d3){return(
d3.timeFormat('%b %e')
)})
    },
    {
      name: "fields",
      inputs: ["dataTable"],
      value: (function(dataTable){return(
dataTable.schema.fields.map(f => f.name)
)})
    },
    {
      name: "filterData",
      inputs: ["arrow","toDate"],
      value: (function(arrow,toDate){return(
function filterData(data, crimeType, startDate, endDate) {
  let lat, lng, block, type, info, date, results = [];
  const dataFilter = arrow.predicate.custom(i => {
    const date = toDate(data.getColumn('Date').get(i));
    const primaryType = data.getColumn('PrimaryType').get(i);
    return date >= startDate && date <= endDate && 
      (crimeType === '' || primaryType === crimeType);
  }, b => 1);
  data.filter(dataFilter)   
    .scan((index) => {
      results.push({
        'lat': lat(index),
        'lng': lng(index),
        index
        //'info': `${block(index)}<br />${type(index)}<br />${info(index)}<br />${toDate(date(index)).toLocaleString()}`
      });
    }, (batch) => {
      lat = arrow.predicate.col('Latitude').bind(batch);
      lng = arrow.predicate.col('Longitude').bind(batch);
      //block = arrow.predicate.col('Block').bind(batch);
      //type = arrow.predicate.col('PrimaryType').bind(batch);
      //info = arrow.predicate.col('Description').bind(batch);    
      //date = arrow.predicate.col('Date').bind(batch);    
    }
  );
  return results;
}
)})
    },
    {
      name: "getDataPoints",
      inputs: ["dataTable","toDate"],
      value: (function(dataTable,toDate){return(
function getDataPoints(mapPoints) {
  const dataPoints = [];
  mapPoints.map(point => {
    const dataRow = dataTable.get(point.index);
    const dataPoint = {
      // from fields
      block: dataRow.get(2),
      location: dataRow.get(3).toLowerCase(),
      type: dataRow.get(4),
      info: dataRow.get(5).toLowerCase(),
      arrested: dataRow.get(6),
      domestic: dataRow.get(7),
      date: toDate(dataRow.get(9))
    }
    dataPoints.push(dataPoint);
  });
  return dataPoints;
}
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Data Preview`
)})
    },
    {
      name: "every10KRecord",
      inputs: ["range","dataTable"],
      value: (function(range,dataTable){return(
range(dataTable, 0, dataTable.count(), 10000)
)})
    },
    {
      inputs: ["md","getMarkdown","every10KRecord","fields"],
      value: (function(md,getMarkdown,every10KRecord,fields){return(
md`${getMarkdown(every10KRecord, fields)}`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Imports`
)})
    },
    {
      inputs: ["html"],
      value: (function(html){return(
html `<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.1/mapbox-gl.css' rel='stylesheet' />
mapbox-gl.css`
)})
    },
    {
      name: "mapboxgl",
      inputs: ["require"],
      value: (function(require){return(
require('mapbox-gl@~0.44.1/dist/mapbox-gl.js')
)})
    },
    {
      name: "deck",
      inputs: ["require"],
      value: (function(require){return(
require('deck.gl@~5.2.0/deckgl.min.js')
)})
    },
    {
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require('d3')
)})
    },
    {
      from: "@jashkenas/inputs",
      name: "slider",
      remote: "slider"
    },
    {
      from: "@jashkenas/inputs",
      name: "select",
      remote: "select"
    },
    {
      name: "arrow",
      inputs: ["require"],
      value: (function(require){return(
require('apache-arrow@0.3.1')
)})
    },
    {
      from: "@randomfractals/apache-arrow",
      name: "loadData",
      remote: "loadData"
    },
    {
      from: "@randomfractals/apache-arrow",
      name: "range",
      remote: "range"
    },
    {
      from: "@randomfractals/apache-arrow",
      name: "getMarkdown",
      remote: "getMarkdown"
    },
    {
      from: "@randomfractals/apache-arrow",
      name: "toDate",
      remote: "toDate"
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## P.S.:
see my [Intro to Using Apache Arrow JS with Large Datasets](https://beta.observablehq.com/@randomfractals/apache-arrow)
on how to work with apache arrow data used in this notebook.`
)})
    }
  ]
};

const m1 = {
  id: "@jashkenas/inputs",
  variables: [
    {
      name: "slider",
      inputs: ["input"],
      value: (function(input){return(
function slider(config = {}) {
  let {
    min = 0,
    max = 1,
    value = (max + min) / 2,
    step = "any",
    precision = 2,
    title,
    description,
    disabled,
    getValue,
    format,
    display,
    submit
  } = typeof config === "number" ? { value: config } : config;
  precision = Math.pow(10, precision);
  if (!getValue)
    getValue = input => Math.round(input.valueAsNumber * precision) / precision;
  return input({
    type: "range",
    title,
    description,
    submit,
    format,
    display,
    attributes: { min, max, step, disabled, value },
    getValue
  });
}
)})
    },
    {
      name: "select",
      inputs: ["input","html"],
      value: (function(input,html){return(
function select(config = {}) {
  let {
    value: formValue,
    title,
    description,
    disabled,
    submit,
    multiple,
    size,
    options
  } = Array.isArray(config) ? { options: config } : config;
  options = options.map(o =>
    typeof o === "object" ? o : { value: o, label: o }
  );
  const form = input({
    type: "select",
    title,
    description,
    submit,
    attributes: { disabled },
    getValue: input => {
      const selected = Array.prototype.filter
        .call(input.options, i => i.selected)
        .map(i => i.value);
      return multiple ? selected : selected[0];
    },
    form: html`
      <form>
        <select name="input" ${
          multiple ? `multiple size="${size || options.length}"` : ""
        }>
          ${options.map(({ value, label,disabled }) =>
            Object.assign(html`<option>`, {
              value,
              selected: Array.isArray(formValue)
                ? formValue.includes(value)
                : formValue === value,
              disabled : disabled ? disabled : false,
              textContent: label
            })
          )}
        </select>
      </form>
    `
  });
  form.output.remove();
  return form;
}
)})
    },
    {
      name: "input",
      inputs: ["html","d3format"],
      value: (function(html,d3format){return(
function input(config) {
  let {
    form,
    type = "text",
    attributes = {},
    action,
    getValue,
    title,
    description,
    format,
    display,
    submit,
    options
  } = config;
  const wrapper = html`<div></div>`;
  if (!form)
    form = html`<form>
	<input name=input type=${type} />
  </form>`;
  Object.keys(attributes).forEach(key => {
    const val = attributes[key];
    if (val != null) form.input.setAttribute(key, val);
  });
  if (submit)
    form.append(
      html`<input name=submit type=submit style="margin: 0 0.75em" value="${
        typeof submit == "string" ? submit : "Submit"
      }" />`
    );
  form.append(
    html`<output name=output style="font: 14px Menlo, Consolas, monospace; margin-left: 0.5em;"></output>`
  );
  if (title)
    form.prepend(
      html`<div style="font: 700 0.9rem sans-serif; margin-bottom: 3px;">${title}</div>`
    );
  if (description)
    form.append(
      html`<div style="font-size: 0.85rem; font-style: italic; margin-top: 3px;">${description}</div>`
    );
  if (format)
    format = typeof format === "function" ? format : d3format.format(format);
  if (action) {
    action(form);
  } else {
    const verb = submit
      ? "onsubmit"
      : type == "button"
      ? "onclick"
      : type == "checkbox" || type == "radio"
      ? "onchange"
      : "oninput";
    form[verb] = e => {
      e && e.preventDefault();
      const value = getValue ? getValue(form.input) : form.input.value;
      if (form.output) {
        const out = display ? display(value) : format ? format(value) : value;
        if (out instanceof window.Element) {
          while (form.output.hasChildNodes()) {
            form.output.removeChild(form.output.lastChild);
          }
          form.output.append(out);
        } else {
          form.output.value = out;
        }
      }
      form.value = value;
      if (verb !== "oninput")
        form.dispatchEvent(new CustomEvent("input", { bubbles: true }));
    };
    if (verb !== "oninput")
      wrapper.oninput = e => e && e.stopPropagation() && e.preventDefault();
    if (verb !== "onsubmit") form.onsubmit = e => e && e.preventDefault();
    form[verb]();
  }
  while (form.childNodes.length) {
    wrapper.appendChild(form.childNodes[0]);
  }
  form.append(wrapper);
  return form;
}
)})
    },
    {
      name: "d3format",
      inputs: ["require"],
      value: (function(require){return(
require("d3-format@1")
)})
    }
  ]
};

const m2 = {
  id: "@randomfractals/apache-arrow",
  variables: [
    {
      name: "loadData",
      value: (function(){return(
async function loadData(dataUrl){
  const response = await fetch(dataUrl);
  return await response.arrayBuffer();
}
)})
    },
    {
      name: "range",
      value: (function(){return(
function range(data, start, end, step) {
  const slice = [];
  const rowCount = data.count();
  for (let i=start; i<end && i <rowCount; i+= step) {
    slice.push(data.get(i).toArray());
  }
  return slice;  
}
)})
    },
    {
      name: "getMarkdown",
      inputs: ["toDate"],
      value: (function(toDate){return(
function getMarkdown (dataFrame, fields, dateFields = []) {
  let markdown = `${fields.join(' | ')}\n --- | --- | ---`; // header row
  let i=0;
  for (let row of dataFrame) {
    markdown += '\n ';
    let td = '';
    let k = 0;
    for (let cell of row) {
      if ( Array.isArray(cell) ) {
        td = '[' + cell.map((value) => value == null ? 'null' : value).join(', ') + ']';
      } else if (fields[k] === 'Date' || dateFields.indexOf(fields[k]) >= 0)  { 
        td = toDate(cell).toLocaleString(); // convert Apache arrow Timestamp to Date and format
      } else {
        td = cell.toString();
      }
      markdown += ` ${td} |`;
      k++;
    }
  }
  return markdown;
}
)})
    },
    {
      name: "toDate",
      value: (function(){return(
function toDate(timestamp) {
  // Appache Arrow Timestamp is a 64-bit int of milliseconds since the epoch,
  // represented as two 32-bit ints in JS to preserve precision.
  // The fist number is the "low" int and the second number is the "high" int.
  return new Date((timestamp[1] * Math.pow(2, 32) + timestamp[0])/1000);
}
)})
    }
  ]
};

const notebook = {
  id: "3b81b175f29201e7@356",
  modules: [m0,m1,m2]
};

export default notebook;
