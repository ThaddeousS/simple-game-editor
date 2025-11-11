import Matter from "matter-js";
import { Game } from "../game";

export class EntityManager {
    static entities = {};

    static create = (type, options) => {
        switch(type) {
            case 'rectangle':
                const size = { w: parseInt(options.width), h: parseInt(options.height) };
                const { isSensor, isStatic, color, posX, posY } = options;

                const add = Matter.Bodies.rectangle(
                    parseInt(posX), 
                    parseInt(posY), 
                    size.w, 
                    size.h, 
                    { 
                        isStatic,
                        isSensor,
                        render: { fillStyle: color } 
                    }
                );

                Matter.Composite.add(Game.engine.world, [add]);
                break;
        }
    };
};