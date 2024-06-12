import { Time } from "./Time"

export class Player {
    constructor() {
        this.keys = {};
        this.speed = 1;
    }

    init() {
        window.addEventListener("keydown", this.keydownHandler.bind(this));
        window.addEventListener("keyup", this.keyupHandler.bind(this));
    }

    keydownHandler(event) {
        this.keys[event.key] = true;
    }

    keyupHandler(event) {
        this.keys[event.key] = false;
    }

    attach(owner) {
        this.gameObject = owner;
        this._scene = this.gameObject.getScene();

        this._beforeRenderObserver = this._scene.onBeforeRenderObservable.add(() => {
            let deltaTime = Time.DeltaTime();
            if (this.keys["w"]) this.gameObject.position.z -= this.speed * deltaTime;
            if (this.keys["s"]) this.gameObject.position.z += this.speed * deltaTime;
            if (this.keys["a"]) this.gameObject.position.x -= this.speed * deltaTime;
            if (this.keys["d"]) this.gameObject.position.x += this.speed * deltaTime;
        });
    }

    detach() {
        if (this._beforeRenderObserver) {
            this._scene.onBeforeRenderObservable.remove(this._beforeRenderObserver);
            this._beforeRenderObserver = null;
        }

        window.removeEventListener("keydown", this.keydownHandler);
        window.removeEventListener("keyup", this.keyupHandler);

        this.gameObject = null;
    }
}
