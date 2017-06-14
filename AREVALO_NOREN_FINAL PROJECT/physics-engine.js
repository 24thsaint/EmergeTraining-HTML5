class PhysicsEngine {
    static centerize(parent, child) {
        return (parent * 0.5) - (child * 0.5)
    }

    static collisionAlign(x, width) {
        return x + (width * 0.5)
    }

    static radialCollisionDetected(source, target) {
        const x = PhysicsEngine.collisionAlign(source.x, source.width) - PhysicsEngine.collisionAlign(target.x, target.width)
        const y = PhysicsEngine.collisionAlign(source.y, source.height) - PhysicsEngine.collisionAlign(target.y, target.height)
        const radius = (source.width * 0.5) + (target.width * 0.5)
        const distance = Math.sqrt((x * x) + (y * y));
        if (distance < radius) {
            return true
        }
        return false
    }

    static boxCollisionDetected(source, target) {
        return source.x < target.x + target.width &&
            source.x + source.width > target.x &&
            source.y < target.y + target.height &&
            source.height + source.y > target.y
    }

    static generateRandomColor() {
        const color = Math.floor(Math.random() * 16777215)
        return color.toString(16)
    }

    static getSecondsElapsed(past, present) {
        return Math.ceil((present.getTime() - past.getTime()) / 1000)
    }

    static toRadians(degrees) {
        return degrees * (Math.PI / 180)
    }

    static createElement(type) {
        const element = document.createElement(type)
        element.height = 50
        element.width = 50
        return element
    }
}