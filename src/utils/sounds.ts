export const playLevelUpSound = () => {
    const audio = new Audio('/sounds/level-up.mp3');
    audio.play().catch(e => console.log("Sound play error:", e));
};

export const playCorrectSound = () => {
    const audio = new Audio('/sounds/correct.mp3');
    audio.play().catch(e => console.log("Sound play error:", e));
};

export const playWrongSound = () => {
    const audio = new Audio('/sounds/wrong.mp3');
    audio.play().catch(e => console.log("Sound play error:", e));
};

export const playAllCompleteSound = () => {
    const audio = new Audio('/sounds/congratulations.mp3');
    audio.play().catch(e => console.log("Sound play error:", e));
};
