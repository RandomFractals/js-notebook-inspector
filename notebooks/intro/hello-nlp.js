// URL: https://observablehq.com/@randomfractals/hello-nlp
// Title: Hello, NLP!
// Author: Taras Novak (@randomfractals)
// Version: 607
// Runtime version: 1

const m0 = {
  id: "c2ff228e09d0a4ae@607",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md `# Hello, NLP!

Visualizing music lyrics with http://compromise.cool natural language processing (NLP) library
and [#other dataViz libs](https://beta.observablehq.com/@randomfractals/hello-nlp#imports)
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Mac Miller - [Self Care (video)](https://www.youtube.com/watch?v=SsKT0s5J8ko)`
)})
    },
    {
      name: "wordCloud",
      inputs: ["createWordCloudSvg","words"],
      value: (function(createWordCloudSvg,words){return(
createWordCloudSvg(words)
)})
    },
    {
      name: "downloadWordCloud",
      inputs: ["downloadWordCloudSvg","wordCloud"],
      value: (function(downloadWordCloudSvg,wordCloud){return(
downloadWordCloudSvg('word-cloud', wordCloud)
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Lyrics`
)})
    },
    {
      name: "lyrics",
      value: (function(){return(
`
Yeah, yeah, yeah, yeah
Yeah, yeah, yeah

I switched the time zone, but what do I know?
Spending nights hitchhikin', where will I go?
I could fly home with my eyes closed
But it be kinda hard to see, that's no surprise though
You can find me, I ain't hiding
I don't move my feet when I be gliding
I just slide in and then I roll out

Yeah, well, climbing over that wall
I remember, yes, I remember, yes, I remember it all
Swear the height be too tall so like September I fall
Down below, now I know that the medicine be on call, yeah
It's feeling like you hot enough to melt, yeah
Can't trust no one, can't even trust yourself yeah
And I love you, I don't love nobody else, yeah
Tell them they can take that bullshit elsewhere
Self care, I'm treatin' me right
Hell yea, we're gonna be alright
(We gon' be alright)

I switched the time zone, but what do I know?
Spending nights hitchhikin', where will I go?
I could fly home with my eyes closed
But it be kinda hard to see, that's no surprise though
You can find me, I ain't hiding
I don't move my feet when I be gliding
I just slide in and then I roll out

Been on the road
I don't see it
Out on the road
I don't see it

Yeah, I been reading them signs
I been losin' my, I been losin' my, I been losin' my mind, yeah
Get the fuck out the way, must be this high to play
It must be nice up above the lights, and what a lovely life that I made
I know that feelin' like it's in my family tree, yeah
That Mercedes drove me crazy, I was speedin'
Somebody save me from myself, yeah
Tell them they can take that bullshit elsewhere
Self care, we gonna be good
Hell yeah, they lettin' me go

I switched the time zone, but what do I know?
Spending nights hitchhikin', where will I go?
I could fly home with my eyes closed
But it be kinda hard to see, that's no surprise though
You can find me, I ain't hiding
I don't move my feet when I be gliding
I just slide in and then I roll out

And I didn't know, I didn't know
I didn't know, I didn't know, hey
Well, didn't know what I was missing, now it see a lil' different
I was thinking too much
Got stuck in oblivion, yeah, yeah
Oblivion, yeah, yeah
Oblivion, yeah, yeah
I got all the time in the world so for now, I'm just chilling
Plus I know it's a, it's a beautiful feeling
In oblivion, yeah, yeah
Oblivion, yeah, yeah
Oblivion, yeah, yeah
Yeah, ok I ride around my city when I come home
The sun set quickly then get up slow
My disc connect and upload
Watch it spin around, we just spinnin' round
Let's go and travel through the unknown
We play it cool we know we fucked up, yeah
You keep on sayin' you in love, so
Tell me are you really down?
Are you really down? Yeah
Let's go back to my crib and play some 45's
It's safer there, I know there's still a war outside
We spend our nights all liquored up, our mornings high
Can you feel it now?

Oblivion, yeah, yeah
Oblivion, yeah, yeah, yeah, yeah, yeah, yeah, yeah, yeah
Oblivion, yeah, yeah
I got all the time in the world, so for now I'm just chilling
Plus, I know it's a
It's a beautiful feeling
In oblivion, yeah, yeah
Oblivion yeah, yeah
Oblivion, yeah, yeah
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Tagged NLP Lyrics`
)})
    },
    {
      name: "normalizedLyrics",
      inputs: ["html","printHtml","normalizedDoc"],
      value: (function(html,printHtml,normalizedDoc){return(
html `<div class="scrollable-container">
${printHtml(normalizedDoc)}
</div>`
)})
    },
    {
      inputs: ["tagLegends"],
      value: (function(tagLegends){return(
tagLegends
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Lingo Parts`
)})
    },
    {
      name: "lingoTree",
      inputs: ["createTagTreeSvg","tagTree"],
      value: (function(createTagTreeSvg,tagTree){return(
createTagTreeSvg(tagTree)
)})
    },
    {
      name: "downloadLingoTree",
      inputs: ["downloadTagTreeSvg","lingoTree"],
      value: (function(downloadTagTreeSvg,lingoTree){return(
downloadTagTreeSvg('lingo-tree', lingoTree)
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Boring Code Parts`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `### Word Cloud`
)})
    },
    {
      name: "words",
      inputs: ["toWords","nounsInfo","verbsInfo","adverbsInfo","adjectivesInfo"],
      value: (function(toWords,nounsInfo,verbsInfo,adverbsInfo,adjectivesInfo){return(
toWords(nounsInfo)
  .concat(toWords(verbsInfo))
  .concat(toWords(adverbsInfo))
  .concat(toWords(adjectivesInfo))
  .sort((a,b) => b.freq - a.freq)
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## NLP`
)})
    },
    {
      name: "doc",
      inputs: ["nlp","lyrics"],
      value: (function(nlp,lyrics){return(
nlp(lyrics)
)})
    },
    {
      name: "normalizedDoc",
      inputs: ["nlp","lyrics"],
      value: (function(nlp,lyrics){return(
nlp(lyrics).normalize({
  whitespace: true, // remove hyphens, newlines, and force one space between words
  punctuation: true, // remove commas, semicolons - but keep sentence-ending punctuation
  case: true, // keep only first-word, and 'entity' titlecasing
  numbers: true, // 'one'  →  '1'
  plurals: true, // 'eyes'  →  'eye'  
  verbs: true, // 'swtiched' → 'switch'
})
)})
    },
    {
      name: "sentences",
      inputs: ["doc"],
      value: (function(doc){return(
doc.sentences().data()
)})
    },
    {
      name: "terms",
      inputs: ["doc"],
      value: (function(doc){return(
doc.terms().data()
)})
    },
    {
      name: "ngrams",
      inputs: ["doc"],
      value: (function(doc){return(
doc.ngrams().data()
)})
    },
    {
      name: "contractions",
      inputs: ["doc"],
      value: (function(doc){return(
doc.contractions().data()
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `### Tags`
)})
    },
    {
      inputs: ["tagTypes"],
      value: (function(tagTypes){return(
tagTypes
)})
    },
    {
      inputs: ["tagColors"],
      value: (function(tagColors){return(
tagColors
)})
    },
    {
      name: "tags",
      inputs: ["doc"],
      value: (function(doc){return(
doc.out('tags')
)})
    },
    {
      name: "uniqueTags",
      inputs: ["getUniqueTags","tags"],
      value: (function(getUniqueTags,tags){return(
getUniqueTags(tags)
)})
    },
    {
      name: "tagTree",
      inputs: ["createTagTree","uniqueTags"],
      value: (function(createTagTree,uniqueTags){return(
createTagTree(uniqueTags)
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `### Adjectives`
)})
    },
    {
      name: "adjectives",
      inputs: ["doc"],
      value: (function(doc){return(
doc.adjectives().data()
)})
    },
    {
      name: "adjectivesInfo",
      inputs: ["doc"],
      value: (function(doc){return(
doc.adjectives().out('topk')
)})
    },
    {
      name: "adjectiveList",
      inputs: ["toShortList","printList","adjectivesInfo"],
      value: (function(toShortList,printList,adjectivesInfo){return(
toShortList(printList(adjectivesInfo))
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `### Adverbs`
)})
    },
    {
      name: "adverbs",
      inputs: ["doc"],
      value: (function(doc){return(
doc.adverbs().data()
)})
    },
    {
      name: "adverbsInfo",
      inputs: ["doc"],
      value: (function(doc){return(
doc.adverbs().out('topk')
)})
    },
    {
      name: "adverbList",
      inputs: ["toShortList","printList","adverbsInfo"],
      value: (function(toShortList,printList,adverbsInfo){return(
toShortList(printList(adverbsInfo))
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `### Nouns`
)})
    },
    {
      name: "nouns",
      inputs: ["doc"],
      value: (function(doc){return(
doc.nouns().out('array')
)})
    },
    {
      name: "nounsInfo",
      inputs: ["normalizedDoc"],
      value: (function(normalizedDoc){return(
normalizedDoc.nouns().out('topk')
)})
    },
    {
      name: "nounList",
      inputs: ["toShortList","printList","nounsInfo"],
      value: (function(toShortList,printList,nounsInfo){return(
toShortList(printList(nounsInfo))
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `### Verbs`
)})
    },
    {
      name: "verbs",
      inputs: ["doc"],
      value: (function(doc){return(
doc.verbs().out('array')
)})
    },
    {
      name: "verbsInfo",
      inputs: ["normalizedDoc"],
      value: (function(normalizedDoc){return(
normalizedDoc.verbs().out('topk')
)})
    },
    {
      name: "verbList",
      inputs: ["toShortList","printList","verbsInfo"],
      value: (function(toShortList,printList,verbsInfo){return(
toShortList(printList(verbsInfo))
)})
    },
    {
      name: "toShortList",
      inputs: ["html"],
      value: (function(html){return(
function toShortList(list) {
  return html `<div class="scrollable-container short-list">${list}</div>`;
}
)})
    },
    {
      name: "imports",
      inputs: ["md"],
      value: (function(md){return(
md `## Imports`
)})
    },
    {
      name: "nlp",
      inputs: ["require"],
      value: (function(require){return(
require('compromise@11.14.3')
)})
    },
    {
      from: "@spencermountain/nlp-compromise",
      name: "printList",
      remote: "printList"
    },
    {
      from: "@spencermountain/nlp-compromise",
      name: "printHtml",
      remote: "printHtml"
    },
    {
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require('d3')
)})
    },
    {
      name: "d3cloud",
      inputs: ["require"],
      value: (function(require){return(
require('d3-cloud')
)})
    },
    {
      from: "@randomfractals/nlp-word-cloud",
      name: "createWordCloudSvg",
      remote: "createWordCloudSvg"
    },
    {
      from: "@randomfractals/nlp-word-cloud",
      name: "downloadWordCloudSvg",
      remote: "downloadWordCloudSvg"
    },
    {
      from: "@randomfractals/nlp-word-cloud",
      name: "toWords",
      remote: "toWords"
    },
    {
      from: "@randomfractals/nlp-text-tags",
      name: "tagLegends",
      remote: "tagLegends"
    },
    {
      from: "@randomfractals/nlp-text-tags",
      name: "tagTypes",
      remote: "tagTypes"
    },
    {
      from: "@randomfractals/nlp-text-tags",
      name: "tagColors",
      remote: "tagColors"
    },
    {
      from: "@randomfractals/nlp-tag-tree",
      name: "createTagTreeSvg",
      remote: "createTagTreeSvg"
    },
    {
      from: "@randomfractals/nlp-tag-tree",
      name: "downloadTagTreeSvg",
      remote: "downloadTagTreeSvg"
    },
    {
      from: "@randomfractals/nlp-tag-tree",
      name: "getUniqueTags",
      remote: "getUniqueTags"
    },
    {
      from: "@randomfractals/nlp-tag-tree",
      name: "createTagTree",
      remote: "createTagTree"
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## Styles`
)})
    },
    {
      inputs: ["html"],
      value: (function(html){return(
html `
<link href="https://fonts.googleapis.com/css?family=Pacifico|Corben" rel="stylesheet">
<p style="font-family:Pacifico;">Pacifico</p>
<p style="font-family:Corben;">Corben</p>
`
)})
    },
    {
      name: "nlpStyles",
      inputs: ["html"],
      value: (function(html){return(
html `
<style>
.scrollable-container {
  max-height: 400px;
  overflow: auto;
}
.short-list {
  max-height: 200px;
}
.big{
  font-size:1.5rem;
  color:cornflowerblue;
}
.small{
  color:grey;
  margin-top:30px;
}
.term { color:grey; cursor:pointer;}
.nl-Person { border-bottom:2px solid #6393b9; }
.nl-Pronoun { border-bottom:2px solid #81acce; }
.nl-Plural { border-bottom:2px solid steelblue; }
.nl-Singular { border-bottom:2px solid lightsteelblue; }
.nl-Verb { border-bottom:2px solid palevioletred; }
.nl-Adverb { border-bottom:2px solid #f39c73; }
.nl-Adjective { border-bottom:2px solid #b3d3c6; }
.nl-Determiner { border-bottom:2px solid #d3c0b3; }
.nl-Preposition { border-bottom:2px solid #9794a8; }
.nl-Conjunction { border-bottom:2px solid #c8c9cf; }
.nl-Value { border-bottom:2px solid palegoldenrod; }
.nl-QuestionWord { border-bottom:2px solid lavender; }
.nl-Acronym { border-bottom:2px solid violet; }
.nl-Possessive { border-bottom:2px solid #7990d6; }
.nl-Noun { border-bottom:2px solid #7990d6; }
.nl-Expression { border-bottom:2px solid #b3d3c6; }
.nl-Negative { border-bottom:2px solid #b4adad; }
</style>
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md `## References

- [Compromise NLP Ingro](https://beta.observablehq.com/@spencermountain/nlp-compromise)
- [Compromise NLP Normalize](https://beta.observablehq.com/@spencermountain/compromise-normalization)
- [d3 Word Cloud Layout](https://github.com/jasondavies/d3-cloud)
- [d3 Tidy Tree](https://beta.observablehq.com/@mbostock/d3-tidy-tree)
`
)})
    }
  ]
};

const m1 = {
  id: "@spencermountain/nlp-compromise",
  variables: [
    {
      name: "printList",
      value: (function()
{ 
  const max = 35
  return (list) => {
     let len=list.length
     list=list.slice(0, max)
     let el = document.createElement("table");
     el.innerHTML = list.reduce((str, o)=>{
       str += '<tr>'
       str += `<td style="color:#46468B;">${o.normal || o.text || ''}</td>`
       str += `<td style="color:#7A7A8B;">${o.count || ''}</td>`
       //str += `<td style="color:#B7B7D1;">${o.percent+ '%'}</td>`
        str += '</tr>'
       return str
     },'')
     if(len>list.length){
       el.innerHTML+='<b>(of '+len+' results)<b>'
     }
     return el
   } 
}
)
    },
    {
      name: "printHtml",
      inputs: ["DOM"],
      value: (function(DOM){return(
function printHtml(doc){
  let el = DOM.element()
  let html = doc.out('html')
  el.innerHTML = html
  //add a hover 'title'
  let sentences= el.children[0].children
  for (var i = 0; i < sentences.length; i++) {
    sentences[i].style='display:block;'
    for (var o = 0; o < sentences[i].children.length; o++) {
      let e=sentences[i].children[o]
      var tags = e.getAttribute('class').split(' ').map(c=>c.replace(/^nl-/,' '))
      e.classList.add('term')
      e.setAttribute('title', tags)
    }
  }
  return el
}
)})
    }
  ]
};

const m2 = {
  id: "@randomfractals/nlp-word-cloud",
  variables: [
    {
      name: "createWordCloudSvg",
      inputs: ["d3cloud","width","cloudConfig","cloudScale","rotateWord","baseFont","fontSize","DOM","d3","wordColors"],
      value: (function(d3cloud,width,cloudConfig,cloudScale,rotateWord,baseFont,fontSize,DOM,d3,wordColors){return(
function createWordCloudSvg(words) {
  var layout = d3cloud()
    .size([width, width * 9/16]) 
    .words(words)
    .padding(cloudConfig.padding * cloudScale)
    .rotate(rotateWord)
    .font(baseFont)
    .fontSize(fontSize)
    .on('word', addWord);

  const svg = DOM.svg(layout.size()[0], layout.size()[1]); // width, height
  const group = d3.select(svg).append('g')
    //.attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
  
  function addWord (word) {
    const text = group.append('text');
    text.style('font-size', '2px')
      .style('font-family', word.font)
      .style('fill', wordColors(Math.random()))
      .style('cursor', 'pointer')
      .attr('text-anchor', 'middle')
      .attr('transform', `translate(${[word.x, word.y]})rotate(${word.rotate})`)
      .text(word.text)
      //.transition()
      //.duration(1500)
      //.ease(d3.easeLinear)
      .style('font-size', `${word.size}px`);
    text.append('title').text(`${word.text} (${word.count})`); // toolitp
  }
  
  layout.start();
  return svg;
}
)})
    },
    {
      name: "downloadWordCloudSvg",
      inputs: ["html","DOM","serialize"],
      value: (function(html,DOM,serialize){return(
function downloadWordCloudSvg(fileName, svg) {
  return html `${DOM.download(serialize(svg), `${fileName}.svg`, "Save SVG")}`;
}
)})
    },
    {
      name: "toWords",
      value: (function(){return(
function toWords (terms) {
  return terms.map(term => ({
    text: term.normal,
    count: term.count,
    freq: term.percent/100
  }));
}
)})
    },
    {
      name: "d3cloud",
      inputs: ["require"],
      value: (function(require){return(
require('d3-cloud')
)})
    },
    {
      name: "cloudConfig",
      inputs: ["width"],
      value: (function(width){return(
{
  minFontSize: 10,
  maxFontSize: 80,
  height: width/2,
  padding: 1,
}
)})
    },
    {
      inputs: ["mutable cloudScale"]
    },
    {
      name: "rotateWord",
      value: (function(){return(
function () { 
  return ~~(Math.random() * 4) * 45 - 45; 
}
)})
    },
    {
      name: "baseFont",
      inputs: ["fontFamilies"],
      value: (function(fontFamilies){return(
function (d) {
  return fontFamilies[~~(Math.random() * fontFamilies.length)]
}
)})
    },
    {
      name: "fontSize",
      inputs: ["frequencyToSize","words","cloudConfig","width","mutable cloudScale"],
      value: (function(frequencyToSize,words,cloudConfig,width,$0)
{
  let totalArea = 0;
  let minSize = frequencyToSize(words[words.length-1].freq);
  let maxSize = frequencyToSize(words[0].freq);
  for (let w of words) {
    let size = frequencyToSize(w.freq);
    let fontSize = cloudConfig.minFontSize + 
      (cloudConfig.maxFontSize - cloudConfig.minFontSize) * ((size-minSize) / (maxSize-minSize));
    totalArea += (w.text.length * 0.6 + cloudConfig.padding * 2) * fontSize * (fontSize + cloudConfig.padding * 2);
  }
  let s = Math.sqrt(width * cloudConfig.height/totalArea);
  $0.value = s;
  return function (w) {
    return s * (cloudConfig.minFontSize + 
        (cloudConfig.maxFontSize - cloudConfig.minFontSize) * ((frequencyToSize(w.freq) - minSize) / (maxSize - minSize))
      );
  }
}
)
    },
    {
      name: "d3",
      inputs: ["require"],
      value: (function(require){return(
require('d3')
)})
    },
    {
      name: "wordColors",
      inputs: ["d3"],
      value: (function(d3){return(
d3.scaleSequential(d3.interpolateRainbow)
)})
    },
    {
      from: "@mbostock/saving-svg",
      name: "serialize",
      remote: "serialize"
    },
    {
      name: "initial cloudScale",
      value: (function(){return(
1
)})
    },
    {
      name: "mutable cloudScale",
      inputs: ["Mutable","initial cloudScale"],
      value: (M, _) => new M(_)
    },
    {
      name: "cloudScale",
      inputs: ["mutable cloudScale"],
      value: _ => _.generator
    },
    {
      name: "fontFamilies",
      value: (function(){return(
['Corben', 'Pacifico', 'impact']
)})
    },
    {
      name: "frequencyToSize",
      value: (function(){return(
function (frequency) {
  return Math.sqrt(frequency);
}
)})
    },
    {
      name: "words",
      inputs: ["toWords","doc"],
      value: (function(toWords,doc){return(
toWords(doc.nouns().out('topk')) // sort by frequency
  .concat(toWords(doc.verbs().out('topk')))
  .concat(toWords(doc.adverbs().out('topk')))
  .concat(toWords(doc.adjectives().out('topk')))
  .sort((a,b) => b.freq - a.freq)
)})
    },
    {
      name: "doc",
      inputs: ["nlp","text"],
      value: (function(nlp,text){return(
nlp(text.value).normalize({
  whitespace: true, // remove hyphens, newlines, and force one space between words
  punctuation: true, // remove commas, semicolons - but keep sentence-ending punctuation
  case: true, // keep only first-word, and 'entity' titlecasing
  numbers: true, // 'one'  →  '1'
  plurals: true, // 'eyes'  →  'eye'  
  verbs: true, // 'swtiched' → 'switch'
})
)})
    },
    {
      name: "nlp",
      inputs: ["require"],
      value: (function(require){return(
require('compromise@11.14.3')
)})
    },
    {
      name: "text",
      inputs: ["html"],
      value: (function(html){return(
html `<textarea rows="10" cols="60">
Look, I was gonna go easy on you and not to hurt your feelings
But I'm only going to get this one chance
Something's wrong, I can feel it (Six minutes, Slim Shady, you're on)
Just a feeling I've got, like something's about to happen, but I don't know what
If that means, what I think it means, we're in trouble, big trouble,
And if he is as bananas as you say, I'm not taking any chances
You were just what the doctor ordered

I'm beginning to feel like a Rap God, Rap God
All my people from the front to the back nod, back nod
Now who thinks their arms are long enough to slap box, slap box?
They said I rap like a robot, so call me Rapbot

But for me to rap like a computer must be in my genes
I got a laptop in my back pocket
My pen'll go off when I half-c*** it
Got a fat knot from that rap profit
Made a living and a killing off it
Ever since Bill Clinton was still in office
With Monica Lewinsky feeling on his nut-sack
I'm an MC still as honest
But as rude and indecent as all hell syllables, killaholic (Kill 'em all with)
This slickety, gibbedy, hibbedy hip hop
You don't really wanna get into a pissing match with this rappidy rap
Packing a Mac in the back of the Ac, pack backpack rap, yep, yackidy-yac
The exact same time I attempt these lyrical acrobat stunts while I'm practicing
That I'll still be able to break a motherf***in' table
Over the back of a couple of faggots and crack it in half
Only realized it was ironic I was signed to Aftermath after the fact
How could I not blow? All I do is drop F-bombs, feel my wrath of attack
Rappers are having a rough time period, here's a Maxipad
It's actually disastrously bad
For the wack while I'm masterfully constructing this masterpiece as

I'm beginning to feel like a Rap God, Rap God
All my people from the front to the back nod, back nod
Now who thinks their arms are long enough to slap box, slap box?
Let me show you maintaining this s*** ain't that hard, that hard

Everybody want the key and the secret to rap immortality like I have got
Well, to be truthful the blueprint's simply rage and youthful exuberance
Everybody loves to root for a nuisance
Hit the earth like an asteroid, did nothing but shoot for the moon since
MC's get taken to school with this music
Cause I use it as a vehicle to bust a rhyme
Now I lead a new school full of students
Me? I'm a product of Rakim, Lakim Shabazz, 2Pac N-
-W.A, Cube, hey, Doc, Ren, Yella, Eazy, thank you, they got Slim
Inspired enough to one day grow up, blow up and be in a position
To meet Run DMC and induct them into the motherf***in' Rock n'
Roll Hall of Fame
Even though I walk in the church and burst in a ball of flames
Only Hall of Fame I be inducted in is the alcohol of fame
On the wall of shame
You fags think it's all a game 'til I walk a flock of flames
Off of planking, tell me what in the f*** are you thinking?
Little gay looking boy
So gay I can barely say it with a straight face looking boy
You witnessing a massacre
Like you watching a church gathering take place looking boy
Oy vey, that boy's gay, that's all they say looking boy
You get a thumbs up, pat on the back
And a way to go from your label everyday looking boy
Hey, looking boy, what you say looking boy?
I got a "hell yeah" from Dre looking boy
I'mma work for everything I have
Never ask nobody for s***, get outta my face looking boy
Basically boy you're never gonna be capable
To keep up with the same pace looking boy

'Cause I'm beginning to feel like a Rap God, Rap God
All my people from the front to the back nod, back nod
The way I'm racing around the track, call me Nascar, Nascar
Dale Earnhardt of the trailer park, the White Trash God
Kneel before General Zod this planet's Krypton, no Asgard, Asgard

So you be Thor and I'll be Odin, you rodent, I'm omnipotent
Let off then I'm reloading immediately with these bombs I'm totin'
And I should not be woken
I'm the walking dead, but I'm just a talking head, a zombie floating
But I got your mom deep throating
I'm out my ramen noodle, we have nothing in common, poodle
I'm a doberman, pinch yourself in the arm and pay homage, pupil
It's me, my honesty's brutal
But it's honestly futile if I don't utilize what I do though
For good at least once in a while
So I wanna make sure somewhere in this chicken scratch I scribble and doodle
Enough rhymes to maybe to try and help get some people through tough times
But I gotta keep a few punchlines just in case cause even you unsigned
Rappers are hungry looking at me like it's lunchtime
I know there was a time where once I
Was king of the underground, but I still rap like I'm on my Pharoahe Monch grind
So I crunch rhymes, but sometimes when you combine
Appeal with the skin color of mine
You get too big and here they come trying to,
Censor you like that one line I said on "I'm Back" from the Marshall Mathers LP
One where I tried to say I take seven kids from Columbine
Put 'em all in a line, add an AK-47, a revolver and a nine
See if I get away with it now that I ain't as big as I was, but I've
Morphed into an immortal coming through the portal
You're stuck in a time warp from 2004 though
And I don't know what the f*** that you rhyme for
You're pointless as Rapunzel with f***ing cornrows
You're like normal, f*** being normal
And I just bought a new Raygun from the future
To just come and shoot ya like when Fabolous made Ray J mad
'Cause Fab said he looked like a fag at Maywhether’s pad
Singin' to a man while they played piano
Man, oh man, that was a 24/7 special on the cable channel
So Ray J went straight to the radio station the very next day
"Hey, Fab, I'mma kill you"
Lyrics coming at you at supersonic speed, (JJ Fad)
Uh, sama lamaa duma lamaa you a**uming I'm a human
What I gotta do to get it through to you I'm superhuman
Innovative and I'm made of rubber
So that anything you saying ricocheting off of me and it'll glue to you
I'm never stating, more than never demonstrating
How to give a motherf***in' audience a feeling like it's levitating
Never fading, and I know that the haters are forever waiting
For the day that they can say I fell off, they'd be celebrating
Cause I know the way to get 'em motivated
I make elevating music, you make elevator music
Oh, he's too mainstream
Well, that's what they do when they get jealous, they confuse it
It's not hip hop, it's pop, cause I found a hella way to fuse it
With rock, shock rap with Doc
Throw on Lose Yourself and make 'em lose it
I don't know how to make songs like that
I don't know what words to use
Let me know when it occurs to you
While I’m ripping any one of these verses diverse as you
It’s curtains, I’m inadvertently hurtin' you
How many verses I gotta murder to,
Prove that if you're half as nice at songs you can sacrifice virgins too uh!
School flunkie, pill junky
But look at the accolades the skills brung me
Full of myself, but still hungry
I bully myself cause I make me do what I put my mind to
And I'm a million leagues above you, ill when I speak in tongues
But it's still tongue in cheek, f*** you
I'm drunk so Satan take the f***ing wheel, I'm asleep in the front seat
Bumping Heavy D and the Boys, still chunky, but funky
But in my head there's something I can feel tugging and struggling
Angels fight with devils, here's what they want from me
They asking me to eliminate some of the women hate
But if you take into consideration the bitter hatred that I had
Then you may be a little patient and more sympathetic to the situation
And understand the discrimination
But f*** it, life's handing you lemons, make lemonade then
But if I can't batter the women how the f*** am I supposed to bake them a cake then?
Don't mistake it for Satan
It's a fatal mistake if you think I need to be overseas
And take a vacation to trip a broad
And make her fall on her face and don't be a retard
Be a king? Think not, why be a king when you can be a God?
</textarea>`
)})
    }
  ]
};

const m3 = {
  id: "@mbostock/saving-svg",
  variables: [
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
  id: "@randomfractals/nlp-text-tags",
  variables: [
    {
      name: "tagLegends",
      inputs: ["html","tagTypes"],
      value: (function(html,tagTypes){return(
html `<p class="term">
  ${tagTypes.map(type => `<span class="nl-${type}" title="${type}">${type}</span> `)
    .reduce((html, tag) => html + tag)}
</p>`
)})
    },
    {
      name: "tagTypes",
      value: (function(){return(
[
  'Expression',
  'Pronoun',
  'Noun',
  'Verb',
  'Adjective',
  'Adverb',
  'Conjunction',
  'Preposition',
  'Determiner',
  'QuestionWord',
  'Value',  
]
)})
    },
    {
      name: "tagColors",
      value: (function(){return(
{
  Pronoun: '#81acce',
  Verb: 'palevioletred',
  Adverb: '#f39c73',
  Adjective: '#b3d3c6',
  Determiner: '#d3c0b3',
  Preposition: '#9794a8',
  Conjunction: '#c8c9cf',
  QuestionWord: 'lavender',
  Noun: '#7990d6',
  Expression: '#b3d3c6',
  Value: 'palegoldenrod',  
}
)})
    },
    {
      name: "tagTypes",
      value: (function(){return(
[
  'Expression',
  'Pronoun',
  'Noun',
  'Verb',
  'Adjective',
  'Adverb',
  'Conjunction',
  'Preposition',
  'Determiner',
  'QuestionWord',
  'Value',  
]
)})
    },
    {
      name: "tagColors",
      value: (function(){return(
{
  Pronoun: '#81acce',
  Verb: 'palevioletred',
  Adverb: '#f39c73',
  Adjective: '#b3d3c6',
  Determiner: '#d3c0b3',
  Preposition: '#9794a8',
  Conjunction: '#c8c9cf',
  QuestionWord: 'lavender',
  Noun: '#7990d6',
  Expression: '#b3d3c6',
  Value: 'palegoldenrod',  
}
)})
    }
  ]
};

const m5 = {
  id: "@randomfractals/nlp-tag-tree",
  variables: [
    {
      name: "createTagTreeSvg",
      inputs: ["getRoot","d3","DOM","width"],
      value: (function(getRoot,d3,DOM,width){return(
function createTagTreeSvg(tagTree) {
  const root = getRoot(tagTree);
  let x0 = Infinity;
  let x1 = -x0;
  root.each(d => {
    if (d.x > x1) x1 = d.x;
    if (d.x < x0) x0 = d.x;
  });
  const svg = d3.select(DOM.svg(width, x1 - x0 + root.dx * 2))
    .style("width", "100%")
    .style("height", "auto");
  
  const g = svg.append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .attr("transform", `translate(${root.dy / 3},${root.dx - x0})`);
    
  const link = g.append("g")
    .attr("fill", "none")
    .attr("stroke", "#555")
    .attr("stroke-opacity", 0.4)
    .attr("stroke-width", 1.5)
  .selectAll("path")
    .data(root.links())
    .enter().append("path")
      .attr("d", d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x));
  
  const node = g.append("g")
    .attr("stroke-linejoin", "round")
    .attr("stroke-width", 3)
    .selectAll("g")
    .data(root.descendants().reverse())
    .enter().append("g")
      .attr("transform", d => `translate(${d.y},${d.x})`);

  node.append("circle")
    .attr("fill", d => d.children ? "#555" : d.data.color) //"#999")
    .attr("r", 2.5);

  node.append("text")
    .attr("dy", "0.31em")
    .attr("x", d => d.children ? -6 : 6)
    .attr("text-anchor", d => d.children ? "end" : "start")
    .attr("fill", d => d.data.color)
    .text(d => d.data.count ? `${d.data.count} ${d.data.name}`: `${d.data.children.length} ${d.data.name}s`)
    .clone(true).lower()
    .attr("stroke", "white");
  
  return svg.node();
}
)})
    },
    {
      name: "downloadTagTreeSvg",
      inputs: ["html","DOM","serialize"],
      value: (function(html,DOM,serialize){return(
function downloadTagTreeSvg(fileName, svg) {
  return html `${DOM.download(serialize(svg), `${fileName}.svg`, "Save SVG")}`;
}
)})
    },
    {
      name: "getUniqueTags",
      value: (function(){return(
function getUniqueTags(tags) {
  const map = new Map();
  for (const tag of tags) {
    let group = map.get(tag.normal);
    if (!group) {
      group = {name: tag.normal, children: []};
      map.set(tag.normal, group);
    }
    group.children.push(tag);
    tag.targets = [];
  }
  return {name: 'tags', children: [...map.values()]};
}
)})
    },
    {
      name: "createTagTree",
      inputs: ["tagTypes","tagColors"],
      value: (function(tagTypes,tagColors){return(
function createTagTree(uniqueTags) {
  const map = new Map();
  for (const tagType of tagTypes) {
    map.set(tagType, {name: tagType, children: []});
  }
  for (const tag of uniqueTags.children) {
    const tagTypes = tag.children[0].tags;
    for (const tagType of tagTypes) {
      const type = map.get(tagType);
      if (type) {
        type.children.push({name: tag.name, count: tag.children.length, color: tagColors[tagType]});
        type.color = tagColors[tagType];
        break;
      }
    }
  }
  return {name: 'term', children: [...map.values()]};
}
)})
    },
    {
      name: "getRoot",
      inputs: ["d3","width"],
      value: (function(d3,width){return(
function getRoot(tagTree) {
  const root = d3.hierarchy(tagTree);
  root.dx = 10;
  root.dy = width / (root.height + 1);
  return d3.tree().nodeSize([root.dx, root.dy])(root);
}
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
      from: "@mbostock/saving-svg",
      name: "serialize",
      remote: "serialize"
    },
    {
      from: "@randomfractals/nlp-text-tags",
      name: "tagTypes",
      remote: "tagTypes"
    },
    {
      from: "@randomfractals/nlp-text-tags",
      name: "tagColors",
      remote: "tagColors"
    }
  ]
};

const notebook = {
  id: "c2ff228e09d0a4ae@607",
  modules: [m0,m1,m2,m3,m4,m5]
};

export default notebook;
