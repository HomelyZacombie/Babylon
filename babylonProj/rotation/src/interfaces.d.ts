import {
    Scene,
    Mesh,
    HemisphericLight,
    PointLight,
    SpotLight,
    DirectionalLight,
    Camera,
    ShadowGenerator,
  } from "@babylonjs/core";
  
  export interface SceneData {
    scene: Scene;
    torus: Mesh;
    box: Mesh;
    box2: Mesh;
    box3: Mesh;
    box4: Mesh;
    cone: Mesh;
    cone2: Mesh;
    cone3: Mesh;
    lightBulb: PointLight;
    lightDirectional?: DirectionalLight;
    lightSpot: SpotLight;
    lightHemispheric: HemisphericLight;
    sphere: Mesh;
    ground: Mesh;
    camera: Camera;
    shadowGenerator: ShadowGenerator;
  }
  