/**
 * @typedef {import('mdast-util-from-markdown').Handle} FromMarkdownHandle
 * @typedef {import('mdast-util-to-markdown/lib/types.js').Handle} ToMarkdownHandle
 * @typedef {import('./citekey').Citekey} Citekey
 * @typedef {import('./citekey').CitekeyMarker} CitekeyMarker
 * @typedef {import('./citekey').CitekeyStart} CitekeyStart
 * @typedef {import('./citekey').CitekeyId} CitekeyId
 * @typedef {import('./citekey').CitekeyEnd} CitekeyEnd
 */

import {containerPhrasing} from 'mdast-util-to-markdown/lib/util/container-phrasing.js'

/** @type {import('mdast-util-from-markdown').Extension} */
export const citekeyFromMarkdown = {
  enter: {
    citekey: enter,
    citekeyMarker: enterMarker,
    citekeyStart: enterStart,
    citekeyId: enterId,
    citekeyEnd: enterEnd
  },
  exit: {
    citekey: exit,
    citekeyMarker: exitOther,
    citekeyStart: exitOther,
    citekeyId: exitOther,
    citekeyEnd: exitOther
  }
}

/** @type {import('mdast-util-to-markdown/lib/types.js').Options} */
export const citekeyToMarkdown = {
  handlers: {
    citekey: handleCitekey,
    citekeyMarker: handleOther,
    citekeyStart: handleOther,
    citekeyId: handleOther,
    citekeyEnd: handleOther
  }
}

/** @type {FromMarkdownHandle} */
function enter(token) {
  this.enter({type: 'citekey', children: []}, token)
}

/** @type {FromMarkdownHandle} */
function enterMarker(token) {
  this.enter({type: 'citekeyMarker', value: ''}, token)
}

/** @type {FromMarkdownHandle} */
function enterStart(token) {
  this.enter({type: 'citekeyStart', value: ''}, token)
}

/** @type {FromMarkdownHandle} */
function enterId(token) {
  this.enter({type: 'citekeyId', value: ''}, token)
}

/** @type {FromMarkdownHandle} */
function enterEnd(token) {
  this.enter({type: 'citekeyEnd', value: ''}, token)
}

/** @type {FromMarkdownHandle} */
function exit(token) {
  this.exit(token)
}

/** @type {FromMarkdownHandle} */
function exitOther(token) {
  const node =
    /** @type {CitekeyMarker|CitekeyStart|CitekeyId|CitekeyEnd} */
    (this.stack[this.stack.length - 1])
  node.value += this.sliceSerialize(token)
  this.exit(token)
}

/** @type {ToMarkdownHandle} */
function handleCitekey(node, _, context, safeOptions) {
  return containerPhrasing(node, context, safeOptions)
}

/** @type {ToMarkdownHandle} */
function handleOther(node) {
  return node.value
}
