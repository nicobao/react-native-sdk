import RpcWallet from "../wallet/rpc-storage-wallet";
import { LoggerRpc } from "../client/logger-rpc";

let wallet;

export const getWallet = () => wallet;

export default {
  name: "wallet",
  routes: {
    async create(walletId) {
      wallet = new RpcWallet(walletId);
      return walletId;
    },
    async load() {
      await wallet.load();
    },
    async sync() {
      await wallet.sync();
    },
    async lock(password) {
      await wallet.lock(password);
    },
    async unlock(password) {
      await wallet.unlock(password);
    },
    status() {
      return wallet.status;
    },
    toJSON() {
      return wallet.toJSON();
    },
    add(content) {
      return wallet.add(content);
    },
    remove(content) {
      return wallet.remove(content);
    },
    update(content) {
      return wallet.update(content);
    },
    query(search) {
      return wallet.query(search);
    },
    getStorageDocument({ id }) {
      return wallet.getStorageDocument({ id });
    },
    exportWallet(password) {
      return wallet.export(password);
    },
  },
};