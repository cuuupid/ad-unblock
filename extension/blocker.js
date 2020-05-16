(async () => {

    const log = Logger("Blocker")
    log("Initializing.")

    // CONFIG
    const {
        urls, types, block, allow
    } = {
        urls: ["<all_urls>"],
        // explicitly block everything except main_frame :)
        types: ['sub_frame', "script", "image", "font", "object", "xmlhttprequest", "ping", "csp_report", "media", "websocket", "other"],
        block: { cancel: true },
        allow: { cancel: false },
    }

    const whitelist = [
        /^[^:]*:(?:\/\/)?(?:[^\/]*\.)?helloaiko.com\/.*$/
    ]
    const isAllowed = url => {
        for (let domain of whitelist)
            if (domain.test(url)) return true;
        return false
    }

    chrome.webRequest.onBeforeRequest.addListener(
        // second type check in case the browser forwards the wrong request
        ({url, type}) => (log("Blocked", url), (type == "main_frame" || isAllowed(url)) ? allow : block),
        {urls, types},
        ["blocking"]
    )

})()