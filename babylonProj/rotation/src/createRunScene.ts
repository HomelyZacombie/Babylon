import { Vector3, Quaternion } from "@babylonjs/core";

import { SceneData } from "./interfaces";

// rotate box
let boxAngle: number = 0.3;
let boxSpeed: number = 0.01;



// move light in ellipse and cycle luma
let lightAngle: number = 0;
let lightSpeed: number = 0.005;
const lightXpos: number = 1;
const lightZpos: number = 5;

// vertical oscilation of meshes
//This handles the how quickly the object goes between 2 point. 1 is normal speed, 2 fast, below slow
let verticalSpeed: number = 0.003;
//------ dont know
let verticalAngle: number = 0;
//Range is how far the 2 location poitns are. Position you know
let BverticalRangeY: number = 2;
let BhorizontalRangeX: number = 2;
let SverticalRangeY: number = 0.5;
let boxPositionY: number = 7.4;
let box3PositionX: number = 0;
let spherePositionY: number = 3.2;


export default function createRunScene(runScene: SceneData) {
    runScene.scene.onAfterRenderObservable.add(() => {
      // const axis (0, 0, 0) handles which way on the XYZ the object rotates
      const axis: Vector3 = new Vector3(1, 0, 0).normalize();
      const axis2: Vector3 = new Vector3(0, 1, 0).normalize();
      const axis4: Vector3 = new Vector3(0, -1, 0).normalize();
      const quat: Quaternion = Quaternion.RotationAxis(
        axis,
        boxAngle * 3 * Math.PI,
       
      );
      const quat2: Quaternion = Quaternion.RotationAxis(
        axis2,
        //can be used to control speed privetly to minimum 1
        boxAngle * 1 * Math.PI
      );
      const quat4: Quaternion = Quaternion.RotationAxis(
        axis4,
        //can be used to control speed privetly to minimum 1
        boxAngle * 1 * Math.PI
      );
      
      runScene.box.rotationQuaternion = quat;
      runScene.box2.rotationQuaternion = quat2;
      runScene.box4.rotationQuaternion = quat4;
      boxAngle += boxSpeed;
      boxAngle %= 1;
      
  
      
    // move light in ellipse  and cycle luma
    runScene.lightSpot.position = new Vector3(
        lightXpos + 8 * Math.sin(lightAngle * 2 * Math.PI),
        20,
        lightZpos + 10 * Math.cos(lightAngle * 2 * Math.PI)
      );
      runScene.lightSpot.intensity = 0.7 * Math.sin(lightAngle * 2 * Math.PI);
      lightAngle += lightSpeed;
      lightAngle %= 1;
  
          // vertical oscilation of meshes ????
    runScene.box.position.y =
    //VerticalAngle is how many times it reachs the 2 positions before replaying. if set to an odd number
    //it bounces of the starting point
    boxPositionY + BverticalRangeY * Math.sin(verticalAngle * 3 * Math.PI);
  runScene.box3.position.x =
    box3PositionX + BhorizontalRangeX* Math.sin(verticalAngle * 4 * Math.PI);
  runScene.sphere.position.y =
    spherePositionY - SverticalRangeY * Math.sin(verticalAngle * 2 * Math.PI);
  verticalAngle += verticalSpeed;
  verticalAngle %= 1;
});
}
