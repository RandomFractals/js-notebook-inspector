// URL: https://observablehq.com/@mbostock/hello-three-js
// Title: Hello, Three.js!
// Author: Mike Bostock (@mbostock)
// Version: 145
// Runtime version: 1

const m0 = {
  id: "b53937d3137ea268@145",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Hello, Three.js!

Here’s a quick demo of [Three.js](https://threejs.org).`
)})
    },
    {
      inputs: ["THREE","invalidation","width","height","cube","scene","camera"],
      value: (function*(THREE,invalidation,width,height,cube,scene,camera)
{
  const renderer = new THREE.WebGLRenderer({antialias: true});
  invalidation.then(() => renderer.dispose());
  renderer.setSize(width, height);
  renderer.setPixelRatio(devicePixelRatio);
  while (true) {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
    yield renderer.domElement;
  }
}
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`The scene consists of a single cube.`
)})
    },
    {
      name: "scene",
      inputs: ["THREE","cube"],
      value: (function(THREE,cube)
{
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);
  scene.add(cube);
  return scene;
}
)
    },
    {
      inputs: ["md","tex"],
      value: (function(md,tex){return(
md`The unit cube is colored based on the surface normals, just for fun. We’re just using the default position and rotation vectors of ${tex`\langle0,0,0\rangle`}, but note that the render loop above will mutate the cube’s rotation.`
)})
    },
    {
      name: "cube",
      inputs: ["THREE"],
      value: (function(THREE)
{
  const material = new THREE.MeshNormalMaterial();
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  return new THREE.Mesh(geometry, material);
}
)
    },
    {
      inputs: ["md","tex"],
      value: (function(md,tex){return(
md`The camera is a basic perspective with initial position ${tex`\langle0,0,3\rangle`}.`
)})
    },
    {
      name: "camera",
      inputs: ["width","height","THREE"],
      value: (function(width,height,THREE)
{
  const fov = 45;
  const aspect = width / height;
  const near = 1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 3;
  return camera;
}
)
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`The height of the rendered scene is fixed. We’re using the built-in \`width\` so that the scene is automatically responsive.`
)})
    },
    {
      name: "height",
      value: (function(){return(
600
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Lastly, we load Three.`
)})
    },
    {
      name: "THREE",
      inputs: ["require"],
      value: (function(require){return(
require("three@0.99.0/build/three.min.js")
)})
    }
  ]
};

const notebook = {
  id: "b53937d3137ea268@145",
  modules: [m0]
};

export default notebook;
