export class BillObject {
    constructor(name="default", amount = 0, category = "") {
        this.name = name;
        this.amount = amount;
        this.category = category;
    }

    toJson() {
        return {
            name: this.name,
            amount: this.amount,
            category: this.category
        }
    }
}