namespace SpriteKind {
    export const Light = SpriteKind.create()
    export const Key = SpriteKind.create()
    export const Cover = SpriteKind.create()
    export const Screen = SpriteKind.create()
}
/**
 * Title Screen
 */
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
    false
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
    tiles.placeOnRandomTile(Key, assets.tile`KeySpawn`)
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    User,
    assets.animation`myAnim1`,
    200,
    false
    )
})
function LightOverlay () {
    Void = sprites.create(assets.image`Void`, SpriteKind.Light)
    Void.setScale(31, ScaleAnchor.Middle)
    Void.follow(User, 100)
}
info.onCountdownEnd(function () {
    if (Covered != 1) {
        game.gameOver(false)
    } else {
        info.startCountdown(180)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Key, function (sprite, otherSprite) {
    tiles.setTileAt(tiles.getTileLocation(2, 1), assets.tile`Door`)
    sprites.destroy(Key)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    User,
    assets.animation`myAnim2`,
    200,
    false
    )
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    User,
    assets.animation`myAnim`,
    200,
    false
    )
})
let Void: Sprite = null
let Key: Sprite = null
let Locker: Sprite = null
let Covered = 0
let User: Sprite = null
tiles.setCurrentTilemap(tilemap`level0`)
game.setGameOverMessage(false, "GAME OVER!")
User = sprites.create(assets.image`myImage`, SpriteKind.Player)
controller.moveSprite(User, 100, 100)
scene.cameraFollowSprite(User)
spawnLockers()
LightOverlay()
SpawnKey()
let HIDE = sprites.create(assets.image`HIDE`, SpriteKind.Screen)
HIDE.y = -10
HIDE.x = -10
info.startCountdown(180)
Covered = 0
/**
 * Death Loop
 */
game.onUpdate(function () {
    if (User.x == Locker.x && User.y == Locker.y) {
        Covered = 1
    } else {
        Covered = 0
    }
    if (info.countdown() >= 10 || Covered == 1) {
        HIDE.x = -10
        HIDE.y = -10
    } else if (info.countdown() < 10 && Covered != 1) {
        HIDE.y = User.y + randint(-10, 10)
        HIDE.x = User.x + randint(-20, 20)
    }
})
