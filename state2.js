var scoreText;
var score = 0;
var platforms;
var stars;
var goal;
var idiot;
demo.state2 = function(){};
demo.state2.prototype = {
    preload: function(){
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('goal', 'assets/goal.png');
        game.load.image('idiot', 'assets/idiot.png')
        game.load.image('net', 'assets/net.png')
        game.load.image('player', 'assets/beach_ball.png', 50, 50);
        
    },
    create: function(){
        background = game.add.tileSprite(0, 0, 600, 400, 'sky')
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.stage.backgroundColor = '#7bbecd';
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        player = game.add.sprite(400 / 2, 300 / 2, 'player')
        game.physics.arcade.enable(player);
        
        player.body.bounce.y = 1;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
         
        platforms = game.add.group();
        net = game.add.group();
        goals = game.add.group();
        idiots = game.add.group();
        
        platforms.enableBody = true;
        goals.enableBody = true;
        idiots.enableBody = true;
        
        
        var ground = platforms.create(0, game.world.height-16, 'ground');
        var net = platforms.create(300, 250, 'net');
        var goal = goals.create(400, game.world.height-17, 'goal');
        var idiot = idiots.create(100, game.world.height-17, 'idiot');
        goal.body.immovable = true;
        idiot.body.immovable = true;
        
        ground.scale.setTo(2, 2)
        ground.body.immovable = true;
        
        scoreText = game.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#dabbed'});
        
        cursors = game.input.keyboard.createCursorKeys();
    },
    update: function(){
        
        game.physics.arcade.collide(player, platforms);
        
        game.physics.arcade.overlap(player, goals, scorepoints, null, this);
        game.physics.arcade.overlap(player, idiots, deductpoints, null, this);
        
        if (cursors.left.isDown)
        {
                player.body.velocity.x = -150;
        }
        else if (cursors.right.isDown)
        {
                player.body.velocity.x = 150;
        }
        
        if (cursors.up.isDown && player.body.touching.down)
        {
            player.body.velocity.y = -450
        }
    }

    
};

function scorepoints(player, goal){
    
    score += 5;
    scoreText.text = 'Score: ' + score;
}

function deductpoints(player, idiot){
    
    score -= 5;
    scoreText.text = 'Score: ' + score;
}