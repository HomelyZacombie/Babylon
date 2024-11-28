import { SceneData } from "./interfaces";
import setSceneIndex from "./index";

import {
  Scene,
  ArcRotateCamera,
  Vector3,
  MeshBuilder,
  StandardMaterial,
  HemisphericLight,
  Color3,
  Engine,
  Texture,
  SceneLoader,
  AbstractMesh,
  ISceneLoaderAsyncResult,
  Sound,
  
  
} from "@babylonjs/core";
import createRunScene from "./createRunScene";
import * as GUI from "@babylonjs/gui";

function backgroundMusic(scene: Scene): Sound{
  let music = new Sound("music", "./assets/audio/arcade-kid.mp3", scene,  null ,
   {
      loop: true,
      autoplay: true
  });

  Engine.audioEngine!.useCustomUnlockedButton = true;

  // Unlock audio on first user interaction.
  window.addEventListener('click', () => {
    if(!Engine.audioEngine!.unlocked){
        Engine.audioEngine!.unlock();
    }
}, { once: true });
  return music;
}

function createGround(scene: Scene) {
  const groundMaterial = new StandardMaterial("groundMaterial");
  const groundTexture = new Texture("./assets/textures/wood.jpg");
  groundTexture.uScale  = 4.0; //Repeat 5 times on the Vertical Axes
  groundTexture.vScale  = 4.0; //Repeat 5 times on the Horizontal Axes
  groundMaterial.diffuseTexture = groundTexture;
 // groundMaterial.diffuseTexture = new Texture("./assets/textures/wood.jpg");
  groundMaterial.diffuseTexture.hasAlpha = true;

  groundMaterial.backFaceCulling = false;
  let ground = MeshBuilder.CreateGround(
    "ground",
    { width: 15, height: 15, subdivisions: 4 },
    scene
  );

  ground.material = groundMaterial;
  return ground;
}



function createHemisphericLight(scene: Scene) {
  const light = new HemisphericLight(
    "light",
    new Vector3(2, 1, 0), // move x pos to direct shadows
    scene
  );
  light.intensity = 0.7;
  light.diffuse = new Color3(1, 1, 1);
  light.specular = new Color3(1, 0.8, 0.8);
  light.groundColor = new Color3(0, 0.2, 0.7);
  return light;
}

function createArcRotateCamera(scene: Scene) {
  let camAlpha = -Math.PI / 2,
    camBeta = Math.PI / 2.5,
    camDist = 15,
    camTarget = new Vector3(0, 0, 0);
  let camera = new ArcRotateCamera(
    "camera1",
    camAlpha,
    camBeta,
    camDist,
    camTarget,
    scene
  );
  camera.lowerRadiusLimit = 9;
  camera.upperRadiusLimit = 25;
  camera.lowerAlphaLimit = 0;
  camera.upperAlphaLimit = Math.PI * 2;
  camera.lowerBetaLimit = 0;
  camera.upperBetaLimit = Math.PI / 2.02;

  camera.attachControl(true);
  return camera;
}

function createBox1(scene: Scene) {
  let box = MeshBuilder.CreateBox("box", { width: 1, height: 1 }, scene);
  box.position.x = -1;
  box.position.y = 4;
  box.position.z = 1;

  var texture = new StandardMaterial("reflective", scene);
  texture.ambientTexture = new Texture(
    "./assets/textures/reflectivity.png",
    scene
  );
  texture.diffuseColor = new Color3(1, 1, 1);
  box.material = texture;
  return box;
}

function createBox2(scene: Scene) {
  let box = MeshBuilder.CreateBox("box", { width: 1, height: 1 }, scene);
  box.position.x = -0.7;
  box.position.y = 8;
  box.position.z = 1;

  var texture = new StandardMaterial("reflective", scene);
  texture.ambientTexture = new Texture(
    "./assets/textures/reflectivity.png",
    scene
  );
  texture.diffuseColor = new Color3(1, 1, 1);
  box.material = texture;
  return box;
}


function importMeshA(scene: Scene, x: number, y: number) {
  let item: Promise<void | ISceneLoaderAsyncResult> =
    SceneLoader.ImportMeshAsync(
      "",
      "./assets/models/men/",
      "dummy3.babylon",
      scene
    );

  item.then((result) => {
    let character: AbstractMesh = result!.meshes[0];
    character.position.x = x;
    character.position.y = y + 0.1;
    character.scaling = new Vector3(1, 1, 1);
    character.rotation = new Vector3(0, 1.5, 0);

  });
  return item;
}




function createSceneButton(scene: Scene, name: string, index: string, x: string, y: string, advtex) {
  let button = GUI.Button.CreateSimpleButton(name, index);
      button.left = x;
      button.top = y;
      button.width = "160px";
      button.height = "60px";
      button.color = "white";
      button.cornerRadius = 20;
      button.background = "pink";

      const buttonClick = new Sound("MenuClickSFX", "./audio/menu-click.wav", scene, null, {
        loop: false,
        autoplay: false,
      });

      button.onPointerUpObservable.add(function() {
          console.log("THE BUTTON HAS BEEN CLICKED");
          buttonClick.play();
          setSceneIndex(0);
      });
      advtex.addControl(button);
      return button;
}



export default function gameScene(engine: Engine) {

  /*interface SceneData {
    scene: Scene;
    advancedTexture: GUI.AdvancedDynamicTexture;
    textBG: GUI.Rectangle;
    titleText: GUI.TextBlock;
    button1: GUI.Button;
  }*/

  let scene = new Scene(engine);
  let audio = backgroundMusic(scene);
  let lightHemispheric = createHemisphericLight(scene);
  let camera = createArcRotateCamera(scene);
  let box1 = createBox1(scene);
  let box2 = createBox2(scene);
  let player = importMeshA(scene, 0, 0);
  let ground = createGround(scene);

  

  let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI", true);
  let button1 = createSceneButton(scene, "but1", "Main ", "200px", "-200px", advancedTexture);

  let that: SceneData = {
    scene,
    audio,
    lightHemispheric,
    camera,
    box1,
    box2,
    player,
    ground,

    //advancedTexture,
    //button1,
  };

  createRunScene(that);
  return that;
}
