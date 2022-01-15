function getBaseApiUrl() {
    if ('BASE_API_URL' in process.env) {
        return  process.env.BASE_API_URL;
    } else {
        return 'http://localhost:8000'
    }
}

export {getBaseApiUrl};