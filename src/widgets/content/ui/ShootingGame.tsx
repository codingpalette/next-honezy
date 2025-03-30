'use client';

import { useEffect, useRef } from 'react';


export function ShootingGame() {
  const gameRef = useRef<any>(null);

  useEffect(() => {
    // Phaser 스크립트가 로드된 후 게임 초기화
    const initPhaser = () => {
      if (typeof window.Phaser === 'undefined') {
        console.error('Phaser is not loaded yet');
        return;
      }

      // 게임 씬 정의
      class GameScene extends window.Phaser.Scene {
        constructor() {
          super('GameScene');
        }

        preload() {
          this.load.setBaseURL('https://labs.phaser.io');
          this.load.image('sky', 'assets/skies/space3.png');
          this.load.image('ball', 'assets/sprites/phaser3-logo.png');
          this.load.image('paddle', 'assets/particles/red.png');
        }

        create() {
          this.add.image(400, 300, 'sky');
          this.ball = this.physics.add.image(400, 100, 'ball');
          this.ball.setVelocity(200, 200);
          this.ball.setBounce(1, 1);
          this.ball.setCollideWorldBounds(true);
          this.paddle = this.physics.add.image(400, 550, 'paddle');
          this.paddle.setImmovable(true);
          this.paddle.setCollideWorldBounds(true);
          this.physics.add.collider(this.ball, this.paddle);
          this.cursors = this.input.keyboard.createCursorKeys();
        }

        update() {
          if (this.cursors.left.isDown) {
            this.paddle.setVelocityX(-300);
          } else if (this.cursors.right.isDown) {
            this.paddle.setVelocityX(300);
          } else {
            this.paddle.setVelocityX(0);
          }
        }
      }

      // Phaser 게임 설정
      const config = {
        type: window.Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { x: 0, y: 200 },
            debug: false,
          },
        },
        scene: [GameScene],
        parent: 'game-container',
      };

      // 게임 인스턴스 생성
      const game = new window.Phaser.Game(config);
      gameRef.current = game;
    };

    // Phaser 스크립트 로드
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/phaser@3.80.1/dist/phaser.min.js';
    script.async = true;
    script.onload = initPhaser; // 스크립트 로드 완료 후 게임 초기화
    document.body.appendChild(script);

    // 정리 함수
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
      }
      document.body.removeChild(script); // 스크립트 제거
    };
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#000',
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
