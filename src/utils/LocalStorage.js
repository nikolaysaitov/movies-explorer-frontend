export default class LocalStorage {
    constructor(item, startValue = '') {
        this.item = item
        this.startValue = startValue
    }

    save(data) {
        localStorage.setItem(this.item, JSON.stringify(data))
    }

    load() {
        const data = localStorage.getItem(this.item)

        return data ? JSON.parse(data) : this.startValue
    }

    delete() {
        localStorage.removeItem(this.item)
    }
}