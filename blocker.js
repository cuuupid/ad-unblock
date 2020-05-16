(async () => {

    const log = Logger("Blocker")
    log("Initializing.")

    const urls = ["*://*.helloaiko.com/"]
    const types = ['sub_frame', "script", "image", "font", "object", "xmlhttprequest", "ping", "csp_report", "media", "websocket", "other"]

    chrome.webRequest.onBeforeRequest.addListener(
        ({url,}) => (log("Blocked", url), { cancel: true }),
        {urls, types},
        ["blocking"]
    )

})()