// URL: https://observablehq.com/@makio135/hello-raymarching
// Title: Hello Raymarching
// Author: Lionel Radisson (@makio135)
// Version: 2139
// Runtime version: 1

const m0 = {
  id: "ff6ed85ab9911915@2139",
  variables: [
    {
      inputs: ["md"],
      value: (function(md){return(
md`# Hello Raymarching`
)})
    },
    {
      inputs: ["fragment"],
      value: (function(fragment){return(
fragment(`
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

#define PI 3.14159265

// Floor
vec2 obj_floor(in vec3 p){
  return vec2(p.y + 10.0, 0.);
}

vec3 op_rep(vec3 p, vec3 c) {
  return mod(p, c) - 0.5 * c;
}

// objects fusion (union)
vec2 op_union(vec2 a, vec2 b){
  float d = min(a.x, b.x);
  return vec2(d, 1.);
}

// objects subtraction
vec2 op_sub(vec2 a, vec2 b){
  float d = max(a.x, -b.x);
  return vec2(d, 1);
}

//Objects union
vec2 obj_union(in vec2 obj0, in vec2 obj1){
  return (obj0.x < obj1.x) ? obj0 : obj1;
}

vec2 obj_sphere(in vec3 p, in float radius){
  float d = length(p) - radius;
  return vec2(d, 1.);
}

vec2 obj_round_box(in vec3 p, in vec3 dimensions) {
  float d = length(max(abs(p) - dimensions, 0.0)) - 0.2;
  return vec2(d, 1.);
}

vec2 distance_to_obj(in vec3 p){
  vec3 p2 = op_rep(p, vec3(8.0, 8.0, 8.0));
  return obj_union(obj_floor(p), op_sub(obj_round_box(p2, vec3(1.0, 1.0, 1.0)), obj_sphere(p2, 1.1 + (sin(u_time) / 2. + .5) * 0.4)));
}

//Floor Color (checkerboard)
vec3 floor_color(in vec3 p){
  if (fract(p.x * 0.2) > 0.2){
    if (fract(p.z * 0.2) > 0.2) return vec3(0., 0.1, 0.2);
    else return vec3(1., 1., 1.);
  }
  else{
    if (fract(p.z*.2)>.2) return vec3(1.,1.,1.);
    else return vec3(0.3,0.,0.);
   }
}

// Primitive color
vec3 prim_c(in vec3 p){
  return vec3(0.1,0.6,0.8);
}

void main(){
  vec2 q = gl_FragCoord.xy/u_resolution;
  vec2 vPos = -1.0 + 2.0 * q;

  // Camera up vector.
  vec3 vuv=vec3(0.,1.,0.); 
  
  // Camera lookat.
  vec3 vrp=vec3(0.,0.,0.);

  float mx=u_mouse.x/u_resolution.x*PI*2.0;
  float my=u_mouse.y/u_resolution.y*PI/1.01;
  vec3 prp=vec3(mx, my, 4.); 

  // Camera setup.
  vec3 vpn=normalize(vrp-prp);
  vec3 u=normalize(cross(vuv,vpn));
  vec3 v=cross(vpn,u);
  vec3 vcv=(prp+vpn);
  vec3 scrCoord=vcv+vPos.x*u*u_resolution.x/u_resolution.y+vPos.y*v;
  vec3 scp=normalize(scrCoord-prp);

  // Raymarching.
  const vec3 e = vec3(0.02, 0, 0);
  const float maxd = 100.0; //Max depth
  vec2 d = vec2(0.02, 0.0);
  vec3 c, p, N;
  float f = 1.0;

  for(int i = 0; i < 250; i++){
    if ((abs(d.x) < .001) || (f > maxd)) break;
    f += d.x;
    p = prp + scp * f;
    d = distance_to_obj(p);
  }
  
  if (f < maxd){
    // y is used to manage materials.
    if (d.y == 0.) c = floor_color(p);
    else c = prim_c(p);

    vec3 n = vec3(d.x - distance_to_obj(p - e.xyy).x,
                  d.x - distance_to_obj(p - e.yxy).x,
                  d.x - distance_to_obj(p - e.yyx).x);

    N = normalize(n);
    float b = dot(N, normalize(prp - p));
    //simple phong lighting, LightPosition = CameraPosition
    gl_FragColor = vec4((b * c + pow(b, 16.0)) * (1.0 - f * .01), 1.0);
  }
  else gl_FragColor=vec4(0., 0., 0., 1.); //background color
}
`, { play: false })
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`🎬Click to play/pause`
)})
    },
    {
      inputs: ["raymarch","rotateY","opSmoothUnion","sdSphere"],
      value: (function(raymarch,rotateY,opSmoothUnion,sdSphere){return(
raymarch(`
#define PI 3.1415926

${rotateY()}
${opSmoothUnion()}

// SDF
${sdSphere()}

// heartbeat function taken from https://observablehq.com/@mattdesl/heartbeat-function
float beat (float value, float intensity, float frequency) {
  float v = atan(sin(value * PI * frequency) * intensity);
  return (v + PI / 2.) / PI;
}

// Signed distance function describing the scene.
vec2 sceneSDF(vec3 p) {
  p = rotateY(u_time * 4.) * p;

  float duration = 3.;
  float t = mod(u_time - 0.08, duration) / duration;
  float s = beat(t, 5., 2.);

  float d = sdSphere(p, 0.6);
  float l = 2.5;
  for (int i = 0; i < 3; i++) {
    vec3 v = vec3(0.);
    v[i] = l;
    vec3 q = p;
    q[i] = abs(q[i]);
    d = opSmoothUnion(d, sdSphere(q - v * s, 0.4), 0.1);
  }

  l *= 0.5;
  vec3 q3 = abs(p);
  d = opSmoothUnion(d, sdSphere(abs(p) - vec3(l, l, l) * s, 0.4), 0.1);

  return vec2(d, 1.0);
}`
, { play: false })
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`🎬Click to play/pause`
)})
    },
    {
      inputs: ["raymarch","rotateY","sdSphere","sdOctahedron","opBlend"],
      value: (function(raymarch,rotateY,sdSphere,sdOctahedron,opBlend){return(
raymarch(`
${rotateY()}
${sdSphere()}
${sdOctahedron()}
${opBlend()}

vec2 sceneSDF(vec3 p) {
  float s = sdSphere(p, 2.0);
  float o = sdOctahedron(p, 2.0);
  float d = opBlend(s, o, sin(u_time - 0.55) / 2. + 0.5);
  return vec2(d, 1.0);
}
`, {
  computeColor: `// use Lambert shading instead of default material
vec3 computeColor(vec3 p, vec3 eye) {
  // Lambert lighting is the dot product of a directional light and the normal
  vec3 light_dir = normalize(vec3(1.0, -0.3, 0.0));
  float diffuse = dot(light_dir, estimateNormal(p));
  // Wrap the lighting around
  // https://developer.valvesoftware.com/wiki/Half_Lambert
  diffuse = diffuse * 0.5 + 0.5;
  // For real diffuse, use this instead (to avoid negative light)
  //diffuse = max(0.0, diffuse);

  // Combine ambient light and diffuse lit directional light
  vec3 light_color = vec3(0.8, 0.6, 0.5);
  vec3 ambient_color = vec3(0.2, 0.45, 0.6);
  vec3 materialColor = vec3(0.97, 0.22, 0.5);
  return materialColor * (diffuse * light_color + ambient_color);
}`
  , eye: `vec3(cos((u_mouse.x / u_resolution.x) * 3.1415926 * 2.) * 8., 5., sin((u_mouse.x - u_resolution.x / 2.) / u_resolution.x * 3.1415926 * 2.) * 8.)`
  , background: `mix(vec3(0.21, 0.10, 0.31), vec3(0.93, 0.22, 0.54), gl_FragCoord.x / u_resolution.x)`
  , play: false
})
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`🎬Click to play/pause`
)})
    },
    {
      inputs: ["raymarch","rotateX","rotateY","rotateZ","opUnion","opSubtraction","opIntersection","sdSphere","sdBox","sdCappedCylinder","phong"],
      value: (function(raymarch,rotateX,rotateY,rotateZ,opUnion,opSubtraction,opIntersection,sdSphere,sdBox,sdCappedCylinder,phong){return(
raymarch(`
#define PI 3.1415926

${rotateX()}
${rotateY()}
${rotateZ()}
${opUnion()}
${opSubtraction()}
${opIntersection()}
${sdSphere()}
${sdBox()}
${sdCappedCylinder()}

// heartbeat function taken from https://observablehq.com/@mattdesl/heartbeat-function
float beat (float value, float intensity, float frequency) {
  float v = atan(sin(value * PI * frequency) * intensity);
  return (v + PI / 4.) / PI;
}

vec2 sceneSDF(vec3 p) {
  // Slowly spin the whole scene
  p = rotateX(u_time) * p;

  float duration = 6.;
  float t = mod(u_time, duration) / duration;
  float s = beat(t, 5., 2.);

  p = rotateY(s * PI * 2.) * p;

  float cylinderRadius = 0.5 + 0.5 * s;
  float cylinder1 = sdCappedCylinder(p, 1.0, cylinderRadius);
  float cylinder2 = sdCappedCylinder(rotateX(radians(90.0)) * p, 1.0, cylinderRadius);
  float cylinder3 = sdCappedCylinder(rotateZ(radians(90.0)) * p, 1.0, cylinderRadius);

  float cube = sdBox(p, vec3(1.8, 1.8, 1.8)/2.);    
  float sphere = sdSphere(p, 1.2);

  float ballOffset = 0.6 + 2.0 * s;
  float ballRadius = 0.3;
  float balls = sdSphere(p - vec3(ballOffset, 0.0, 0.0), ballRadius);
  balls = opUnion(balls, sdSphere(p + vec3(ballOffset, 0.0, 0.0), ballRadius));
  balls = opUnion(balls, sdSphere(p - vec3(0.0, ballOffset, 0.0), ballRadius));
  balls = opUnion(balls, sdSphere(p + vec3(0.0, ballOffset, 0.0), ballRadius));
  balls = opUnion(balls, sdSphere(p - vec3(0.0, 0.0, ballOffset), ballRadius));
  balls = opUnion(balls, sdSphere(p + vec3(0.0, 0.0, ballOffset), ballRadius));

  float csgNut = opSubtraction(opUnion(cylinder1, opUnion(cylinder2, cylinder3)),
  opIntersection(cube, sphere));

  return vec2(opUnion(balls, csgNut), 1.0);
}
`, {
  computeColor:`
    ${phong()}

    vec3 computeColor(vec3 p, vec3 eye) {
      // Use the surface normal as the ambient color of the material
      vec3 K_a = (estimateNormal(p) + vec3(1.0)) / 2.0;
      vec3 K_d = K_a;
      vec3 K_s = vec3(1.0, 1.0, 1.0);
      float shininess = 40.0;

      return phongIllumination(K_a, K_d, K_s, shininess, p, eye);
    }`
  , eye: `vec3(8.0, 5.0, 7.0)` // custom position of the eye
  , background: `vec3(gl_FragCoord.xy / u_resolution / 2., 0.5) * 0.75` // custom background color
  , play: false
})
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`🎬Click to play/pause`
)})
    },
    {
      inputs: ["raymarch","rotateX","rotateY","rotateZ","sdCappedCone","opSmoothUnion","phong"],
      value: (function(raymarch,rotateX,rotateY,rotateZ,sdCappedCone,opSmoothUnion,phong){return(
raymarch(`
#define PI 3.1415926

${rotateX()}
${rotateY()}
${rotateZ()}
${sdCappedCone()}
${opSmoothUnion()}

vec2 sceneSDF(vec3 p) {
  p = rotateY(u_time * 1.5 - 0.5) * p;

  float s = sin(u_time * 2.) / 2. + 0.5;
  float t = smoothstep(0., 2., s);
  float l = 0.5 + s;
  float r = 0.4;
  
  vec3 q1 = p;
  q1.y = abs(q1.y);
  float d = sdCappedCone(q1 + vec3(0., -l, 0.), l, r, r - s/2.);

  vec3 q2 = rotateX(radians(90.)) * p;
  q2.y = abs(q2.y);
  d = opSmoothUnion(d, sdCappedCone(q2 + vec3(0., -l, 0.), l, r, r - s/2.), 0.1);

  vec3 q3 = rotateZ(radians(90.)) * p;
  q3.y = abs(q3.y);
  d = opSmoothUnion(d, sdCappedCone(q3 + vec3(0., -l, 0.), l, r, r - s/2.), 0.1);

  vec3 q4 = rotateY(radians(45.)) * p;
  q4.yz = abs(q4.yz);
  q4 = rotateX(radians(45.)) * q4;
  d = opSmoothUnion(d, sdCappedCone(q4 + vec3(0., -l, 0.), l, r, r - s/2.), 0.1);

  vec3 q5 = rotateY(radians(-45.)) * p;
  q5.yz = abs(q5.yz);
  q5 = rotateX(radians(45.)) * q5;
  d = opSmoothUnion(d, sdCappedCone(q5 + vec3(0., -l, 0.), l, r, r - s/2.), 0.1);
  
  return vec2(d, 1.0);
}
` , {
  computeColor: `
    ${phong()}

    vec3 computeColor(vec3 p, vec3 eye) {
      vec3 K_a = vec3(0.75);
      K_a = vec3(0.97, 0.22, 0.5) * (mod(length(p), 0.2) > 0.1 ? 1. : 0.);
      vec3 K_d = K_a;
      vec3 K_s = vec3(1.0, 1.0, 1.0);
      float shininess = 40.0;

      return phongIllumination(K_a, K_d, K_s, shininess, p, eye);
    }`
  , eye: `vec3(8.0, 5.0 * sin(0.2 * u_time), 7.0)` // position of the eye
  , background: `` // use computeColor for background
  , play: false
})
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`🎬Click to play/pause`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`___
## Raymarch Helper

### Usage
~~~js
import { raymarch } from '@makio135/hello-raymarching' 
~~~

The \`raymarch\` helper is based on the \`fragment\` helper from [@makio135/hello-fragment](https://observablehq.com/@makio135/hello-fragment).

\`raymarch(sceneSDF, options)\` parameters are:
- \`sceneSDF\`: String (required)
- \`options\`: Object (optional)
  - \`eye\`: String (optional)
  - \`computeColor\`: String (optional)
  - \`background\`: String (optional)
  - \`w\`: width of the canvas in pixels. Number (optional)  
    Default: \`width\`
  - \`h\`: height of the canvas in pixels. Number (optional)  
    Default: \`400\`
  - \`play\`: state of the animation on start. Boolean (optional)  
    Default: \`true\`
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`### Implementation`
)})
    },
    {
      name: "raymarch",
      inputs: ["phong","basicComputeColor","shortestDistanceToSurface","rayDirection","estimateNormal","viewMatrix","render","fragment"],
      value: (function(phong,basicComputeColor,shortestDistanceToSurface,rayDirection,estimateNormal,viewMatrix,render,fragment){return(
(sceneSDF = `vec2 sceneSDF(vec3 p){return vec2(length(p) - 0.5, 1.0);}`, opts = {}) => {
  const {
    computeColor = `${phong()}\n${basicComputeColor()}`,
    eye = `vec3(0.0, 5.0, 10.0)`,
    target = `vec3(0.0)`,
    fieldOfView = `45.`,
    background = `vec3(0.6 - length((gl_FragCoord.xy - u_resolution / 2.) / u_resolution.x));`,
    raymarchingSteps = 100,
    antiAliasing = 1,
    gamma = `vec3(1.0)`,
    ...options
  } = opts
  
  const shader = `
    precision mediump float;

    #define ANTI_ALIASING ${antiAliasing}
    #define MIN_DIST 0.0
    #define MAX_DIST 100.0
    #define EPSILON 0.0001

    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform float u_time;
    
    ${sceneSDF}

    ${shortestDistanceToSurface(raymarchingSteps)}
    ${rayDirection()}
    ${estimateNormal()}
    ${viewMatrix()}

    ${computeColor}
    ${render(background)}
    
    void main(){
      vec3 eye = ${eye};
      vec3 target = ${target};
      mat3 viewToWorld = viewMatrix(eye, target, vec3(0.0, 1.0, 0.0));

      vec3 color = vec3(0.0);
    #if ANTI_ALIASING>1
      for(int m = 0; m < ANTI_ALIASING; m++) {
        for(int n = 0; n < ANTI_ALIASING; n++) {
          vec2 delta = vec2(float(m), float(n)) / float(ANTI_ALIASING) - 0.5;
          vec3 rayDir = rayDirection(${fieldOfView}, u_resolution, gl_FragCoord.xy + delta);
    #else
          vec3 rayDir = rayDirection(${fieldOfView}, u_resolution, gl_FragCoord.xy);
    #endif

          // ray direction with camera transformation
          vec3 worldDir = viewToWorld * rayDir;

          // render
          vec3 col = render(eye, worldDir, MIN_DIST, MAX_DIST);

          // gamma
          col = pow(col, ${gamma});

          color += col;
    #if ANTI_ALIASING>1
        }
      }
      color /= float(ANTI_ALIASING * ANTI_ALIASING);
    #endif

      gl_FragColor = vec4(color, 1.0);
    }` 
  return fragment(shader, options)
}
)})
    },
    {
      name: "rayDirection",
      value: (function(){return(
() => `
/**
 * Return the normalized direction to march in from the eye point for a single pixel.
 * 
 * fieldOfView: vertical field of view in degrees
 * size: resolution of the output image
 * fragCoord: the x,y coordinate of the pixel in the output image
 */
vec3 rayDirection(float fieldOfView, vec2 size, vec2 fragCoord) {
    vec2 xy = fragCoord - size / 2.0;
    float z = size.y / tan(radians(fieldOfView) / 2.0);
    return normalize(vec3(xy, -z));
}`
)})
    },
    {
      name: "viewMatrix",
      value: (function(){return(
() => `
/**
 * Return a transform matrix that will transform a ray from view space
 * to world coordinates, given the eye point, the camera target, and an up vector.
 *
 * This assumes that the center of the camera is aligned with the negative z axis in
 * view space when calculating the ray marching direction. See rayDirection.
 */
mat3 viewMatrix(vec3 eye, vec3 center, vec3 up) {
    // Based on gluLookAt man page
    vec3 f = normalize(center - eye);
    vec3 s = normalize(cross(f, up));
    vec3 u = cross(s, f);
    return mat3(s, u, -f);
}`
)})
    },
    {
      name: "shortestDistanceToSurface",
      value: (function(){return(
(raymarchingSteps) =>`
/**
 * Return the shortest distance from the eyepoint to the scene surface along
 * the marching direction. If no part of the surface is found between start and end,
 * return end.
 * 
 * eye: the eye point, acting as the origin of the ray
 * marchingDirection: the normalized direction to march in
 * start: the starting distance away from the eye
 * end: the max distance away from the eye to march before giving up
 */
vec2 shortestDistanceToSurface(vec3 eye, vec3 marchingDirection, float start, float end) {
  float depth = start;
  for (int i = 0; i < ${raymarchingSteps}; i++) {
    vec2 v = sceneSDF(eye + depth * marchingDirection);
    float dist = v[0];
    float material = v[1];

    if (dist < EPSILON)  return vec2(depth, material);

    depth += dist;
    if (depth >= end) return vec2(end, 0.0);
  }
  return vec2(end, 0.0);
}`
)})
    },
    {
      name: "estimateNormal",
      value: (function(){return(
() => `
// Using the gradient of the SDF, estimate the normal on the surface at point p.
vec3 estimateNormal(vec3 p) {
    float pDist = sceneSDF(p)[0];
    return normalize(vec3(
        sceneSDF(vec3(p.x + EPSILON, p.y, p.z))[0] - pDist,
        sceneSDF(vec3(p.x, p.y + EPSILON, p.z))[0] - pDist,
        sceneSDF(vec3(p.x, p.y, p.z  + EPSILON))[0] - pDist
    ));
}`
)})
    },
    {
      name: "phong",
      value: (function(){return(
() => `
/**
 * Lighting contribution of a single point light source via Phong illumination.
 * 
 * The vec3 returned is the RGB color of the light's contribution.
 *
 * k_a: Ambient color
 * k_d: Diffuse color
 * k_s: Specular color
 * alpha: Shininess coefficient
 * p: position of point being lit
 * eye: the position of the camera
 * lightPos: the position of the light
 * lightIntensity: color/intensity of the light
 *
 * See https://en.wikipedia.org/wiki/Phong_reflection_model#Description
 */
vec3 phongContribForLight(vec3 k_d, vec3 k_s, float alpha, vec3 p, vec3 eye,
                          vec3 lightPos, vec3 lightIntensity) {
    vec3 N = estimateNormal(p);
    vec3 L = normalize(lightPos - p);
    vec3 V = normalize(eye - p);
    vec3 R = normalize(reflect(-L, N));
    
    float dotLN = dot(L, N);
    float dotRV = dot(R, V);
    
    if (dotLN < 0.0) {
        // Light not visible from this point on the surface
        return vec3(0.0, 0.0, 0.0);
    } 
    
    if (dotRV < 0.0) {
        // Light reflection in opposite direction as viewer, apply only diffuse
        // component
        return lightIntensity * (k_d * dotLN);
    }
    return lightIntensity * (k_d * dotLN + k_s * pow(dotRV, alpha));
}

/**
 * Lighting via Phong illumination.
 * 
 * The vec3 returned is the RGB color of that point after lighting is applied.
 * k_a: Ambient color
 * k_d: Diffuse color
 * k_s: Specular color
 * alpha: Shininess coefficient
 * p: position of point being lit
 * eye: the position of the camera
 *
 * See https://en.wikipedia.org/wiki/Phong_reflection_model#Description
 */
vec3 phongIllumination(vec3 k_a, vec3 k_d, vec3 k_s, float alpha, vec3 p, vec3 eye) {
    const vec3 ambientLight = 0.5 * vec3(1.0, 1.0, 1.0);
    vec3 color = ambientLight * k_a;
    
    vec3 light1Pos = vec3(-4.0, //* sin(u_time),
                          2.0,
                          4.0); //* cos(u_time));
    vec3 light1Intensity = vec3(0.4, 0.4, 0.4);
    
    color += phongContribForLight(k_d, k_s, alpha, p, eye,
                                  light1Pos,
                                  light1Intensity);
    
    vec3 light2Pos = vec3(2.0, //* sin(0.37 * u_time),
                          2.0, //* cos(0.37 * u_time),
                          2.0);
    vec3 light2Intensity = vec3(0.4, 0.4, 0.4);
    
    color += phongContribForLight(k_d, k_s, alpha, p, eye,
                                  light2Pos,
                                  light2Intensity);    
    return color;
}`
)})
    },
    {
      name: "basicComputeColor",
      value: (function(){return(
() => `
vec3 computeColor(vec3 p, vec3 eye) {
  vec3 K_a = vec3(0.3, 0.4, 0.5);
  vec3 K_d = vec3(0.6, 0.5, 0.4);
  vec3 K_s = vec3(1.0, 1.0, 1.0);
  float shininess = 10.0;

  return phongIllumination(K_a, K_d, K_s, shininess, p, eye);
}`
)})
    },
    {
      name: "render",
      value: (function(){return(
(background) => `
vec3 render(vec3 eye, vec3 worldDir, float start, float end) {
  vec2 v = shortestDistanceToSurface(eye, worldDir, MIN_DIST, MAX_DIST);
  float dist = v[0];
  float material = v[1];

  // Didn't hit anything
  ${background === `` ? `` : `
  if (material == 0.) {
    return ${background};
  }`}

  // The closest point on the surface to the eyepoint along the view ray
  vec3 p = eye + dist * worldDir;
  return computeColor(p, eye);
}`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`___
## Raymarching Resources

![](http://jamie-wong.com/images/16-07-11/spheretrace.jpg)

<small>source: http://jamie-wong.com/2016/07/15/ray-marching-signed-distance-functions/</small>

- [Introduction to Functional Rendering paradigm on Observable](https://observablehq.com/@gre/introduction-to-functional-rendering-paradigm)
- [How Raymarching Works?](https://observablehq.com/@stwind/how-raymarching-works)
- [Introduction to Raymarching Distance Functions on Observable](https://observablehq.com/@gre/introduction-to-raymarching-distance-functions)
- [Building Worlds With Distance Functions in GLSL](http://www.geeks3d.com/20130524/building-worlds-with-distance-functions-in-glsl-raymarching-glslhacker-tutorial-opengl/2/)
- [Ray Marching and Signed Distance Functions by Jamie Wong](http://jamie-wong.com/2016/07/15/ray-marching-signed-distance-functions/)
- [Raymarch Tutorial2 on shadertoy](https://www.shadertoy.com/view/XlBGDW)
- [HOWTO: Ray Marching on Shadertoy](https://www.shadertoy.com/view/XllGW4) 
- [Geodesic domain manipulation on shadertoy](https://www.shadertoy.com/view/4tG3zW)
- https://www.alanzucconi.com/2016/07/01/raymarching/
- http://9bitscience.blogspot.com/2013/07/raymarching-distance-fields_14.html?m=1
- http://www.pouet.net/topic.php?which=8177&page=1
- [SDF Tracing Visualization on shadertoy](https://www.shadertoy.com/view/lslXD8)
- [HG SDF in WebGL](https://www.shadertoy.com/view/Xs3GRB)
- [World, View and Projection Transformation Matrices](http://www.codinglabs.net/article_world_view_projection_matrix.aspx)
- [Raymarching Workshop](https://github.com/ajweeks/RaymarchingWorkshop)
- [Tutorial of Ray Casting, Ray Tracing, Path Tracing and Ray Marching](http://blog.ruofeidu.com/tutorial-of-ray-casting-ray-tracing-and-ray-marching/)
- [Phong reflection model](https://en.wikipedia.org/wiki/Phong_reflection_model)
- [Volumetric Rendering: Signed Distance Functions](https://www.alanzucconi.com/2016/07/01/signed-distance-functions/)
- [Raymarching a Christmas Tree](http://blog.ruslans.com/2015/01/raymarching-christmas-tree.html)
`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`___
## Imports`
)})
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`The \`raymarch\` helper is based on \`fragment\` helper:`
)})
    },
    {
      from: "@makio135/hello-fragment",
      name: "fragment",
      remote: "fragment"
    },
    {
      inputs: ["md"],
      value: (function(md){return(
md`Signed Distance Functions used for the examples:`
)})
    },
    {
      from: "@makio135/iq-sdf",
      name: "sdSphere",
      remote: "sdSphere"
    },
    {
      from: "@makio135/iq-sdf",
      name: "sdBox",
      remote: "sdBox"
    },
    {
      from: "@makio135/iq-sdf",
      name: "sdCappedCone",
      remote: "sdCappedCone"
    },
    {
      from: "@makio135/iq-sdf",
      name: "sdCappedCylinder",
      remote: "sdCappedCylinder"
    },
    {
      from: "@makio135/iq-sdf",
      name: "sdOctahedron",
      remote: "sdOctahedron"
    },
    {
      from: "@makio135/iq-sdf",
      name: "opBlend",
      remote: "opBlend"
    },
    {
      from: "@makio135/iq-sdf",
      name: "opUnion",
      remote: "opUnion"
    },
    {
      from: "@makio135/iq-sdf",
      name: "opSmoothUnion",
      remote: "opSmoothUnion"
    },
    {
      from: "@makio135/iq-sdf",
      name: "opSubtraction",
      remote: "opSubtraction"
    },
    {
      from: "@makio135/iq-sdf",
      name: "opIntersection",
      remote: "opIntersection"
    },
    {
      from: "@makio135/iq-sdf",
      name: "rotateX",
      remote: "rotateX"
    },
    {
      from: "@makio135/iq-sdf",
      name: "rotateY",
      remote: "rotateY"
    },
    {
      from: "@makio135/iq-sdf",
      name: "rotateZ",
      remote: "rotateZ"
    }
  ]
};

const m1 = {
  id: "@makio135/hello-fragment",
  variables: [
    {
      name: "fragment",
      inputs: ["width","DOM","createShader","createProgram","createVertexBuffer","loadTexture"],
      value: (function(width,DOM,createShader,createProgram,createVertexBuffer,loadTexture){return(
async function fragment(fragmentString, options = {}) {
  let { 
    w = width,
    h = 400,
    background = 'black',
    play = true,
    logShader = false,
    resolution = 1,
    u_texture
  } = options

  if(logShader) return fragmentString

  const canvas = DOM.canvas(w * devicePixelRatio * resolution | 0, h * devicePixelRatio * resolution | 0)
  if(w === width) {
    w += 28
    canvas.width = w * devicePixelRatio
  }

  canvas.style = `
margin: 0 -14px;
width: ${w}px;
height: ${h}px;
background: ${background};
`
  const gl = canvas.value = canvas.getContext('webgl')

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, `
precision mediump float;

attribute vec2 a_position;
uniform vec2 u_resolution;

void main() {
gl_Position = vec4((a_position / u_resolution * 2. - 1.) * vec2(1, -1), 0., 1.);
}`)

  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentString)

  // create a shader program (= vertex shader + fragment shader)
  const program = createProgram(gl, vertexShader, fragmentShader)

  // create a buffer to hold vertex positions
  const vertexBuffer = createVertexBuffer(gl)

  // store uniforms and attributes locations
  const a_positionLoc = gl.getAttribLocation(program, 'a_position')
  const u_timeLoc = gl.getUniformLocation(program, 'u_time')
  const u_resolutionLoc = gl.getUniformLocation(program, 'u_resolution')
  const u_mouseLoc = gl.getUniformLocation(program, 'u_mouse')

  if (u_texture) u_texture = await loadTexture(gl, u_texture)

  // update mouse on 'mousemove'
  canvas.addEventListener('mousemove', e => {
    gl.uniform2f(u_mouseLoc, e.offsetX * devicePixelRatio * resolution | 0, (h - e.offsetY) * devicePixelRatio * resolution | 0)
  })

  let startTime = Date.now()
  let pauseTimestamp = Date.now()

  // trying to add fullscreen on doubleclick
  /*canvas.addEventListener('click', e => {
    if (canvas.getAttribute('data-dblclick') == null) {
      canvas.setAttribute('data-dblclick', 1)
      setTimeout(() => {
        if (canvas.getAttribute('data-dblclick') == 1) {
          play = !play
          if(!play) pauseTimestamp = Date.now()
          else {
            startTime += Date.now() - pauseTimestamp
          }
        }
        canvas.removeAttribute('data-dblclick')
      }, 300)
    } else {
      canvas.removeAttribute('data-dblclick')
      canvas.width = screen.width
      canvas.height = screen.height

      canvas.style = `
        margin: 0 -14px;
        width: ${screen.width}px;
        height: ${screen.height}px;
      `
      canvas.requestFullscreen()
    }
  })*/

  canvas.addEventListener('click', e => {
    play = !play
    if(!play) pauseTimestamp = Date.now()
    else {
      startTime += Date.now() - pauseTimestamp
    }
  })

  let isAnimated = (RegExp(`\\bu_time`, 'g')).test(fragmentString) || (RegExp(`\\bu_mouse`, 'g')).test(fragmentString)
  let firstFrame = true;
  // rendering loop
  function* rendering() {
    while(isAnimated || firstFrame) {
      firstFrame = false;
      // set viewport before drawing
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

      // define what program for drawing(rendering)
      gl.useProgram(program)

      // update u_time and u_resolution uniforms
      const time = (Date.now() - startTime) / 1000
      gl.uniform1f(u_timeLoc, time)
      gl.uniform2f(u_resolutionLoc, gl.canvas.width, gl.canvas.height)

      if (u_texture) gl.bindTexture(gl.TEXTURE_2D, u_texture)

      // clear the canvas before we start drawing on it.
      gl.clearColor(1.0, 1.0, Math.sin(time) / 2.0 + 0.5, 1.0)
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

      // set vertexBuffer to 'a_position' attribute
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)  // bind vertexBuffer to ARRAY_BUFFER
      gl.enableVertexAttribArray(a_positionLoc) // enable individual attributes
      const numComponents = 2  // pull out 2 values from vertexBuffer per iteration (=per vertex)
      const type = gl.FLOAT    // the data in the buffer is 32bit floats
      const normalize = false  // don't normalize
      const stride = 0         // how many bytes to get from one set of values to the next
      const offset = 0         // how many bytes inside the buffer to start from
      gl.vertexAttribPointer(a_positionLoc, numComponents, type, normalize, stride, offset) // Bind the buffer currently bound to gl.ARRAY_BUFFER to a generic vertex attribute

      // make a draw call
      const primitiveType = gl.TRIANGLE_STRIP // set how the vertices should connect
      const count = 4 // specify the number of indices (vertices) to be rendered
      gl.drawArrays(primitiveType, offset, count) // Render primitives from array data
      yield canvas

      while(!play) yield canvas
    }
  }

  // start rendering loop
  return rendering()
}
)})
    },
    {
      from: "@makio135/webgl-playground",
      name: "createShader",
      remote: "createShader"
    },
    {
      from: "@makio135/webgl-playground",
      name: "createProgram",
      remote: "createProgram"
    },
    {
      from: "@makio135/webgl-playground",
      name: "createVertexBuffer",
      remote: "createVertexBuffer"
    },
    {
      from: "@makio135/webgl-playground",
      name: "loadTexture",
      remote: "loadTexture"
    }
  ]
};

const m2 = {
  id: "@makio135/webgl-playground",
  variables: [
    {
      name: "createShader",
      value: (function(){return(
(gl, type, src) => {
  // create shader and compile it
  const shader = gl.createShader(type)
  gl.shaderSource(shader, src)
  gl.compileShader(shader)

  // check compilation status
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (!success) {
    const info = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error(`Couldn't compile shader: ${info}`)
  }
  
  return shader
}
)})
    },
    {
      name: "createProgram",
      value: (function(){return(
(gl, vertexShader, fragmentShader) => {
  const program = gl.createProgram()

  // link compiled shader to program
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  // check program status
  const success = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (!success) {
    const info = gl.getProgramInfoLog(program)
    throw new Error(`Couldn't link shader: ${info}`)
    gl.deleteProgram(program)
  }
  
  return program
}
)})
    },
    {
      name: "createVertexBuffer",
      value: (function(){return(
(gl) => {
  // create an array of vertices
  const vertices = [
    0, gl.canvas.height, // top left
    gl.canvas.width, gl.canvas.height, // top right
    0, 0, // bottom left
    gl.canvas.width, 0 // bottom right
  ]

  // create a buffer
  const vertexBuffer = gl.createBuffer() 
  // and select it as the one to apply buffer operations to from here out
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer) 
  // pass the vertices as a Float32Array and use it to fill the current buffer
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
  
  return vertexBuffer
}
)})
    },
    {
      name: "loadTexture",
      inputs: ["DOM"],
      value: (function(DOM){return(
(gl, url) => new Promise((resolve, reject) => {
  const image = new Image
  image.crossOrigin = "anonymous"
  image.onerror = reject
  image.onload = () => {
    const size = 2048
    const context = DOM.context2d(size, size, 1)
    context.canvas.style = "height: 60px; display: block;"
    context.scale(1, -1)
    context.drawImage(image, 0, 0, image.naturalWidth, image.naturalWidth, 0, -size, size, size)

    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, context.canvas)
    resolve(texture)
  }
  image.src = url
})
)})
    }
  ]
};

const m3 = {
  id: "@makio135/iq-sdf",
  variables: [
    {
      name: "sdSphere",
      value: (function(){return(
() => `
float sdSphere(vec3 p, float radius) {
  return length(p) - radius;
}`
)})
    },
    {
      name: "sdBox",
      value: (function(){return(
() => `
float sdBox(vec3 p, vec3 b) {
  vec3 d = abs(p) - b;
  return length(max(d, 0.0))
    + min(max(d.x, max(d.y, d.z)), 0.0); // remove this line for an only partially signed sdf 
}`
)})
    },
    {
      name: "sdCappedCone",
      inputs: ["dot2"],
      value: (function(dot2){return(
() => `
${dot2()}

float sdCappedCone(in vec3 p, in float h, in float r1, in float r2) {
  vec2 q = vec2(length(p.xz), p.y);

  vec2 k1 = vec2(r2, h);
  vec2 k2 = vec2(r2 - r1, 2.0 * h);
  vec2 ca = vec2(q.x - min(q.x,(q.y < 0.0) ? r1 : r2), abs(q.y) - h);
  vec2 cb = q - k1 + k2 * clamp(dot(k1 - q, k2) / dot2(k2), 0.0, 1.0);
  float s = (cb.x < 0.0 && ca.y < 0.0) ? -1.0 : 1.0;
  return s*sqrt(min(dot2(ca), dot2(cb)));
}`
)})
    },
    {
      name: "sdCappedCylinder",
      value: (function(){return(
() => `
float sdCappedCylinder(vec3 p, float h, float r) {
  vec2 d = abs(vec2(length(p.xz), p.y)) - vec2(r, h);
  return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));
}`
)})
    },
    {
      name: "sdOctahedron",
      value: (function(){return(
() => `
float sdOctahedron(in vec3 p, in float s) {
  p = abs(p);
  float m = p.x + p.y + p.z - s;
  vec3 q;
  if(3.0 * p.x < m) q = p.xyz;
  else if(3.0 * p.y < m) q = p.yzx;
  else if(3.0 * p.z < m) q = p.zxy;
  else return m * 0.57735027;

  float k = clamp(0.5 * (q.z - q.y + s), 0.0, s); 
  return length(vec3(q.x, q.y - s + k, q.z - k)); 
}`
)})
    },
    {
      name: "opBlend",
      value: (function(){return(
() => `
// from https://www.alanzucconi.com/2016/07/01/signed-distance-functions/#part4
float opBlend(float sdf1, float sdf2, float amount) {
  return amount * sdf1 + (1. - amount) * sdf2;
}`
)})
    },
    {
      name: "opUnion",
      value: (function(){return(
() => `
float opUnion(float d1, float d2) {
  return min(d1, d2);
}`
)})
    },
    {
      name: "opSmoothUnion",
      value: (function(){return(
() => `
// from http://www.iquilezles.org/www/articles/smin/smin.htm
float opSmoothUnion(float a, float b, float k) {
  float h = max(k - abs(a - b), 0.0 ) / k;
  return min(a, b) - h * h * h * k * (1.0 / 6.0);
}`
)})
    },
    {
      name: "opSubtraction",
      value: (function(){return(
() => `
// subtract d1 from d2
float opSubtraction(float d1, float d2) {
  return max(-d1, d2);
}`
)})
    },
    {
      name: "opIntersection",
      value: (function(){return(
() => `
float opIntersection(float d1, float d2) {
  return max(d1, d2);
}`
)})
    },
    {
      name: "rotateX",
      value: (function(){return(
() => `
// Rotation matrix around the X axis.
mat3 rotateX(float theta) {
  float c = cos(theta);
  float s = sin(theta);
  return mat3(
    vec3(1, 0, 0),
    vec3(0, c, -s),
    vec3(0, s, c)
  );
}`
)})
    },
    {
      name: "rotateY",
      value: (function(){return(
() => `
// Rotation matrix around the Y axis.
mat3 rotateY(float theta) {
    float c = cos(theta);
    float s = sin(theta);
    return mat3(
        vec3(c, 0, s),
        vec3(0, 1, 0),
        vec3(-s, 0, c)
    );
}`
)})
    },
    {
      name: "rotateZ",
      value: (function(){return(
() => `
// Rotation matrix around the Z axis.
mat3 rotateZ(float theta) {
    float c = cos(theta);
    float s = sin(theta);
    return mat3(
        vec3(c, -s, 0),
        vec3(s, c, 0),
        vec3(0, 0, 1)
    );
}`
)})
    },
    {
      name: "dot2",
      value: (function(){return(
() => `
#ifndef DOT2
#define DOT2
float dot2(in vec2 v) {
  return dot(v, v);
}

float dot2(in vec3 v) {
  return dot(v, v);
}
#endif`
)})
    }
  ]
};

const notebook = {
  id: "ff6ed85ab9911915@2139",
  modules: [m0,m1,m2,m3]
};

export default notebook;
