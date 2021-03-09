interface Void{
    () : void;
}
export class Timers {
    private _execTimeout: any = 0;
  
    constructor() {}
  
    /**
     * This method work like sleep method, but i this method
     * call before timeout, the current timeout will be canceled
     * and new timeout will be created
     * @param ms Milleseconds Time
     */
    public execOnce(ms: number, callback: Void): void {
      if (this._execTimeout) clearTimeout(this._execTimeout);
      this._execTimeout = setTimeout(() => callback(), ms);
    }
  
    /**
     * Create a Simple timeout for async
     * methods
     * @param ms Milleseconds Time
     */
    public static sleep(ms: number): Promise<void> {
      return new Promise(resolve => setTimeout(() => resolve(), ms));
    }
  }
  