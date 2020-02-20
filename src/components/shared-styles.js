/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { css } from 'lit-element';

export const SharedStyles = css`
  :host {
    display: block;
    box-sizing: border-box;
  }

  section {
    padding: 24px;
    background: var(--app-section-odd-color);
  }

  section > * {
    max-width: 600px;
    margin-right: auto;
    margin-left: auto;
  }

  section:nth-of-type(even) {
    background: var(--app-section-even-color);
  }

  h2 {
    font-size: 24px;
    text-align: center;
    color: var(--app-dark-text-color);
  }

  @media (min-width: 460px) {
    h2 {
      font-size: 36px;
    }
  }

  .circle {
    display: block;
    width: 64px;
    height: 64px;
    margin: 0 auto;
    text-align: center;
    border-radius: 50%;
    background: var(--app-primary-color);
    color: var(--app-light-text-color);
    font-size: 30px;
    line-height: 64px;
  }
`;


// global.css

export const GlobalStyles = css`
  * {
    outline: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  strong {
    font-weight: bold;
  }
  svg {
    width: 100%;
    height: auto;
  }
  img {
    max-width: 100%;
  }
  html {
    /* background-color: rgb(225, 81, 76); */
    /* background-color: #E1514C; */
    /* background-color: #D02E3D; */
  }
  body {
    font-family: $main-font;
    min-height: initial;
    /* background-color: #D02E3D; */
  }
  button {
    color: inherit;
    font-size: inherit;
    font-family: $main-font;
    border: 0;
    padding: 0;
    background-color: transparent;
  }
  .hidden {
    display: none !important;
  }
  .invisible {
    visibility: hidden !important;
  }
  .no-overflow {
    overflow: hidden;
  }
  .unselectable {
    user-select: none;
  }
  .wrapper {
    overflow: hidden;
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    background-color: #2E334B;
  }
  .app-screen {
    overflow: hidden;
  }
  .app-screen:not(.active) {
    display: none !important;
  }
`

// from page.css
export const Page = css`
  .page {
      box-sizing: border-box;
      height: 100%;
      overflow-y: scroll;
      padding: 15px;
      padding-top: var(--app-pages-padding-top);
  }

  .page[platform='ios'],
  body.platform-ios .page {
      padding-top: 45px;
  }

  .page[platform='android'],
  body.platform-android .page {
      padding-top: 55px;
  }

  /* :host([platform="android"]) .page {
    padding: 20px;
  } */
`

// from speaker-button.css
export const SpeakerButton = css`
  .speaker-control {
    display: block;
  }

  .speaker-button {
    position: absolute;
    top: 50%; left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 128px; height: 128px;
    border: 5px solid currentColor;
    border-radius: 50%;
  }

  .speaker-button[active],
  .speaker-button.active {
    background-color:#E1514C ;
    color: white;
    border-color: #E1514C; 
  }

  .speaker-button:not([active]),
  .speaker-button:not(.active) {
    color: white;
  }

  .speaker-button[active],
  .speaker-button.active{
    background-color:#E1514C;;
  }

  .speaker-button[active]::after,
  .speaker-button::after, 
  .speaker-button.active::after {
    color:white;;
  }

  .speaker-button .material-icons {
    font-size: 64px;
  }


`
// from bug-notice.css
export const BugNotice = css`
  
  .page--bug-notice {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
  }

  .page--bug-notice .notice {
      margin: auto 0;
  }

  .page--bug-notice .button-connect {
      align-self: flex-end;
  }

  .notice {
      color: white;
  }

  .notice__title {
      font-size: 14px;
      font-weight: bold;
      margin: 0 0 5px;
      text-transform: uppercase;
  }

  .notice__text {
      line-height: 21px;
  }

  .notice__picture {
      display: block;
      margin: 30px auto;
  }
`;

export const ActionButton = css`
  .action-button {
    display: block;
    width: 100%;
    line-height: 56px;
    border-radius: 4px;
    font-size: 20px;
    font-weight: 400;
    color: #FFFFFF;
    background-color: rgba(0,0,0,0.4);
    text-decoration: none;
    text-align: center;
    flex-shrink: 0;

  }
  body.platform-ios .action-button {
    background-color: rgba(0,0,0,0.2);
  }

  .action-button.action-button--primary.action-button--primary {
    color: #46320A;
    background-color: white;
  }

  .action-button.action-button--red.action-button--red {
    color: white;
    background-color: #E1514C;
  }

  .action-button.action-button--link.action-button--link {
    color: white;
    background-color: transparent;
    font-size: 16px;
  }
`;