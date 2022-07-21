const skinview3d = require('./libs/skinview3d/skinview3d.bundle.js')
const https = require("https")
const fs = require("fs")
const express = require('express')

//////////////////

function degrees_to_radians(degrees) {
    if (degrees === 0) return 0;
    return degrees * (Math.PI / 180);
}

function undefined_default(param, def) {
    return typeof param !== 'undefined' ? param : def;
}

//////////////////

const app = express()

https.createServer({
    key: fs.readFileSync("ssl/key.pem"),
    cert: fs.readFileSync("ssl/cert.pem"),
}, app).listen(25580, () => {
    console.log("The webserver is online and ready for requests on :25580!");
});

app.get('/', async (req, res) => {
    console.log("Request on / from " + (req.headers['x-forwarded-for'] || req.socket.remoteAddress));

    const profile = undefined_default(req.query.profile, "Notch");
    const size = undefined_default(req.query.size, 100) / 100;
    const fov = undefined_default(req.query.fov, 50);

    const globLight = undefined_default(req.query.glight, 100) / 100;
    const camLight = undefined_default(req.query.clight, 100) / 100;

    const headX = degrees_to_radians(undefined_default(req.query.headPitch, 0));
    const headY = degrees_to_radians(undefined_default(req.query.headYaw, 0));
    const headZ = degrees_to_radians(undefined_default(req.query.headRoll, 0));

    const leftArmX = degrees_to_radians(undefined_default(req.query.leftArmPitch, 0));
    const leftArmZ = degrees_to_radians(undefined_default(req.query.leftArmRoll, 0));

    const rightArmX = degrees_to_radians(undefined_default(req.query.rightArmPitch, 0));
    const rightArmZ = degrees_to_radians(undefined_default(req.query.rightArmRoll, 0));

    const leftLegX = degrees_to_radians(undefined_default(req.query.leftLegPitch, 0));
    const leftLegZ = degrees_to_radians(undefined_default(req.query.leftLegRoll, 0));

    const rightLegX = degrees_to_radians(undefined_default(req.query.rightLegPitch, 0));
    const rightLegZ = degrees_to_radians(undefined_default(req.query.rightLegRoll, 0));

    const rotation = degrees_to_radians(undefined_default(req.query.rot, 0));

    const headInner = undefined_default(req.query.headInner, 1);
    const headOuter = undefined_default(req.query.headOuter, 1);
    const bodyInner = undefined_default(req.query.bodyInner, 1);
    const bodyOuter = undefined_default(req.query.bodyOuter, 1);
    const leftArmInner = undefined_default(req.query.leftArmInner, 1);
    const leftArmOuter = undefined_default(req.query.leftArmOuter, 1);
    const rightArmInner = undefined_default(req.query.rightArmInner, 1);
    const rightArmOuter = undefined_default(req.query.rightArmOuter, 1);
    const leftLegInner = undefined_default(req.query.leftLegInner, 1);
    const leftLegOuter = undefined_default(req.query.leftLegOuter, 1);
    const rightLegInner = undefined_default(req.query.rightLegInner, 1);
    const rightLegOuter = undefined_default(req.query.rightLegOuter, 1);

    const skinViewer = new skinview3d.SkinViewer({renderPaused: true});

    // skinViewer.render(); //TODO Check if this is required ...

    await skinViewer.loadSkin("https://minotar.net/skin/" + profile);

    skinViewer.zoom = size;
    skinViewer.fov = fov;

    skinViewer.globalLight.intensity = globLight;
    skinViewer.cameraLight.intensity = camLight;

    const skin = skinViewer.playerObject.skin;

    skin.head.innerLayer.visible = headInner;
    skin.head.outerLayer.visible = headOuter;
    skin.head.rotation.x = headX;
    skin.head.rotation.y = headY;
    skin.head.rotation.z = headZ;

    skin.body.innerLayer.visible = bodyInner;
    skin.body.outerLayer.visible = bodyOuter;

    skin.leftArm.innerLayer.visible = leftArmInner;
    skin.leftArm.outerLayer.visible = leftArmOuter;
    skin.leftArm.rotation.x = leftArmX;
    skin.leftArm.rotation.z = leftArmZ;

    skin.rightArm.innerLayer.visible = rightArmInner;
    skin.rightArm.outerLayer.visible = rightArmOuter;
    skin.rightArm.rotation.x = rightArmX;
    skin.rightArm.rotation.z = rightArmZ;

    skin.leftLeg.innerLayer.visible = leftLegInner;
    skin.leftLeg.outerLayer.visible = leftLegOuter;
    skin.leftLeg.rotation.x = leftLegX;
    skin.leftLeg.rotation.z = leftLegZ;

    skin.rightLeg.innerLayer.visible = rightLegInner;
    skin.rightLeg.outerLayer.visible = rightLegOuter;
    skin.rightLeg.rotation.x = rightLegX;
    skin.rightLeg.rotation.z = rightLegZ;

    skin.rotation.y = rotation;

    skinViewer.render(); //TODO ... or if it works fine here?

    res.status(200);
    res.set('Content-Type', 'image/png');
    res.end(skinViewer.canvas.toBuffer('image/png'));
});