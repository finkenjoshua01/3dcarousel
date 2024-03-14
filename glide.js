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
