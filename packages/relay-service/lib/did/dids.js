import {hexDIDToQualified} from '@docknetwork/sdk/utils/did';
import {resolver} from './did-resolver';
export async function resolveDID(did, disableCache = false) {
  // Check if string has no qualifier, if so assume its hex format
  let qualifiedDID = did;
  if (did.substr(0, 4) !== 'did:') {
    if (did.substr(0, 2) !== '0x') {
      // Ensure to prepend 0x to hex string
      qualifiedDID = hexDIDToQualified(`0x${did}`);
    } else {
      // Resolve hex DIDs to qualified (did:dock:xyz)
      qualifiedDID = hexDIDToQualified(did);
    }
  }

  return await resolver.resolve(qualifiedDID, disableCache);
}
