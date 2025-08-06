import fs from 'fs';
import https from 'https';
import nodeUrl from 'url';

const changelogs = {
  android: 'https://raw.githubusercontent.com/cleverpush/cleverpush-android-sdk/master/CHANGELOG.md',
  ios: 'https://raw.githubusercontent.com/cleverpush/cleverpush-ios-sdk/master/CHANGELOG.md',
  xamarin: 'https://raw.githubusercontent.com/cleverpush/cleverpush-xamarin-sdk/master/CHANGELOG.md',
  cordova: 'https://raw.githubusercontent.com/cleverpush/cleverpush-cordova-sdk/master/CHANGELOG.md',
  capacitor: 'https://raw.githubusercontent.com/cleverpush/cleverpush-capacitor-sdk/master/CHANGELOG.md',
  'react-native': 'https://raw.githubusercontent.com/cleverpush/cleverpush-react-native-sdk/master/CHANGELOG.md',
  flutter: 'https://raw.githubusercontent.com/cleverpush/cleverpush-flutter-sdk/master/CHANGELOG.md',
  expo: 'https://raw.githubusercontent.com/cleverpush/cleverpush-expo-sdk/master/CHANGELOG.md',
};

const UTF_8 = 'utf-8';
const EMPTY_STRING = '';
const CHANGELOG_HEADER = `---
id: changelog
title: Changelog
---

`;

const EMAIL_OPT_IN_FORM_HTML = (id) => `
<script>window.cleverpushEmailConfig = { channelId: '2tzq9STK6ijriQd5m' };</script>
<script src="https://static.clpsh.com/sdk/cleverpush-email.js" async></script>
<div class="cleverpush-email-form" data-id="${id}"></div>
`;

const EMAIL_OPT_IN_FORM_IDS = {
  android: 'XrfXEFqsY8HTfr7Ct',
  ios: 'ouncguiZqpPnsXtDn',
  flutter: 'tW6ggrDJC5DitianT',
  'react-native': 'KZyuNK2r9u4fqDPon',
  expo: 'KZyuNK2r9u4fqDPon',
};

console.log('Downloading Changelogs …');

/**
 * @param {object} requestOptions
 * @param {String} body
 * @return {Promise}
 */
function httpsRequest(requestOptions) {
  return new Promise((resolve, reject) => {
    const req = https.request(requestOptions, (res) => {
      if (res.statusCode < 200 || res.statusCode >= 301) {
        return reject(new Error(`statusCode ${res.statusCode}`));
      }
      res.setEncoding(UTF_8);
      let text = EMPTY_STRING;
      res.on('data', (chunk) => {
        text += chunk;
      });

      res.on('end', () => resolve(text));
    }).on('error', reject);
    req.end();
  });
}

for (const [sdk, url] of Object.entries(changelogs)) {
  const parsedUrl = nodeUrl.parse(url);

  const requestOptions = {
    hostname: parsedUrl.hostname,
    path: parsedUrl.path,
    method: 'GET',
  };

  let emailOptInForm = '';
  if (EMAIL_OPT_IN_FORM_IDS[sdk]) {
    emailOptInForm = EMAIL_OPT_IN_FORM_HTML(EMAIL_OPT_IN_FORM_IDS[sdk]) + '\n\n';
  }

  const response = await httpsRequest(requestOptions);
  fs.writeFileSync(`./docs/sdks/${sdk}/changelog.md`, CHANGELOG_HEADER + emailOptInForm + response.replace('# Changelog', ''));
}

console.log('Changelogs downloaded successfully');
