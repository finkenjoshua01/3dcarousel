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
