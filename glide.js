import defaults from './defaults'
import { warn } from './utils/log'
import { mount } from './core/index'
import { mergeOptions } from './utils/object'
import { toInt, isObject, isArray } from './utils/unit'

import EventsBus from './core/event/events-bus'

export default class Glide {
  /**
   * Construct glide.
   *
   * @param  {String} selector
   * @param  {Object} options
   */

  constructor (selector, options = {}) {
    this._c = {}
    this._t = []
    this._e = new EventsBus()

      this.disabled = false
    this.selector = selector
    this.settings = mergeOptions(defaults, options)
    this.index = this.settings.startAt
  }


 /**
   * Initializes glide.
   *
   * @param {Object} extensions Collection of extensions to initialize.
   * @return {Glide}
   */
  mount (extensions = {}) {
    this._e.emit('mount.before')

    if (isObject(extensions)) {
      this._c = mount(this, extensions, this._e)
    } else {
      warn('You need to provide a object on `mount()`')
    }

    this._e.emit('mount.after')

    return this
  }

  
 /**
   * Collects an instance `translate` transformers.
   *
   * @param  {Array} transformers Collection of transformers.
   * @return {Void}
   */
  mutate (transformers = []) {
    if (isArray(transformers)) {
      this._t = transformers
    } else {
      warn('You need to provide a array on `mutate()`')
    }

    return this
  }

  
/**
   * Updates glide with specified settings.
   *
   * @param {Object} settings
   * @return {Glide}
   */
  update (settings = {}) {
    this.settings = mergeOptions(this.settings, settings)

    if (settings.hasOwnProperty('startAt')) {
      this.index = settings.startAt
    }

    this._e.emit('update')

    return this
  }

  /**
   * Change slide with specified pattern. A pattern must be in the special format:
   * `>` - Move one forward
   * `<` - Move one backward
   * `={i}` - Go to {i} zero-based slide (eq. '=1', will go to second slide)
   * `>>` - Rewinds to end (last slide)
   * `<<` - Rewinds to start (first slide)
   * `|>` - Move one viewport forward
   * `|<` - Move one viewport backward
   *
   * @param {String} pattern
   * @return {Glide}
   */
  go (pattern) {
    this._c.Run.make(pattern)

    return this
  }

  /**
   * Move track by specified distance.
   *
   * @param {String} distance
   * @return {Glide}
   */
  move (distance) {
    this._c.Transition.disable()
    this._c.Move.make(distance)

    return this
  }

/**
   * Destroy instance and revert all changes done by this._c.
   *
   * @return {Glide}
   */
  destroy () {
    this._e.emit('destroy')

    return this
  }

  /**
   * Start instance autoplaying.
   *
   * @param {Boolean|Number} interval Run autoplaying with passed interval regardless of `autoplay` settings
   * @return {Glide}
   */
  play (interval = false) {
    if (interval) {
      this.settings.autoplay = interval
    }

    this._e.emit('play')
