const createCanvas = require('node-canvas-webgl').createCanvas;
const canvas = createCanvas(200, 300);

const skinview3d = require('./libs/skinview3d/skinview3d.bundle.js')

const express = require('express')
const app = express()

function degrees_to_radians(degrees) {
    if (degrees === 0) return 0;
    return degrees * (Math.PI / 180);
}

function undefinedDefault(param, def) {
    return typeof param !== 'undefined' ? param : def;
}

app.get('/', async (req, res) => {
    /*
    OPTIONS:

    & name      =   Example     <- Description
    --------------------------------------------------

    # GENERAL

    & profile       =   SBDeveloper <- MC User name / UUID
    & aa            =   true        <- Enable anti aliasing?
    & size          =   100         <- The size of the image
    & rot           =   90          <- Rotation of the full image, in degrees.

    # HEAD ROTATION

    & headPitch     =   90          <- Pitch rotation (x angle)
    & headYaw       =   90          <- Yaw rotation (y angle)
    & headRoll      =   90          <- Roll rotation (z angle)

    # LEFT ARM ROTATION

    & leftArmPitch  =   90          <- Pitch rotation (x angle)
    & leftArmRoll   =   90          <- Roll rotation (z angle)

    # RIGHT ARM ROTATION

    & rightArmPitch =   90          <- Pitch rotation (x angle)
    & rightArmRoll  =   90          <- Roll rotation (z angle)

    # LEFT LEG ROTATION

    & leftLegPitch  =   90          <- Pitch rotation (x angle)
    & leftLegRoll   =   90          <- Roll rotation (z angle)

    # RIGHT LEG ROTATION

    & rightLegPitch =   90          <- Pitch rotation (x angle)
    & rightLegRoll  =   90          <- Roll rotation (z angle)
     */

    const profile = undefinedDefault(req.query.profile, "Notch");
    const isAA = undefinedDefault(req.query.aa, true);
    const size = undefinedDefault(req.query.size, 100) / 100;

    const headX = degrees_to_radians(undefinedDefault(req.query.headPitch, 0));
    const headY = degrees_to_radians(undefinedDefault(req.query.headYaw, 0));
    const headZ = degrees_to_radians(undefinedDefault(req.query.headRoll, 0));

    const leftArmX = degrees_to_radians(undefinedDefault(req.query.leftArmPitch, 0));
    const leftArmZ = degrees_to_radians(undefinedDefault(req.query.leftArmRoll, 0));

    const rightArmX = degrees_to_radians(undefinedDefault(req.query.rightArmPitch, 0));
    const rightArmZ = degrees_to_radians(undefinedDefault(req.query.rightArmRoll, 0));

    const leftLegX = degrees_to_radians(undefinedDefault(req.query.leftLegPitch, 0));
    const leftLegZ = degrees_to_radians(undefinedDefault(req.query.leftLegRoll, 0));

    const rightLegX = degrees_to_radians(undefinedDefault(req.query.rightLegPitch, 0));
    const rightLegZ = degrees_to_radians(undefinedDefault(req.query.rightLegRoll, 0));

    const rotation = degrees_to_radians(undefinedDefault(req.query.rot, 0));

    const options = {
        canvas: canvas,
        width: 200,
        height: 300,
        renderPaused: true
    };

    let skinViewer;
    if (isAA) {
        skinViewer = new skinview3d.FXAASkinViewer(options);
    } else {
        skinViewer = new skinview3d.SkinViewer(options);
    }

    await skinViewer.loadSkin("https://minotar.net/skin/" + profile);

    skinViewer.setSize(options.width * size, options.height * size);

    const skin = skinViewer.playerObject.skin;

    skin.head.rotation.x = headX;
    skin.head.rotation.y = headY;
    skin.head.rotation.z = headZ;

    skin.leftArm.rotation.x = leftArmX;
    skin.leftArm.rotation.z = leftArmZ;

    skin.rightArm.rotation.x = rightArmX;
    skin.rightArm.rotation.z = rightArmZ;

    skin.leftLeg.rotation.x = leftLegX;
    skin.leftLeg.rotation.z = leftLegZ;

    skin.rightLeg.rotation.x = rightLegX;
    skin.rightLeg.rotation.z = rightLegZ;

    skin.rotation.y = rotation;

    skinViewer.render();

    res.status(200);
    res.set('Content-Type', 'image/png');
    res.end(skinViewer.canvas.toBuffer('image/png'));
});

app.listen(8080, () => {
    console.log("The webserver has been started on port :8080.");
});