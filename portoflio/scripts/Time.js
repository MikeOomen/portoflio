export class Time {
    
    static DeltaTime() {
        if (!this.lastTime) {
            this.lastTime = performance.now();
            return 0;
        }

        const currentTime = performance.now();
        const deltaTime = (currentTime - this.lastTime) / 1000.0;
        this.lastTime = currentTime;
        
        return deltaTime;
    };
}