import * as BABYLON from '@babylonjs/core';
import { Time } from "./Time"

export class CameraFollow {
    constructor() {
        this.keys = {};
        this.speed = 1;
    }

    init() {

    }


    attach(owner) {
        this.gameObject = owner;
        this._scene = this.gameObject.getScene();
        const player = this._scene.getMeshById("BoxTest");
        this._beforeRenderObserver = this._scene.onBeforeRenderObservable.add(() => {
            let deltaTime = Time.DeltaTime();
            this.gameObject.position = BABYLON.Vector3.Lerp(this.gameObject.position, player.position, this.speed * deltaTime);
        });
    }

    detach() {
        if (this._beforeRenderObserver) {
            this._scene.onBeforeRenderObservable.remove(this._beforeRenderObserver);
            this._beforeRenderObserver = null;
        }
        
        this.gameObject = null;
    }
}