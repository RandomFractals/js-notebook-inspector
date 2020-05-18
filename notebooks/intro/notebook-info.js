// URL: https://observablehq.com/@randomfractals/notebook-info
// Title: Notebook Inspector 🕵️‍♀️
// Author: Taras Novak (@randomfractals)
// Version: 250
// Runtime version: 1

const m0 = {
  id: "33e49de92e6a98bc@250",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md `# Notebook Inspector 🕵️‍♀️

Simple Observable js Notebook for notebook info, code graph & code stats display. 

*see [Notebooks Visualizer](https://beta.observablehq.com/@randomfractals/notebooks) for user bio, original & forked notebooks stats, etc.*
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Input Notebook Url`
)})
    },
    {
      name: "notebookUrlParam",
      inputs: ["URLSearchParams","html"],
      value: (function(URLSearchParams,html){return(
new URLSearchParams(html`<a href>`.search).get('notebook')
)})
    },
    {
      name: "viewof notebookUrl",
      inputs: ["text","notebookUrlParam"],
      value: (function(text,notebookUrlParam){return(
text({
  placeholder: 'type observable notebook url and click Inspect', 
  description: 'enter observable notebook url to get notebook stats',
  value: `${notebookUrlParam ? notebookUrlParam : '@randomfractals/notebook-info'}`,
  submit: 'Inspect'})
)})
    },
    {
      name: "notebookUrl",
      inputs: ["Generators","viewof notebookUrl"],
      value: (G, _) => G.input(_)
    },
    {
      name: "shareLink",
      inputs: ["md","notebookUrl"],
      value: (function(md,notebookUrl){return(
md `*share a link to your notebook info: [${notebookUrl}](?notebook=${notebookUrl})*`
)})
    },
    {
      name: "downloadLink",
      inputs: ["html","notebookUrl"],
      value: (function(html,notebookUrl){return(
html `Download
<a href="https://api.observablehq.com/${notebookUrl}.js" target="_blank" title="Download notebook">${notebookUrl}.js</a>`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## User Info & Notebook Code Graph`
)})
    },
    {
      name: "notebookLink",
      inputs: ["getNotebookHtml","notebook"],
      value: (function(getNotebookHtml,notebook){return(
getNotebookHtml(notebook)
)})
    },
    {
      name: "userBio",
      inputs: ["getUserBioHtml","userName","userInfo"],
      value: (function(getUserBioHtml,userName,userInfo){return(
getUserBioHtml(userName, userInfo)
)})
    },
    {
      name: "notebookStats",
      inputs: ["html","notebookNodes","notebookFunctions","namedNotebookNodes","mdCells","notebookCode","notebookImports"],
      value: (function(html,notebookNodes,notebookFunctions,namedNotebookNodes,mdCells,notebookCode,notebookImports){return(
html `
Total Cells: <a href="#notebookNodes">${notebookNodes.length}</a> |
Functions: <a href="#notebookFunctions">${notebookFunctions.length}</a> |
Named Cells: <a href="#namedNotebookNodes">${namedNotebookNodes.length}</a> |
Md Cells: <a href="#mdCells">${mdCells.length}</a> |
Lines of Code: <a href="#notebookCode">${notebookCode.split('\n').length}</a> |
Imports: <a href="#notebookImports">${notebookImports.length}</a>
`
)})
    },
    {
      name: "notebookGraph",
      inputs: ["dot","notebookUrl","userInfo","notebook","notebookFunctionNames","namedCells","notebookImports"],
      value: (function(dot,notebookUrl,userInfo,notebook,notebookFunctionNames,namedCells,notebookImports){return(
dot `
digraph "${notebookUrl}" {
  rankdir = LR;
  "@${userInfo.login}" [shape=oval, style=filled, fillcolor="#b3e6cc",
    href="https://beta.observablehq.com/@${userInfo.login}", target=_blank]
  "/${notebook.slug}" [shape=rectangle, style=filled, fillcolor="#b3e0ff",
    href="https://beta.observablehq.com/${notebookUrl}", target=_blank]
  "@${userInfo.login}" -> "/${notebook.slug}"
  ${notebookFunctionNames.map(functionName => 
    `"${functionName}(...)" [shape=rectangle, style=filled, fillcolor="#f6f6f6", 
      href="https://beta.observablehq.com/${notebookUrl}/#${functionName}", target=_blank]`).join('\n')}
  ${notebookFunctionNames.map(functionName => `"/${notebook.slug}" -> "${functionName}(...)"`).join('\n')}
  ${namedCells.map(cellName => 
    `"#${cellName}" [shape=rectangle, style=filled, fillcolor="#f6f6f6", 
      href="https://beta.observablehq.com/${notebookUrl}/#${cellName}", target=_blank]`).join('\n')}
  ${namedCells.map(cellName => `"/${notebook.slug}" -> "#${cellName}"`).join('\n')}
  ${notebookImports.map(importedFrom => 
    `"${importedFrom.cell}(...)" [shape=oval, style=filled, fillcolor="#f6f6f6", 
      href="https://beta.observablehq.com/${importedFrom.notebook}/#${importedFrom.cell}", target=_blank]`).join('\n')}
  ${notebookImports.map(importedFrom => `"import from ${importedFrom.notebook}" -> "${importedFrom.cell}(...)"`).join('\n')}
}`
)})
    },
    {
      inputs: ["html","DOM","rasterize","notebookGraph","notebookUrl","serialize"],
      value: (async function(html,DOM,rasterize,notebookGraph,notebookUrl,serialize){return(
html`
${DOM.download(await rasterize(notebookGraph), `${notebookUrl}-graph.png`, "Save as PNG")}
${DOM.download(await serialize(notebookGraph), `${notebookUrl}-graph.svg`, "Save as SVG")}
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `*TODO: link dependent code cells and imports and number arcs or provide play for the order of notebook execution display*`
)})
    },
    {
      name: "userName",
      inputs: ["notebookUrl"],
      value: (function(notebookUrl){return(
notebookUrl.substring(1, notebookUrl.indexOf('/'))
)})
    },
    {
      name: "userInfo",
      inputs: ["getUserInfo","userName"],
      value: (function(getUserInfo,userName){return(
getUserInfo(userName)
)})
    },
    {
      name: "apiUrl",
      value: (function(){return(
'https://observable-cors.glitch.me/https://api.observablehq.com'
)})
    },
    {
      inputs: ["md","notebookUrl"],
      value: (function(md,notebookUrl){return(
md `## [${notebookUrl}](https://beta.observablehq.com/${notebookUrl}) Notebook Info`
)})
    },
    {
      name: "notebook",
      inputs: ["getNotebookByUrl","notebookUrl"],
      value: (function(getNotebookByUrl,notebookUrl){return(
getNotebookByUrl(notebookUrl)
)})
    },
    {
      name: "notebookNodes",
      inputs: ["notebook"],
      value: (function(notebook){return(
notebook.nodes
)})
    },
    {
      name: "notebookFunctions",
      inputs: ["getNotebookFunctions","notebook"],
      value: (function(getNotebookFunctions,notebook){return(
getNotebookFunctions(notebook)
)})
    },
    {
      name: "notebookFunctionNames",
      inputs: ["notebookFunctions"],
      value: (function(notebookFunctions){return(
notebookFunctions.map(funct => funct.value.substring(0, funct.value.indexOf('(')).replace('function', '').replace(' ', ''))
)})
    },
    {
      name: "namedNotebookNodes",
      inputs: ["getNamedNotebookCells","notebook"],
      value: (function(getNamedNotebookCells,notebook){return(
getNamedNotebookCells(notebook)
)})
    },
    {
      name: "namedCells",
      inputs: ["namedNotebookNodes"],
      value: (function(namedNotebookNodes){return(
namedNotebookNodes.map(node => node.value.substring(0, node.value.indexOf('=')).replace('viewof ', '').replace(' ', ''))
)})
    },
    {
      name: "notebookImports",
      inputs: ["getNotebookImports","notebook"],
      value: (function(getNotebookImports,notebook){return(
getNotebookImports(notebook)
)})
    },
    {
      name: "htmlCells",
      inputs: ["notebook","isMarkupCell"],
      value: (function(notebook,isMarkupCell){return(
notebook.nodes.filter(node => isMarkupCell(node.value, 'html'))
)})
    },
    {
      name: "mdCells",
      inputs: ["notebook","isMarkupCell"],
      value: (function(notebook,isMarkupCell){return(
notebook.nodes.filter(node =>  isMarkupCell(node.value, 'md'))
)})
    },
    {
      name: "svgCells",
      inputs: ["notebook","isMarkupCell"],
      value: (function(notebook,isMarkupCell){return(
notebook.nodes.filter(node => isMarkupCell(node.value, 'svg'))
)})
    },
    {
      name: "isMarkupCell",
      value: (function(){return(
function isMarkupCell(code, markup) {
  return code.length >= (markup.length + 2) &&
    code.substring(0, markup.length + 2).replace(' ', '').startsWith(markup + '`');
}
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Notebook Cells Code View`
)})
    },
    {
      name: "notebookCells",
      inputs: ["html","notebook","cellCodeColor"],
      value: (function(html,notebook,cellCodeColor){return(
html `${
  notebook.nodes
    .map((d,i) => `<pre style="font-size:14px; color:${cellCodeColor(i)}">${d.value.replace(/</g, "&lt;")}</pre>`)
    .join("<hr style='margin:0;padding:0'>")
}`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Raw Notebook Code`
)})
    },
    {
      name: "notebookCode",
      inputs: ["notebook"],
      value: (function(notebook){return(
notebook.nodes.map((d,i) => d.value).join("\n")
)})
    },
    {
      name: "cellCodeColor",
      value: (function(){return(
function cellCodeColor(i) {
  return '#' + ('4b9ec1-b5a636-495e1d-e55934-fa7921'.split('-')[i % 5]);
}
)})
    },
    {
      name: "userBioStyles",
      inputs: ["html"],
      value: (function(html){return(
html 
`<style>
#avatar {float: left;} 
#avatar img {max-width: 24px; border-radius: 12px; margin-right: 10px;}
</style>
`
)})
    },
    {
      name: "notebookStyles",
      inputs: ["html"],
      value: (function(html){return(
html `
<style>
.notebook-thumbnail {float: left;} 
.notebook-thumbnail img {max-width: 128px; border-radius: 2px; margin-right: 10px;}
</style>
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Imports`
)})
    },
    {
      from: "@jashkenas/inputs",
      name: "text",
      remote: "text"
    },
    {
      from: "@mbostock/graphviz",
      name: "dot",
      remote: "dot"
    },
    {
      from: "@mbostock/saving-svg",
      name: "rasterize",
      remote: "rasterize"
    },
    {
      from: "@mbostock/saving-svg",
      name: "serialize",
      remote: "serialize"
    },
    {
      from: "@randomfractals/notebooks",
      name: "getUserInfo",
      remote: "getUserInfo"
    },
    {
      from: "@randomfractals/notebooks",
      name: "getUserBioHtml",
      remote: "getUserBioHtml"
    },
    {
      from: "@randomfractals/notebooks",
      name: "getNotebookByUrl",
      remote: "getNotebookByUrl"
    },
    {
      from: "@randomfractals/notebooks",
      name: "getNotebookHtml",
      remote: "getNotebookHtml"
    },
    {
      from: "@randomfractals/notebooks",
      name: "getNotebookFunctions",
      remote: "getNotebookFunctions"
    },
    {
      from: "@randomfractals/notebooks",
      name: "getNamedNotebookCells",
      remote: "getNamedNotebookCells"
    },
    {
      from: "@randomfractals/notebooks",
      name: "getNotebookImports",
      remote: "getNotebookImports"
    }
  ]
};

const m1 = {
  id: "@jashkenas/inputs",
  variables: [
    {
      name: "text",
      inputs: ["input"],
      value: (function(input){return(
function text(config = {}) {
  const {
    value,
    title,
    description,
    disabled,
    autocomplete = "off",
    maxlength,
    minlength,
    pattern,
    placeholder,
    size,
    submit,
    getValue
  } = typeof config === "string" ? { value: config } : config;
  const form = input({
    type: "text",
    title,
    description,
    submit,
    getValue,
    attributes: {
      value,
      autocomplete,
      maxlength,
      minlength,
      pattern,
      placeholder,
      size,
      disabled
    }
  });
  form.output.remove();
  form.input.style.fontSize = "1em";
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
      html`<div style="font: 700 0.9rem sans-serif;">${title}</div>`
    );
  if (description)
    form.append(
      html`<div style="font-size: 0.85rem; font-style: italic;">${description}</div>`
    );
  if (format) format = typeof format === "function" ? format : d3format.format(format);
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
  id: "@mbostock/graphviz",
  variables: [
    {
      name: "dot",
      inputs: ["require"],
      value: (function(require){return(
require("@observablehq/graphviz@0.2")
)})
    }
  ]
};

const m3 = {
  id: "@mbostock/saving-svg",
  variables: [
    {
      name: "rasterize",
      inputs: ["DOM","serialize"],
      value: (function(DOM,serialize){return(
function rasterize(svg) {
  let resolve, reject;
  const promise = new Promise((y, n) => (resolve = y, reject = n));
  const image = new Image;
  image.onerror = reject;
  image.onload = () => {
    const rect = svg.getBoundingClientRect();
    const context = DOM.context2d(rect.width, rect.height);
    context.drawImage(image, 0, 0, rect.width, rect.height);
    context.canvas.toBlob(resolve);
  };
  image.src = URL.createObjectURL(serialize(svg));
  return promise;
}
)})
    },
    {
      name: "serialize",
      inputs: ["NodeFilter"],
      value: (function(NodeFilter)
{
  const xmlns = "http://www.w3.org/2000/xmlns/";
  const xlinkns = "http://www.w3.org/1999/xlink";
  const svgns = "http://www.w3.org/2000/svg";
  return function serialize(svg) {
    svg = svg.cloneNode(true);
    const fragment = window.location.href + "#";
    const walker = document.createTreeWalker(svg, NodeFilter.SHOW_ELEMENT, null, false);
    while (walker.nextNode()) {
      for (const attr of walker.currentNode.attributes) {
        if (attr.value.includes(fragment)) {
          attr.value = attr.value.replace(fragment, "#");
        }
      }
    }
    svg.setAttributeNS(xmlns, "xmlns", svgns);
    svg.setAttributeNS(xmlns, "xmlns:xlink", xlinkns);
    const serializer = new window.XMLSerializer;
    const string = serializer.serializeToString(svg);
    return new Blob([string], {type: "image/svg+xml"});
  };
}
)
    }
  ]
};

const m4 = {
  id: "@randomfractals/notebooks",
  variables: [
    {
      name: "getUserInfo",
      inputs: ["apiUrl"],
      value: (function(apiUrl){return(
function getUserInfo(userName) {
  return fetch(`${apiUrl}/user/@${userName}`).then(d => d.json())
}
)})
    },
    {
      name: "getUserBioHtml",
      inputs: ["html"],
      value: (function(html){return(
function getUserBioHtml(userName, user) {
  return html `
    <div id="avatar">
      <a href="https://beta.observablehq.com/@${userName}" 
        title="@${userName} a.k.a. ${user.name}" target="_blank">
        <img src="${user.avatar_url}"></img>
      </a>
    </div>
    <i>${user.bio || "??"}</i>: <a href="${user.home_url}" target="_blank">${user.home_url}</a>
    <br />`;
}
)})
    },
    {
      name: "getNotebookByUrl",
      inputs: ["apiUrl"],
      value: (function(apiUrl){return(
function getNotebookByUrl(notebookUrl) {
  return fetch(`${apiUrl}/document/${notebookUrl}`).then(d => d.json())  
}
)})
    },
    {
      name: "getNotebookHtml",
      inputs: ["html"],
      value: (function(html){return(
function getNotebookHtml(notebook) {
  return html `
    <div class="notebook-thumbnail">
      <a href="https://beta.observablehq.com/@${notebook.creator.login}/${notebook.slug}" 
        title="${notebook.title}" target="_blank">
        <img src="https://static.observableusercontent.com/thumbnail/${notebook.thumbnail}.jpg"></img>
      </a>
    </div>
    <b><i>${notebook.title}</i></b>: <a href="https://beta.observablehq.com/@${notebook.creator.login}/${notebook.slug}"" target="_blank">@${notebook.creator.login}/${notebook.slug}</a>
    <br />`;
}
)})
    },
    {
      name: "getNotebookFunctions",
      value: (function(){return(
function getNotebookFunctions(notebook) {
  return notebook.nodes.filter(node => node.value.startsWith('function'));
}
)})
    },
    {
      name: "getNamedNotebookCells",
      value: (function(){return(
function getNamedNotebookCells(notebook) {
  return notebook.nodes.filter(node => !node.value.startsWith('function') && 
    node.value.indexOf('=') > 0 && 
    (node.value.indexOf('`') < 0 || node.value.indexOf('`') > node.value.indexOf('=')) );
}
)})
    },
    {
      name: "getNotebookImports",
      value: (function(){return(
function getNotebookImports(notebook) {
  const importedFunctions = [];
  const importedNodes = notebook.nodes.filter(node => node.value.startsWith('import'));
  for (let importNode of importedNodes) {
    let importedFromNotebook = importNode.value
      .substring(importNode.value.indexOf(' from ')).replace(' from ', '')
      .replace('"', '').replace("'", '').replace('"', '').replace("'", '');
    let importedMethods = importNode.value
      .substring(importNode.value.indexOf('{') + 1, importNode.value.indexOf('}')).split(',');
    for (let method of importedMethods) {
      importedFunctions.push(({notebook: importedFromNotebook, cell: method.replace(' ', '')})); 
    }
  }
  return importedFunctions;
}
)})
    },
    {
      name: "apiUrl",
      value: (function(){return(
'https://observable-cors.glitch.me/https://api.observablehq.com'
)})
    }
  ]
};

const notebook = {
  id: "33e49de92e6a98bc@250",
  modules: [m0,m1,m2,m3,m4]
};

export default notebook;
