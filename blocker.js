(async () => {

    const log = Logger("Blocker")
    log("Initializing.")

    const block = {cancel: true}
    const urls = ["*://*.helloaiko.com/"]
    chrome.webRequest.onBeforeRequest.addListener(
        (({url,}) => log("Blocked", url), block),
        {urls,},
        ["blocking"]
    )

})()