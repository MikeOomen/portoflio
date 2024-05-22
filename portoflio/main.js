import * as BABYLON from '@babylonjs/core';

const canvas = document.getElementById('rendererCanvas');

const engine = new BABYLON.Engine(canvas);

const CreateScene = function(){
  const scene = new BABYLON.Scene(engine);

  scene.createDefaultCameraOrLight(true, false, true);

  const box = new BABYLON.MeshBuilder.CreateBox('BoxTest', {
    size: 1,
    width: 1,
    height: 1,
    depth: 1,
    faceColors: [
      new BABYLON.Color4(1,0,0,1),
      BABYLON.Color3.Green(),
      new BABYLON.Color4(0,0,1,1),
      new BABYLON.Color4(0.5,0,0.5,1),
      new BABYLON.Color4(0.5,0.5,0,1),
      new BABYLON.Color4(0,0.5,0.5,1)
    ]
  });

  const ground = new BABYLON.MeshBuilder.CreateGround('Ground', {
    width: 10,
    height: 10
  })

  return scene;
}

const scene = CreateScene();

engine.runRenderLoop(function() {
  scene.render();
})

window.addEventListener('resize', function() {
  engine.resize();
})