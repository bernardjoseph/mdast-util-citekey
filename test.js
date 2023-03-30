import test from 'tape'
import {fromMarkdown} from 'mdast-util-from-markdown'
import {toMarkdown} from 'mdast-util-to-markdown'
import {citekey} from 'micromark-extension-citekey'
import {citekeyFromMarkdown, citekeyToMarkdown} from './index.js'

test('mdast-util-citekey (fromMarkdown)', (t) => {
  t.deepEqual(
    fromMarkdown('@a.müller. @{a.müller.}', {
      extensions: [citekey()],
      mdastExtensions: [citekeyFromMarkdown]
    }).children[0],
    {
      type: 'paragraph',
      children: [
        {
          type: 'citekey',
          children: [
            {
              type: 'citekeyMarker',
              value: '@',
              position: {
                start: {line: 1, column: 1, offset: 0},
                end: {line: 1, column: 2, offset: 1}
              }
            },
            {
              type: 'citekeyId',
              value: 'a.müller',
              position: {
                start: {line: 1, column: 2, offset: 1},
                end: {line: 1, column: 10, offset: 9}
              }
            }
          ],
          position: {
            start: {line: 1, column: 1, offset: 0},
            end: {line: 1, column: 10, offset: 9}
          }
        },
        {
          type: 'text',
          value: '. ',
          position: {
            start: {line: 1, column: 10, offset: 9},
            end: {line: 1, column: 12, offset: 11}
          }
        },
        {
          type: 'citekey',
          children: [
            {
              type: 'citekeyMarker',
              value: '@',
              position: {
                start: {line: 1, column: 12, offset: 11},
                end: {line: 1, column: 13, offset: 12}
              }
            },
            {
              type: 'citekeyStart',
              value: '{',
              position: {
                start: {line: 1, column: 13, offset: 12},
                end: {line: 1, column: 14, offset: 13}
              }
            },
            {
              type: 'citekeyId',
              value: 'a.müller.',
              position: {
                start: {line: 1, column: 14, offset: 13},
                end: {line: 1, column: 23, offset: 22}
              }
            },
            {
              type: 'citekeyEnd',
              value: '}',
              position: {
                start: {line: 1, column: 23, offset: 22},
                end: {line: 1, column: 24, offset: 23}
              }
            }
          ],
          position: {
            start: {line: 1, column: 12, offset: 11},
            end: {line: 1, column: 24, offset: 23}
          }
        }
      ],
      position: {
        start: {line: 1, column: 1, offset: 0},
        end: {line: 1, column: 24, offset: 23}
      }
    },
    'should support Unicode citation keys'
  )

  t.deepEqual(
    fromMarkdown('@a.müller. @{a.müller.}', {
      extensions: [citekey({strict: true})],
      mdastExtensions: [citekeyFromMarkdown]
    }).children[0],
    {
      type: 'paragraph',
      children: [
        {
          type: 'citekey',
          children: [
            {
              type: 'citekeyMarker',
              value: '@',
              position: {
                start: {line: 1, column: 1, offset: 0},
                end: {line: 1, column: 2, offset: 1}
              }
            },
            {
              type: 'citekeyId',
              value: 'a.m',
              position: {
                start: {line: 1, column: 2, offset: 1},
                end: {line: 1, column: 5, offset: 4}
              }
            }
          ],
          position: {
            start: {line: 1, column: 1, offset: 0},
            end: {line: 1, column: 5, offset: 4}
          }
        },
        {
          type: 'text',
          value: 'üller. @{a.müller.}',
          position: {
            start: {line: 1, column: 5, offset: 4},
            end: {line: 1, column: 24, offset: 23}
          }
        }
      ],
      position: {
        start: {line: 1, column: 1, offset: 0},
        end: {line: 1, column: 24, offset: 23}
      }
    },
    'should support ASCII citation keys'
  )

  t.end()
})

test('mdast-util-citekey (toMarkdown)', (t) => {
  t.deepEqual(
    toMarkdown(
      {
        type: 'paragraph',
        children: [
          {
            type: 'citekey',
            children: [
              {
                type: 'citekeyMarker',
                value: '@'
              },
              {
                type: 'citekeyId',
                value: 'a.müller'
              }
            ]
          },
          {
            type: 'text',
            value: '. '
          },
          {
            type: 'citekey',
            children: [
              {
                type: 'citekeyMarker',
                value: '@'
              },
              {
                type: 'citekeyStart',
                value: '{'
              },
              {
                type: 'citekeyId',
                value: 'a.müller.'
              },
              {
                type: 'citekeyEnd',
                value: '}'
              }
            ]
          }
        ]
      },
      {extensions: [citekeyToMarkdown]}
    ),
    '@a.müller. @{a.müller.}\n',
    'should serialize simple and extended citation keys'
  )

  t.end()
})
