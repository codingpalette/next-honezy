'use client';

import { useEffect, useRef } from 'react';

export function ShootingGame() {
  const gameRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let script: HTMLScriptElement | null = null;

    const initPhaser = () => {
      if (typeof window.Phaser === 'undefined') {
        console.error('Phaser is not loaded yet');
        return;
      }

      // 이미 게임이 실행 중이라면 새로 생성하지 않음
      if (gameRef.current) {
        return;
      }

      class StartScene extends window.Phaser.Scene {
        constructor() {
          super('StartScene');
        }

        preload() {
          this.load.image('game_start', '/content/shooting/game_start.png');
        }

        create() {
          // 배경 이미지 추가
          this.add.image(0, 0, 'game_start')
            .setOrigin(0, 0)
            .setDisplaySize(config.width, config.height);

          this.add.text(400, 250, '안아줘요 허츄!', {
            font: '32px Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
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
          this.score = 0;
          this.scoreText = null;
          this.difficultyLevel = 1;
          this.enemySpeed = 100;
          this.spawnDelay = 2000;
          this.difficultyTimer = null;
          this.difficultyText = null;
        }

        preload() {
          this.load.image('background1', '/content/shooting/background2.png');
          this.load.image('player', '/content/shooting/HoneyChurros1.png');
          this.load.image('player2', '/content/shooting/zelly1.png');
          this.load.image('bullet', '/content/shooting/hart.png');
        }

        create() {
          this.background1 = this.add.image(0, 0, 'background1').setOrigin(0, 0);

          // 점수 표시
          this.score = 0;
          this.scoreText = this.add.text(16, 16, '점수: 0', {
            font: '18px Arial',
            fill: '#ffffff'
          });

          // 난이도 표시
          this.difficultyLevel = 1;
          this.enemySpeed = 100;
          this.spawnDelay = 2000;
          this.difficultyText = this.add.text(16, 40, '난이도: 1', {
            font: '18px Arial',
            fill: '#ffffff'
          });

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

          this.startEnemySpawn();

          // 10초마다 난이도 증가
          this.difficultyTimer = this.time.addEvent({
            delay: 10000,
            callback: this.increaseDifficulty,
            callbackScope: this,
            loop: true
          });

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
            this.physics.moveToObject(enemy, this.player, this.enemySpeed);
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
            case 0:
              x = window.Phaser.Math.Between(0, config.width);
              y = -50;
              break;
            case 1:
              x = config.width + 50;
              y = window.Phaser.Math.Between(0, config.height);
              break;
            case 2:
              x = window.Phaser.Math.Between(0, config.width);
              y = config.height + 50;
              break;
            case 3:
              x = -50;
              y = window.Phaser.Math.Between(0, config.height);
              break;
          }

          const enemy = this.enemies.create(x, y, 'player2')
            .setScale(0.05)
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

          // 점수 증가
          this.score += 10;
          this.scoreText.setText('점수: ' + this.score);
        }

        gameOver() {
          this.scene.start('GameOverScene', { score: this.score, level: this.difficultyLevel });
          if (this.enemySpawnEvent) {
            this.enemySpawnEvent.remove();
          }
          if (this.difficultyTimer) {
            this.difficultyTimer.remove();
          }
        }

        startEnemySpawn() {
          if (this.enemySpawnEvent) {
            this.enemySpawnEvent.remove();
          }

          this.enemySpawnEvent = this.time.addEvent({
            delay: this.spawnDelay,
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true,
          });
        }

        increaseDifficulty() {
          this.difficultyLevel++;

          // 적 이동 속도 증가
          this.enemySpeed += 20;

          // 스폰 딜레이 감소 (최소 500ms까지)
          this.spawnDelay = Math.max(500, this.spawnDelay - 300);

          // 난이도 표시 업데이트
          this.difficultyText.setText('난이도: ' + this.difficultyLevel);

          // 스폰 이벤트 재설정
          this.startEnemySpawn();

          // 난이도 증가 알림
          const levelUpText = this.add.text(config.width / 2, config.height / 2 - 50, '난이도 증가!', {
            font: '24px Arial',
            fill: '#ffff00',
            stroke: '#000000',
            strokeThickness: 4
          }).setOrigin(0.5);

          // 2초 후 알림 제거
          this.time.delayedCall(2000, () => {
            levelUpText.destroy();
          });

          // 난이도 5부터는 여러 적 동시 생성
          if (this.difficultyLevel >= 5) {
            const enemyCount = Math.min(5, Math.floor(this.difficultyLevel / 2));
            for (let i = 0; i < enemyCount; i++) {
              this.spawnEnemy();
            }
          }
        }
      }

      class GameOverScene extends window.Phaser.Scene {
        constructor() {
          super('GameOverScene');
          this.score = 0;
          this.level = 1;
        }

        preload() {
          this.load.image('game_over', '/content/shooting/game_and.png');
        }

        init(data: { score?: number, level?: number }) {
          this.score = data.score || 0;
          this.level = data.level || 1;
        }

        create() {
          // 배경 이미지 추가
          this.add.image(0, 0, 'game_over')
            .setOrigin(0, 0)
            .setDisplaySize(config.width, config.height);

          this.add.text(config.width / 2, config.height / 2 - 70, 'GAME OVER', {
            font: '32px Arial',
            fill: '#ff0000',
            stroke: '#000000',
            strokeThickness: 4
          }).setOrigin(0.5);

          this.add.text(config.width / 2, config.height / 2 - 20, '최종 점수: ' + this.score, {
            font: '24px Arial',
            fill: '#ffffff',
          }).setOrigin(0.5);

          this.add.text(config.width / 2, config.height / 2 + 10, '도달 난이도: ' + this.level, {
            font: '24px Arial',
            fill: '#ffffff',
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

    // Phaser 스크립트가 이미 로드되어 있는지 확인
    if (typeof window.Phaser === 'undefined') {
      script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/phaser@3.80.1/dist/phaser.min.js';
      script.async = true;
      script.onload = initPhaser;
      document.body.appendChild(script);
    } else {
      initPhaser();
    }

    // Cleanup 함수
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
      if (script && document.body.contains(script)) {
        document.body.removeChild(script);
      }
      // game-container 내부의 캔버스 제거
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="game-container"
      style={{
        width: '800px',
        height: '600px',
      }}
    />
  );
}

export default ShootingGame;
