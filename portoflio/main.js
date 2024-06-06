import * as BABYLON from '@babylonjs/core';
import "@babylonjs/loaders";
import { Inspector } from '@babylonjs/inspector';

const canvas = document.getElementById('rendererCanvas');

const engine = new BABYLON.Engine(canvas);

const CreateScene = async function() {
  const scene = new BABYLON.Scene(engine);

  try {
      
      await BABYLON.SceneLoader.AppendAsync("/Scenes/", "game.babylon", scene);
      
      scene.executeWhenReady(function() {
          if (scene.cameras.length > 0) {
              scene.activeCamera = scene.cameras[0]; 
          } else {
              console.error("No camera defined in the scene.");
          }



          console.log("Cameras in the scene:", scene.cameras);
      });
  } catch (error) {
      console.error("Error loading the scene:", error);
  }

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