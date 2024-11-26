interface Bet {
  setWinningSpace(space: number): void;
  getPayout(): number;
  isWinner(): boolean;
  betAmount: number;
}

class OneToOne implements Bet {
  protected _winningSpace?: number;
  protected _betAmount: number;
  protected _winningSpaces: Set<number>;

  constructor(amount: number) {
    this._betAmount = amount;
    this._winningSpaces = new Set();
  }

  public setWinningSpace(space: number): void {
    this._winningSpace = space;
  }

  public isWinner(): boolean {
    if(typeof this._winningSpace === "undefined")
      throw new Error("Winning space has not been set yet!");

    return this._winningSpaces.has(this._winningSpace);
  }

  public getPayout(): number {
    if(this.isWinner()) return this._betAmount * 2
    else return 0;
  }

  public get betAmount(): number {
    return this._betAmount;
  }
}

class TwoToOne extends OneToOne {
  public getPayout(): number {
    if(this.isWinner()) return this._betAmount * 3
    else return 0;
  }
}

class Red extends OneToOne {
  constructor(amount: number) {
    super(amount);
    this._winningSpaces = new Set([
      1, 3, 5, 7, 9, 12, 14, 16, 18, 19,
      21, 23, 25, 27, 30, 32, 34, 36
    ]);
  }
}

class Black extends OneToOne {
  constructor(amount: number) {
    super(amount);
    this._winningSpaces = new Set([
      2, 4, 6, 8, 10, 11, 13, 5, 17, 20,
      22, 24, 26, 28, 29, 31, 33, 35
    ]);
  }
}

class Odd extends OneToOne {
  constructor(amount: number) {
    super(amount);
    this._winningSpaces = new Set([
      1, 3, 5, 7, 9, 11, 13, 15, 17, 19,
      21, 23, 25, 27, 29, 31, 33, 35
    ]);
  }
}

class Even extends OneToOne {
  constructor(amount: number) {
    super(amount);
    this._winningSpaces = new Set([
      2, 4, 6, 8, 10, 12, 14, 16, 18, 20,
      22, 24, 26, 28, 30, 32, 34, 36
    ]);
  }
}

class Lower extends OneToOne {
  constructor(amount: number) {
    super(amount);
    this._winningSpaces = new Set([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
      11, 12, 13, 14, 15, 16, 17, 18
    ]);
  }
}

class Upper extends OneToOne {
  constructor(amount: number) {
    super(amount);
    this._winningSpaces = new Set([
      19, 20, 21, 22, 23, 24, 25, 26, 27,
      28, 29, 30, 31, 32, 33, 34, 35, 36
    ]);
  }
}

class FirstDozen extends TwoToOne {
  constructor(amount: number) {
    super(amount);
    this._winningSpaces = new Set([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
    ]);
  }
}

class SecondDozen extends TwoToOne {
  constructor(amount: number) {
    super(amount);
    this._winningSpaces = new Set([
      13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24
    ]);
  }
}

class ThirdDozen extends TwoToOne {
  constructor(amount: number) {
    super(amount);
    this._winningSpaces = new Set([
      25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36
    ]);
  }
}

class FirstColumn extends TwoToOne {
  constructor(amount: number) {
    super(amount);
    this._winningSpaces = new Set([
      1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34
    ]);
  }
}

class SecondColumn extends TwoToOne {
  constructor(amount: number) {
    super(amount);
    this._winningSpaces = new Set([
      2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35
    ]);
  }
}

class ThirdColumn extends TwoToOne {
  constructor(amount: number) {
    super(amount);
    this._winningSpaces = new Set([
      3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36
    ]);
  }
}

export type { Bet }
export { 
  Red, Black, Odd, Even, Lower, Upper,
  FirstDozen, SecondDozen, ThirdDozen,
  FirstColumn, SecondColumn, ThirdColumn
}