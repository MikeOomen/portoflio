import { ScriptMap } from "./tools";

/**
 * Defines the interface that exposes all exported scripts in this project.
 */
export interface ISceneScriptMap {
	"src/scenes/scene/player.ts": ScriptMap;
	"src/scenes/scene/playerCamera.ts": ScriptMap;
	"src/scenes/Scripts/Player.ts": ScriptMap;
}

/**
 * Defines the map of all available scripts in the project.
 */
export const scriptsMap: ISceneScriptMap = {
	"src/scenes/scene/player.ts": require("./scene/player"),
	"src/scenes/scene/playerCamera.ts": require("./scene/playerCamera"),
	"src/scenes/Scripts/Player.ts": require("./Scripts/Player"),
}
