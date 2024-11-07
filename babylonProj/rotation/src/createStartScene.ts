import { SceneData } from "./interfaces";

import {
  Scene,
  ArcRotateCamera,
  Vector3,
  MeshBuilder,
  Mesh,
  StandardMaterial,
  HemisphericLight,
  PointLight,
  SpotLight,
  DirectionalLight,
  Color3,
  ShadowGenerator,
  Engine,
  
} from "@babylonjs/core";

function createBox(scene) {
  let box = MeshBuilder.CreateBox("box", scene);
  box.position.y = 0;//whys this in if it dosent effect the object ?
  box.position.x = 0;
  return box;
}

function createBox2(scene) {
  let box = MeshBuilder.CreateBox("box", scene);
  box.position.y = 6;
  box.position.x = -2.2;
  box.position.z = -2.2;
  
  return box;
}

function createBox3(scene) {
  let box = MeshBuilder.CreateBox("box", scene);
  box.position.y = 6;
  box.position.z = 3;
 
  return box;
}

function createBox4(scene) {
  let box = MeshBuilder.CreateBox("box", scene);
  box.position.y = 6;
  box.position.x = 2.2;
  box.position.z = -2.2;
  return box;
}

function createSphere(scene: Scene) {
  let sphere = MeshBuilder.CreateSphere(
    "sphere",
    { diameter: 2, segments: 32 },
    scene
  );
  sphere.position.y = 12;
  return sphere;
}

function createTorus(scene){
  let torus = MeshBuilder.CreateTorus(
    "torus",
    { thickness: 0.5, diameter: 6},
    scene
  );
  //torus.position.x = 3;
  torus.position.y = 3;
  return torus;
}

function createCylinder(scene){
  let cylinder = MeshBuilder.CreateCylinder(
    "cylinder",
    {diameterTop: 0, diameter: 2, height: 5, subdivisions: 3, sideOrientation: 4},
    scene
  );
  cylinder.position.y = 2.5
  cylinder.position.x = -2.2
  cylinder.position.z = -2.2
  return cylinder;
}

function createCylinder2(scene){
  let cylinder = MeshBuilder.CreateCylinder(
    "cylinder",
    {diameterTop: 0, diameter: 2, height: 5,},
    scene
  );
  cylinder.position.y = 2.5
  cylinder.position.z = 3
  return cylinder;
}

function createCylinder3(scene){
  let cylinder = MeshBuilder.CreateCylinder(
    "cylinder",
    {diameterTop: 0, diameter: 2, height: 5},
    scene
  );
  
  
  cylinder.position.y = 2.5
  cylinder.position.x = 2.2
  cylinder.position.z = -2.2
  return cylinder;
}

function createGround(scene: Scene) {
  let ground = MeshBuilder.CreateGround(
    "ground",
    { width: 8, height: 8 },
    scene
  );

  var groundMaterial = new StandardMaterial("groundMaterial", scene);
  groundMaterial.backFaceCulling = false;
  ground.material = groundMaterial;
  ground.receiveShadows = true;
  return ground;
}

function createPointLight(scene: Scene) {
  const light = new PointLight("light", new Vector3(-1, 1, 0), scene);
  light.position = new Vector3(5, 20, 10);
  light.intensity = 0.3;
  light.diffuse = new Color3(0.5, 1, 1);
  light.specular = new Color3(0.8, 1, 1);
  return light;
}

function createDirectionalLight(scene: Scene) {
  const light = new DirectionalLight("light", new Vector3(0.2, -1, 0.2), scene);
  light.position = new Vector3(20, 40, 20);
  light.intensity = 0.7;
  light.diffuse = new Color3(1, 0, 0);
  light.specular = new Color3(0, 1, 0);
  return light;
}

function createSpotLight(scene: Scene) {
  const light = new SpotLight(
    "light",
    new Vector3(1, 5, -3),
    new Vector3(0, -1, 0),
    Math.PI / 3,
    20,
    scene
  );
  light.intensity = 0.7;
  light.diffuse = new Color3(1, 0, 0);
  light.specular = new Color3(0, 1, 0);
  return light;
}

function createHemisphericLight(scene: Scene) {
  const light: HemisphericLight = new HemisphericLight(
    "light",
    new Vector3(1, 10, 0),
    scene
  );
  light.intensity = 0.3;
  light.diffuse = new Color3(0, 2, 0);
  light.specular = new Color3(1, 0, 0);
  light.groundColor = new Color3(0, 0, 20);
  return light;
}

function createShadows(light: DirectionalLight, sphere: Mesh, box: Mesh) {
  const shadower = new ShadowGenerator(1024, light);
  const shadowmap: any = shadower.getShadowMap();
  shadowmap.renderList.push(sphere, box);

  shadower.setDarkness(0.2);
  shadower.useBlurExponentialShadowMap = true;
  shadower.blurScale = 4;
  shadower.blurBoxOffset = 1;
  shadower.useKernelBlur = true;
  shadower.blurKernel = 64;
  shadower.bias = 0;
  return shadower;
}


function createArcRotateCamera(scene: Scene) {
  let camAlpha = -Math.PI / 2,
    camBeta = Math.PI / 2.5,
    camDist = 10,
    camTarget = new Vector3(0, 0, 0);
  let camera = new ArcRotateCamera(
    "camera1",
    camAlpha,
    camBeta,
    camDist,
    camTarget,
    scene
  );
  camera.attachControl(true);
  return camera;
}

export default function createStartScene(engine: Engine) {
  let scene = new Scene(engine);
  //Objects
  let box = createBox(scene);
  let box2 = createBox2(scene);
  let box3 = createBox3(scene);
  let box4 = createBox4(scene);
  let torus = createTorus(scene);
  let sphere = createSphere(scene);
  let cone = createCylinder(scene);
  let cone2 = createCylinder2(scene);
  let cone3 = createCylinder3(scene);
  let ground = createGround(scene);
  //lighting
  let lightBulb = createPointLight(scene);
  let lightDirectional = createDirectionalLight(scene);
  let lightSpot = createSpotLight(scene);
  let lightHemispheric = createHemisphericLight(scene);
  //shadow and camara
  let camera = createArcRotateCamera(scene);
  let shadowGenerator = createShadows(lightDirectional, sphere, torus);

  let that: SceneData = {
    scene,
    box,
    box2,
    box3,
    box4,
    cone,
    cone2,
    cone3,
    torus,
    lightBulb,
    lightDirectional,
    lightSpot,
    lightHemispheric,
    sphere,
    ground,
    camera,
    shadowGenerator,
  };
  return that;
}
