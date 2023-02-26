export class SwipeController {
    constructor(elem, threshold = 100) {
        if (!elem) throw "SwipeController requires an element to attch to"

        this.elem = elem;

        this.startX = -1;
        this.startY = -1;

        this.threshold = threshold;

        this.elem.addEventListener("touchstart", e => this.handleTouchStart(e));
        this.elem.addEventListener("touchend", e => this.handleTouchEnd(e));
    }

    handleTouchStart(e) {
        this.startX = e.changedTouches[0].clientX;
        this.startY = e.changedTouches[0].clientY;
    }

    handleTouchEnd(e) {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;

        const deltaX = endX - this.startX;
        const deltaY = endY - this.startY;

        this.sendSwipe(deltaX, deltaY);

        this.startX = -1;
        this.startY = -1;
    }

    sendSwipe(dx, dy) {
        if (Math.abs(dx) < this.threshold && Math.abs(dy) < this.threshold)
            return;

        let direction = "";

        if (Math.abs(dx) > Math.abs(dy)) {
            direction = dx > 0 ? "right" : "left";
        } else {
            direction = dy > 0 ? "down" : "up";
        }

        const event = new CustomEvent("swipe", { detail: { direction } });

        this.elem.dispatchEvent(event);
    }
}
