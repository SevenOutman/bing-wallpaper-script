# bing-wallpaper-script
> Sets Bing image of day as your wallpaper.

This is a script that pulls Bing image of day and set it as your computer's wallpaper.

I myself run it upon waking up my computer. You're welcomed to use it too.

## Usage

I run this script on my Ubuntu upon wake up. I created a bash script to pull this repo, then run `npm install` and `node index.js`.

## Issue

Note that this script depends on `wallpaper@2.1.1`, which is not the latest version of the package.

That's because I used the latest `wallpaper@2.4.0` and [experienced errors on my Ubuntu with gnome](https://github.com/sindresorhus/wallpaper/issues/7#issuecomment-305729897).

As `wallpaper@2.1.1` does not support Linux with cinnamon, you may not use my script if your Linux uses cinnamon.