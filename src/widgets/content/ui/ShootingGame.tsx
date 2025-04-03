'use client';

import { useEffect, useRef } from 'react';

export function ShootingGame() {
  const gameRef = useRef<any>(null);

  useEffect(() => {
    const initPhaser = () => {
      if (typeof window.Phaser === 'undefined') {
        console.error('Phaser is not loaded yet');
        return;
      }

      class StartScene extends window.Phaser.Scene {
        constructor() {
          super('StartScene');
        }

        create() {
          this.add.text(400, 250, 'Shooting Game', {
            font: '32px Arial',
            fill: '#ffffff',
          }).setOrigin(0.5);

          const startButton = this.add.text(400, 350, 'Start Game', {
            font: '24px Arial',
            fill: '#f5e99f',
            backgroundColor: '#4CAF50',
            padding: { x: 20, y: 10 },
          }).setOrigin(0.5).setInteractive();

          startButton.on('pointerdown', () => {
            this.scene.start('GameScene');
          });

          startButton.on('pointerover', () => {
            startButton.setStyle({ fill: '#ffffff' });
          });

          startButton.on('pointerout', () => {
            startButton.setStyle({ fill: '#f5e99f' });
          });
        }
      }

      class GameScene extends window.Phaser.Scene {
        constructor() {
          super('GameScene');
          this.lastFired = 0;
          this.enemySpawnEvent = null;
        }

        preload() {
          this.load.image('background1', '/content/shooting/background.png');
          this.load.image('player', '/content/shooting/HoneyChurros1.png');
          this.load.image('player2', '/content/shooting/zelly1.png');
          this.load.image('bullet', '/content/shooting/hart.png');
        }

        create() {
          this.background1 = this.add.image(0, 0, 'background1').setOrigin(0, 0);

          this.player = this.physics.add.image(config.width / 2, config.height / 2, 'player')
            .setScale(0.1)
            .setCollideWorldBounds(true);
          this.player.body.setSize(this.player.width * 0.5, this.player.height * 0.5);
          this.player.body.setOffset(this.player.width * 0.25, this.player.height * 0.25);

          this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 10,
          });

          this.enemies = this.physics.add.group();

          this.keyboardInput = this.input.keyboard.createCursorKeys();
          this.mouseInput = this.input.activePointer;

          this.add.text(10, 10, 'Shooting Game - Left Click to Shoot', {
            font: '16px Arial',
            fill: '#f5e99f',
          });

          // 적 스폰 타이머 시작
          this.startEnemySpawn();

          this.physics.add.collider(this.bullets, this.enemies, this.hitEnemy, null, this);
          this.physics.add.collider(this.player, this.enemies, this.gameOver, null, this);
        }

        update() {
          this.movePlayer();

          if (this.mouseInput.isDown && this.time.now > this.lastFired) {
            this.shoot();
            this.lastFired = this.time.now + 200;
          }

          this.enemies.getChildren().forEach((enemy: any) => {
            this.physics.moveToObject(enemy, this.player, 100);
          });
        }

        movePlayer() {
          const PLAYER_SPEED = 5;
          const keys = this.input.keyboard.addKeys({
            up: window.Phaser.Input.Keyboard.KeyCodes.W,
            down: window.Phaser.Input.Keyboard.KeyCodes.S,
            left: window.Phaser.Input.Keyboard.KeyCodes.A,
            right: window.Phaser.Input.Keyboard.KeyCodes.D,
          });

          this.player.setVelocity(0);

          if (keys.left.isDown) {
            this.player.setVelocityX(-PLAYER_SPEED * 50);
            this.player.flipX = false;
          } else if (keys.right.isDown) {
            this.player.setVelocityX(PLAYER_SPEED * 50);
            this.player.flipX = true;
          }

          if (keys.up.isDown) {
            this.player.setVelocityY(-PLAYER_SPEED * 50);
          } else if (keys.down.isDown) {
            this.player.setVelocityY(PLAYER_SPEED * 50);
          }
        }

        spawnEnemy() {
          const side = window.Phaser.Math.Between(0, 3);
          let x, y;

          switch (side) {
            case 0: // 상단
              x = window.Phaser.Math.Between(0, config.width);
              y = -50;
              break;
            case 1: // 우측
              x = config.width + 50;
              y = window.Phaser.Math.Between(0, config.height);
              break;
            case 2: // 하단
              x = window.Phaser.Math.Between(0, config.width);
              y = config.height + 50;
              break;
            case 3: // 좌측
              x = -50;
              y = window.Phaser.Math.Between(0, config.height);
              break;
          }

          const enemy = this.enemies.create(x, y, 'player2')
            .setScale(0.1)
            .setCollideWorldBounds(true);
          enemy.body.setSize(enemy.width * 0.5, enemy.height * 0.5);
          enemy.body.setOffset(enemy.width * 0.25, enemy.height * 0.25);
        }

        shoot() {
          const bullet = this.bullets.get(this.player.x, this.player.y);
          if (bullet) {
            bullet.setActive(true).setVisible(true);
            this.physics.moveTo(bullet, this.mouseInput.x, this.mouseInput.y, 500);
            bullet.setScale(0.05);

            bullet.setCollideWorldBounds(true);
            bullet.body.onWorldBounds = true;
            bullet.body.world.on('worldbounds', (body: any) => {
              if (body.gameObject === bullet) {
                bullet.setActive(false).setVisible(false);
              }
            });
          }
        }

        hitEnemy(bullet: any, enemy: any) {
          bullet.setActive(false).setVisible(false);
          enemy.destroy();
        }

        gameOver() {
          this.scene.start('GameOverScene');
          if (this.enemySpawnEvent) {
            this.enemySpawnEvent.remove();
          }
        }

        startEnemySpawn() {
          this.enemySpawnEvent = this.time.addEvent({
            delay: 2000,
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true,
          });
        }
      }

      class GameOverScene extends window.Phaser.Scene {
        constructor() {
          super('GameOverScene');
        }

        create() {
          this.add.text(config.width / 2, config.height / 2 - 50, 'GAME OVER', {
            font: '32px Arial',
            fill: '#ff0000',
          }).setOrigin(0.5);

          const restartButton = this.add.text(config.width / 2, config.height / 2 + 50, 'Restart', {
            font: '24px Arial',
            fill: '#f5e99f',
            backgroundColor: '#4CAF50',
            padding: { x: 20, y: 10 },
          }).setOrigin(0.5).setInteractive();

          restartButton.on('pointerdown', () => {
            this.scene.start('GameScene');
          });

          restartButton.on('pointerover', () => {
            restartButton.setStyle({ fill: '#ffffff' });
          });

          restartButton.on('pointerout', () => {
            restartButton.setStyle({ fill: '#f5e99f' });
          });
        }
      }

      const config = {
        type: window.Phaser.AUTO,
        width: 800,
        height: 600,
        scene: [StartScene, GameScene, GameOverScene],
        parent: 'game-container',
        pixelArt: true,
        physics: {
          default: 'arcade',
          arcade: {
            debug: false,
          },
        },
      };

      const game = new window.Phaser.Game(config);
      game.scene.start('StartScene');
      gameRef.current = game;
    };

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/phaser@3.80.1/dist/phaser.min.js';
    script.async = true;
    script.onload = initPhaser;
    document.body.appendChild(script);

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
      }
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        border: '1px solid #000',
      }}
    >
      <div
        id="game-container"
        style={{
          width: '800px',
          height: '600px',
        }}
      />
    </div>
  );
}

export default ShootingGame;
