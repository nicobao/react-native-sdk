import '@testing-library/jest-dom';
import {JSDOM} from 'jsdom';

import {NetworkManager} from './packages/wasm/lib/modules/network-manager';
import {getStorage} from './packages/wasm/lib/core/storage';
import './packages/transactions/lib/schema';
import {initRealm} from '@docknetwork/wallet-sdk-wasm/lib/core/realm';
import {mockDockService} from '@docknetwork/wallet-sdk-wasm/lib/services/test-utils';

initRealm();
NetworkManager.getInstance().setNetworkId('testnet');

mockDockService();

process.env.ENCRYPTION_KEY =
  '776fe87eec8c9ba8417beda00b23cf22f5e134d9644d0a195cd9e0b7373760c1';

const cfg = {url: 'http://localhost'};
const dom = new JSDOM('', cfg);
global.window = dom.window;
global.document = dom.window.document;

Object.keys(global.window).forEach(property => {
  if (typeof global[property] === 'undefined') {
    global[property] = global.window[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
  appVersion: [],
};

require('./packages/wasm/lib/setup-tests');

jest.mock('@react-native-async-storage/async-storage', () => 'AsyncStorage');

jest.mock('@docknetwork/sdk/bbs-plus-presentation', () => {
  const mockAddCredentialToPresent = jest.fn(() => 0);
  const mockAddAttributeToReveal = jest.fn();
  const mockCreatePresentation = jest.fn();
  const mockDeriveCredentials = jest.fn(() => []);
  return jest.fn().mockImplementation(() => {
    return {
      addCredentialToPresent: mockAddCredentialToPresent,
      addAttributeToReveal: mockAddAttributeToReveal,
      createPresentation: mockCreatePresentation,
      deriveCredentials: mockDeriveCredentials,
    };
  });
});
getStorage().setItem('networkId', 'testnet');
