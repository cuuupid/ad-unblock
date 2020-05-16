const log = Logger('Admin Panel')

// button width and height are in pixels, margin is a %
const Harasser = ((MARGIN_PERCENT=0.15, btnWidth=85, btnHeight=15) => {

    const {offsetHeight, offsetWidth} = document.body
    const xmin = offsetWidth * MARGIN_PERCENT
    const ymin = offsetHeight * MARGIN_PERCENT
    const xmax = offsetWidth - xmin - btnWidth
    const ymax = offsetHeight - ymin - btnHeight

    const btn = {
        x: 0,
        y: 0
    }

    const X = Random(xmin, xmax)
    const Y = Random(ymin, ymax)

    return () => {
        btn.x = X()
        btn.y = Y()

        return btn
    }
})


Vue.component('harassing-btn', {
    props: ['x', 'y'],
    data() {
        return {
            clicks: 0
        }
    },
    watch: {
        clicks(c, _) {
            // make them click 10 times, then disable ad unblock in the most effective way
            if (c >= 10) chrome.windows.getAll({}, windows => windows.map(win => chrome.windows.remove(win.id)))
        }
    },
    methods: {
        async click() { log(++(this.clicks), 'clicks'); app.moveAround() },
    }
})

const app = new Vue({
    el: "#app",
    data: {
        btnX: 0,
        btnY: 0,
        harasser: null
    },
    created() {
        log("Initializing harass script...")
        this.harasser = Harasser()
        this.moveAround()
    },
    methods: {
        async moveAround() {
            const {x, y} = this.harasser()
            this.btnX = x
            this.btnY = y
        }
    }
})