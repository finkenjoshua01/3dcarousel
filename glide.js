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
