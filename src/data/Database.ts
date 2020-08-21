import { IDBPDatabase, openDB } from "idb";

class Database {
  /**
   * The `db` property is expected to only be called after `ready` resolves.
   * So it should never be `undefined`. We achieve this by checking `ready` at the top
   * of any method that needs `db`.
   *
   * That's why we do `ts-ignore` below. Without it, we would have to always
   * check for `null` whenever we want to access `db`, which is clutter up the
   * code unnecessarily.
   */
  // @ts-ignore
  db: IDBPDatabase;

  isReady: Promise<IDBPDatabase>;

  constructor() {
    this.isReady = openDB("database", 1, {
      upgrade(db_) {
        db_.createObjectStore("preferences", { autoIncrement: true });
      },
    });

    this.isReady.then(db => {
      this.db = db;
    });
  }

  async getAll() {
    await this.isReady;

    return this.db.getAll("wallets");
  }

  // async put(objectStore: string, key) {
  //   await this.isReady;

  //   return this.db.put("openWallets");
  // }
}

export const database = new Database();
