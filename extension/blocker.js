(async () => {

    const log = Logger("Blocker")
    log("Initializing.")

    // CONFIG
    const {
        urls, types, block, allow
    } = {
        urls: ["*://*.helloaiko.com/*"],
        // explicitly block everything except main_frame :)
        types: ['sub_frame', "script", "image", "font", "object", "xmlhttprequest", "ping", "csp_report", "media", "websocket", "other"],
        block: { cancel: true },
        allow: { cancel: false },
    }

    chrome.webRequest.onBeforeRequest.addListener(
        // second type check in case the browser forwards the wrong request
        ({url, type}) => (log("Blocked", url), type == "main_frame" ? allow : block),
        {urls, types},
        ["blocking"]
    )

})()