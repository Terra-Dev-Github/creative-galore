// This file was made, modified and compiled by Heavenly (@heavenly7493) for TERRA.
// Do not distribute without permission.

// import necessary modules from Minecraft server API
import { world } from '@minecraft/server';

// subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // register a custom component named terra:on_shutter_interact for shutter interaction 
    eventData.blockComponentRegistry.registerCustomComponent('terra:on_shutter_interact', {
        // define the behavior when a player interacts with the shutter
        onPlayerInteract: (e) => {
            // destructure event data for easier access
            const { block, dimension } = e;
            const isOpen = block.permutation.getState('terra:open');
            const sound = isOpen ? 'close.wooden_trapdoor' : 'open.wooden_trapdoor';

            block.setPermutation(block.permutation.withState("terra:open", !isOpen));

            dimension.playSound(sound, block.center(), {
                pitch: 0.9,
                volume: 0.9,
            });
        },
        // define if the shutter is flipped when placed
        onPlace: (e) => {
            // destructure event data for easier access
            const { block } = e;

            // cancel the event for small shutters
            if (!block.permutation.getState('terra:shutter_side')) return;

            // get adjacent blocks and main block's cardinal direction
            const north = block.north();
            const east = block.east();
            const south = block.south();
            const west = block.west();
            const cardinalDirection = block?.permutation.getState('minecraft:cardinal_direction');

            // get all states for adjacent blocks
            const northShutter = north.permutation.getAllStates();
            const eastShutter = east.permutation.getAllStates();
            const southShutter = south.permutation.getAllStates();
            const westShutter = west.permutation.getAllStates();

            // if a block on its right side is found, the shutter will be flipped
            // if said block is a shutter, test for the flipped condition first to make pairs
            if (cardinalDirection === 'north') {
                if (east?.typeId != 'minecraft:air') block.permutation.withState('terra:shutter_side', (!eastShutter['terra:shutter_side']) ? 1 : 0)
            };
            if (cardinalDirection === 'south') {
                if (west?.typeId != 'minecraft:air') block.permutation.withState('terra:shutter_side', (!westShutter['terra:shutter_side']) ? 1 : 0)
            };
            if (cardinalDirection === 'east') {
                if (north?.typeId != 'minecraft:air') block.permutation.withState('terra:shutter_side', (!northShutter['terra:shutter_side']) ? 1 : 0)
            };
            if (cardinalDirection === 'west') {
                if (south?.typeId != 'minecraft:air') block.permutation.withState('terra:shutter_side', (!southShutter['terra:shutter_side']) ? 1 : 0)
            };
        }
    });
});