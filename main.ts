namespace SpriteKind {
    export const Light = SpriteKind.create()
    export const Key = SpriteKind.create()
    export const Cover = SpriteKind.create()
    export const Screen = SpriteKind.create()
}
// https://trello.com/b/op32mNrh/game-jam
scene.onOverlapTile(SpriteKind.Player, assets.tile`Door`, function (sprite, location) {
    game.gameOver(true)
})
function spawnLockers () {
    for (let value of tiles.getTilesByType(assets.tile`LockerSpawn`)) {
        Locker = sprites.create(assets.image`Locker`, SpriteKind.Cover)
        tiles.placeOnTile(Locker, value)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Key, function (sprite2, otherSprite) {
    tiles.setTileAt(tiles.getTileLocation(2, 1), assets.tile`Door`)
    sprites.destroy(Key2)
    game.showLongText("You hear a door click in the distance.", DialogLayout.Bottom)
})
function SpawnKey () {
    Key2 = sprites.create(assets.image`Key`, SpriteKind.Key)
    tiles.placeOnRandomTile(Key2, assets.tile`keySpawn`)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`Smooth Concrete Ground`, function (sprite6, location5) {
    Covered = 0
})
function createHide () {
    HIDE = sprites.create(assets.image`HIDE`, SpriteKind.Screen)
    HIDE.y = -10
    HIDE.x = -10
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`LockedDoor`, function (sprite3, location2) {
    game.showLongText("I need a key to open this door.", DialogLayout.Bottom)
})
function LightOverlay () {
    Void = sprites.create(assets.image`Void`, SpriteKind.Light)
    Void.setScale(37, ScaleAnchor.Middle)
    Void.setPosition(User.x, User.y)
}
info.onCountdownEnd(function () {
    if (Covered != 1) {
        music.stopAllSounds()
        game.gameOver(false)
    } else {
        info.startCountdown(180)
        Hunting = 0
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.castle.tileGrass1, function (sprite7, location6) {
    Covered = 0
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Smooth Concrete Ground Left-Right`, function (sprite5, location4) {
    Covered = 0
})
scene.onOverlapTile(SpriteKind.Player, sprites.castle.tilePath5, function (sprite4, location3) {
    Covered = 0
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`LockerSpawn`, function (sprite8, location7) {
    Covered = 1
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Smooth Concrete Ground Top-Bottom`, function (sprite9, location8) {
    Covered = 0
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite10, otherSprite2) {
    Entity.follow(User, 200)
    Hunting = 1
})
function on_pause_until () {
	
}
function createEntity () {
    Entity = sprites.create(assets.image`Entity`, SpriteKind.Enemy)
    tiles.placeOnRandomTile(Entity, sprites.castle.tilePath5)
    Entity.setScale(0.85, ScaleAnchor.Middle)
    animation.runImageAnimation(
    Entity,
    assets.animation`EntityWalk`,
    500,
    true
    )
}
let entitySpot = 0
let Entity: Sprite = null
let Hunting = 0
let Void: Sprite = null
let HIDE: Sprite = null
let Locker: Sprite = null
let Covered = 0
let Key2: Sprite = null
let User: Sprite = null
scene.setBackgroundImage(assets.image`Title`)
pauseUntil(() => controller.A.isPressed())
tiles.setCurrentTilemap(tilemap`level0`)
game.setGameOverMessage(false, "GAME OVER!")
User = sprites.create(assets.image`myImage`, SpriteKind.Player)
controller.moveSprite(User, 80, 80)
User.setPosition(40, 45)
spawnLockers()
SpawnKey()
createHide()
createEntity()
LightOverlay()
game.showLongText("When time runs out hide in a locker.", DialogLayout.Bottom)
scene.cameraFollowSprite(Key2)
game.showLongText("Here's the key, go find it.", DialogLayout.Bottom)
scene.cameraFollowSprite(User)
Covered = 0
info.startCountdown(180)
music.play(music.createSong(assets.song`heartBeat`), music.PlaybackMode.LoopingInBackground)
game.onUpdate(function () {
    if (info.countdown() >= 10 || Covered == 1) {
        HIDE.x = -10
        HIDE.y = -10
    } else if (info.countdown() < 10 && Covered != 1) {
        HIDE.y = User.y + randint(-10, 10)
        HIDE.x = User.x + randint(-20, 20)
    }
    if (Hunting != 1 && (Entity.x < User.x + 45 && Entity.x > User.x + -45 && (Entity.y < User.y + 35 && Entity.y > User.y + -35))) {
        entitySpot = randint(0, 4)
        if (entitySpot == 0) {
            tiles.placeOnRandomTile(Entity, sprites.castle.tilePath5)
        } else if (entitySpot == 1) {
            tiles.placeOnRandomTile(Entity, sprites.castle.tileGrass3)
        } else if (entitySpot == 2) {
            tiles.placeOnRandomTile(Entity, sprites.castle.tilePath4)
        } else if (entitySpot == 3) {
            tiles.placeOnRandomTile(Entity, sprites.castle.tilePath6)
        } else if (entitySpot == 4) {
            tiles.placeOnRandomTile(Entity, assets.tile`Smooth Concrete Ground Middle`)
        }
    }
    Void.x = User.x
    Void.y = User.y
})
game.onUpdateInterval(200, function () {
    if (controller.left.isPressed()) {
        animation.runImageAnimation(
        User,
        assets.animation`myAnim1`,
        200,
        true
        )
    } else if (controller.up.isPressed()) {
        animation.runImageAnimation(
        User,
        assets.animation`myAnim0`,
        200,
        true
        )
    } else if (controller.right.isPressed()) {
        animation.runImageAnimation(
        User,
        assets.animation`myAnim2`,
        200,
        true
        )
    } else if (controller.down.isPressed()) {
        animation.runImageAnimation(
        User,
        assets.animation`myAnim`,
        200,
        true
        )
    } else {
        animation.stopAnimation(animation.AnimationTypes.All, User)
        User.setImage(assets.image`myImage`)
    }
})
