
const flattenLocation = (location) => {
    const flattenedResult = {};
    dfs(location, flattenedResult);
    return flattenedResult;
}

const dfs = (location, flattenedResult) => {
    if (typeof location === "object") {
        for (const property in location) {
            if (typeof location[property] === "string" ||
                typeof location[property] === "number") {
                flattenedResult[property] = location[property];
            } else {
                dfs(location[property], flattenedResult);
            }
        }
    } 
}

export default flattenLocation;