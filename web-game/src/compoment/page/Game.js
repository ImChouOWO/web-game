import React, { useRef, useEffect, useState } from 'react';
import Phaser from 'phaser';

// 定义一个新的场景类




class MainScene extends Phaser.Scene {
  constructor(setIsDark,setImgName) {
    super({ key: 'MainScene' });
    this.setIsDark = setIsDark;
    this.setImgName = setImgName
  }

  preload() {
    this.load.image('sky', './assets/Background/nkust_1.png');
    this.load.spritesheet('player', './assets/player/Idle (32x32).png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('Player_Run', './assets/player/Run (32x32).png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('footer', './assets/Background/footer.png');
  }

  create() {
    
    const background = this.add.image(0, 0, 'sky').setOrigin(0, 0);
    const footerHeight = this.textures.get('footer').getSourceImage().height;
    this.setImgName("door.jpg")
    this.keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

    this.footer = this.add.tileSprite(
      this.sys.game.config.width / 2,
      this.sys.game.config.height - footerHeight / 2,
      this.sys.game.config.width,
      footerHeight,
      'footer'
    );
    this.player = this.physics.add.sprite(20, 450, 'player');
    this.player.setBounce(0.5);
    this.player.setScale(1.5);
    this.player.setSize(28, 29, 0);
    this.physics.add.collider(this.player, this.footer);
    
    // 定义动画
    this.anims.create({
      key: 'Idle',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 10 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'Run',
      frames: this.anims.generateFrameNumbers('Player_Run', { start: 0, end: 11 }),
      frameRate: 10,
      repeat: -1
    });
    this.player.anims.play('Player_Run', true);
    
    this.physics.add.existing(this.footer);
    this.footer.body.immovable = true;
    this.footer.body.moves = false;

    background.displayWidth = this.sys.game.config.width;
    background.displayHeight = this.sys.game.config.height;

    this.platforms = this.physics.add.staticGroup();
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.left.isDown && this.player.x > 10) {
      this.player.setVelocityX(-160);
      this.player.anims.play('Run', true);
      this.player.flipX = true;
    } else if (this.cursors.right.isDown && this.player.x < this.sys.game.config.width - 10) {
      this.player.setVelocityX(160);
      this.player.anims.play('Run', true);
      this.player.flipX = false;
    } else if (this.player.x > this.sys.game.config.width - 40 &&
         Phaser.Input.Keyboard.JustDown(this.keyX) ){
            this.scene.start('SceneTow');

    } 
    else {
      this.player.setVelocityX(0);
      this.player.anims.play('Idle', true);
    }
    if (this.player.x > 400 &&
        this.player.y > 500 &&
        this.player.x < 600) {
      this.setIsDark(true);
    } else {
      this.setIsDark(false);
    }
  }
}
class SceneTow extends Phaser.Scene {
    constructor(setIsDark,setImgName,setImgText) {
      super({ key: 'SceneTow' });
        this.setIsDark = setIsDark;
        this.setImgName = setImgName
        this.setImgText = setImgText
    }

    preload() {
        this.load.image('sky_2', './assets/Background/nkust_2.png');
        this.load.spritesheet('player', './assets/player/Idle (32x32).png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('Player_Run', './assets/player/Run (32x32).png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('footer', './assets/Background/footer.png');
        this.setImgName("class_1.jpg")
        this.setImgText("歡迎來到多功能教室")

      }
    
      create() {
        const background = this.add.image(0, 0, 'sky_2').setOrigin(0, 0);
        const footerHeight = this.textures.get('footer').getSourceImage().height;
    
        this.keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    
        this.footer = this.add.tileSprite(
          this.sys.game.config.width / 2,
          this.sys.game.config.height - footerHeight / 2,
          this.sys.game.config.width,
          footerHeight,
          'footer'
        );
        this.player = this.physics.add.sprite(20, 450, 'player');
        this.player.setBounce(0.5);
        this.player.setScale(1.5);
        this.player.setSize(28, 29, 0);
        this.physics.add.collider(this.player, this.footer);
        
        // 定义动画
        this.anims.create({
          key: 'Idle',
          frames: this.anims.generateFrameNumbers('player', { start: 0, end: 10 }),
          frameRate: 10,
          repeat: -1
        });
        this.anims.create({
          key: 'Run',
          frames: this.anims.generateFrameNumbers('Player_Run', { start: 0, end: 11 }),
          frameRate: 10,
          repeat: -1
        });
        this.player.anims.play('Player_Run', true);
        
        this.physics.add.existing(this.footer);
        this.footer.body.immovable = true;
        this.footer.body.moves = false;
    
        background.displayWidth = this.sys.game.config.width;
        background.displayHeight = this.sys.game.config.height;
    
        this.platforms = this.physics.add.staticGroup();
        this.cursors = this.input.keyboard.createCursorKeys();
      }
    update() {
        if (this.cursors.left.isDown && this.player.x > 10) {
            this.player.setVelocityX(-160);
            this.player.anims.play('Run', true);
            this.player.flipX = true;
          } else if (this.cursors.right.isDown && this.player.x < this.sys.game.config.width - 10) {
            this.player.setVelocityX(160);
            this.player.anims.play('Run', true);
            this.player.flipX = false;
          } else if (this.player.x > this.sys.game.config.width - 40 &&Phaser.Input.Keyboard.JustDown(this.keyX)){
            this.scene.start('SceneThree');
          } 
          else {
            this.player.setVelocityX(0);
            this.player.anims.play('Idle', true);
          }
          if (this.player.x > 400 &&
              this.player.y > 500 &&
              this.player.x < 600) {
            this.setIsDark(true);
          } else {
            this.setIsDark(false);
          }
    }
}
class SceneThree extends Phaser.Scene {
    constructor(setIsDark,setImgName,setImgText) {
      super({ key: 'SceneThree' });
        this.setIsDark = setIsDark;
        this.setImgName = setImgName
        this.setImgText = setImgText
        this.textComplete = false;
        this.bullets = [];
        this.isGeneratingBullets = false;
        this.isBattle = false;
        this.timeStarted = false;
        this.bulletCreationIndex = 0; // 用于追踪当前应该调用哪个子弹生成函数
        this.bulletCreationFunctions = [
            this.createBullets_1,
            this.createBullets_2,
            this.createBullets_3,
            this.createBullets_4,
            this.createBullets_5
        ]; // 子弹生成函数数组
    }

    preload() {
        this.load.image('sky_3', './assets/Background/last.png');
        this.load.spritesheet('player', './assets/player/Idle (32x32).png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('Player_Run', './assets/player/Run (32x32).png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('footer', './assets/Background/footer.png');
        this.displayedText = ''; // 用于逐字显示文本的变量
        this.load.image("textBackground",'./assets/Background/Text.png');
        this.load.image('bullet', './assets/bullet/keyboard_1.png');
        this.load.image('bullet_2', './assets/bigBullet/pc.png');
        this.load.image('bullet_3', './assets/bigBullet/ms.png');
        this.load.image("master","./assets/player/master.png");
        this.load.image("UI","./assets/Background/bar.png");
    }
    attackOne(pos) {
      let bullet = this.physics.add.image(
        (pos*80)+100, // x 位置
          -50-(pos*100), // y 位置
          'bullet'
      );
      bullet.body.allowGravity = false;
      bullet.setVelocityY(150); // 设置固定的下落速度
      bullet.setDepth(10);
      this.bullets.push(bullet);
  
      // 为新创建的子弹设置与地板的碰撞检测
      this.physics.add.collider(bullet, this.footer, (bullet, footer) => {
          bullet.destroy(); // 销毁碰撞的子弹
          this.bullets = this.bullets.filter(b => b !== bullet); // 从数组中移除子弹
      }, null, this);
    } 

    attackTow(){
      let bullet = this.physics.add.image(
      this.player.x, // x 位置
          -50, // y 位置
          'bullet_2'
      );
      bullet.body.allowGravity = false;
      bullet.setVelocityY(100); // 设置固定的下落速度
      bullet.setDepth(10);
      bullet.setScale(0.2);
      this.bullets.push(bullet);

      // 为新创建的子弹设置与地板的碰撞检测
      this.physics.add.collider(bullet, this.footer, (bullet, footer) => {
          bullet.destroy(); // 销毁碰撞的子弹
          this.bullets = this.bullets.filter(b => b !== bullet); // 从数组中移除子弹
      }, null, this);
    }
    attackThree() {
      let bullet = this.physics.add.image(
        400, // x 位置
        10, // y 位置
        'bullet_3'
      );


      bullet.setVelocityY(200); // 设置固定的水平速度
      bullet.setPlayerPos = (this.player.x - bullet.x)/2;
      bullet.setVelocityX(0);


      bullet.body.allowGravity = false; // 确保子弹不受重力影响
      bullet.setDepth(10);
      bullet.setScale(0.2);
      bullet.hasReachedTarget = false; // 添加标记
      bullet.targetY = 200; // 指定子弹停止的 Y 位置
      this.bullets.push(bullet);
      

      // 为新创建的子弹设置与地板的碰撞检测
      this.physics.add.collider(bullet, this.footer, (bullet, footer) => {
          bullet.destroy(); // 销毁碰撞的子弹
          this.bullets = this.bullets.filter(b => b !== bullet); // 从数组中移除子弹
      }, null, this);
    }

  
  
    
    createBullets_1(num) {
      for (let i = 0; i < num; i++) {
          this.attackOne(i);
      }
    }
    createBullets_2(){
      this.attackTow();
    }

    createBullets_3(){
      this.attackThree();
      
      
    }
    createBullets_4(){
      this.createBullets_2();
      this.createBullets_3();
    }
    createBullets_5(){
      this.createBullets_1(4);
      this.createBullets_2();
    } 
    hitBullet(player, bullet) {
      // 处理玩家和子弹的碰撞
        console.log('Hit bullet!');
        this.initialHP -= 100;
        this.playerHealth.setText(`HP: ${this.initialHP}`)
        // 销毁被击中的子弹
        bullet.destroy();
        this.bullets = this.bullets.filter(b => b !== bullet);
        player.setTint(0xff0000);
        this.time.addEvent({
          delay:100,
          callback: () => {
            player.setTint();
          },
          callbackScope: this
        });
        if (this.initialHP <= 0) {
          // 结束游戏逻辑
          this.registry.set("isGameOver",true);
          this.physics.pause(); // 暂停物理引擎
          this.isBattle = false;
          if (this.countdownEvent) {
            this.countdownEvent.remove(false); // 停止倒计时
          }
          this.scene.start('EndScene');
        }
    }

    cycleThroughBulletCreation() {
      this.time.addEvent({
          delay: 3000, // 每 12 秒调用一次
          callback: () => {
              if (this.isBattle) {
                  // 调用当前子弹生成函数
                  this.bulletCreationFunctions[this.bulletCreationIndex].call(this);

                  // 更新索引以便下次调用下一个函数
                  this.bulletCreationIndex = (this.bulletCreationIndex + 1) % this.bulletCreationFunctions.length;
              }
          },
          callbackScope: this,
          loop: true // 循环调用
      });
    }

    create() {
        this.initialTime = 60;
        this.countdownText = this.add.text(20, 30, `Time: ${this.initialTime}`, { fontFamily: 'DotGothic16', fontSize: '30px', fill: '#FFF' }).setDepth(3);
        this.initialHP = 100;
        this.playerHealth = this.add.text(220,30, `HP：${this.initialHP}`, { fontFamily: 'DotGothic16', fontSize: '30px', fill: '#FFF' }).setDepth(3);
        this.uiBackground = this.add.image(0, 0, 'UI').setOrigin(0, 0);
        this.uiBackground.setScale(.4);
        this.uiBackground.displayWidth = 200;
        this.uiBackground .setDepth(2);


        this.uiBackground = this.add.image(200, 0, 'UI').setOrigin(0, 0);
        this.uiBackground.setScale(.4);
        this.uiBackground.displayWidth = 150;
        this.uiBackground .setDepth(2);




        this.cycleThroughBulletCreation();
        


        const bgWidth = 300;  // 根据需要设置背景的宽度
        const bgHeight = 200; // 根据需要设置背景的高度
        let graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 0.5); // 可以选择是否设置填充颜色和透明度
        graphics.fillRect(100, 100, bgWidth, bgHeight); // 绘制矩形作为背景

        this.textBackground  = this.add.image(100, 100, 'textBackground').setOrigin(0, 0);
        this.textBackground .displayWidth = bgWidth;
        this.textBackground .displayHeight = bgHeight;
        this.textBackground .setDepth(2);
        
        this.master = this.add.image(385, 300, 'master').setOrigin(0, 0);
        this.master.setScale(0.1);
        this.master .setDepth(2);
    
        // 创建对话窗文本
        this.dialogueText = this.add.text(
            100 + 10, // x position
            100 + 60, // y position
            '', // 文本内容初始化为空
            { 
                fontSize: '20px',
                fontFamily: 'DotGothic16',
                fontStyle: 'bold',
                color: '#000', 
                padding: {
                    x: 30,
                    y: 10,
                },
                align: 'justify',
                wordWrap: { width: this.sys.game.config.width - 200 }, // 根据需要调整
                lineSpacing: 10,
            } // 文本样式
        ).setDepth(3); // 将文本的深度设置为1，确保它显示在其他对象之上

        // 显示对话
        this.startDialogue('歡迎來到高雄科技大學\n想必你也是個優秀的人才\n但接下來有些小小的考驗\n按下X後堅持60秒吧!!');

        
        const background = this.add.image(0, 0, 'sky_3').setOrigin(0, 0);
        const footerHeight = this.textures.get('footer').getSourceImage().height;
    
        this.keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    
        this.footer = this.add.tileSprite(
          this.sys.game.config.width / 2,
          this.sys.game.config.height - footerHeight / 2,
          this.sys.game.config.width,
          footerHeight,
          'footer'
        );
        this.player = this.physics.add.sprite(20, 450, 'player');
        this.player.setBounce(0.5);
        this.player.setScale(1.5);
        this.player.setSize(28, 29, 0);
        // this.physics.add.collider(this.bullets, this.footer, this.hitFloor, null, this);
        this.physics.add.collider(this.player, this.footer);
        
        // 定义动画
        this.anims.create({
          key: 'Idle',
          frames: this.anims.generateFrameNumbers('player', { start: 0, end: 10 }),
          frameRate: 10,
          repeat: -1
        });
        this.anims.create({
          key: 'Run',
          frames: this.anims.generateFrameNumbers('Player_Run', { start: 0, end: 11 }),
          frameRate: 10,
          repeat: -1
        });
        this.player.anims.play('Player_Run', true);
        
        this.physics.add.existing(this.footer);
        this.footer.body.immovable = true;
        this.footer.body.moves = false;
    
        background.displayWidth = this.sys.game.config.width;
        background.displayHeight = this.sys.game.config.height;
    
        this.platforms = this.physics.add.staticGroup();
        this.cursors = this.input.keyboard.createCursorKeys();
      }


      startDialogue(text) {
        const length = text.length;
        let i = 0;
        this.displayedText = ''; // 初始化显示的文本

        // 每100ms显示一个新字
        this.time.addEvent({
            delay: 100,
            repeat: length - 1,
            callback: () => {
                this.displayedText += text[i];
                this.dialogueText.setText(this.displayedText); // 更新文本内容
                i++;

                // 如果文本完全显示，则设置 textComplete 为 true
                if (i === length) {
                    this.textComplete = true;
                    // 在文本完全显示后等待 0.5 秒
                    this.time.delayedCall(500, () => {
                        this.waitForInput();
                    }, [], this);
                }
            },
            callbackScope: this // 确保回调函数中的this指向当前场景对象
        });
    }

    waitForInput() {
        // 等待 X 键按下
        if (Phaser.Input.Keyboard.JustDown(this.keyX)) {
            console.log('X key pressed');
    
            if (this.textComplete) {
                
    
                if (this.dialogueText) {
                    this.dialogueText.destroy();
                    this.dialogueText = null;
                }
                if (this.textBackground) {
                    this.textBackground.destroy();
                    this.textBackground = null;
                }
                this.isBattle = true;
            }
      }
      
    }
    
    update() {
    
      if (this.isBattle && !this.timeStarted) {
        this.timeStarted = true; // 标记倒计时已开始
        
        // 每秒更新倒计时
        this.countdownEvent = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.initialTime -= 1; // 倒计时减一
                console.log(this.initialTime);
                this.registry.set('battleInfo', this.initialTime);
                
                this.countdownText.setText(`Time: ${this.initialTime}`); // 更新文本

                if (this.initialTime <= 0) {
                   // 倒计时结束时的逻辑
                    this.countdownText.setText('Time is up!');
                   // 可以在这里添加倒计时结束的处理逻辑
                    this.isBattle = false;
                    if(this.initialHP >0){
                      this.registry.set("isGameOver",false);
                      this.scene.start('EndScene');

                    }
                    
                   
                    
                }
            },
            callbackScope: this,
            loop: true
        });
      }
      this.bullets.forEach(bullet => {
        // 如果子弹到达指定位置并且还没停止
        if (!bullet.hasReachedTarget && bullet.y >= bullet.targetY) {
            bullet.setVelocityX(bullet.setPlayerPos); // 停止子弹
            bullet.hasReachedTarget = true; // 标记为已到达
        }
      });
      


        // 检测碰撞
        this.physics.overlap(this.player, this.bullets, this.hitBullet, null, this);

        if (this.cursors.left.isDown && this.player.x > 10) {
            this.player.setVelocityX(-160);
            this.player.anims.play('Run', true);
            this.player.flipX = true;
          } else if (this.cursors.right.isDown && this.player.x < this.sys.game.config.width - 10) {
            this.player.setVelocityX(160);
            this.player.anims.play('Run', true);
            this.player.flipX = false;
          } 
  
          else {
            this.player.setVelocityX(0);
            this.player.anims.play('Idle', true);
          }
        this.waitForInput();
    
    }
}


class Menu extends Phaser.Scene{
  constructor(){
    super({key:"Menu"});
   

  }
  startDialogue() {
    const text = this.title;
    const length = text.length;
    let i = 0;
    this.displayedText = ''; // 初始化显示的文本

    // 每100ms显示一个新字
    this.time.addEvent({
        delay: 800,
        callback: () => {
            // 如果文本已经完全显示，则重置
            if (this.displayedText.length == length) {
                this.displayedText = '';
                i = 0; // 重置迭代器
            }

            // 添加下一个字符并更新文本
            this.displayedText += text[i];
            this.dialogueText.setText(this.displayedText);
            i++;

            // 如果 i 等于文本长度，重置 i
            if (i >= length) {
                i = 0;
            }
        },
        callbackScope: this, // 确保回调函数中的this指向当前场景对象
        loop: true
    });
}

  preload(){
    this.displayedText = '';
    this.title="智慧商務系導覽遊戲";
    this.load.spritesheet('player', './assets/player/Idle (32x32).png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('Player_Run', './assets/player/Run (32x32).png', { frameWidth: 32, frameHeight: 32 });
    this.load.image("right","./assets/bullet/keyboard_72.png");
    this.load.image("left","./assets/bullet/keyboard_73.png");
    this.load.image("rightHover","./assets/bullet/keyboard_173.png");
    this.load.image("leftHover","./assets/bullet/keyboard_174.png");
    this.load.image("play","./assets/UI/Play.png");
    this.load.image("playHover","./assets/UI/PlayHover.png");
    this.load.audio("backgroundMusic","./assets/music/8bit-1.mp3");
  }

  create() {
    // 创建音乐对象
    this.music = this.sound.add('backgroundMusic', {
      loop: true, // 循环播放
      volume: 0.1 // 音量设置为50%
    });
    this.music.play();

    this.dialogueText = this.add.text(
      200 + 10, // x position
      40 + 60, // y position
      '', // 文本内容初始化为空
      { 
          fontSize: '32px',
          fontFamily: 'DotGothic16',
          fontStyle: 'bold',
          color: '#FFF', 
          padding: {
              x: 30,
              y: 20,
          },
          align: 'justify',
          wordWrap: { width: this.sys.game.config.width - 200 }, // 根据需要调整
          lineSpacing: 10,
      } // 文本样式
    ).setDepth(3);

    this.startDialogue();
    this.play = this.add.image(255,400,"play").setOrigin(0,0);
    this.play.setScale(0.5);
    // 使按钮可交互
    this.play.setInteractive();

    // 添加点击事件
    this.play.on('pointerdown', () => {
        console.log('Button clicked!');
        // 在这里添加按钮点击后要执行的代码
        this.scene.start('MainScene');
    });

    // 可选: 改变当鼠标悬浮在按钮上时的样式
    this.play.on('pointerover', () => {
        this.play.setTexture("playHover"); // 鼠标悬浮时变色

    });

    this.play.on('pointerout', () => {
        this.play.setTexture("play"); // 鼠标移出时恢复原色
    });






    this.right = this.add.image(480, 300, 'right').setOrigin(0, 0);
    this.right.setInteractive();
    this.right.setScale(2);
    
    

    this.left = this.add.image(260, 300, 'left').setOrigin(0, 0);
    this.left.setInteractive();
    this.left.setScale(2);
    
    
    this.player = this.physics.add.sprite(400, 300, 'player');
    this.player.setBounce(0.5);
    this.player.setScale(5);
    this.player.setSize(28, 29, 0);
    this.player.body.allowGravity = false;
    
    
    // 定义动画
    this.anims.create({
      key: 'Idle',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 10 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'Run',
      frames: this.anims.generateFrameNumbers('Player_Run', { start: 0, end: 11 }),
      frameRate: 10,
      repeat: -1
    });
    this.player.anims.play('Player_Run', true);
    this.cursors = this.input.keyboard.createCursorKeys();
  };
  update(){
    if (this.cursors.left.isDown && this.player.x > 10) {
      this.left.setTexture("leftHover");
      this.player.anims.play('Run', true);
      
      this.player.flipX = true;
    } else if (this.cursors.right.isDown && this.player.x < this.sys.game.config.width - 10) {
      this.right.setTexture("rightHover");
      this.player.anims.play('Run', true);
      this.player.flipX = false;
    } else if (this.player.x > this.sys.game.config.width - 40 &&
         Phaser.Input.Keyboard.JustDown(this.keyX) ){
            this.scene.start('SceneTow');

    } 
    else {
      this.player.setVelocityX(0);
      this.player.anims.play('Idle', true);
      this.right.setTexture("right");
      this.left.setTexture("left");
    }

  };
}


class EndScene extends Phaser.Scene{
  constructor(){
    super({key: "EndScene"});
    
  }


  startDialogue(text) {
    const length = text.length;
    let i = 0;
    this.displayedText = ''; // 初始化显示的文本

    // 每100ms显示一个新字
    this.time.addEvent({
        delay: 100,
        repeat: length - 1,
        callback: () => {
            this.displayedText += text[i];
            this.dialogueText.setText(this.displayedText); // 更新文本内容
            i++;
        },
        callbackScope: this // 确保回调函数中的this指向当前场景对象
    });
  }
  preload(){
    this.displayedText = '';
    this.load.image("textBackground",'./assets/Background/Text.png');
    this.load.image("master","./assets/player/master.png");
    this.load.image("pgup","./assets/bullet/keyboard_65.png");
    this.load.image("pgupHover",'./assets/bullet/keyboard_166.png');
    this.load.image("sky_end","./assets/Background/Yellow.png");
    this.load.image("home","./assets/UI/Menu.png");
    this.load.image("homeHover","./assets/UI/MenuHover.png");
    this.load.image("return","./assets/UI/Return.png");
    this.load.image("returnHover","./assets/UI/returnHover.png");
    
  }

  create() {
    
    const background = this.add.image(0, 0, 'sky_end').setOrigin(0, 0);
    background.displayWidth = this.sys.game.config.width;
    background.displayHeight = this.sys.game.config.height;
    // 创建对话窗文本
    this.dialogueText = this.add.text(
      100 + 10, // x position
      40 + 60, // y position
      '', // 文本内容初始化为空
      { 
          fontSize: '20px',
          fontFamily: 'DotGothic16',
          fontStyle: 'bold',
          color: '#000', 
          padding: {
              x: 30,
              y: 20,
          },
          align: 'justify',
          wordWrap: { width: this.sys.game.config.width - 200 }, // 根据需要调整
          lineSpacing: 10,
      } // 文本样式
    ).setDepth(3);

    const bgWidth = 320;  // 根据需要设置背景的宽度
    const bgHeight = 270; // 根据需要设置背景的高度
    let graphics = this.add.graphics();

    graphics.fillRect(100, 100, bgWidth, bgHeight); // 绘制矩形作为背景
    this.textBackground  = this.add.image(100, 40, 'textBackground').setOrigin(0, 0);
    this.textBackground .displayWidth = bgWidth;
    this.textBackground .displayHeight = bgHeight;
    this.textBackground .setDepth(2);


    const battleInfo = this.registry.get('battleInfo');
    const isGameOver = this.registry.get("isGameOver");

    if (!isGameOver) {
      this.startDialogue(`恭喜通過考驗\n我們非常歡迎你\n這個網頁所用到的素材\n大多都是由ＡＩ生成\n如果你也對這些技術感興趣\n就加入我們吧！！！！！！`);
    }else{
      this.startDialogue(`非常可惜還差${battleInfo}秒\n但我們還是很歡迎你\n這個網頁所用到的素材\n大多都是由ＡＩ生成\n如果你也對這些技術感興趣\n就加入我們吧！！！！！！`);
    }
    
    
    this.master = this.add.image(100,300,'master').setOrigin(0,0);
    this.master.setScale(0.5);


    this.returnBtn = this.add.image(700,500,"return").setOrigin(0,0);
    this.returnBtn.setScale(0.2);
    // 使按钮可交互
    this.returnBtn.setInteractive();

    // 添加点击事件
    this.returnBtn.on('pointerdown', () => {
        console.log('Button clicked!');
        // 在这里添加按钮点击后要执行的代码
        this.scene.start('MainScene');
    });

    // 可选: 改变当鼠标悬浮在按钮上时的样式
    this.returnBtn.on('pointerover', () => {
        this.returnBtn.setTexture("returnHover"); // 鼠标悬浮时变色

    });

    this.returnBtn.on('pointerout', () => {
        this.returnBtn.setTexture("return"); // 鼠标移出时恢复原色
    });





    this.homeBtn = this.add.image(600,500,"home").setOrigin(0,0);
    this.homeBtn.setScale(0.2);
    // 使按钮可交互
    this.homeBtn.setInteractive();

    // 添加点击事件
    this.homeBtn.on('pointerdown', () => {
        console.log('Button clicked!');
        this.scene.start('Menu');
        // 在这里添加按钮点击后要执行的代码
    });

    // 可选: 改变当鼠标悬浮在按钮上时的样式
    this.homeBtn.on('pointerover', () => {
        this.homeBtn.setTexture("homeHover"); // 鼠标悬浮时变色
    });

    this.homeBtn.on('pointerout', () => {
        this.homeBtn.setTexture("home"); // 鼠标移出时恢复原色
    });




  };
  update(){

  };

}
  

function MainGame({ setIsDark,setImgName,setImgText }) {
  const gameRef = useRef(null);
  const [battleInfo,setBattleInfo] = useState();
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'Game',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: false
        }
      },
      scene: [new Menu(),new EndScene(),new SceneThree(setIsDark,setImgName,setImgText),new MainScene(setIsDark,setImgName),new SceneTow(setIsDark,setImgName,setImgText)] // 创建场景实例并传递 setIsDark 方法
    };

    gameRef.current = new Phaser.Game(config);

    return () => {
      gameRef.current.destroy(true);
    };
  }, [setIsDark]);

  return <div className="phaserGame" id='Game' ref={gameRef}></div>;
}

export default MainGame;