import {cryptoWaitReady} from '@polkadot/util-crypto';
import UtilCrypto from './util-crypto';

describe('UtilCryptoService', () => {
  beforeAll(async () => {
    await cryptoWaitReady();
  });
  it('mnemonicGenerate', () => {
    const result = UtilCrypto.routes.mnemonicGenerate(12);
    expect(typeof result).toBe('string');
  });

  it('isAddressValid', () => {
    expect(
      UtilCrypto.routes.isAddressValid(
        '3HM9DYxHe5tAwh2cuErNHiLxSMDJhetxaVGCDTYXiwyuuHN6',
      ),
    ).toBe(true);

    expect(UtilCrypto.routes.isAddressValid('wrong value')).toBe(false);
  });

  describe('mnemonicValidate', () => {
    it('expect mnemonic to be valid', () => {
      const phrase = UtilCrypto.routes.mnemonicGenerate(12);
      const isValid = UtilCrypto.routes.mnemonicValidate(phrase);

      expect(isValid).toBe(true);
    });

    it('expect mnemonic to be invalid', () => {
      const isValid = UtilCrypto.routes.mnemonicValidate('invalid mnemonic');

      expect(isValid).toBe(false);
    });
  });

  describe('deriveValidate', () => {
    const phrase = UtilCrypto.routes.mnemonicGenerate(12);
    it('expect derive path to be valid', () => {
      const result = UtilCrypto.routes.deriveValidate(`${phrase}/stuff/stuff`);

      expect(result).toStrictEqual({});
    });

    it('expect derive path to not be valid', () => {
      expect(() => UtilCrypto.routes.deriveValidate('wrong phrase')).toThrow(
        'invalid derive path',
      );
    });

    it('expect derive path to have warning', () => {
      const result = UtilCrypto.routes.deriveValidate(
        `${phrase}/stuff///pass/tst`,
      );

      expect(result.warning).toBe('slash password detected');
    });
  });
});
