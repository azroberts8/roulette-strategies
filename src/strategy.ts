import type { Bet } from "./bet.ts";
import {
  Black, Even, FirstDozen, ThirdDozen, FirstColumn, ThirdColumn 
} from "./bet.ts";

interface Play {
  bankAmount: number;
  totalBetAmount: number;
  playIteration: number;
  busted: boolean;
  payout: number;
  bets: Array<Bet>;
  placeBet(): void;
  setWinningSpace(space: number): Play | undefined;
}

class PlayPrototype {
  protected _bankAmount: number;
  protected _bets: Array<Bet> = [];
  protected _minimumBet: number;
  protected _previousBet: Play;
  protected _playIteration: number;
  protected _busted = false;

  constructor({
    bankAmount, minimumBet, previousBet, playIteration
  }: { bankAmount: number, minimumBet: number, previousBet: Play, playIteration: number }) {
    this._bankAmount = bankAmount;
    this._minimumBet = minimumBet;
    this._previousBet = previousBet;
    this._playIteration = playIteration;
  }

  public get bankAmount(): number {
    return this._bankAmount;
  }

  public get totalBetAmount(): number {
    return this._bets.reduce(
      (acc, curr) => acc + curr.betAmount,
      0);
  }

  public get playIteration(): number {
    return this._playIteration;
  }

  public get busted(): boolean {
    return this._busted;
  }

  public get payout(): number {
    return this._bets.reduce(
      (acc, curr) => acc + curr.getPayout(),
      0);
  }

  public get bets(): Array<Bet> {
    return this._bets;
  }
}

class ColorDouble extends PlayPrototype implements Play {
  placeBet(): void {
    let betAmount = this._minimumBet;
    if(this._previousBet.payout === 0)
      betAmount = this._previousBet.totalBetAmount * 2;

    if(betAmount < this._bankAmount) {
      this._busted = true;
    } else {
      this._bankAmount -= betAmount;
      this._bets.push(new Black(betAmount));
    }
  }

  setWinningSpace(space: number): ColorDouble | undefined {
    if(this._busted) return undefined;

    this._bets.forEach((bet) => {
      bet.setWinningSpace(space);
    });

    return new ColorDouble({
      bankAmount: this._bankAmount + this.payout,
      minimumBet: this._minimumBet,
      previousBet: this,
      playIteration: this.playIteration + 1
    });
  }
}