

import { Scene } from "@babylonjs/core/scene";
import { AnimationPropertiesOverride, AnimationRange, Nullable, Skeleton } from "@babylonjs/core";


export class bakedAnimations {

  animating: Boolean = false;
  walkRange: Nullable<AnimationRange>;
  runRange: Nullable<AnimationRange>;
  leftRange: Nullable<AnimationRange>;
  rightRange: Nullable<AnimationRange>;
  idleRange: Nullable<AnimationRange>;
  animScene: Scene;
  animSkeleton: Skeleton;

  // constructor
  constructor(myscene: Scene, skeleton: Skeleton) {
    // use baked in animations
    this.animScene = myscene;
    this.animSkeleton = skeleton;
    this.animSkeleton.animationPropertiesOverride = new AnimationPropertiesOverride();
    this.animSkeleton.animationPropertiesOverride.enableBlending = true;
    this.animSkeleton.animationPropertiesOverride.blendingSpeed = 0.05;
    this.animSkeleton.animationPropertiesOverride.loopMode = 1;

    this.walkRange = skeleton.getAnimationRange("YBot_Walk");
    this.runRange = skeleton.getAnimationRange("YBot_Run");
    this.leftRange = skeleton.getAnimationRange("YBot_LeftStrafeWalk");
    this.rightRange = skeleton.getAnimationRange("YBot_RightStrafeWalk");
    this.idleRange = skeleton.getAnimationRange("YBot_Idle");



  }

  walk() {
    this.animScene.beginAnimation(this.animSkeleton, this.walkRange!.from, this.walkRange!.to, true);
  }

  run() {
    this.animScene.beginAnimation(this.animSkeleton, this.runRange!.from, this.runRange!.to, true);
  }

  left() {
    this.animScene.beginAnimation(this.animSkeleton, this.leftRange!.from, this.leftRange!.to, true);
  }

  right() {
    this.animScene.beginAnimation(this.animSkeleton, this.rightRange!.from, this.rightRange!.to, true);
  }

  idle() {
    this.animScene.beginAnimation(this.animSkeleton, this.idleRange!.from, this.idleRange!.to, true);
  }

  stopAnimation() {
    this.animScene.stopAnimation(this.animSkeleton);
  }

  getAnimating(): Boolean { return this.animating };

  toggleAnimating() { this.animating = !this.animating };

  info() {
    // console.log(this.idleRange!.from, this.idleRange!.to);
  }
}
