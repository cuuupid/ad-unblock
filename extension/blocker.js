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

    // don't use regex here it's wayyyy too slow
    const isAllowed = url => {
        if (!(url.includes('http://') || url.includes('https://'))) return true

        const path = url.split('/')
        const hostname =
            // remove protocol
            (url.includes('//') ? path[0] : path[2])
            // remove port
            .split(':')[0]
            // remove query
            .split('?')[0]

        // can make this faster using some sort of tree structure
        return whitelist.includes(hostname)
    }

    chrome.webRequest.onBeforeRequest.addListener(
        // second type check in case the browser forwards the wrong request
        ({url, type}) => (type == "main_frame" || isAllowed(url)) ? allow : (log("Blocked", url), block),
        {urls, types},
        ["blocking"]
    )

})()