export class BillObject {
    constructor(name="default", amount = 0, assigned_user="default", category = "") {
        this.name = name;
        this.amount = amount;
        this.category = category;
        this.assigned_user = assigned_user || "default";
    }

    toJson() {
        return {
            name: this.name,
            amount: this.amount,
            category: this.category
        }
    }
}