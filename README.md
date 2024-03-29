# JS Notebook 📓 Inspector 🕵️

[![Build Status](https://api.travis-ci.com/RandomFractals/js-notebook-inspector.svg?branch=master)](https://github.com/RandomFractals/js-notebook-inspector)
[![Apache-2.0 License](https://img.shields.io/badge/license-Apache2-orange.svg?color=green)](http://opensource.org/licenses/Apache-2.0)
<a href='https://ko-fi.com/dataPixy' target='_blank' title='support: https://ko-fi.com/dataPixy'>
  <img height='24' style='border:0px;height:20px;' src='https://az743702.vo.msecnd.net/cdn/kofi3.png?v=2' alt='https://ko-fi.com/dataPixy' /></a>

[![Version](https://img.shields.io/visual-studio-marketplace/v/RandomFractalsInc.js-notebook-inspector.svg?color=orange&style=?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.js-notebook-inspector)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/RandomFractalsInc.js-notebook-inspector.svg?color=orange)](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.js-notebook-inspector)
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/RandomFractalsInc.js-notebook-inspector.svg?color=orange)](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.js-notebook-inspector)

[VSCode](https://code.visualstudio.com/) extension for Interactive Preview of [Observable](https://observablehq.com/explore) JS Notebooks 📚 & Notebook 📓 Nodes ⎇ & Cells ⌗ source code.

#### Example: [Observable Notebook 📓 Inspector 🕵️](https://observablehq.com/@randomfractals/notebook-info)

Illustration notebook with Inspect input and parameter to visualize another notebook 📓 cell ⌗ dependencies graph ⎇ ;)

![Notebook 📓 Inspector 🕵️](https://github.com/RandomFractals/js-notebook-inspector/blob/master/images/js-notebook-inspector.png?raw=true
 "JS Notebook 📓 Inspector 🕵️")

# Alpha v. Features

- 🕵️ Interactive Preview of JS Notebook 📓
- 📚 Tree View ⚼ panel with Starred/Favorite ⭐ Notebooks 📓
- 📥 Save Notebook 📓 as:
  * `html`/`js` [runtime](https://github.com/observablehq/runtime) webpage 📰 for adding to web sites || viewing locally in a browser 🌐
  * `.ojs` || `.omd` for local JS || markdown notebook 📓 editing & preview with [Observable JS](https://marketplace.visualstudio.com/items?itemName=GordonSmith.observable-js) vscode extension
  * `.js` [ES JS module](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/) || [`.nb.json {}`](https://github.com/RandomFractals/js-notebook-inspector/blob/master/notebooks/intro/hello-world.nb.json) document w/Author 👨 info & Nodes ⎇ w/Code Cells ⌗:

### Notebook 📓 JSON View

![Notebook 📓 JSON View](https://github.com/RandomFractals/js-notebook-inspector/blob/master/images/js-notebook-json.png?raw=true
 "Notebook 📓 JSON View")

### Favorite ⭐ Notebooks 📚 Tree View ⚼

![Favorite ⭐ Notebooks 📚 Tree View ⚼](https://github.com/RandomFractals/js-notebook-inspector/blob/master/images/js-notebook-favorite-tree-view.png?raw=true
 "Notebook 📓 JSON View")

### Interactive [DeckGL Heatmap 🗺️ Demo Notebook 📓](https://github.com/RandomFractals/js-notebook-inspector/tree/master/notebooks/deck.gl)

![Interactive Deck.GL Heatmap 🗺️ Demo Notebook 📓](https://github.com/RandomFractals/js-notebook-inspector/blob/master/images/js-notebook-deckgl-heatmap.png?raw=true
 "Interactive Deck.GL Heatmap 🗺️ Demo Notebook 📓 View")

### [D3.js Gallery Notebooks 📚](https://github.com/RandomFractals/js-notebook-inspector/tree/master/notebooks/d3)

![d3.js Gallery Notebooks 📚](https://github.com/RandomFractals/js-notebook-inspector/blob/master/images/js-notebook-d3-gallery.png?raw=true
 "d3.js Gallery Notebooks 📚")

# Planned Beta Features

- 📚 Tree View ⚼ panel with Popular Notebooks 📓, Collections ▒ & Notebook Authors 👨
- ⎇ Notebook Graph View with links to imported Cells ⌗
- ⌗ Cell Bookmarks 🔖

...

# Usage

- Run `JS Notebook: View Notebook from URL` (`ctrl/cmd+alt+o`) command from vscode View -> Command Palette ... to load Observable JS Notebook 📓

...

# Installation

Install [JS Notebook 📓 Inspector 🕵️](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.js-notebook-inspector) via vscode Extensions tab (`ctrl+shift+x`) by searching for `notebook`...

![Install JS Notebook 📓 Inspector 🕵️](https://github.com/RandomFractals/js-notebook-inspector/blob/master/images/js-notebook-inspector-info.png?raw=true
 "Install JS Notebook 📓 Inspector 🕵️")

# Recommended Extensions

Other recommended extensions for working with Interactive notebooks, data, charts, gists and geo data formats in [VSCode](https://code.visualstudio.com/):

| Extension | Description |
| --- | --- |
| [Observable JS](https://marketplace.visualstudio.com/items?itemName=GordonSmith.observable-js)| VS Code extension for Observable "JavaScript" and "Markdown" |
| [Data Preivew 🈸](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.vscode-data-preview) | Data Preview 🈸 extension for importing 📤 viewing 🔎 slicing 🔪 dicing 🎲 charting 📊 & exporting 📥 large JSON array/config, YAML, Apache Arrow, Avro & Excel data files |
| [GistPad 📘](https://marketplace.visualstudio.com/items?itemName=vsls-contrib.gistfs) | VS Code extension for managing and sharing code snippets, notes and interactive samples using GitHub Gists |
| [Geo Data Viewer 🗺️](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.geo-data-viewer) | Geo Data Viewer w/0 Py 🐍, pyWidgets ⚙️, pandas 🐼, or @reactjs ⚛️ required to gen. some snazzy maps 🗺️ with keplerGL ... |
| [Vega Viewer 📈](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.vscode-vega-viewer) | VSCode extension for Interactive Preview of Vega & Vega-Lite maps 🗺️ & graphs 📈 |

# Dev Log

See [#jsNotebook 📓 #inspector 🕵️ on Twitter](https://twitter.com/search?q=%23jsNotebook%20%23inspector&src=typed_query&f=live) for the latest & greatest updates on this vscode extension & what's in store next.

# Dev Build

```bash
$ git clone https://github.com/RandomFractals/js-notebook-inspector
$ cd js-notebook-inspector
$ npm install
$ code .
```
`F5` to launch JS Notebook 📓 Inspector 🕵️ extension VSCode debug session.

# Contributions

Any & all test, code || feedback contributions are welcome.

Open an issue || create a pull request to make this JS Notebook 📓 Inspector 🕵️ vscode extension work better for all. 🤗
