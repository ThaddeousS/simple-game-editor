import { ContextMenu } from "./ui/context-menu";
import { Player } from "./entity/player";
import { Enemy } from "./entity/enemy";
import { Bullet } from "./entity/bullet";
import Matter from "matter-js"

export class Game {
    static engine = undefined;
    static canvas = undefined;
    static render = undefined;
    static contextMenu = undefined;
    static player = undefined;
    static enemy = undefined;
    static ground = undefined;
    static roof = undefined;
    static wall = undefined;
    static wall2 = undefined;
    static keys = {};

    static init = ({ size }) => {
        Game.canvas = document.createElement('canvas');
        Game.canvas.id = 'gameCanvas';
        Game.canvas.style.width = size.width;
        Game.canvas.style.height = size.height;

        Game.engine = Matter.Engine.create();
        Game.render = Matter.Render.create({
            element: document.body, // Or a specific HTML element
            engine: Game.engine,
            canvas: Game.canvas,
            options: {
                width: size.width,
                height: size.height,
                wireframes: false, // Set to true for debugging outlines
                background: '#f0f0f0',
            }
        });

        Game.contextMenu = new ContextMenu();
        const menuItems = [
            {
                label: 'Create Rectangle',
                icon: '📋',
                action: () => {
                    const newBody = Matter.Bodies.rectangle(400, 100, 80, 80);

                    Matter.Composite.add(Game.engine.world, [newBody]);
                }
            },
            {
                label: 'Create Enemy',
                icon: '📋',
                action: () => {
                    const newEnemy = new Enemy({ render: Game.render, engine: Game.engine })

                    Matter.Composite.add(Game.engine.world, [newEnemy.body]);
                }
            },
        ];

        Game.contextMenu.setItems(menuItems);
    };

    static createWorld = () => {
        Game.player = new Player({ render: Game.render, engine: Game.engine });
        Game.enemy = new Enemy({ render: Game.render, engine: Game.engine });
        Game.ground = Matter.Bodies.rectangle(400, 800, 1500, 60, { isStatic: true }); // Static body won't move
        Game.roof = Matter.Bodies.rectangle(400, 0, 1500, 60, { isStatic: true }); // Static body won't move
        Game.wall = Matter.Bodies.rectangle(0, 580, 60, 1500, { isStatic: true }); // Static body won't move
        Game.wall2 = Matter.Bodies.rectangle(1025, 580, 60, 1500, { isStatic: true }); // Static body won't move

        // Add bodies to the world
        Matter.Composite.add(Game.engine.world, 
            [
                Game.player.body, 
                Game.enemy.body, 
                Game.ground,
                Game.wall,
                Game.wall2,
                Game.roof
            ]
        );

        Game.addListeners();
    };

    static run = () => {
        // Run the renderer
        Matter.Render.run(Game.render);

        // Create a runner to update the engine
        const runner = Matter.Runner.create();
        Matter.Runner.run(runner, Game.engine);
    };

    static addListeners = () => {
        let bulletDirection = 'none';

        document.addEventListener('keydown', (event) => {
            Game.keys[event.code] = true;
        });
        
        document.addEventListener('keyup', (event) => {      
            Game.keys[event.code] = false;
        });
        
        Matter.Events.on(Game.engine, 'beforeUpdate', () => {
            if(Game.keys['ArrowLeft']) {
                bulletDirection = 'left';
                Game.player.move('left');
            }
        
            if(Game.keys['ArrowRight']) {
                bulletDirection = 'right';
                Game.player.move('right');
            }
        
            if(Game.keys['ArrowDown']) {
                Game.player.move('down');
            }
        
            if(Game.keys['ArrowUp']) {
                Game.player.move('up');
            }
        
            if(Game.keys['Space']) {
                let bulletOffset = 0;
                if(bulletDirection === 'right') {
                    bulletOffset = 40;
                }
        
                if(bulletDirection === 'left') {
                    bulletOffset = -40
                }
        
               const bullet = new Bullet({
                    position: { x: Game.player.body.position.x + bulletOffset, y: Game.player.body.position.y },
               });
        
               Matter.Body.applyForce(bullet.body, bullet.body.position, { x: bullet.speed, y: 0 });
               Matter.Composite.add(Game.engine.world, [bullet.body]);
            }
        
            if(Game.enemy.removed) {
                Matter.Composite.remove(Game.engine.world, Game.enemy.body);
            }
        
            if(Game.player.removed) {
                Matter.Composite.remove(Game.engine.world, Game.player.body);
            }
        });
    };
}