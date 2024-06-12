import * as BABYLON from '@babylonjs/core';
import "@babylonjs/loaders";
import { Inspector } from '@babylonjs/inspector';
import { Player } from './scripts/Player';
import * as cannon from "cannon";

const canvas = document.getElementById('rendererCanvas');

window.CANNON = cannon;

const engine = new BABYLON.Engine(canvas);

const CreateScene = function() {
  const scene = new BABYLON.Scene(engine);

  const appendPromise = new Promise((resolve, reject) => {
    BABYLON.SceneLoader.Append("./scenes/", "game.babylon", scene, function() {
      scene.executeWhenReady(function() {
        if (scene.cameras.length > 0) {
          scene.activeCamera = scene.cameras[0];
        } else {
          console.error("No camera defined in the scene.");
          reject("No camera defined in the scene.");
        }
        console.log("Cameras in the scene:", scene.cameras);
        resolve(scene);
      });
    }, null, function(scene, message, exception) {
      console.error("Error loading scene:", message, exception);
      reject(message);
    });
  });

  return appendPromise;
};

// Now CreateScene returns a promise
CreateScene().then(scene => {
  let gravityVector = new BABYLON.Vector3(0, -9.81, 0);
  let physicsPlugin = new BABYLON.CannonJSPlugin();
  scene.enablePhysics(gravityVector, physicsPlugin);

  const box = scene.getMeshById("BoxTest");

  if (box) {
    box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, scene);

    const player = new Player(box);

    box.addBehavior(player);
  } else {
    console.error("BoxTest mesh not found in the scene.");
  }

  // Register the render loop after everything is set up
  engine.runRenderLoop(() => {
    scene.render();
  });

  window.addEventListener('resize', () => {
    engine.resize();
  });

  Inspector.Show(scene, {});
}).catch(error => {
  console.error("Error in creating scene:", error);
});
