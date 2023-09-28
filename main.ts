namespace SpriteKind {
    export const Light = SpriteKind.create()
    export const Key = SpriteKind.create()
    export const Cover = SpriteKind.create()
    export const Screen = SpriteKind.create()
}
/**
 * https://trello.com/b/op32mNrh/game-jam
 */
scene.onOverlapTile(SpriteKind.Player, assets.tile`Door`, function (sprite, location) {
    game.gameOver(true)
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    User,
    assets.animation`myAnim0`,
    200,
    true
    )
})
function spawnLockers () {
    for (let value of tiles.getTilesByType(assets.tile`LockerSpawn`)) {
        Locker = sprites.create(assets.image`Locker`, SpriteKind.Cover)
        tiles.placeOnTile(Locker, value)
    }
}
function SpawnKey () {
    Key = sprites.create(assets.image`Key`, SpriteKind.Key)
    tiles.placeOnRandomTile(Key, assets.tile`tile21`)
}
function createHide () {
    HIDE = sprites.create(assets.image`HIDE`, SpriteKind.Screen)
    HIDE.y = -10
    HIDE.x = -10
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    User,
    assets.animation`myAnim1`,
    200,
    true
    )
})
function LightOverlay () {
    Void = sprites.create(assets.image`Void`, SpriteKind.Light)
    Void.setScale(31, ScaleAnchor.Middle)
}
info.onCountdownEnd(function () {
    if (Covered != 1) {
        game.gameOver(false)
    } else {
        info.startCountdown(180)
        Hunting = 0
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Key, function (sprite, otherSprite) {
    tiles.setTileAt(tiles.getTileLocation(2, 1), assets.tile`Door`)
    sprites.destroy(Key)
    game.showLongText("You hear a door click in the distance.", DialogLayout.Bottom)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`LockedDoor`, function (sprite, location) {
    game.showLongText("I need a key to open this door.", DialogLayout.Bottom)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    User,
    assets.animation`myAnim2`,
    200,
    true
    )
})
scene.onOverlapTile(SpriteKind.Player, sprites.castle.tilePath5, function (sprite, location) {
    Covered = 0
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Smooth Concrete Ground Left-Right`, function (sprite, location) {
    Covered = 0
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    User,
    assets.animation`myAnim`,
    200,
    true
    )
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Smooth Concrete Ground`, function (sprite, location) {
    Covered = 0
})
scene.onOverlapTile(SpriteKind.Player, sprites.castle.tileGrass1, function (sprite, location) {
    Covered = 0
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`LockerSpawn`, function (sprite, location) {
    Covered = 1
})
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
scene.onOverlapTile(SpriteKind.Player, assets.tile`Smooth Concrete Ground Top-Bottom`, function (sprite, location) {
    Covered = 0
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    Entity.follow(User, 200)
    Hunting = 1
})
let mySprite = 0
let Entity: Sprite = null
let Hunting = 0
let Void: Sprite = null
let HIDE: Sprite = null
let Locker: Sprite = null
let Key: Sprite = null
let Covered = 0
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
LightOverlay()
game.splash("When the time runs out hide in a locker.")
Covered = 0
pauseUntil(() => controller.A.isPressed())
createEntity()
scene.cameraFollowSprite(Key)
game.splash("Here's the key, go find it.")
pause(2000)
scene.cameraFollowSprite(User)
info.startCountdown(180)
game.onUpdate(function () {
    let EntityDist = 0
    if (info.countdown() >= 10 || Covered == 1) {
        HIDE.x = -10
        HIDE.y = -10
    } else if (info.countdown() < 10 && Covered != 1) {
        HIDE.y = User.y + randint(-10, 10)
        HIDE.x = User.x + randint(-20, 20)
    }
    if (EntityDist == -2) {
        Entity.setPosition(User.x + 30, User.y + 50)
    } else if (EntityDist == 2) {
        Entity.setPosition(User.x + -30, User.y + 50)
    } else if (EntityDist == -1) {
        Entity.setPosition(User.x + -30, User.y + -50)
    } else if (EntityDist == 1) {
        Entity.setPosition(User.x + 30, User.y + -50)
    }
    Void.x = User.x
    Void.y = User.y
    if (Hunting != 1 && (Entity.x < User.x + 50 && Entity.x > User.x + -50 && (Entity.y < User.y + 40 && Entity.y > User.y + -30))) {
        tiles.placeOnRandomTile(Entity, sprites.castle.tilePath5)
    }
})
game.onUpdateInterval(8000, function () {
    mySprite = randint(-2, 2)
})
