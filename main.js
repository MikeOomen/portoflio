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
  const terrian = scene.getMeshById("Ground");

  if (box) {
    box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);

    const player = new Player(box);

    box.addBehavior(player);
  } else {
    console.error("BoxTest mesh not found in the scene.");
  }

  if (terrian){
    terrian.physicsImpostor = new BABYLON.PhysicsImpostor(terrian, BABYLON.PhysicsImpostor.BoxImpostor, {enablePhysics: false}, scene);
  }

  for (let index = 0; index < 500; index++) {
    const newBox = BABYLON.CreateBox("box" + index);

    newBox.position = new BABYLON.Vector3(
      Math.random() * (100 - -100) + -100, Math.random() * (10 - 1) + 1, Math.random() * (100 - -100)
    )
    newBox.physicsImpostor = new BABYLON.PhysicsImpostor(newBox, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene); 
    
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


