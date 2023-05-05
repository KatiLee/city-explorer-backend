'use strict';

const clearCache = () => {
    for (const key in cache) {
        if (Date.now() - cache[key].timeStamp > maxCacheTime) {
            delete cache[key];
        }
    }
};

const maxCacheTime = 1000 * 60 * 60;

setInterval(clearCache, maxCacheTime);

module.exports = cahce;