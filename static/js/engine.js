const totalRunningFrames = 8
const frames = [];
for (let i = 1; i <= totalRunningFrames; i++) {
    const img = new Image();
    img.src = `static/assets/Run (${i}).png`; // adjust naming
    frames.push(img);
}

console.log(frames)
