// Level blocking system - uses localStorage only

export interface LevelBlockInfo {
    level: number;
    failCount: number;
    isBlocked: boolean;
    requiredCorrectStreak: number;
    currentCorrectStreak: number;
    levelInProgress?: boolean;
    levelStartedAt?: string;
    requiredRevisionModule?: string | null;
}

const getLocalStorageKey = (username: string, mode: string = 'progression') =>
    `levelBlocking_${username.toLowerCase()}_${mode}`;

// Get blocking info - localStorage only
export const getBlockingInfo = async (
    username: string,
    mode: string = 'progression'
): Promise<LevelBlockInfo | null> => {
    // Fallback to localStorage
    const key = getLocalStorageKey(username, mode);
    const localData = localStorage.getItem(key);

    if (!localData) return null;

    try {
        return JSON.parse(localData);
    } catch {
        return null;
    }
};

// Save progression to localStorage
const saveProgression = async (
    username: string,
    mode: string,
    info: LevelBlockInfo
): Promise<void> => {
    const key = getLocalStorageKey(username, mode);
    localStorage.setItem(key, JSON.stringify(info));
};

export const markLevelStarted = async (
    username: string,
    level: number,
    mode: string = 'progression'
): Promise<void> => {
    const existing = await getBlockingInfo(username, mode) || {
        level,
        failCount: 0,
        isBlocked: false,
        requiredCorrectStreak: 10,
        currentCorrectStreak: 0,
    };

    existing.levelInProgress = true;
    existing.levelStartedAt = new Date().toISOString();
    existing.level = level;

    await saveProgression(username, mode, existing);
};

export const markLevelCompleted = async (
    username: string,
    level: number,
    mode: string = 'progression'
): Promise<void> => {
    const existing = await getBlockingInfo(username, mode);

    if (existing) {
        existing.levelInProgress = false;
        await saveProgression(username, mode, existing);
    }
};

export const recordLevelSuccess = async (
    username: string,
    level: number,
    mode: string = 'progression'
): Promise<void> => {
    const existing = await getBlockingInfo(username, mode) || {
        level,
        failCount: 0,
        isBlocked: false,
        requiredCorrectStreak: 10,
        currentCorrectStreak: 0,
    };

    existing.failCount = 0;
    existing.isBlocked = false;
    existing.currentCorrectStreak = (existing.currentCorrectStreak || 0) + 1;
    existing.level = level;

    await saveProgression(username, mode, existing);
};

export const recordLevelFailure = async (
    username: string,
    level: number,
    mode: string = 'progression'
): Promise<LevelBlockInfo | null> => {
    const existing = await getBlockingInfo(username, mode) || {
        level,
        failCount: 0,
        isBlocked: false,
        requiredCorrectStreak: 10,
        currentCorrectStreak: 0,
    };

    existing.failCount = (existing.failCount || 0) + 1;
    existing.currentCorrectStreak = 0;
    existing.level = level;

    // Block after 3 consecutive failures
    if (existing.failCount >= 3) {
        existing.isBlocked = true;
    }

    await saveProgression(username, mode, existing);
    return existing;
};

export const checkAndRecordAbandon = async (username: string): Promise<LevelBlockInfo | null> => {
    return null;
};

export const unblockLevel = async (
    username: string,
    level: number,
    mode: string = 'progression'
): Promise<void> => {
    const existing = await getBlockingInfo(username, mode);

    if (existing) {
        existing.isBlocked = false;
        existing.failCount = 0;
        await saveProgression(username, mode, existing);
    }
};

export const updateCurrentLevel = async (
    username: string,
    newLevel: number,
    mode: string = 'progression'
): Promise<void> => {
    const existing = await getBlockingInfo(username, mode) || {
        level: newLevel,
        failCount: 0,
        isBlocked: false,
        requiredCorrectStreak: 10,
        currentCorrectStreak: 0,
    };

    existing.level = newLevel;
    existing.failCount = 0;
    existing.isBlocked = false;

    await saveProgression(username, mode, existing);
};

export const getCurrentLevel = async (
    username: string,
    mode: string = 'progression'
): Promise<number> => {
    const info = await getBlockingInfo(username, mode);
    return info?.level ?? 1;
};

export const isLevelBlocked = (info: LevelBlockInfo | null, level: number): boolean => {
    return info !== null && info.isBlocked && info.level === level;
};

export const getBlockedLevel = (info: LevelBlockInfo | null): number | null => {
    return info && info.isBlocked ? info.level : null;
};
