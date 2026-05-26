'use strict';

const TRANSLATIONS = {
  it: {
    title: 'Spinner',
    madeWith: 'Sviluppata con il supporto di',
    turn: 'Go',
    reset: 'Reset',
  },

  en: {
    title: 'Spinner',
    madeWith: 'Developed with the support of',
    turn: 'Go',
    reset: 'Reset',
  },
};

function SpinnerApp() {
  const N = 14;
  const SLICE = 360 / N; // ~25.71°

  return {
    busy: false,
    result: null,
    home: 360 - 180 / 14,
    deg: 360 - 180 / 14,
    dur: 4,
    mode: '',   // '' | 'spin' | 'reset'
    _winner: null,

    lang: navigator.language.startsWith('it') ? 'it' : 'en',

    get t() {
      return TRANSLATIONS[this.lang];
    },

    toggleLang() {
      this.lang = this.lang === 'it' ? 'en' : 'it';
    },

    spin() {
      if (this.busy) return;
      this.busy = true;
      this.result = null;
      const winner = Math.floor(Math.random() * N);
      const needed = ((-winner * SLICE - SLICE / 2 - this.deg) % 360 + 360) % 360;
      const extraSpins = (4 + Math.floor(Math.random() * 3)) * 360;
      this.dur = 3.5 + Math.random() * 1.5;
      this.deg += needed + extraSpins;
      this.mode = 'spin';
      this._winner = winner;
    },

    reset() {
      if (this.busy || this.deg === this.home) return;
      this.result = null;
      this.mode = '';           // nessuna transizione CSS
      this.$nextTick(() => {
        this.deg = this.home;   // torna a 0 di colpo
      });
    },

    onEnd() {
      if (this.mode === 'spin') {
        this.result = this._winner;
      }
      this.mode = '';
      this.busy = false;
    }
  };
}