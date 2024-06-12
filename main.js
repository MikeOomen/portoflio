import * as BABYLON from '@babylonjs/core';
import "@babylonjs/loaders";
import { Inspector } from '@babylonjs/inspector';
import { Player } from './scripts/Player';
import * as cannon from "cannon";

const canvas = document.getElementById('rendererCanvas');

window.CANNON = cannon;

const engine = new BABYLON.Engine(canvas);

const CreateScene = async function() {
  const scene = new BABYLON.Scene(engine);

  await BABYLON.SceneLoader.AppendAsync("/Scenes/", "game.babylon", scene);
      
  scene.executeWhenReady(function() {
      if (scene.cameras.length > 0) {
          scene.activeCamera = scene.cameras[0]; 
      } else {
          console.error("No camera defined in the scene.");
      }
      console.log("Cameras in the scene:", scene.cameras);
  });

  let gravityVector = new BABYLON.Vector3(0,-9.81, 0);
  let physicsPlugin = new BABYLON.CannonJSPlugin();
  scene.enablePhysics(gravityVector, physicsPlugin);

  const box = scene.getMeshById("BoxTest");

  box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, scene);

  const player = new Player(box);

  box.addBehavior(player);

  return scene;
};

const scene = await CreateScene();

scene.registerBeforeRender(function() {

});

engine.runRenderLoop(function() {
  scene.render();
});

window.addEventListener('resize', function() {
  engine.resize();
});

Inspector.Show(scene, {});