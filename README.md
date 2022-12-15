# MCSkinViewer

Generates a PNG skin image, based on properties given in the URL parameters.

Copyright &copy; 2022 - SBDevelopment\
Please also see copyright notices of the libraries used (`/libs/.../LICENSE`).

## Demo:

A demo is available at [skins.sbdevelopment.tech](https://skins.sbdevelopment.tech/).

For example: `https://skins.sbdevelopment.tech/?profile=5e4723d7-3ea1-4fe5-a748-3cb53c35d96b&headPitch=25&rot=330&aa=false`

![image](https://skins.sbdevelopment.tech/?profile=5e4723d7-3ea1-4fe5-a748-3cb53c35d96b&headPitch=25&rot=330&aa=false)

## Usage:

The default (/) endpoint supports the following options:
```md
& name          =   Example     <- Description
--------------------------------------------------

# GENERAL

& profile       =   SBDeveloper <- MC User name / UUID
& size          =   100         <- The size of the image
& rot           =   90          <- Rotation of the full image, in degrees.
& fov           =   50          <- The field of view

# LIGHT
& glight        =   100         <- The global light on the skin
& clight        =   100         <- The light of the camera

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

# LAYER VISBIBLITY

& headInner     =   1           <- Visiblity of the inner head
& headOuter     =   1           <- Visiblity of the outer head
& bodyInner     =   1           <- Visiblity of the inner body
& bodyOuter     =   1           <- Visiblity of the outer body
& leftArmInner  =   1           <- Visiblity of the inner left arm
& leftArmOuter  =   1           <- Visiblity of the outer left arm
& rightArmInner =   1           <- Visiblity of the inner right arm
& rightArmOuter =   1           <- Visiblity of the outer right arm
& leftLegInner  =   1           <- Visiblity of the inner left leg
& leftLegOuter  =   1           <- Visiblity of the outer left leg
& rightLegInner =   1           <- Visiblity of the inner right leg
& rightLegOuter =   1           <- Visiblity of the outer right leg
```
