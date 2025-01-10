// This file was made, modified and compiled by Heavenly (@heavenly7493) for TERRA.
// Do not distribute without permission.

// :: NOTES ::
// * all scripts are the same when it comes to onPlace and onPlayerDestroy
// ** it runs the event under those conditions instead of constantly ticking (which lowers performance dramatically)

// import necessary modules from Minecraft server API
import { world } from '@minecraft/server';

// subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // register a custom component named 'terra:curtain_properties' for the block behavior (vertical connecting based on cardinal direction)
    eventData.blockComponentRegistry.registerCustomComponent('terra:curtain_properties', {
        onTick: (e) => {
            // destructure event data for easier access
            const { block } = e;

            // get blocks around our block and their direction
            const aboveBlock = block.above();
            const belowBlock = block.below();
            const cardinalDirection = block?.permutation.getState('minecraft:cardinal_direction');
            const aboveCardinalDirection = aboveBlock?.permutation.getState('minecraft:cardinal_direction');
            const belowCardinalDirection = belowBlock?.permutation.getState('minecraft:cardinal_direction');

            // define an array of blocks to include in vertical connecting (i.e. all curtains)
            const includeBlocks = [
                'terra:black_curtain',
                'terra:blue_curtain',
                'terra:brown_curtain',
                'terra:cyan_curtain',
                'terra:gray_curtain',
                'terra:green_curtain',
                'terra:light_blue_curtain',
                'terra:light_gray_curtain',
                'terra:lime_curtain',
                'terra:magenta_curtain',
                'terra:orange_curtain',
                'terra:pink_curtain',
                'terra:purple_curtain',
                'terra:red_curtain',
                'terra:white_curtain',
                'terra:yellow_curtain'
            ];

            // check if the adjacent block is in the array
            const aboveConnects = includeBlocks.includes(aboveBlock?.typeId);
            const belowConnects = includeBlocks.includes(belowBlock?.typeId);

            // update block states based on the surrounding blocks and their cardinal direction
            if (cardinalDirection === 'north') {
                if (aboveCardinalDirection === 'north') block.setPermutation(block.permutation.withState('terra:curtain_bottom', aboveConnects ? 1 : 0));
                else block.setPermutation(block.permutation.withState('terra:curtain_bottom', 0));

                if (belowCardinalDirection === 'north') block.setPermutation(block.permutation.withState('terra:curtain_top', belowConnects ? 1 : 0));
                else block.setPermutation(block.permutation.withState('terra:curtain_top', 0));
            };
            if (cardinalDirection === 'south') {
                if (aboveCardinalDirection === 'south') block.setPermutation(block.permutation.withState('terra:curtain_bottom', aboveConnects ? 1 : 0));
                else block.setPermutation(block.permutation.withState('terra:curtain_bottom', 0));

                if (belowCardinalDirection === 'south') block.setPermutation(block.permutation.withState('terra:curtain_top', belowConnects ? 1 : 0));
                else block.setPermutation(block.permutation.withState('terra:curtain_top', 0));
            };
            if (cardinalDirection === 'east') {
                if (aboveCardinalDirection === 'east') block.setPermutation(block.permutation.withState('terra:curtain_bottom', aboveConnects ? 1 : 0));
                else block.setPermutation(block.permutation.withState('terra:curtain_bottom', 0));

                if (belowCardinalDirection === 'east') block.setPermutation(block.permutation.withState('terra:curtain_top', belowConnects ? 1 : 0));
                else block.setPermutation(block.permutation.withState('terra:curtain_top', 0));
            };
            if (cardinalDirection === 'west') {
                if (aboveCardinalDirection === 'west') block.setPermutation(block.permutation.withState('terra:curtain_bottom', aboveConnects ? 1 : 0));
                else block.setPermutation(block.permutation.withState('terra:curtain_bottom', 0));

                if (belowCardinalDirection === 'west') block.setPermutation(block.permutation.withState('terra:curtain_top', belowConnects ? 1 : 0));
                else block.setPermutation(block.permutation.withState('terra:curtain_top', 0));
            };
        }
    });
});