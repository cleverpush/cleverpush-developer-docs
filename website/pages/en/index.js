/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = props => (
      <h2 className="projectTitle">
        {props.title}
        <small>{props.tagline}</small>
      </h2>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    const SdkBox = props => (
      <div className="sdk-box">
        <a className="sdk-box-button" href={props.href}>
          {props.icon}
          {props.title} SDK
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle tagline={siteConfig.tagline} title={siteConfig.title} />

          <h3>Web SDKs</h3>

          <div className="sdk-boxes">
            <SdkBox title="JavaScript" href="/docs/sdks/javascript/setup" icon={<i className="fab fa-js fa-4x"></i>} />
          </div>

          <h3>App SDKs</h3>

          <div className="sdk-boxes">
            <SdkBox title="iOS" href="/docs/sdks/ios/setup" icon={<i className="fab fa-apple fa-4x"></i>} />
            <SdkBox title="Android" href="/docs/sdks/android/setup" icon={<i className="fab fa-android fa-4x"></i>} />
            <SdkBox title="Cordova" href="/docs/sdks/cordova/setup" icon={<img src="/img/cordova.png" />} />
            <SdkBox title="React Native" href="/docs/sdks/react-native/setup" icon={<i className="fab fa-react fa-4x"></i>} />
            <SdkBox title="Xamarin" href="/docs/sdks/xamarin/setup" icon={<img src="/img/xamarin.png" />} />
            <SdkBox title="Flutter" href="/docs/sdks/flutter/setup"icon={<img src="/img/flutter.png" />} />
          </div>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />

        <div className="mainContainer">
         
        </div>
      </div>
    );
  }
}

module.exports = Index;
