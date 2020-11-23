// const promise1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(`========================${this} done=======================`);
//     }, 1000);
// });

class Human {
    constructor(hp, damage, defense, isDead) {
        this.hp = hp;
        this.damage = damage;
        this.defense = defense;
        this.isDead = false;
    }
}

class Warrior extends Human{
    constructor(hp, damage, defense) {
        super(hp, damage, defense);
        this.isFrozen = false;
    }

     attack (enemy) {
        if (this.isDead) {
            console.log('Warrior dead')
        }
        else {
            if (this.isFrozen === false) {
                if (enemy.defense > 0) {
                    enemy.defense -= this.damage;
                    enemy.hp -= Math.floor(this.damage / 2);
                    console.log(`--- Knight HP: ${enemy.hp} / DEFENSE: ${enemy.defense}`);
                } else {
                    enemy.hp -= this.damage;
                    if (enemy.hp > 0){
                        console.log(`--- Knight HP: ${enemy.hp}`);
                    }
                    else {
                        enemy.isDead = true;
                    }
                }
                enemy.attack(this);
            }
            else {
                console.log('WARRIOR IS FROZEN');
                this.isFrozen = false;
                enemy.attack(this);
            }
        }
    }
}

class Knight extends Human{
    constructor(hp, damage, defense) {
        super(hp, damage, defense);
    }

     attack (enemy) {
        if (this.isDead) {
            console.log('Knight dead');
        }
        else {
            switch (randomize(0, 1)) {
                case 0:
                    if (enemy.defense > 0) {
                        enemy.defense -= this.damage;
                        enemy.hp -= Math.floor(this.damage / 2);
                        console.log(`--- Warrior HP: ${enemy.hp} / DEFENSE: ${enemy.defense}`);
                    } else {
                        enemy.hp -= this.damage;
                        if (enemy.hp > 0){
                            console.log(`--- Warrior HP: ${enemy.hp}`);
                        }
                        else {
                            enemy.isDead = true;
                        }
                    }
                    break;
                case 1:
                    this.freeze(enemy);
                    enemy.attack(this);

                    break;
                default :
                    console.log('ERROR!');
            }
            enemy.attack(this);
        }
    }

    freeze (enemy) {
        enemy.isFrozen = true;
    }
}


function randomize(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let k1 = new Knight(100, 10, 50);
let w1 = new Warrior(100, 10, 50);

k1.attack(w1);

