import assert from 'assert';
import axios from 'axios';
import {
  didcommCreateEncrypted,
  didcommDecrypt,
  DIDCOMM_TYPE_ISSUE_DIRECT,
  getDerivedAgreementKey,
} from './didcomm';
import {
  generateSignedPayload,
  generateSignedPayloadFromList,
  toBase64,
} from './payloads';

let serviceURL = process.env.RELAY_SERVICE_URL || 'https://relay.dock.io';

const sendMessage = async ({keyPairDoc, recipientDid, message}) => {
  assert(!!keyPairDoc, 'keyPairDoc is required');
  assert(!!recipientDid, 'recipientDid is required');
  assert(!!message, 'message is required');

  const keyAgreementKey = await getDerivedAgreementKey(keyPairDoc);
  const jweMessage = await didcommCreateEncrypted({
    recipientDids: [recipientDid],
    type: DIDCOMM_TYPE_ISSUE_DIRECT,
    senderDid: keyPairDoc.controller,
    payload: message,
    keyAgreementKey,
  });

  const {payload, did} = await generateSignedPayload(keyPairDoc, {
    to: recipientDid,
    msg: JSON.stringify(jweMessage),
  });

  try {
    const result = await axios.post(
      `${serviceURL}/messages/${encodeURIComponent(did)}`,
      {
        payload: toBase64(payload),
      },
    );

    return result.data;
  } catch (err) {
    console.error(err.response);
    return err;
  }
};

const getMessages = async ({keyPairDocs, limit = 20}) => {
  assert(!!keyPairDocs, 'keyPairDoc is required');
  assert(Array.isArray(keyPairDocs), 'keyPairDocs must be an array');
  assert(!!keyPairDocs.length, 'keyPairDocs must not be empty');

  const {payload, dids} = await generateSignedPayloadFromList(keyPairDocs, {
    limit,
  });

  try {
    const result = await axios.get(
      `${serviceURL}/messages/batch-dids?dids=${encodeURIComponent(
        JSON.stringify(dids),
      )}&payload=${toBase64(payload)}`,
    );

    const messages = await Promise.all(
      result.data.map(async item => {
        const keyPairDoc = keyPairDocs.find(doc => doc.controller === item.to);
        assert(!!keyPairDoc, `keyPairDoc not found for did ${item.to}`);
        const keyAgreementKey = await getDerivedAgreementKey(keyPairDoc);
        const jwe = JSON.parse(item.msg);

        const didCommMessage = await didcommDecrypt(jwe, keyAgreementKey);
        return {
          ...item,
          msg: didCommMessage.body,
        }
      }),
    );

    return messages;
  } catch (err) {
    console.error(err.response);
    return err;
  }
};

const registerDIDPushNotification = async ({keyPairDocs, token}) => {
  assert(!!keyPairDocs, 'keyPairDoc is required');
  assert(Array.isArray(keyPairDocs), 'keyPairDocs must be an array');
  assert(!!keyPairDocs.length, 'keyPairDocs must not be empty');
  assert(!!token, 'token is required');

  const {payload, dids} = await generateSignedPayloadFromList(keyPairDocs, {
    token,
  });

  try {
    const result = await axios.post(
      `${serviceURL}/register/batch-dids?dids=${encodeURIComponent(
        JSON.stringify(dids),
      )}&payload=${toBase64(payload)}`,
    );

    return result.data;
  } catch (err) {
    console.error(err.response);
    return err;
  }
};

const setServiceURL = ({url}) => {
  assert(!!url, 'url is required');

  serviceURL = url;
};

export const RelayService = {
  sendMessage,
  getMessages,
  registerDIDPushNotification,
  setServiceURL,
  serviceURL,
};
