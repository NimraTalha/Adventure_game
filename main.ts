import inquirer from "inquirer";

class Player {
    name: string;
    fuel: number = 100;

    constructor(name: string) {
        this.name = name;
    }

    attack(opponent: Opponent) {
        const damage = Math.floor(Math.random() * 20) + 1;
        console.log(`You attack ${opponent.name} and deal ${damage} damage!`);
        opponent.fuel -= damage;
    }

    drinkPotion() {
        const potionAmount = Math.floor(Math.random() * 20) + 1;
        console.log(`You drink a potion and restore ${potionAmount} fuel.`);
        this.fuel += potionAmount;
    }
}

class Opponent {
    name: string;
    fuel: number = 100;

    constructor(name: string) {
        this.name = name;
    }

    attack(player: Player) {
        const damage = Math.floor(Math.random() * 20) + 1;
        console.log(`${this.name} attacks you and deals ${damage} damage!`);
        player.fuel -= damage;
    }
}

async function main() {
    console.log("Welcome to the Battle Game!");

    // Get player's name
    const { name } = await inquirer.prompt([{
        name: "name",
        type: "input",
        message: "Please enter your name.."
    }]);
    const player = new Player(name);

    // Select opponent
    const { opponentName } = await inquirer.prompt([{
        name: "opponentName",
        type: "list",
        message: "Select your opponent..",
        choices: ["skeleton", "snake", "Zombie"]
    }]);
    const opponent = new Opponent(opponentName);

    console.log(`You (${player.name}) vs ${opponent.name}`);

    // Game loop
    while (player.fuel > 0 && opponent.fuel > 0) {
        // Prompt player for action
        const { action } = await inquirer.prompt([{
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: ["Attack", "Drink potion", "Run away"]
        }]);

        // Perform player's chosen action
        switch (action) {
            case "Attack":
                player.attack(opponent);
                break;
            case "Drink potion":
                player.drinkPotion();
                break;
            case "Run away":
                console.log("You run away!");
                return; // End the game
        }

        // If opponent still has fuel, let them attack
        if (opponent.fuel > 0) {
            opponent.attack(player);
        }
    }

    // Game over
    if (player.fuel <= 0) {
        console.log("You lose!");
    } else {
        console.log("You win!");
    }
}

main();



