import { ContextMenu } from "./ui/context-menu";
import { Player } from "./entity/player";
import { Enemy } from "./entity/enemy";
import { Bullet } from "./entity/bullet";
import Matter from "matter-js"
import { Dialog } from "./ui/dialog";
import { EntityManager } from "./entity/entity-manager";

export class Game {
    static engine = undefined;
    static canvas = undefined;
    static render = undefined;
    static mouse = undefined;
    static mouseConstraint = undefined;
    static contextMenu = undefined;
    /*static player = undefined;
    static enemy = undefined;
    static ground = undefined;
    static roof = undefined;
    static wall = undefined;
    static wall2 = undefined;*/
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

        Game.mouse = Matter.Mouse.create(Game.render.canvas); // Assuming 'render' is your Matter.Render instance
        Game.mouseConstraint = Matter.MouseConstraint.create(Game.engine, {
            element: Game.render.canvas,
            mouse: Game.mouse
        });

        Matter.Composite.add(Game.engine.world, [Game.mouseConstraint]);
        Game.addListeners();
    };

    static createContextMenu = () => {
        Game.contextMenu = new ContextMenu();
        const menuItems = [
            {
                label: 'Create Rectangle',
                icon: '📋',
                action: () => {
                    const createDialog = new Dialog();
                    createDialog.open({
                        title: 'Create Rectangle',
                        inputs: [
                            { label: 'Width', name: 'width', type: 'number' },
                            { label: 'Height', name: 'height', type: 'number' },
                            { label: 'Position X', name: 'posX', type: 'number' },
                            { label: 'Position Y', name: 'posY', type: 'number' },
                            { label: 'Color', name: 'color', type: 'text' },
                            { label: 'Static?', name: 'isStatic', type: 'checkbox' },
                            { label: 'Sensor?', name: 'isSensor', type: 'checkbox' }
                        ],
                        buttons: [
                            { 
                                label: 'Create', 
                                type: 'primary', 
                                action: (values) => EntityManager.create('rectangle', values),
                            }
                        ]
                    })
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
    }

    static run = () => {
        // Run the renderer
        Matter.Render.run(Game.render);

        // Create a runner to update the engine
        const runner = Matter.Runner.create();
        Matter.Runner.run(runner, Game.engine);
    };

    static addListeners = () => {
        Matter.Events.on(Game.mouseConstraint, 'mousedown', (event) => {
            const bodyClicked = Game.mouseConstraint.body;

            if(bodyClicked) {
                const v0 = bodyClicked.vertices[0];
                const v1 = bodyClicked.vertices[1];
                const dx = v0.x - v1.x;
                const dy = v0.y - v1.y;
                const width = Math.sqrt(dx * dx + dy * dy);


                const editDialog = new Dialog();
                editDialog.open({
                    title: 'Create Rectangle',
                    inputs: [
                        { label: 'Width', name: 'width', value: width, type: 'number' },
                        /*{ label: 'Height', name: 'height', type: 'number' },
                        { label: 'Position X', name: 'posX', type: 'number' },
                        { label: 'Position Y', name: 'posY', type: 'number' },
                        { label: 'Color', name: 'color', type: 'text' },
                        { label: 'Static?', name: 'isStatic', type: 'checkbox' },
                        { label: 'Sensor?', name: 'isSensor', type: 'checkbox' }*/
                    ],
                    /*buttons: [
                        { 
                            label: 'Create', 
                            type: 'primary', 
                            action: (values) => EntityManager.create('rectangle', values),
                        }
                    ]*/
                });
            }
        });

        /*let bulletDirection = 'none';

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
        });*/
    };
}