// URL: https://observablehq.com/@mbostock/introduction
// Title: Hello and Welcome!
// Author: Mike Bostock (@mbostock)
// Version: 1128
// Runtime version: 1

const m0 = {
  id: "ba25d9b036545f3e@1128",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Hello and Welcome!

This interactive, editable document introduces you to Observable notebooks. You can edit any code you see: type Shift-Return to run your changes! (Your changes aren’t be saved, so if something goes horribly wrong, just reload.)`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Notebooks are comprised of cells.

A notebook is a list of *cells*, and each cell is defined by a snippet of JavaScript. The runtime evaluates these snippets and displays their values.

This cell—the one you are currently reading—is defined as a Markdown string. The Markdown is parsed by a JavaScript library, [marked](https://github.com/chjj/marked), to generate the corresponding HTML DOM elements, which are then inserted into the page. You can see the code for this cell by clicking on the caret <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"><polyline points="10 18 16 12 10 6"></polyline></svg> in the left margin.

Markdown cells are common for prose, but you can also compute and display arbitrary JavaScript values. For example, here we compute the answer to the ultimate question of life, the universe, and everything:`
)})
    },
    {
      name: "answer",
      value: (function(){return(
2 * 3 * 7
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`As you might expect, you can inspect nested data structures here just as you can in your browser’s developer console. The inspected value below is initially collapsed (\`▸\`); click on it to expand (\`▾\`):`
)})
    },
    {
      value: (function(){return(
{"subjects": ["life", "the universe", "everything"]}
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`The object literal above is wrapped in parens \`({…})\` to distinguish it from a block statement \`{…}\`. Block statements are used for complex cell definitions when a simple expression isn’t sufficient. (Cell definitions are similar to the bodies of [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).) A block statement typically has one or more \`return\` statements. For example, here is a \`for\` loop to compute the sum of the integers 1 to 10:`
)})
    },
    {
      value: (function()
{
  let sum = 0;
  for (let i = 1; i <= 10; ++i) sum += i;
  return sum;
}
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`If you forget to \`return\`, just as with a normal function, the value of the cell is \`undefined\`. It can sometimes be useful to define cells that only have side-effects (where you don’t care about the return value), but this technique should be used with care.`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Cells are tiny programs.

In conventional code editors, we edit large text files that are compiled or interpreted into complex programs; a single typo can cause the whole program not to run due to invalid syntax. These notebooks work a bit differently: each cell is parsed individually, so one broken cell does not prevent other cells from running.`
)})
    },
    {
      value: throw new SyntaxError("Unexpected end of input (1:27)")
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Since the content of each cell is edited individually, a notebook is more akin to a spreadsheet than a conventional program. If you edit a cell and Command-A to select all, for example, it just selects the text of the current cell rather than the entire notebook. (In the future, the editor will also support bulk operations on cells, such as moving, deleting, and copy-paste.)

You can split the current cell by typing Option-Return. You can move the current cell up or down using Option-Command-Up and Option-Command-Down, respectively. For more keyboard shortcuts, see the [Editor Cheatsheet](https://d3.express/@mbostock/editor-cheatsheet).`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Cells can generate DOM.

When a cell evaluates to a DOM element, the element is displayed directly, rather than using the inspector. For example, you can create DOM using the standard W3C API:`
)})
    },
    {
      value: (function(){return(
document.createTextNode("Hello, I am text!")
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Or using the \`html\` built-in:`
)})
    },
    {
      inputs: ["html"],
      value: (function(html){return(
html`Hello, I am <i>italicized</i>!`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Or the \`md\` built-in:`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Hello, I am *Markdown*!`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`You can likewise generate SVG:`
)})
    },
    {
      inputs: ["html"],
      value: (function(html){return(
html`<svg width=50 height=50>
  <circle cx=25 cy=25 r=20 fill=red></circle>
</svg>`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`And even canvas!`
)})
    },
    {
      value: (function()
{
  const canvas = document.createElement("canvas");
  canvas.width = 50;
  canvas.height = 50;
  const context = canvas.getContext("2d");
  context.arc(25, 25, 20, 0, 2 * Math.PI);
  context.fillStyle = "blue";
  context.fill();
  return canvas;
}
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Because DOM elements are displayed natively by the browser, there’s no overhead or limitation on the content you can generate from a cell. If you want to, you can put your entire program into a single cell; this makes editing a notebook similar to a live-reload editor such as JSFiddle or CodePen. But, if you break your code up into separate cells, it’s easier to observe the state of your program as it runs and to implement dynamic, animated and interactive elements.`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Cells can have names.

In addition to *values*, cells can have *names*. Names allow you to refer to the current value of a cell from another cell, and so to compose more complex programs from cells. For example these two cells define \`x\` and \`y\`:`
)})
    },
    {
      name: "x",
      value: (function(){return(
2
)})
    },
    {
      name: "y",
      value: (function(){return(
3
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Now this cell can compute the sum \`x + y\`:`
)})
    },
    {
      inputs: ["x","y"],
      value: (function(x,y){return(
x + y
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Try editing the definition of \`x\` or \`y\` above. When you Shift-Return to commit your edit, notice that the sum updates automatically.

A cell’s references are determined by static analysis: the code is parsed by the editor to find out-of-scope identifiers. Normal JavaScript scope rules apply, so an in-scope identifier can mask one that is out-of-scope. In the following cell, \`x\` refers to a local variable rather than the cell above:`
)})
    },
    {
      value: (function()
{
  const x = 1337; // This defines a local x, masking the cell above.
  return x;
}
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Cells can be defined in any order: you don’t have to define a cell before you reference it. (This is similar to [hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting) in JavaScript.) So you can compute \`z * z\` here, before:`
)})
    },
    {
      inputs: ["z"],
      value: (function(z){return(
z * z
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Even though \`z\` is defined here, after:`
)})
    },
    {
      name: "z",
      value: (function(){return(
8
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`A consequence of order-independent evaluation is that names must be unique. Giving the same name to multiple cells will prevent those cells (and any cell that references that name) from being evaluated.`
)})
    },
    {
      name: "doop",
      value: (function(){return(
1
)})
    },
    {
      name: "doop",
      value: (function(){return(
2
)})
    },
    {
      inputs: ["doop"],
      value: (function(doop){return(
doop + 1
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Likewise, you must avoid circular references in cells. Cycles can’t be evaluated:`
)})
    },
    {
      name: "a",
      inputs: ["b"],
      value: (function(b){return(
b + 1
)})
    },
    {
      name: "b",
      inputs: ["a"],
      value: (function(a){return(
a + 1
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`While not yet implemented, we’d like to surface some of this program structure in the editor to aid understanding. For example, we’re considering ways to visualize the directed acyclic graph of cell references, and to use syntax highlighting to link references with their definition and *vice versa*.

<img src="https://cdn-images-1.medium.com/max/1600/1*0rfP-Zz3Liz5aDa9IMjAxg.png" style="width:100%;">`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Cells are reactive functions.

When a cell references other cells, the *referencing* cell is re-evaluated automatically whenever the *referenced* cells’ values change. This is more powerful than re-evaluating cells from the top-down; it means that any cell can instantly react to changes, whether they be edits to the code, user interaction, scripted animation, or even streaming data.

However, this is still “just JavaScript”—an imperative language—and not pure functional reactive programming. Thus, you should avoid side-effects in cell definitions, such as mutating an object defined by another cell. The value of a cell should ideally depend only on its code and the cells it references. This makes it easier to reason about the value of a cell because the logic is limited to the cell itself rather than sprinkled throughout the notebook.

Think of each cell as a function. For example, the cell definition \`k = x / y\` is translated into a function that takes \`x\` and \`y\` as input, and returns the value \`k\`:`
)})
    },
    {
      name: "k",
      value: (function(){return(
function k(x, y) {
  return x / y;
}
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`The runtime calls these functions automatically whenever their inputs change. As long as each function is *pure*, the program is deterministic. So, you *can* use side-effects, but your code will be more readable if you stick to pure functions.`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Cells can be promises.

JavaScript is often asynchronous—for example, when loading third-party libraries or datasets, or when communicating with an external host. To reduce the complexity of asynchronous code, notebooks have first-class support for [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise): when a cell evaluates to a promise, the *value* of the promise is exposed to referencing cells when the promise is resolved.

For example, this promise is defined using a simple timeout, such that its value is available three seconds after the page loads:`
)})
    },
    {
      name: "message",
      value: (function(){return(
new Promise(resolve => {
  setTimeout(() => {
    resolve("I am asynchronous!");
  }, 3000);
})
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`But in other cells, we can reference the \`message\` without caring that it is defined asynchronously:`
)})
    },
    {
      inputs: ["message"],
      value: (function(message){return(
message.toUpperCase()
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`(This is similar to having an implicit \`await\` whenever you reference the value of another cell. However, unlike \`await\`, a cell is not evaluated until *all* of the values it references have been resolved—the awaited values are thus computed in parallel rather than in series.)`
)})
    },
    {
      inputs: ["md","miserables"],
      value: (function(md,miserables){return(
md`Here’s a slightly more complex example using the Fetch API. It involves two promises: one that yields a Response, and a second that yields the response body. The yielded value is the *Les Misérables* graph dataset, containing ${miserables.nodes.length} nodes and ${miserables.links.length} links.`
)})
    },
    {
      name: "miserables",
      value: (async function()
{
  const response = await fetch("https://gist.githubusercontent.com"
      + "/mbostock/4062045"
      + "/raw/94d1b56d1e6c0d4bcc1edd86a41385a14ed4c1b3"
      + "/miserables.json");
  return response.json();
}
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Even though \`miserables\` is defined asynchronously, I can reference it statically in other cells. This reduces the complexity of dynamic programs: you can reference a value without caring how the value is defined. You can switch between hard-coded values, values fetched from a remote server, values driven by a graphical user interface, or dynamically-computed values, all without affecting downstream code.`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Cells can be generators.

Promises are useful when you have a constant value that must be resolved asynchronously. But what if you have a value that changes over time, like the temperature outside or a stock price? Enter [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators), which define a potentially-infinite sequence of values. For example, here’s a standard JavaScript generator function that returns a generator that yields numbers from [0, 1, 2 … *n* - 1]:`
)})
    },
    {
      name: "range",
      value: (function(){return(
function* range(n) {
  for (let i = 0; i < n; ++i) {
    yield i;
  }
}
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Calling this function returns a generator, and the notebook displays the values of the generator in animated sequence:`
)})
    },
    {
      inputs: ["button","range"],
      value: (function(button,range){return(
button, range(100)
)})
    },
    {
      name: "viewof button",
      inputs: ["html"],
      value: (function(html){return(
html`<button>Restart</button>`
)})
    },
    {
      name: "button",
      inputs: ["Generators","viewof button"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`The value above most likely reads \`99\` because this is the last value yielded by the generator. If you focus the code for the cell above and hit Shift-Return, you’ll see it quickly cycle through the numbers again. Or hit the restart button.

You can define a cell as a generator using \`yield\` statements. For example:`
)})
    },
    {
      value: (function*()
{
  for (let i = 0; i < 100; ++i) {
    yield i;
  }
}
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`(Be careful to avoid infinite loops without \`yield\`. An infinite loop that yields is fine—the loop will iterate up to sixty times a second; an infinite loop that doesn’t yield will hang the browser, and you’ll need to reload the page. The user experience around hangs might improve if browser vendors implement [OOPIFs](https://www.chromium.org/developers/design-documents/oop-iframes).)

Combining promises with generators enables *asynchronous* iteration. Normally the runtime will pull a new value off a generator at sixty times a second; however, if a generator yields a promise, the next value won’t be pulled until the promise resolves. For example, here’s a counter that increments only about once per second:`
)})
    },
    {
      name: "seconds",
      value: (function*()
{
  let i = -1;
  while (true) {
    yield new Promise(resolve => {
      setTimeout(() => {
        resolve(++i);
      }, 1000);
    });
  }
}
)
    },
    {
      inputs: ["md","seconds"],
      value: (function(md,seconds){return(
md`(Did you know you’ve been reading this notebook for ${seconds} seconds? Well, now you do.) There’s also a builtin \`Promises\` object for common promise implementations. For example, the above can be rewritten like so:`
)})
    },
    {
      inputs: ["Promises"],
      value: (function*(Promises)
{
  let i = -1;
  while (true) {
    yield Promises.delay(1000, ++i);
  }
}
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Implementing user interfaces with generators.

A powerful application of asynchronous generators is to represent the state of a user interface: for example, a range input (a slider) can be represented as an asynchronous sequence of values where a new value is yielded whenever the slider is moved.

However, a challenge in implementing these generators is that DOM events are *push*-based: elements emit events whenever they like. Generators in contrast are *pull*-based: the runtime demands the next value in the sequence from the generator. Fortunately we can easily adapt push-based emitters (or “observables”) to pull-based generators using the built-in Generators.observe.

Here’s a counter using an interval:`
)})
    },
    {
      inputs: ["Generators"],
      value: (function(Generators){return(
Generators.observe(change => {
  let i = -1;
  let interval = setInterval(() => change(++i), 1000);
  return () => clearInterval(interval);
})
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Similarly, here’s a range input followed by a generator observing its value:`
)})
    },
    {
      name: "input",
      inputs: ["html"],
      value: (function(html){return(
html`<input type=range>`
)})
    },
    {
      inputs: ["Generators","input"],
      value: (function(Generators,input){return(
Generators.observe(change => {
  const listener = () => change(input.valueAsNumber);
  input.addEventListener("input", listener);
  change(input.valueAsNumber); // Report the initial value.
  return () => input.removeEventListener("input", listener);
})
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Since observing input elements is so common, there’s a built-in Generators.input that is a generalization of the above pattern. It works with a variety of input types, including drop-down menus, textareas, checkboxes and buttons. You can also use it on arbitrary DOM elements by dispatching custom events. For example, here’s a slider that shows its current value directly:`
)})
    },
    {
      name: "hue",
      inputs: ["html"],
      value: (function(html)
{
  const form = html`<form><table>
  <tr><td>
    <input name=in type=range min=0 max=359 value=180 step=1>
    <output name=out></output>° hue
  </td></tr>
</form>`;
  form.oninput = () => form.value = form.out.value = +form.in.value;
  form.oninput(); // Set the initial value.
  return form;
}
)
    },
    {
      inputs: ["Generators","hue"],
      value: (function(Generators,hue){return(
Generators.input(hue)
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Custom inputs can yield arbitrary values too—not just strings and numbers. For example, a histogram chart might allow brushing, where the brushed data is then exposed to other cells to drive coordinated views. Go nuts!

In the above examples, separate cells are used to define the user interface (such as a slider) and the corresponding value that is exposed to the notebook. Since this is such a common need, the \`viewof\` operator provides convenient syntax for simultaneously defining both the user and programming interface of a cell. It is simply shorthand for Generators.input.`
)})
    },
    {
      name: "viewof foo",
      inputs: ["html"],
      value: (function(html){return(
html`<input type=range min=0 max=1 step=any>`
)})
    },
    {
      name: "foo",
      inputs: ["Generators","viewof foo"],
      value: (G, _) => G.input(_)
    },
    {
      inputs: ["foo"],
      value: (function(foo){return(
foo
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`If needed, you can reference the user interface from another cell as \`viewof foo\`. For example:`
)})
    },
    {
      inputs: ["viewof foo"],
      value: (function($0){return(
($0).tagName
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`## Notebooks can import other notebooks.

TODO \`import\` syntax.

TODO \`import {…} with\` syntax.`
)})
    }
  ]
};

const notebook = {
  id: "ba25d9b036545f3e@1128",
  modules: [m0]
};

export default notebook;
