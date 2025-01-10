// This file was made, modified and compiled by Heavenly (@heavenly7493) for TERRA.
// Do not distribute without permission.

// :: NOTES ::
// * all scripts are the same when it comes to onPlace and onPlayerDestroy
// ** it runs the event under those conditions instead of constantly ticking (which lowers performance dramatically)

// import necessary modules from Minecraft server API
import { world } from '@minecraft/server';

// subscribe to the 'worldInitialize' event to register custom components
world.beforeEvents.worldInitialize.subscribe(eventData => {
    // register a custom component named terra:side_self_connect for blocks that only connect to themselves in a horizontal plane
    eventData.blockComponentRegistry.registerCustomComponent('terra:side_self_connect', {
        onPlace: (e) => {
            // destructure event data for easier access
            const { block } = e;

            // get adjacent blocks
            const north = block.north();
            const east = block.east();
            const south = block.south();
            const west = block.west();

            // update block states based on the presence of adjacent blocks that match the one placed
            if (north?.typeId === block.typeId) block.setPermutation(block.permutation.withState('terra:south_connect', north ? 1 : 0));
            else block.setPermutation(block.permutation.withState('terra:south_connect', 0));

            if (south?.typeId === block.typeId) block.setPermutation(block.permutation.withState('terra:north_connect', south ? 1 : 0));
            else block.setPermutation(block.permutation.withState('terra:north_connect', 0));

            if (east?.typeId === block.typeId) block.setPermutation(block.permutation.withState('terra:west_connect', east ? 1 : 0));
            else block.setPermutation(block.permutation.withState('terra:west_connect', 0));

            if (west?.typeId === block.typeId) block.setPermutation(block.permutation.withState('terra:east_connect', west ? 1 : 0));
            else block.setPermutation(block.permutation.withState('terra:east_connect', 0));
        },
        onPlayerDestroy: (e) => {
            // destructure event data for easier access
            const { block } = e;

            // get adjacent blocks
            const north = block.north();
            const east = block.east();
            const south = block.south();
            const west = block.west();

            // update block states based on the presence of adjacent blocks that match the one placed
            if (north?.typeId === block.typeId) block.setPermutation(block.permutation.withState('terra:south_connect', north ? 1 : 0));
            else block.setPermutation(block.permutation.withState('terra:south_connect', 0));

            if (south?.typeId === block.typeId) block.setPermutation(block.permutation.withState('terra:north_connect', south ? 1 : 0));
            else block.setPermutation(block.permutation.withState('terra:north_connect', 0));

            if (east?.typeId === block.typeId) block.setPermutation(block.permutation.withState('terra:west_connect', east ? 1 : 0));
            else block.setPermutation(block.permutation.withState('terra:west_connect', 0));

            if (west?.typeId === block.typeId) block.setPermutation(block.permutation.withState('terra:east_connect', west ? 1 : 0));
            else block.setPermutation(block.permutation.withState('terra:east_connect', 0));
        }
    });
    // register a custom component named terra:double_connect for block pairs that connect in a horizontal plane, based on their direction
    eventData.blockComponentRegistry.registerCustomComponent('terra:double_connect', {
        onPlace: (e) => {
            // destructure event data for easier access
            const { block } = e;

            // get adjacent blocks, their direction and states
            const north = block.north();
            const east = block.east();
            const south = block.south();
            const west = block.west();
            const cardinalDirection = block?.permutation.getState('minecraft:cardinal_direction');

            const northCD = north?.permutation.getState('minecraft:cardinal_direction');
            const southCD = south?.permutation.getState('minecraft:cardinal_direction');
            const eastCD = east?.permutation.getState('minecraft:cardinal_direction');
            const westCD = west?.permutation.getState('minecraft:cardinal_direction');

            // update block states based on the surrounding blocks and their cardinal direction
            if (cardinalDirection === 'north') {
                if (east?.typeId === block.typeId && eastCD === 'north' && !east.hasTag('terra:is_pair_connected')) {
                    block.setPermutation(block.permutation.withState('terra:block_left', east ? 1 : 0));
                } else block.setPermutation(block.permutation.withState('terra:block_left', 0));

                if (west?.typeId === block.typeId && westCD === 'north' && !west.hasTag('terra:is_pair_connected')) {
                    block.setPermutation(block.permutation.withState('terra:block_right', west ? 1 : 0));
                } else block.setPermutation(block.permutation.withState('terra:block_right', 0));
            };
            if (cardinalDirection === 'south') {
                if (east?.typeId === block.typeId && eastCD === 'south' && !east.hasTag('terra:is_pair_connected')) {
                    block.setPermutation(block.permutation.withState('terra:block_right', east ? 1 : 0));
                } else block.setPermutation(block.permutation.withState('terra:block_right', 0));

                if (west?.typeId === block.typeId && westCD === 'south' && !west.hasTag('terra:is_pair_connected')) {
                    block.setPermutation(block.permutation.withState('terra:block_left', west ? 1 : 0));
                } else block.setPermutation(block.permutation.withState('terra:block_left', 0));
            };
            if (cardinalDirection === 'east') {
                if (north?.typeId === block.typeId && northCD === 'east' && !north.hasTag('terra:is_pair_connected')) {
                    block.setPermutation(block.permutation.withState('terra:block_right', north ? 1 : 0));
                } else block.setPermutation(block.permutation.withState('terra:block_right', 0));

                if (south?.typeId === block.typeId && southCD === 'east' && !south.hasTag('terra:is_pair_connected')) {
                    block.setPermutation(block.permutation.withState('terra:block_left', south ? 1 : 0));
                } else block.setPermutation(block.permutation.withState('terra:block_left', 0));
            };
            if (cardinalDirection === 'west') {
                if (north?.typeId === block.typeId && northCD === 'west' && !north.hasTag('terra:is_pair_connected')) {
                    block.setPermutation(block.permutation.withState('terra:block_left', north ? 1 : 0));
                } else block.setPermutation(block.permutation.withState('terra:block_left', 0));

                if (south?.typeId === block.typeId && southCD === 'west' && !south.hasTag('terra:is_pair_connected')) {
                    block.setPermutation(block.permutation.withState('terra:block_right', south ? 1 : 0));
                } else block.setPermutation(block.permutation.withState('terra:block_right', 0));
            };
        },
        onPlayerDestroy: (e) => {
            // destructure event data for easier access
            const { block } = e;

            // get adjacent blocks, their direction and states
            const north = block.north();
            const east = block.east();
            const south = block.south();
            const west = block.west();
            const cardinalDirection = block?.permutation.getState('minecraft:cardinal_direction');

            const northCD = north?.permutation.getState('minecraft:cardinal_direction');
            const southCD = south?.permutation.getState('minecraft:cardinal_direction');
            const eastCD = east?.permutation.getState('minecraft:cardinal_direction');
            const westCD = west?.permutation.getState('minecraft:cardinal_direction');

            // update block states based on the surrounding blocks and their cardinal direction
            if (cardinalDirection === 'north') {
                if (east?.typeId === block.typeId && eastCD === 'north' && !east.hasTag('terra:is_pair_connected')) {
                    block.setPermutation(block.permutation.withState('terra:block_left', east ? 1 : 0));
                } else block.setPermutation(block.permutation.withState('terra:block_left', 0));

                if (west?.typeId === block.typeId && westCD === 'north' && !west.hasTag('terra:is_pair_connected')) {
                    block.setPermutation(block.permutation.withState('terra:block_right', west ? 1 : 0));
                } else block.setPermutation(block.permutation.withState('terra:block_right', 0));
            };
            if (cardinalDirection === 'south') {
                if (east?.typeId === block.typeId && eastCD === 'south' && !east.hasTag('terra:is_pair_connected')) {
                    block.setPermutation(block.permutation.withState('terra:block_right', east ? 1 : 0));
                } else block.setPermutation(block.permutation.withState('terra:block_right', 0));

                if (west?.typeId === block.typeId && westCD === 'south' && !west.hasTag('terra:is_pair_connected')) {
                    block.setPermutation(block.permutation.withState('terra:block_left', west ? 1 : 0));
                } else block.setPermutation(block.permutation.withState('terra:block_left', 0));
            };
            if (cardinalDirection === 'east') {
                if (north?.typeId === block.typeId && northCD === 'east' && !north.hasTag('terra:is_pair_connected')) {
                    block.setPermutation(block.permutation.withState('terra:block_right', north ? 1 : 0));
                } else block.setPermutation(block.permutation.withState('terra:block_right', 0));

                if (south?.typeId === block.typeId && southCD === 'east' && !south.hasTag('terra:is_pair_connected')) {
                    block.setPermutation(block.permutation.withState('terra:block_left', south ? 1 : 0));
                } else block.setPermutation(block.permutation.withState('terra:block_left', 0));
            };
            if (cardinalDirection === 'west') {
                if (north?.typeId === block.typeId && northCD === 'west' && !north.hasTag('terra:is_pair_connected')) {
                    block.setPermutation(block.permutation.withState('terra:block_left', north ? 1 : 0));
                } else block.setPermutation(block.permutation.withState('terra:block_left', 0));

                if (south?.typeId === block.typeId && southCD === 'west' && !south.hasTag('terra:is_pair_connected')) {
                    block.setPermutation(block.permutation.withState('terra:block_right', south ? 1 : 0));
                } else block.setPermutation(block.permutation.withState('terra:block_right', 0));
            };
        }
    });
    // register a custom component named terra:lateral_connect for multiple blocks that connect in a horizontal plane, based on their direction
    eventData.blockComponentRegistry.registerCustomComponent('terra:lateral_connect', {
        onPlace: (e) => {
            // destructure event data for easier access
            const { block } = e;

            // get adjacent blocks, their direction and states
            const north = block.north();
            const east = block.east();
            const south = block.south();
            const west = block.west();
            const cardinalDirection = block?.permutation.getState('minecraft:cardinal_direction');

            const northCD = north?.permutation.getState('minecraft:cardinal_direction');
            const southCD = south?.permutation.getState('minecraft:cardinal_direction');
            const eastCD = east?.permutation.getState('minecraft:cardinal_direction');
            const westCD = west?.permutation.getState('minecraft:cardinal_direction');

            // update block states based on the surrounding blocks and their cardinal direction
            if (cardinalDirection === 'north') {
                if (east?.typeId === block.typeId && eastCD === 'north') {
                    block.setPermutation(block.permutation.withState('terra:block_left', east ? 1 : 0));
                } else block.setPermutation(block.permutation.withState('terra:block_left', 0));

                if (west?.typeId === block.typeId && westCD === 'north') {
                    block.setPermutation(block.permutation.withState('terra:block_right', west ? 1 : 0));
                } else block.setPermutation(block.permutation.withState('terra:block_right', 0));
            };
            if (cardinalDirection === 'south') {
                if (east?.typeId === block.typeId && eastCD === 'south') {
                    block.setPermutation(block.permutation.withState('terra:block_right', east ? 1 : 0));
                } else block.setPermutation(block.permutation.withState('terra:block_right', 0));

                if (west?.typeId === block.typeId && westCD === 'south') {
                    block.setPermutation(block.permutation.withState('terra:block_left', west ? 1 : 0));
                } else block.setPermutation(block.permutation.withState('terra:block_left', 0));
            };
            if (cardinalDirection === 'east') {
                if (north?.typeId === block.typeId && northCD === 'east') {
                    block.setPermutation(block.permutation.withState('terra:block_right', north ? 1 : 0));
                } else block.setPermutation(block.permutation.withState('terra:block_right', 0));

                if (south?.typeId === block.typeId && southCD === 'east') {
                    block.setPermutation(block.permutation.withState('terra:block_left', south ? 1 : 0));
                } else block.setPermutation(block.permutation.withState('terra:block_left', 0));
            };
            if (cardinalDirection === 'west') {
                if (north?.typeId === block.typeId && northCD === 'west') {
                    block.setPermutation(block.permutation.withState('terra:block_left', north ? 1 : 0));
                } else block.setPermutation(block.permutation.withState('terra:block_left', 0));

                if (south?.typeId === block.typeId && southCD === 'west') {
                    block.setPermutation(block.permutation.withState('terra:block_right', south ? 1 : 0));
                } else block.setPermutation(block.permutation.withState('terra:block_right', 0));
            };
        },
        onPlayerDestroy: (e) => {
            // destructure event data for easier access
            const { block } = e;

            // get adjacent blocks, their direction and states
            const north = block.north();
            const east = block.east();
            const south = block.south();
            const west = block.west();
            const cardinalDirection = block?.permutation.getState('minecraft:cardinal_direction');

            const northCD = north?.permutation.getState('minecraft:cardinal_direction');
            const southCD = south?.permutation.getState('minecraft:cardinal_direction');
            const eastCD = east?.permutation.getState('minecraft:cardinal_direction');
            const westCD = west?.permutation.getState('minecraft:cardinal_direction');

            // update block states based on the surrounding blocks and their cardinal direction
            if (cardinalDirection === 'north') {
                if (east?.typeId === block.typeId && eastCD === 'north') {
                    block.setPermutation(block.permutation.withState('terra:block_left', east ? 1 : 0));
                } else block.setPermutation(block.permutation.withState('terra:block_left', 0));

                if (west?.typeId === block.typeId && westCD === 'north') {
                    block.setPermutation(block.permutation.withState('terra:block_right', west ? 1 : 0));
                } else block.setPermutation(block.permutation.withState('terra:block_right', 0));
            };
            if (cardinalDirection === 'south') {
                if (east?.typeId === block.typeId && eastCD === 'south') {
                    block.setPermutation(block.permutation.withState('terra:block_right', east ? 1 : 0));
                } else block.setPermutation(block.permutation.withState('terra:block_right', 0));

                if (west?.typeId === block.typeId && westCD === 'south') {
                    block.setPermutation(block.permutation.withState('terra:block_left', west ? 1 : 0));
                } else block.setPermutation(block.permutation.withState('terra:block_left', 0));
            };
            if (cardinalDirection === 'east') {
                if (north?.typeId === block.typeId && northCD === 'east') {
                    block.setPermutation(block.permutation.withState('terra:block_right', north ? 1 : 0));
                } else block.setPermutation(block.permutation.withState('terra:block_right', 0));

                if (south?.typeId === block.typeId && southCD === 'east') {
                    block.setPermutation(block.permutation.withState('terra:block_left', south ? 1 : 0));
                } else block.setPermutation(block.permutation.withState('terra:block_left', 0));
            };
            if (cardinalDirection === 'west') {
                if (north?.typeId === block.typeId && northCD === 'west') {
                    block.setPermutation(block.permutation.withState('terra:block_left', north ? 1 : 0));
                } else block.setPermutation(block.permutation.withState('terra:block_left', 0));

                if (south?.typeId === block.typeId && southCD === 'west') {
                    block.setPermutation(block.permutation.withState('terra:block_right', south ? 1 : 0));
                } else block.setPermutation(block.permutation.withState('terra:block_right', 0));
            };
        }
    });
    // register a custom component named 'terra:wall_connect' for wall blocks that only connect in a horizontal plane
    eventData.blockComponentRegistry.registerCustomComponent('terra:wall_connect', {
        onPlace: (e) => {
            // destructure event data for easier access
            const { block } = e;
            block.permutation.withState('terra:upper_pieces', 0)

            // get adjacent blocks
            const aboveBlock = block.above();
            const north = block.north();
            const east = block.east();
            const south = block.south();
            const west = block.west();

            // define an array of block types to exclude from connections
            const excludeBlocksArray = [
                'minecraft:air',
                'minecraft:snow_layer',
                'minecraft:wooden_door',
                'minecraft:iron_door',
                'minecraft:acacia_door',
                'minecraft:birch_door',
                'minecraft:crimson_door',
                'minecraft:dark_oak_door',
                'minecraft:jungle_door',
                'minecraft:oak_door',
                'minecraft:spruce_door',
                'minecraft:warped_door',
                'minecraft:mangrove_door',
                'minecraft:cherry_door',
                'minecraft:bamboo_door',
                'minecraft:iron_trapdoor',
                'minecraft:acacia_trapdoor',
                'minecraft:birch_trapdoor',
                'minecraft:crimson_trapdoor',
                'minecraft:dark_oak_trapdoor',
                'minecraft:jungle_trapdoor',
                'minecraft:oak_trapdoor',
                'minecraft:spruce_trapdoor',
                'minecraft:warped_trapdoor',
                'minecraft:mangrove_trapdoor',
                'minecraft:cherry_trapdoor',
                'minecraft:bamboo_trapdoor',
                'minecraft:trapdoor',
                // custom excluded blocks from other add-ons
                'terra:poplar_trapdoor',
                'terra:lab_trapdoor'
                // add other block types you want to exclude
            ];

            // check if the adjacent block is not in the excludeBlocksArray
            const northConnects = !excludeBlocksArray.includes(north?.typeId);
            const eastConnects = !excludeBlocksArray.includes(east?.typeId);
            const southConnects = !excludeBlocksArray.includes(south?.typeId);
            const westConnects = !excludeBlocksArray.includes(west?.typeId);

            // define an array of blocks that aren't completely solid, but can change their states and therefore the type of connection above
            const conditionedBlocksArray = [
                'minecraft:fence',
                'minecraft:wall',
                // custom conditioned blocks from other add-ons
                'terra:andesite_brick_wall',
                'terra:bone_brick_wall',
                'terra:diorite_brick_wall',
                'terra:dripstone_brick_wall',
                'terra:granite_brick_wall',
                'terra:mixed_stonebrick_wall',
                'terra:polished_andesite_brick_wall',
                'terra:polished_bone_brick_wall',
                'terra:polished_diorite_brick_wall',
                'terra:polished_dripstone_brick_wall',
                'terra:polished_granite_brick_wall',
                'terra:polished_limestone_brick_wall',
                'terra:polished_schist_brick_wall',
                'terra:schist_brick_wall'
            ];

            // check if the above block has certain conditions based on these arrays
            const fullAboveBlock = !conditionedBlocksArray.includes(aboveBlock?.typeId);

            // update block states based on the presence of adjacent blocks
            block.setPermutation(block.permutation.withState('terra:north', northConnects ? 1 : 0));
            block.setPermutation(block.permutation.withState('terra:south', southConnects ? 1 : 0));
            block.setPermutation(block.permutation.withState('terra:east', eastConnects ? 1 : 0));
            block.setPermutation(block.permutation.withState('terra:west', westConnects ? 1 : 0));

            // if above block isn't conditioned, toggle upper pieces
            if (aboveBlock.typeId !== 'minecraft:air' && !aboveBlock.hasTag('terra:conditioned_hollow')) {
                block.setPermutation(block.permutation.withState('terra:upper_pieces', fullAboveBlock ? 1 : 0));
            } else block.setPermutation(block.permutation.withState('terra:upper_pieces', 0));

            // if above block is conditioned and has upper pieces, toggle the former
            if (aboveBlock.typeId !== 'minecraft:air' && aboveBlock.hasTag('terra:conditioned_hollow')) {
                block.setPermutation(block.permutation.withState('terra:upper_pieces', aboveBlock.permutation.withState('terra:upper_pieces', 0) ? 1 : 0));
            } else block.setPermutation(block.permutation.withState('terra:upper_pieces', 0));
        },
        onPlayerDestroy: (e) => {
            // destructure event data for easier access
            const { block } = e;
            block.permutation.withState('terra:upper_pieces', 0)

            // get adjacent blocks
            const aboveBlock = block.above();
            const north = block.north();
            const east = block.east();
            const south = block.south();
            const west = block.west();

            // define an array of block types to exclude from connections
            const excludeBlocksArray = [
                'minecraft:air',
                'minecraft:snow_layer',
                'minecraft:wooden_door',
                'minecraft:iron_door',
                'minecraft:acacia_door',
                'minecraft:birch_door',
                'minecraft:crimson_door',
                'minecraft:dark_oak_door',
                'minecraft:jungle_door',
                'minecraft:oak_door',
                'minecraft:spruce_door',
                'minecraft:warped_door',
                'minecraft:mangrove_door',
                'minecraft:cherry_door',
                'minecraft:bamboo_door',
                'minecraft:iron_trapdoor',
                'minecraft:acacia_trapdoor',
                'minecraft:birch_trapdoor',
                'minecraft:crimson_trapdoor',
                'minecraft:dark_oak_trapdoor',
                'minecraft:jungle_trapdoor',
                'minecraft:oak_trapdoor',
                'minecraft:spruce_trapdoor',
                'minecraft:warped_trapdoor',
                'minecraft:mangrove_trapdoor',
                'minecraft:cherry_trapdoor',
                'minecraft:bamboo_trapdoor',
                'minecraft:trapdoor',
                // custom excluded blocks from other add-ons
                'terra:poplar_trapdoor',
                'terra:lab_trapdoor'
                // add other block types you want to exclude
            ];

            // check if the adjacent block is not in the excludeBlocksArray
            const northConnects = !excludeBlocksArray.includes(north?.typeId);
            const eastConnects = !excludeBlocksArray.includes(east?.typeId);
            const southConnects = !excludeBlocksArray.includes(south?.typeId);
            const westConnects = !excludeBlocksArray.includes(west?.typeId);

            // define an array of blocks that aren't completely solid, but can change their states and therefore the type of connection above
            const conditionedBlocksArray = [
                'minecraft:fence',
                'minecraft:wall',
                // custom conditioned blocks from other add-ons
                'terra:andesite_brick_wall',
                'terra:bone_brick_wall',
                'terra:diorite_brick_wall',
                'terra:dripstone_brick_wall',
                'terra:granite_brick_wall',
                'terra:mixed_stonebrick_wall',
                'terra:polished_andesite_brick_wall',
                'terra:polished_bone_brick_wall',
                'terra:polished_diorite_brick_wall',
                'terra:polished_dripstone_brick_wall',
                'terra:polished_granite_brick_wall',
                'terra:polished_limestone_brick_wall',
                'terra:polished_schist_brick_wall',
                'terra:schist_brick_wall'
            ];

            // check if the above block has certain conditions based on these arrays
            const fullAboveBlock = !conditionedBlocksArray.includes(aboveBlock?.typeId);

            // update block states based on the presence of adjacent blocks
            block.setPermutation(block.permutation.withState('terra:north', northConnects ? 1 : 0));
            block.setPermutation(block.permutation.withState('terra:south', southConnects ? 1 : 0));
            block.setPermutation(block.permutation.withState('terra:east', eastConnects ? 1 : 0));
            block.setPermutation(block.permutation.withState('terra:west', westConnects ? 1 : 0));

            // if above block isn't conditioned, toggle upper pieces
            if (aboveBlock.typeId !== 'minecraft:air' && !aboveBlock.hasTag('terra:conditioned_hollow')) {
                block.setPermutation(block.permutation.withState('terra:upper_pieces', fullAboveBlock ? 1 : 0));
            } else block.setPermutation(block.permutation.withState('terra:upper_pieces', 0));

            // if above block is conditioned and has upper pieces, toggle the former
            if (aboveBlock.typeId !== 'minecraft:air' && aboveBlock.hasTag('terra:conditioned_hollow')) {
                block.setPermutation(block.permutation.withState('terra:upper_pieces', aboveBlock.permutation.withState('terra:upper_pieces', 0) ? 1 : 0));
            } else block.setPermutation(block.permutation.withState('terra:upper_pieces', 0));
        }
    })
});