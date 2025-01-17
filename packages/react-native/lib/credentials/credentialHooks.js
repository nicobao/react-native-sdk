import {useMemo, useCallback, useState, useEffect} from 'react';
import {useWallet} from '../index';
import assert from 'assert';
import {credentialServiceRPC} from '@docknetwork/wallet-sdk-wasm/lib/services/credential';
import {dockService} from '@docknetwork/wallet-sdk-wasm/lib/services/dock';

export const CREDENTIAL_STATUS = {
  INVALID: 1,
  EXPIRED: 2,
  VERIFIED: 3,
  REVOKED: 4,
  PENDING: 5,
};
const validateCredential = credential => {
  assert(typeof credential !== 'undefined', 'Invalid Credential');
  assert(typeof credential?.id === 'string', 'Credential has no ID');
  assert(
    credential.hasOwnProperty('@context') === true,
    'Credential has no context',
  );
  assert(
    credential.type?.includes('VerifiableCredential'),
    'Credential has an invalid type',
  );
};
export const sortByIssuanceDate = (a, b) =>
  getCredentialTimestamp(b) - getCredentialTimestamp(a);

export function getCredentialTimestamp(credential) {
  assert(!!credential, 'credential is required');

  if (!credential.issuanceDate) {
    return 0;
  }

  return new Date(credential.issuanceDate).getTime() || 0;
}

export function waitFor(condition, timeout) {
  return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      if (await Promise.resolve(condition())) {
        clearInterval(interval);
        resolve(true);
      }
    }, 400);

    setTimeout(() => {
      clearInterval(interval);
      reject(new Error('Timed out'));
    }, timeout);
  });
}

async function getCredentialValidityStatus(credential) {
  try {
    await waitFor(() => dockService.isApiConnected(), 8000);
    const result = await credentialServiceRPC.verifyCredential({credential});
    return result;
  } catch (error) {
    return {
      verified: false,
      error,
    };
  }
}

export function useCredentialUtils() {
  const {documents, wallet} = useWallet({syncDocs: true});

  const credentials = useMemo(() => {
    if (Array.isArray(documents)) {
      return documents
        .filter(doc => {
          return (
            doc.type === 'VerifiableCredential' ||
            doc.type?.includes('VerifiableCredential')
          );
        })
        .sort(sortByIssuanceDate);
    }
    return [];
  }, [documents]);

  const doesCredentialExist = useCallback((allCredentials, credentialToAdd) => {
    return !!allCredentials.find(item => item.id === credentialToAdd.id);
  }, []);

  const saveCredential = useCallback(
    async jsonData => {
      validateCredential(jsonData);
      if (doesCredentialExist(credentials, jsonData)) {
        throw new Error('This credential already exists in the wallet');
      }
      await wallet.add({
        value: jsonData,
        type: 'VerifiableCredential',
      });
    },
    [credentials, doesCredentialExist, wallet],
  );
  const deleteCredential = useCallback(
    async credentialId => {
      assert(
        typeof credentialId === 'string' && credentialId.length > 0,
        'Credential ID is not set',
      );
      return await wallet.remove(credentialId);
    },
    [wallet],
  );

  return useMemo(() => {
    return {
      credentials,
      doesCredentialExist,
      saveCredential,
      deleteCredential,
    };
  }, [credentials, doesCredentialExist, saveCredential, deleteCredential]);
}
export function isInThePast(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}
export async function getCredentialStatus(credential) {
  assert(typeof credential !== 'undefined', 'Invalid Credential');
  const hasExpired = credential.expirationDate
    ? isInThePast(new Date(credential.expirationDate))
    : false;

  if (hasExpired) {
    return CREDENTIAL_STATUS.EXPIRED;
  }
  const {verified, error} = await getCredentialValidityStatus(credential);

  if (
    typeof error === 'string' &&
    error.toLowerCase().indexOf('revocation') > -1
  ) {
    return CREDENTIAL_STATUS.REVOKED;
  }
  if (verified) {
    return CREDENTIAL_STATUS.VERIFIED;
  }
  return CREDENTIAL_STATUS.INVALID;
}

export let cachedCredentialStatus = {};

export function useGetCredentialStatus({credential}) {
  const [status, setStatus] = useState(
    cachedCredentialStatus[credential.id] || CREDENTIAL_STATUS.PENDING,
  );

  useEffect(() => {
    getCredentialStatus(credential).then(response => {
      cachedCredentialStatus[credential.id] = response;
      setStatus(response);
    });
  }, [credential]);

  return useMemo(() => {
    return status;
  }, [status]);
}
