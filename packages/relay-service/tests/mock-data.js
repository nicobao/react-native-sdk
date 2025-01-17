export const ALICE_KEY_PAIR_DOC = {
  id: 'did:dock:5GyESjfvJnQoukNrFuXvkAtsJUs1y5Zee39Sr7eGcAcMmWnB#keys-1',
  controller: 'did:dock:5GyESjfvJnQoukNrFuXvkAtsJUs1y5Zee39Sr7eGcAcMmWnB',
  type: 'Ed25519VerificationKey2018',
  publicKeyBase58: '7JkQbHvaAvGtng6yvBe98WVw3N9dWzXQ4qfqXenoJbyV',
  privateKeyBase58:
    '18CdvQzxTetKhpisG3ZiFrurTHDXPuCP9zMSokyJ9Ex8JRmAGDksx96uWSV8Jo8pDG3cw3GbBhPndCs4aZz43ib',
  publicKeyMultibase: 'z7JkQbHvaAvGtng6yvBe98WVw3N9dWzXQ4qfqXenoJbyV',
  privateKeyMultibase:
    'z18CdvQzxTetKhpisG3ZiFrurTHDXPuCP9zMSokyJ9Ex8JRmAGDksx96uWSV8Jo8pDG3cw3GbBhPndCs4aZz43ib',
  '@context': ['https://w3id.org/wallet/v1'],
};

export const BOB_KEY_PAIR_DOC = {
  id: 'did:key:z6MkhN7PBjWgSMQ24Bebdpvvw8fVRv7m6MHDqiwTKozzBgrJ#z6MkhN7PBjWgSMQ24Bebdpvvw8fVRv7m6MHDqiwTKozzBgrJ',
  controller: 'did:key:z6MkhN7PBjWgSMQ24Bebdpvvw8fVRv7m6MHDqiwTKozzBgrJ',
  type: 'Ed25519VerificationKey2018',
  publicKeyBase58: '3urLbVGF6ouYwgotxFy6637VcLqugU2s9i2XVY2yGU4v',
  privateKeyBase58:
    '3rF4Jhp7vF6tavGZCSgkdMM3ANLB7YpmzfRcB5FTs1Q7EgN6u5cCwzCaHCDYcestRSEHzjF82TvJUaj3mdqcbGnS',
  publicKeyMultibase: 'z3urLbVGF6ouYwgotxFy6637VcLqugU2s9i2XVY2yGU4v',
  privateKeyMultibase:
    'z3rF4Jhp7vF6tavGZCSgkdMM3ANLB7YpmzfRcB5FTs1Q7EgN6u5cCwzCaHCDYcestRSEHzjF82TvJUaj3mdqcbGnS',
};

export const PresentationSubmission = {
  presentation_submission: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    verifiableCredential: [
      {
        '@context': [
          'https://www.w3.org/2018/credentials/v1',
          {
            dk: 'https://ld.dock.io/credentials#',
            BasicCredential: 'dk:BasicCredential',
            subjectName: 'dk:subjectName',
            title: 'dk:title',
            name: 'dk:name',
            logo: 'dk:logo',
            description: 'dk:description',
          },
        ],
        credentialStatus: {
          id: 'rev-reg:dock:0xeb9af88d712412dbd2c5c7e7e5e734641215ab8b1423fb7174e088f012985acf',
          type: 'CredentialStatusList2017',
        },
        id: 'https://creds.dock.io/1d28317eb63495340414fb11346d5b7f5fd50b65aa06c8064d88ec3ec993a29b',
        type: ['VerifiableCredential', 'BasicCredential'],
        credentialSubject: {
          id: 'test-id',
          subjectName: 'Maycon Mellos',
          title: 'Credential title',
        },
        issuanceDate: '2022-03-25T10:28:18.848Z',
        proof: {
          type: 'Sr25519Signature2020',
          created: '2022-03-25T10:29:16Z',
          verificationMethod:
            'did:dock:5Ey2GDHLnX4tgyU4vBoKP2umWaQSCpNLPrVGQMVhaixdqTNB#keys-1',
          proofPurpose: 'assertionMethod',
          proofValue:
            'z5mXoaeQBRLPZpVioixesWKWa7KZsUYDqVhtatX7rdFqP7cuAG3BeP8ExYQQjarwuAwJPrdvYuJfKFFiB4JR3bm1h',
        },
        issuer: {
          name: 'Maycon Test',
          logo: 'data:image/png;base64,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',
          description: 'Testing ',
          id: 'did:dock:5Ey2GDHLnX4tgyU4vBoKP2umWaQSCpNLPrVGQMVhaixdqTNB',
        },
      },
    ],
    id: 'did:key:z6MkuFV745LpuAytwrUd9KjxqMrSG3TZiSUqqtVrQsU2gvhe#z6MkuFV745LpuAytwrUd9KjxqMrSG3TZiSUqqtVrQsU2gvhe',
    type: ['VerifiablePresentation'],
    proof: {
      type: 'Ed25519Signature2018',
      created: '2022-12-15T14:08:51Z',
      verificationMethod:
        'did:key:z6MkuFV745LpuAytwrUd9KjxqMrSG3TZiSUqqtVrQsU2gvhe#z6MkuFV745LpuAytwrUd9KjxqMrSG3TZiSUqqtVrQsU2gvhe',
      proofPurpose: 'authentication',
      challenge: 'b0f0a3ac-5672-48e7-b9b8-4d94e46f3e0a',
      proofValue:
        'z8VxfnZy7voYzfzSD3Y7fwhssJJvbzcPrGqEev5oHAvQSdDrYW9Epmr36T7ynafwQov6a5KD1Zs4SurHm7MHkbVh',
    },
    holder: 'did:key:z6MkuFV745LpuAytwrUd9KjxqMrSG3TZiSUqqtVrQsU2gvhe',
  },
};
