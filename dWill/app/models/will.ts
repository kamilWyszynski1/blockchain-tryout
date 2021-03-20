interface Person {
    name: string
    surname: string
    wallet: string
    email: string
}

class Will {
    testator: Person
    heir: Person
    timeOffset: Number

    constructor(testator: Person, heir: Person, timeOffset: number) {
        this.testator = testator;
        this.heir = heir;
        this.timeOffset = timeOffset;
    }

    public toDoc() {
        return {
            testatorName: this.testator.name,
            testatorSurname: this.testator.surname,
            testatorWallet: this.testator.wallet,
            testatorEmail: this.testator.email,
            heirName: this.heir.name,
            heirSurname: this.heir.surname,
            heirWallet: this.heir.wallet,
            heirEmail: this.heir.email,
            timeOffset: this.timeOffset
        }
    }
}

export {
    Person, Will
}