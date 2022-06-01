import {keyringService} from './keyring/service';
import {dockService} from './dock/service';
import {substrateService} from './substrate/service';
import {walletService} from './wallet/service';
import {polkadotService} from './polkadot/service';
import {utilCryptoService} from './util-crypto/service';
import {storageService} from './storage/service';
import {didService} from './dids/service';

export default [
  keyringService,
  dockService,
  substrateService,
  walletService,
  polkadotService,
  utilCryptoService,
  storageService,
  didService,
];
