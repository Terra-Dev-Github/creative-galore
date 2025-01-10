import { world } from '@minecraft/server';

world.beforeEvents.worldInitialize.subscribe(eventData => {
    eventData.blockComponentRegistry.registerCustomComponent('terra:block_sitting', {
        onPlayerInteract: (e) => {
            const { block, player, dimension } = e;
            const aboveBlock = block.above();
            const playerStr = player.name;
            const blockStr = block.x + " " + block.y + " " + block.z;
            if (aboveBlock?.typeId === 'minecraft:air') {
                dimension.runCommand("summon terra:player_sit " + blockStr);
            } else return;
            dimension.runCommand("execute as @e[type=terra:player_sit,c=1] run tp @s " + blockStr + " facing @p");
            dimension.runCommand("ride " + playerStr + " start_riding @e[type=terra:player_sit,c=1] teleport_rider");
        },
        onPlayerDestroy: (e) => {
            const { player, block } = e;
            const playerLoc = player.location;
            playerLoc.x -= 0.5;
            playerLoc.z -= 0.5;

            if (playerLoc.x != block.location.x) return;
            if (playerLoc.y != block.location.y) return;
            if (playerLoc.z != block.location.z) return;

            player.runCommand("ride @s stop_riding");
        }
    });
});