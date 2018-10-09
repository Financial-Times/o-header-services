import * as oHeader from 'o-header'; // eslint-disable-line no-unused-vars
import scroll from './src/js/scroll'

const headerEl = window.h = document.querySelector('.o-header-services');

scroll.init(headerEl);
