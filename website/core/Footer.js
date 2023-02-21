/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    const docsUrl = this.props.config.docsUrl;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    return `${baseUrl}${docsPart}${langPart}${doc}`;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? `${language}/` : '') + doc;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
        
          <div>
            <h5>SDKs</h5>
            <a href="/docs/sdks/javascript/setup">
              JavaScript
            </a>
            <a href="/docs/sdks/ios/setup">
              iOS
            </a>
            <a href="/docs/sdks/android/setup">
              Android
            </a>
            <a href="/docs/sdks/cordova/setup">
              Cordova
            </a>
            <a href="/docs/sdks/capacitor/setup">
              Capacitor
            </a>
            <a href="/docs/sdks/react-native/setup">
              React Native
            </a>
            <a href="/docs/sdks/xamarin/setup">
              Xamarin
            </a>
            <a href="/docs/sdks/flutter/setup">
              Flutter
            </a>
          </div>

          <div>
            <h5>Community</h5>
            <a
              href="https://twitter.com/cleverpush_com"
              target="_blank"
              rel="noreferrer noopener">
              Twitter
            </a>
            <a
              href="https://facebook.com/cleverpush"
              target="_blank"
              rel="noreferrer noopener">
              Facebook
            </a>
            <a href="https://github.com/cleverpush" target="_blank">GitHub</a>
          </div>
          <div>
            <h5>More</h5>
            <a href="https://api.cleverpush.com/" target="_blank">API Reference</a>
            <a href="/docs/api/overview" target="_blank">API Overview</a>
            <a href="https://cleverpush.com/blog" target="_blank">Blog</a>
            <a href="https://cleverpush.com/imprint" target="_blank">Imprint</a>
            <a href="https://cleverpush.com/privacy" target="_blank">Privacy Policy</a>
            <a href="https://cleverpush.com/terms" target="_blank">Terms of service</a>
            <a href="https://cleverpush.com/gdpr" target="_blank">GDPR</a>
          </div>
        </section>

        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
