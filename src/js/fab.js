/**
 * Class Fab
 * @class
 */
class Fab {
  /**
   * Construct Fab instance
   * @constructor
   * @param {String} element
   * @param {Object} options
   */
  constructor(element, options) {
    this.defaultOptions = {
      animationDelay: 300,
      hover: false,
      direction: 'top',
      position: 'bottom-right',
      offsetX: '1rem',
      offsetY: '1.5rem'
    };

    this.el = document.querySelector(element);

    this.options = Axentix.extend(this.defaultOptions, options);
    this._setup();
  }

  /**
   * Setup component
   */
  _setup() {
    this.isAnimated = false;
    this.isActive = false;
    this.trigger = document.querySelector('#' + this.el.id + ' .fab-trigger');
    this.fabMenu = document.querySelector('#' + this.el.id + ' .fab-menu');

    this._verifOptions();
    this.options.hover ? this.el.classList.add('fab-hover') : this._setupListeners();
    this.el.style.transitionDuration = this.options.animationDelay + 'ms';
    this._setProperties();
  }

  /**
   * Options check
   */
  _verifOptions() {
    const directionList = ['right', 'left', 'top', 'bottom'];
    directionList.includes(this.options.direction) ? '' : (this.options.direction = 'top');

    const positionList = ['top-right', 'top-left', 'bottom-right', 'bottom-left'];
    positionList.includes(this.options.position) ? '' : (this.options.position = 'bottom-right');
  }

  /**
   * Setup listeners
   */
  _setupListeners() {
    this.listenerRef = this._onClickTrigger.bind(this);
    this.trigger.addEventListener('click', this.listenerRef);
  }

  /**
   * Remove listeners
   */
  _removeListeners() {
    this.trigger.removeEventListener('click', this.listenerRef);
    this.listenerRef = undefined;
  }

  /**
   * Set different options on element
   */
  _setProperties() {
    this.options.position.split('-')[0] === 'top'
      ? (this.el.style.top = this.options.offsetY)
      : (this.el.style.bottom = this.options.offsetY);

    this.options.position.split('-')[1] === 'right'
      ? (this.el.style.right = this.options.offsetX)
      : (this.el.style.left = this.options.offsetX);

    this.options.direction === 'top' || this.options.direction === 'bottom'
      ? ''
      : this.el.classList.add('fab-dir-x');

    this._setMenuPosition();
  }

  /**
   * Set menu position
   */
  _setMenuPosition() {
    if (this.options.direction === 'top' || this.options.direction === 'bottom') {
      const height = this.trigger.clientHeight;
      this.options.direction === 'top'
        ? (this.fabMenu.style.bottom = height + 'px')
        : (this.fabMenu.style.top = height + 'px');
    } else {
      const width = this.trigger.clientWidth;
      this.options.direction === 'right'
        ? (this.fabMenu.style.left = width + 'px')
        : (this.fabMenu.style.right = width + 'px');
    }
  }

  /**
   * Handle click on trigger
   * @param {Event} e
   */
  _onClickTrigger(e) {
    e.preventDefault();
    if (this.isAnimated) {
      return;
    }

    this.isActive ? this.close() : this.open();
  }

  /**
   * Open fab
   */
  open() {
    if (this.isActive) {
      return;
    }
    this.isAnimated = true;
    this.isActive = true;
    this.el.classList.add('active');
    setTimeout(() => {
      this.isAnimated = false;
    }, this.options.animationDelay);
  }

  /**
   * Close fab
   */
  close() {
    if (!this.isActive) {
      return;
    }
    this.isAnimated = true;
    this.isActive = false;
    this.el.classList.remove('active');
    setTimeout(() => {
      this.isAnimated = false;
    }, this.options.animationDelay);
  }
}