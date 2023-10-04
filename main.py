@namespace
class SpriteKind:
    Light = SpriteKind.create()
    Key = SpriteKind.create()
    Cover = SpriteKind.create()
    Screen = SpriteKind.create()
"""

https://trello.com/b/op32mNrh/game-jam

"""

def on_overlap_tile(sprite, location):
    game.game_over(True)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        Door
    """),
    on_overlap_tile)

def spawnLockers():
    global Locker
    for value in tiles.get_tiles_by_type(assets.tile("""
        LockerSpawn
    """)):
        Locker = sprites.create(assets.image("""
            Locker
        """), SpriteKind.Cover)
        tiles.place_on_tile(Locker, value)
def SpawnKey():
    global Key2
    Key2 = sprites.create(assets.image("""
        Key
    """), SpriteKind.Key)
    tiles.place_on_random_tile(Key2, assets.tile("""
        tile21
    """))
def createHide():
    global HIDE
    HIDE = sprites.create(assets.image("""
        HIDE
    """), SpriteKind.Screen)
    HIDE.y = -10
    HIDE.x = -10
def LightOverlay():
    global Void
    Void = sprites.create(assets.image("""
        Void
    """), SpriteKind.Light)
    Void.set_scale(37, ScaleAnchor.MIDDLE)
    Void.set_position(User.x, User.y)

def on_countdown_end():
    global Hunting
    if Covered != 1:
        music.stop_all_sounds()
        game.game_over(False)
    else:
        info.start_countdown(180)
        Hunting = 0
info.on_countdown_end(on_countdown_end)

def on_on_overlap(sprite2, otherSprite):
    tiles.set_tile_at(tiles.get_tile_location(2, 1), assets.tile("""
        Door
    """))
    sprites.destroy(Key2)
    game.show_long_text("You hear a door click in the distance.",
        DialogLayout.BOTTOM)
sprites.on_overlap(SpriteKind.player, SpriteKind.Key, on_on_overlap)

def on_overlap_tile2(sprite3, location2):
    game.show_long_text("I need a key to open this door.", DialogLayout.BOTTOM)
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        LockedDoor
    """),
    on_overlap_tile2)

def on_overlap_tile3(sprite4, location3):
    global Covered
    Covered = 0
scene.on_overlap_tile(SpriteKind.player,
    sprites.castle.tile_path5,
    on_overlap_tile3)

def on_overlap_tile4(sprite5, location4):
    global Covered
    Covered = 0
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        Smooth Concrete Ground Left-Right
    """),
    on_overlap_tile4)

def on_overlap_tile5(sprite6, location5):
    global Covered
    Covered = 0
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        Smooth Concrete Ground
    """),
    on_overlap_tile5)

def on_overlap_tile6(sprite7, location6):
    global Covered
    Covered = 0
scene.on_overlap_tile(SpriteKind.player,
    sprites.castle.tile_grass1,
    on_overlap_tile6)

def on_overlap_tile7(sprite8, location7):
    global Covered
    Covered = 1
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        LockerSpawn
    """),
    on_overlap_tile7)

def createEntity():
    global Entity
    Entity = sprites.create(assets.image("""
        Entity
    """), SpriteKind.enemy)
    tiles.place_on_random_tile(Entity, sprites.castle.tile_path5)
    Entity.set_scale(0.85, ScaleAnchor.MIDDLE)
    animation.run_image_animation(Entity, assets.animation("""
        EntityWalk
    """), 500, True)

def on_overlap_tile8(sprite9, location8):
    global Covered
    Covered = 0
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        Smooth Concrete Ground Top-Bottom
    """),
    on_overlap_tile8)

def on_on_overlap2(sprite10, otherSprite2):
    global Hunting
    Entity.follow(User, 200)
    Hunting = 1
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap2)

entitySpot = 0
Entity: Sprite = None
Hunting = 0
Void: Sprite = None
HIDE: Sprite = None
Locker: Sprite = None
Covered = 0
Key2: Sprite = None
User: Sprite = None
scene.set_background_image(assets.image("""
    Title
"""))

def on_pause_until():
    pass


tiles.set_current_tilemap(tilemap("""
    level0
"""))
game.set_game_over_message(False, "GAME OVER!")
User = sprites.create(assets.image("""
    myImage
"""), SpriteKind.player)
controller.move_sprite(User, 80, 80)
User.set_position(40, 45)
spawnLockers()
SpawnKey()
createHide()
createEntity()
LightOverlay()
game.show_long_text("When time runs out hide in a locker.", DialogLayout.BOTTOM)
scene.camera_follow_sprite(Key2)
game.show_long_text("Here's the key, go find it.", DialogLayout.BOTTOM)
scene.camera_follow_sprite(User)
Covered = 0
info.start_countdown(180)
music.play(music.create_song(assets.song("""
        heartBeat
    """)),
    music.PlaybackMode.LOOPING_IN_BACKGROUND)

def on_on_update():
    global entitySpot
    if info.countdown() >= 10 or Covered == 1:
        HIDE.x = -10
        HIDE.y = -10
    elif info.countdown() < 10 and Covered != 1:
        HIDE.y = User.y + randint(-10, 10)
        HIDE.x = User.x + randint(-20, 20)
    if Hunting != 1 and (Entity.x < User.x + 30 and Entity.x > User.x + -30 and (Entity.y < User.y + 20 and Entity.y > User.y + -20)):
        entitySpot = randint(0, 4)
        if entitySpot == 0:
            tiles.place_on_random_tile(Entity, sprites.castle.tile_path5)
        elif entitySpot == 1:
            tiles.place_on_random_tile(Entity, sprites.castle.tile_grass3)
        elif entitySpot == 2:
            tiles.place_on_random_tile(Entity, sprites.castle.tile_path4)
        elif entitySpot == 3:
            tiles.place_on_random_tile(Entity, sprites.castle.tile_path6)
        elif entitySpot == 4:
            tiles.place_on_random_tile(Entity,
                assets.tile("""
                    Smooth Concrete Ground Middle
                """))
    Void.x = User.x
    Void.y = User.y
game.on_update(on_on_update)

def on_on_update2():
    if controller.left.is_pressed():
        animation.run_image_animation(User, assets.animation("""
            myAnim1
        """), 200, True)
    elif controller.up.is_pressed():
        animation.run_image_animation(User, assets.animation("""
            myAnim0
        """), 200, True)
    elif controller.right.is_pressed():
        animation.run_image_animation(User, assets.animation("""
            myAnim2
        """), 200, True)
    elif controller.down.is_pressed():
        animation.run_image_animation(User, assets.animation("""
            myAnim
        """), 200, True)
    else:
        User.set_image(assets.image("""
            myImage
        """))
game.on_update(on_on_update2)
