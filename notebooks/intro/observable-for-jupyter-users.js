// URL: https://observablehq.com/@observablehq/observable-for-jupyter-users
// Title: Observable for Jupyter Users
// Author: Observable (@observablehq)
// Version: 2691
// Runtime version: 1

const m0 = {
  id: "b00406054cfb4875@2691",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Observable for Jupyter Users

Observable, like Jupyter, is a computational notebook that’s great for doing data science and visualization, where “notebook” refers to a series of cells containing prose, code, and visualizations. Observable runs a superset of JavaScript entirely in your browser, so it draws on a different ecosystem than the Python one you may be used to. This tutorial shows Jupyter users how to make the most of Observable.

Let’s start with the big differences.`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Observable runs a superset of JavaScript

Most Jupyter users use the Python kernel, although there are kernels for [JavaScript](https://github.com/yunabe/tslab), [Julia](https://github.com/JuliaLang/IJulia.jl), [Haskell](https://github.com/gibiansky/IHaskell), too. You can write some JavaScript in Jupyter that gets executed in the browser too, but typically code in Jupyter notebooks is written in the kernel language and executed in a remote process running the kernel. For the rest of this tutorial I’ll assume familiarity with Python in a Jupyter notebook.

To get the most out of Observable you’ll need some exposure to JavaScript. Our favorite full course on the language is [Eloquent JavaScript](https://eloquentjavascript.net/2nd_edition/), but if you want to leverage your Python knowledge to quickly learn some essentials, here’s a [list of differences between the languages](https://observablehq.com/d/5e82392bae5fb729). That said, if you're experienced with Python you may be able to jump in and look for differences as you go. Observable’s [flavor of JavaScript is a bit different](https://observablehq.com/@observablehq/observables-not-javascript), so even folks familiar with JavaScript have something to learn.`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Cell outputs are shown *above* the code`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`In Observable, the output of a cell — be it a visualization, an object, or any other result of an expression — comes first. The code that produces it appears below.`
)})
    },
    {
      value: (function(){return(
2 ** 3
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## You can show or hide the code`
)})
    },
    {
      inputs: ["md","FileAttachment"],
      value: (async function(md,FileAttachment)
{
  const text = 'The code in a newly created cell begins pinned, which keeps it visible, but cells can be unpinned so their code is hidden. To see the code again, click the space to the left of the cell output.'
  return md`${text}

> <img src="${await FileAttachment("2020-03-02 10.29.45.gif").url()}" style="max-width: 520px; border: 10px solid lightgray; border-radius: 20px;"/>`
}
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Try it: click the empty space to the left of the cell below to see the code for it, then click the thumbtack icon to keep it visible when you open another cell.`
)})
    },
    {
      value: (function(){return(
9 + 8
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`This gives you more control over the presentation of your notebook: if you want to call attention to way a result was produced, you can leave the cell pinned for all to see. Otherwise unpin the cell so the code is still available, waiting for a curious viewer to slide it out underneath.`
)})
    },
    {
      inputs: ["md","mac"],
      value: (function(md,mac){return(
md`## Use shift-enter to run a cell

If you’re used to running a cell with ${mac ? "option-enter" : "alt-enter"} in Jupyter, you may be surprised to find that it *splits* cells in Observable. For more, check out the [keyboard shortcuts](https://observablehq.com/@observablehq/keyboard-shortcuts) notebook or click the <span style='font-family: -apple-system, system-ui, "avenir next", sans-serif; font-weight: bold;'>?</span> button in the bottom right.`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Cells produce only one value`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Like function bodies in JavaScript, cells in Observable are either a single expression or a block of statements. Cells with a single expression evaluate to the result of that expression.

Similar to the way only the last expression in a Jupyter notebook has its \`repr()\` printed below the cell, only one expression is returned from a cell with multiple statments. Instead of something akin to an implicit return of the final statement, Observable blocks use a return statement to specify this value. If no value is returned, similar to ending the last statement in Jupyter with a semicolon, the cell evaluates to \`undefined\`.

To write multiple statements in a cell instead of a single expression, you need to surround the code with curly brackets to make it a code block. To output a value in a code block, use a return statement.
`
)})
    },
    {
      value: (function()
{
  const foo = (x) => x + 1;
  const arr = [1,2,3];
  return arr.map(foo);
}
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`If you just want an object literal, you must distinguish it from a block by wrapping it in parentheses:`
)})
    },
    {
      value: (function(){return(
{hello: "world"}
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Variables defined inside a block can only be accessed inside that block
Inside the block, any declared variables will be local variables and you’ll need to use \`let\` or \`const\` to declare them. Cell blocks are similar to bodies of functions in this way. Here, \`radius\` is not accessible from other cells:`
)})
    },
    {
      value: (function()
{
  const radius = 12;
  return 2 * Math.PI * radius;
}
)
    },
    {
      inputs: ["radius"],
      value: (function(radius){return(
Math.PI * radius ** 2
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Cells can be named`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`To make the return value of a cell available to code in other cells, you can name the cell, i.e. assign it to a special kind of global variable. This does not use \`var\`, \`const\`, or \`let\`; just write the name and equals:`
)})
    },
    {
      name: "z",
      value: (function(){return(
123 + 456
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`The code defines \`z\` as \`123 + 456\`. You can now reference \`z\` like any other variable in code anywhere else in the notebook. Because every cell has just one return value, you should break up big cells into little, focused ones.

As a special kind of global variable, it gets some special treatment.`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Observable is reactive
This is the biggest difference between the evaluation model of Observable and Jupyter. If you fight it, you will get a headache; if you learn it, you will find what makes this notebook magical:`
)})
    },
    {
      inputs: ["html","now"],
      value: (function(html,now)
{
  const str = "Cells re-run automatically!"
  return html`<div style="
    max-width: 640px; 
    font-size: 2em; 
    text-align: center; 
    white-space: pre-wrap;
  ">
    ${str.split("").map((char, i) => html`<span style="
      display: inline-block; 
      transform: translate(0, ${2 * Math.sin((i - now / 400))}px);
    ">${char}</span>`)}
  </div>`
}
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`[Like a spreadsheet](https://observablehq.com/@observablehq/how-observable-runs), Observable keeps track of which cells depend on the output of other cells and recalculates results as necessary to keep everything up to date.

Have you ever worked in a notebook where something early in an analysis pipeline was changed, but you forgot to rerun later cells? In Jupyter notebooks it’s important to remember to rerun cells that depend on cells that have been changed; when teaching Jupyter to scientists, I say “you’re not done until you’ve rerun the notebook and gotten the same result,” since a key motivation for notebook computing is reproducibility.

This how the creator of Jupyter, Fernando Pérez, [describes the problem](https://arxiv.org/abs/1810.08055):

> Because notebooks’ interactivity make them vulnerable to accidental overwriting or deletion of
critical steps by the user, if your analysis runs quickly, make a habit of regularly restarting your
kernel and re-running all cells to make sure you did not accidentally delete a step while cleaning
your notebook (and if you did, retrieve the code for it from version control).

So using Jupyter as a fastidious data scientist requires clicking this button a lot:`
)})
    },
    {
      inputs: ["md","FileAttachment"],
      value: (async function(md,FileAttachment){return(
md`<img style="max-width: 92%" src="${await FileAttachment("jupyter.png").url()}"/>`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`In Observable, this happens automatically, every time a referenced value changes.

You can think of Observable keeping cells up to date as killing the kernel and rerunning the whole notebook each time you edit a cell, or you can think of it as rerunning just the cells that depend on the cell you’re editing (which is what’s actually happening).`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`This is a very different tradeoff than Jupyter makes! Observable’s approach is helpful for quickly iterating on visualizations or other outputs built up over multiple cells, and when a value is used in multiple places in a notebook. Not needing to remember to rerun the right cells is one less thing to worry about while focusing on a notebook’s contents.`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`These special, Notebook-level variables can only be defined once, and cannot be reassigned:`
)})
    },
    {
      name: "a",
      value: (function(){return(
10
)})
    },
    {
      name: "a",
      value: (function(){return(
11
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`And you cannot define a cell circularly:`
)})
    },
    {
      name: "b",
      inputs: ["c"],
      value: (function(c){return(
c + 1
)})
    },
    {
      name: "c",
      inputs: ["b"],
      value: (function(b){return(
b + 2
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`The upside is that user interactions and changes to code propagate instantly. There’s no need to rerun other cells! Change \`bits\` below and \`maxSignedInt\` will update too.`
)})
    },
    {
      name: "bits",
      value: (function(){return(
18
)})
    },
    {
      name: "maxSignedInt",
      inputs: ["bits"],
      value: (function(bits){return(
2 ** (bits - 1) - 1
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Cells don’t run from top to bottom

Because the order of cells in a notebook doesn’t affect the execution order, Observable notebooks are structured in whatever order makes most sense to the author. They often show a final result at the top and expand on the subparts of the problem below.`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`In this adaptation of Ned Batchelder’s venerable [pizza.py](https://nedbatchelder.com/blog/201210/pizzapy.html), the shopping list at the top uses the input slider, constants, and import defined below:`
)})
    },
    {
      inputs: ["md","meat","veggie","vegan"],
      value: (function(md,meat,veggie,vegan){return(
md`**We need ${'🍕'.repeat(meat)} meat, ${'🍕'.repeat(veggie)} veggie, ${'🍕'.repeat(vegan)} vegan.**`
)})
    },
    {
      name: "viewof rsvps",
      inputs: ["slider"],
      value: (function(slider){return(
slider({
  min: 0, 
  max: 100, 
  step: 1,
  description: "RSVPs"
})
)})
    },
    {
      name: "rsvps",
      inputs: ["Generators","viewof rsvps"],
      value: (G, _) => G.input(_)
    },
    {
      name: "meat",
      inputs: ["pies"],
      value: (function(pies){return(
Math.floor(0.4 * pies) || 1
)})
    },
    {
      name: "vegan",
      inputs: ["pies"],
      value: (function(pies){return(
Math.floor(0.15 * pies) || 1
)})
    },
    {
      name: "veggie",
      inputs: ["pies"],
      value: (function(pies){return(
Math.floor(0.45 * pies) || 1
)})
    },
    {
      name: "pies",
      inputs: ["people"],
      value: (function(people){return(
Math.round(people * 2.5 / 8)
)})
    },
    {
      name: "people",
      inputs: ["rsvps"],
      value: (function(rsvps){return(
Math.round(rsvps * .65)
)})
    },
    {
      from: "@jashkenas/inputs",
      name: "slider",
      remote: "slider"
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## There’s only one kind of cell

Instead of Jupyter’s separate Markdown cells and code cells, all cells in Observable contain JavaScript code. The result of evaluating this code is rendered based on its type.

Values:`
)})
    },
    {
      value: (function(){return(
"hello world"
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Objects:`
)})
    },
    {
      value: (function(){return(
{
  a: 100,
  b: 200,
}
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`HTML DOM nodes:`
)})
    },
    {
      value: (function()
{
  const div = document.createElement('div')
  div.innerText = 'This is a DIV'
  div.style.border = 'solid 10px gray';
  div.style.textAlign = 'center';
  div.style.width = '200px';
  return div;
}
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Observable includes [standard library](https://observablehq.com/@observablehq/standard-library) functions that return DOM nodes, to make it easy to create rich documents with text and graphics.

Write HTML with the [\`html\`](https://github.com/observablehq/stdlib/blob/master/README.md#html) tagged template literal:`
)})
    },
    {
      inputs: ["html"],
      value: (function(html){return(
html`<div style="border: solid 10px gray; text-align: center; width: 200px;">This is a DIV</span>`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Write SVG with the [\`svg\`](https://github.com/observablehq/stdlib/blob/master/README.md#svg) tagged template literal:`
)})
    },
    {
      inputs: ["svg"],
      value: (function(svg){return(
svg`<svg width="30" height="30"><circle cx="15" cy="15" r="15" fill="blue"/></svg>`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Write markdown with the [\`md\`](https://github.com/observablehq/stdlib#markdown) tagged template literal:`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`> This ~~txet~~ *text* is rendered as markdown`
)})
    },
    {
      inputs: ["md","tex"],
      value: (function(md,tex){return(
md`Write ${tex`\LaTeX`} with the [\`tex\`](https://github.com/observablehq/stdlib#tex) tagged template literal:`
)})
    },
    {
      inputs: ["tex"],
      value: (function(tex){return(
tex`-b \pm \sqrt{b^2 - 4ac} \over 2a`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`If you’re familiar with the IPython [\`display()\`]() function, which renders content to the notebook based on its type, it might be helpful to imagine that the output shown above an Observable cell is the result of calling \`display()\` on the result of running the cell code.`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Notebooks live on the web

Observable notebooks are written, edited, shared, and published entirely on the web. This enables:

- **One-click sharing. ** Like remotely hosted Jupyter notebooks, Observable notebooks can be shared, either with the world by clicking “Publish” or more selectively by enabling link sharing in the **⋯** menu in the upper right. Viewers can try out their own changes, suggest those changes be made in the original, or fork the notebook to save their changes and go their own way with the code. Maybe they’ll substitute their own data!

- **Instant boot.** Unlike many hosted Jupyter notebooks platforms, there’s no waiting for the kernel and environment to initialize, e.g. waiting for a Docker container to spin up. Since notebooks run in the browser, viewers can immediately run them, interact with inputs, and try out changes to the code locally.

- **Download or embed.** If you’d rather share a visualization without showing code you can [embed a cell in another website](https://observablehq.com/@observablehq/downloading-and-embedding-notebooks) which doesn’t show the notebook editor UI. And similarly to exporting a Jupyter notebook as a .py file, you can download notebook code as a module to use from other JavaScript code.`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Code runs in your browser

Observable code running in your browser’s JavaScript engine is different from Jupyter code running in a separate kernel process: for instance, you can use your browser’s dev tools to debug your code.

- **Respond to user interaction in milliseconds.** Without a client–server roundtrip, notebooks can react very fast to code changes or interactive widget changes. Running a piece of code 60 times a second to make a smooth animation is very normal use case, as is recalculating a visualization based on a slider a user is whipping back and forth.

- **New web superpowers.** Use libraries like [D3](https://observablehq.com/@d3) and [browser APIs](https://developer.mozilla.org/en-US/docs/Web/API) like [WebGL](https://observablehq.com/collection/@observablehq/webgl) to build rich interactive experiences. Stream video, make HTTP calls to APIs, use multi-touch controls, play audio, use WebAssembly and more! Observable is a great platform for using JavaScript, HTML, CSS, and SVG without needing to setting up your editor, module bundler, compiler toolchain, etc.

- **What’s my process ID?** You can’t get the current process ID in Observable. You can’t directly open a TCP socket, you can’t access the filesystem, you can’t shell out to run a bash command, and you can’t dynamically load binaries. Sometimes this changes the way you write your notebooks. Syscalls your browser vendor didn’t intend for you to make are off-limits.

The browser sandbox lets you run notebook code you don’t trust, unlike a local Jupyter kernel (but similar to Jupyter in a Docker container or hosted environment like Binder). Your web browser is a hardened environment that runs hundreds of untrusted pieces of code before breakfast.`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## You can import cells from other notebooks

Although [workflows for reusing values from other Jupyter noteboks exist](https://jupyter-notebook.readthedocs.io/en/stable/examples/Notebook/Importing%20Notebooks.html), the idiomatic way to reuse code is to import functionality from factored-out modules or from packages installed from PyPI.

In Observable it’s common to use \`import\` to reuse functions and values from other notebooks, in addition to using \`require\` to pull in JavaScript packages from registries like npm and GitHub. Since these modules are pulled from the internet, there’s no separate installation step; just \`require\` the code you need.

Importing a module in Python means executing a module (a file), then assigning particular objects in that namespace to variables. This is fine in the normal case, when the other module is all function and class definitions, but notebooks often include code top-level code you wouldn’t necessarily want to run on import. Importing a cell from another Observable notebook only runs the cells needed to produce the imported value, e.g. you can import just a file attachment from another notebook and know that data processing and animations in the notebook are not running in the background. 

This notebook includes keyboard shortcuts that are different on Mac, so we import a helper utility that checks the viewer’s browser for OS so we can show “option” for Mac and “meta” for Windows and Linux:
`
)})
    },
    {
      from: "@mbostock/keys",
      name: "mac",
      remote: "mac"
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`That’s just a simple utility, but you can also import entire interactive visualizations. For example, there are [hundreds of D3 examples](https://observablehq.com/@d3/gallery) ready for you to import.`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`---

The combination of living on the web, reactive coding, and cell imports makes Observable a uniquely dynamic community of collaborative creative coders. Now you’re ready to import, analyze, and visualize a dataframe in Observable.`
)})
    },
    {
      inputs: ["html"],
      value: (function(html){return(
html`<a title="Analysis and Visualization in JavaScript" style="display: inline-flex; align-items: center; font: 600 14px var(--sans-serif);" href="/@observablehq/visualize-a-data-frame-with-observable-in-jupyter?collection=@observablehq/observable-for-jupyter-users">Next<svg width="8" height="16" fill="none" stroke-width="1.8" style="margin-left: 0.25em; padding-top: 0.25em;"><path d="M2.75 11.25L5.25 8.25L2.75 5.25" stroke="currentColor"></path></svg></a>`
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
  id: "@mbostock/keys",
  variables: [
    {
      name: "mac",
      value: (function(){return(
/Mac|iPhone/.test(navigator.platform)
)})
    }
  ]
};

const notebook = {
  id: "b00406054cfb4875@2691",
  modules: [m0,m1,m2]
};

export default notebook;
