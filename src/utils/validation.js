

export const ensureNotSelfAction = (currentId, targetId) => {
    if(currentId.toString() === targetId.toString()) {
        const error = new Error("You can't perform this action on yourself");
        error.status = 400;
        throw error;
    }
}
