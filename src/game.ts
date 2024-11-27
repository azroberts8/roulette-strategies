import type { Play } from "./strategy.ts";
import { ColorDouble } from "./strategy.ts";

interface GameParams {
  minBet: number;
  initialCash: number;
  iterations: number;
}

interface Stats {
  roundsToBust: number;
  rounds: Array<Play>;
}

interface Summary {
  [key:string]: {
    strategy: string;
    roundsToBust: number;
    rounds: Array<Play>;
    bankValues: Array<number>;
  }
}

class Game {
  private _minBet: number;
  private _initialCash: number;
  private _iterations: number;
  private _colorDoubleRounds: Array<Play> = [];

  constructor({
    minBet, initialCash, iterations
  }: GameParams) {
    this._minBet = minBet;
    this._initialCash = initialCash;
    this._iterations = iterations;
  }

  public simulate() {
    this._colorDoubleRounds.push(new ColorDouble({
      bankAmount: this._initialCash,
      minimumBet: this._minBet,
      playIteration: 0
    }));

    for(let i = 0; i < this._iterations; i++) {
      this._colorDoubleRounds[i].placeBet();
      const space = this.spin();
      const nextColorDouble = this._colorDoubleRounds[i].setWinningSpace(space);
      if(typeof nextColorDouble === "undefined") {
        break;
      } else {
        this._colorDoubleRounds.push(nextColorDouble);
      }
    }
  }

  public get summary(): Summary {
    return {
      doubleColor: {
        strategy: "Double Color",
        roundsToBust: this._colorDoubleRounds.length,
        rounds: this._colorDoubleRounds,
        bankValues: this._colorDoubleRounds.map((round) => round.bankAmount)
      }
    }
  }

  public toString(): string {
    const summary = this.summary;
    let output = ``;

    for(const [_key, value] of Object.entries(summary)) {
      output = `${output}\nStrategy: ${value.strategy}\n`;
      output = `${output}Rounds Until Bust: ${value.roundsToBust}\n`;
      output = `${output}Rounds:\n`;
      for(const round of value.rounds) {
        output = `${output}${round.toString()}\n`;
      }
    }
    output = output.concat(``)

    return output;
  }

  private spin(): number {
    return Math.floor(Math.random() * 38);
  }
}

export { Game }