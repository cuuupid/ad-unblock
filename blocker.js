(async () => {

    const log = Logger("Blocker")
    log("Initializing.")

    const urls = ["*://*.helloaiko.com/*"]
    // explicitly block everything except main_frame :)
    const types = ['sub_frame', "script", "image", "font", "object", "xmlhttprequest", "ping", "csp_report", "media", "websocket", "other"]

    chrome.webRequest.onBeforeRequest.addListener(
        // second type check in case the browser forwards the wrong request
        ({url, type}) => (log("Blocked", url), type == "main_frame" ? allow : block),
        {urls,},
        ["blocking"]
    )

})()