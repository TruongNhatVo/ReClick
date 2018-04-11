// jQueryの"$"を使えるようにする
// import $ from 'jquery'

// TweenMax
// import TweenMax from 'gsap'

// ScrollMagic
// import ScrollMagic from 'scrollmagic'

// ScrollMagicのgsapプラグイン（要imports-loader）
// import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap'

// jQuery easing
import 'jquery.easing'

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// ページトップへ戻る
// import pagetop from './modules/pagetop'
// pagetop('#js-pagetop')

// import loadSvg from './modules/load-svg'
// loadSvg()

import accordionCollapse from './modules/accordion-collapse'
accordionCollapse()

import megamenu from './modules/megamenu'
megamenu()

import gnavi from './modules/gnavi'
gnavi()

import floatingArea from './modules/floating-area'
floatingArea()

import anchorLink from './modules/anchor-link'
anchorLink()

import backgroundCheck from './modules/background-check'
window.onload = function() {
  backgroundCheck()
}




/************** MEMBER 1 ****************/ 
import equalWidth from './modules/equal-width'
equalWidth()