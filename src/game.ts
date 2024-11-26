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
  private _colorDoubleStats: Stats = {
    roundsToBust: 0,
    rounds: []
  }

  constructor({
    minBet, initialCash, iterations
  }: GameParams) {
    this._minBet = minBet;
    this._initialCash = initialCash;
    this._iterations = iterations;
  }

  public simulate() {
    let colorDouble = new ColorDouble({
      bankAmount: this._initialCash,
      minimumBet: this._minBet,
      playIteration: 0
    });

    
  }

  public get summary(): Summary {
    return {
      doubleColor: {
        strategy: "Double Color",
        roundsToBust: this._colorDoubleStats.roundsToBust,
        rounds: this._colorDoubleStats.rounds,
        bankValues: this._colorDoubleStats.rounds.map((round) => round.bankAmount)
      }
    }
  }
}

export { Game }