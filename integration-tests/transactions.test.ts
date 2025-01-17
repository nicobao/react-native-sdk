import {Accounts} from '@docknetwork/wallet-sdk-wasm/lib/modules/accounts';
import {DOCK_TOKEN_UNIT} from '@docknetwork/wallet-sdk-wasm/lib/core/format-utils';
import {Transactions} from '@docknetwork/wallet-sdk-transactions/lib/transactions';

import {
  cleanup,
  createAccounts,
  createNewWallet,
  getAccounts,
  getWallet,
  setupEnvironent,
} from './helpers';

describe('Transactions', () => {
  beforeAll(async () => {
    await cleanup();
    await setupEnvironent();
    await createNewWallet();
    await createAccounts();
  });

  it('should get account balance', async () => {
    const [account1] = await getAccounts();
    const balance = await getWallet().accounts.getBalance(account1.id);
    expect(balance).toEqual(100);
  });

  it('should get transaction fee', async () => {
    const [account1, account2] = await getAccounts();
    const feeAmount = await Transactions.getInstance().getFeeAmount({
      fromAddress: account1.id,
      toAddress: account2.id,
      amount: 10 * DOCK_TOKEN_UNIT,
    });

    expect(feeAmount).toEqual(0.000002728);
  });
});
