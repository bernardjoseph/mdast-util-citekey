# mdast-util-citekey

Extension for [`mdast-util-from-markdown`][from-markdown] and
[`mdast-util-to-markdown`][to-markdown] to support [Pandoc][]-style citation
keys in **[mdast][]**.

## When to use this

Use this if you’re dealing with the AST manually.
It might be better to use [`remark-citekey`][remark-citekey] with
**[remark][]**, which includes this but provides a nicer interface and makes it
easier to combine with hundreds of plugins.

## Install

This package is [ESM
only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c):
Node 12+ is needed to use it and it must be `import`ed instead of `require`d.

[npm][]:

```sh
npm install mdast-util-citekey
```

## Use

Say our module, `example.js`, looks as follows:

```js
import {fromMarkdown} from 'mdast-util-from-markdown'
import {toMarkdown} from 'mdast-util-to-markdown'
import {citekey} from 'micromark-extension-citekey'
import {citekeyFromMarkdown, citekeyToMarkdown} from 'mdast-util-citekey'

const doc = 'See @wadler1989, sec. 1.3, and @{hughes1990.}, pp. 4.'

const tree = fromMarkdown(doc, {
  extensions: [citekey()],
  mdastExtensions: [citekeyFromMarkdown]
}).children[0]

console.dir(tree, {depth: null})

const out = toMarkdown(tree, {extensions: [citekeyToMarkdown]})

console.log(out)
```

Now, running `node example` yields (positional info removed for brevity):

```js
{
  type: 'paragraph',
  children: [
    {
      type: 'text',
      value: 'See '
    },
    {
      type: 'citekey',
      children: [
        {
          type: 'citekeyMarker',
          value: '@'
        },
        {
          type: 'citekeyId',
          value: 'wadler1989'
        }
      ]
    },
    {
      type: 'text',
      value: ', sec. 1.3, and '
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
          value: 'hughes1990.'
        },
        {
          type: 'citekeyEnd',
          value: '}'
        }
      ]
    },
    {
      type: 'text',
      value: ', pp. 4.'
    }
  ]
}
```

```markdown
See @wadler1989, sec. 1.3, and @{hughes1990.}, pp. 4.
```

## API

### `citekeyFromMarkdown`

### `citekeyToMarkdown`

Support [Pandoc][]-style citation keys.
The exports are extensions for [`mdast-util-from-markdown`][from-markdown] and
[`mdast-util-to-markdown`][to-markdown], respectively.
See the [citation syntax][pandoc-citation-syntax] section of the [Pandoc
manual][pandoc-manual] for the syntax of [Pandoc][]-style citation keys.

This utility handles parsing and serializing.
[Traverse the tree][traversal] to change them to whatever you please.

## Syntax tree

The following Nodes are added to **[mdast][]** by this utility.

### Nodes

```idl
interface Citekey extends Parent {
  type: 'citekey'
  children: Array<CitekeyMarker | CitekeyStart | CitekeyId | CitekeyEnd>
}

interface CitekeyMarker extends Literal {
  type: 'citekeyMarker'
}

interface CitekeyStart extends Literal {
  type: 'citekeyStart'
}

interface CitekeyId extends Literal {
  type: 'citekeyId'
}

interface CitekeyEnd extends Literal {
  type: 'citekeyEnd'
}
```

**Citekey**, **CitekeyMarker**, **CitekeyStart**, **CitekeyId** and
**CitekeyEnd** (**[Literal][dfn-literal]**) can be used where
**[phrasing][dfn-phrasing-content]** content is expected.

For example, the following Markdown:

```markdown
'@wadler1989
```

Yields:

```js
{
  type: 'citekey',
  children: [
    {
      type: 'citekeyMarker',
      value: '@'
    },
    {
      type: 'citekeyId',
      value: 'wadler1989'
    }
  ]
}
```

And the following Markdown:

```markdown
'@{hughes1990.}
```

Yields:

```js
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
      value: 'hughes1990.'
    },
    {
      type: 'citekeyEnd',
      value: '}'
    }
  ]
}
```

## Related

*   [`remarkjs/remark`][remark]
    — markdown processor powered by plugins
*   [`micromark/micromark`][micromark]
    — the smallest commonmark-compliant markdown parser that exists
*   [`@bernardjoseph/remark-citekey`][remark-citekey]
    — remark plugin to support citation keys
*   [`@bernardjoseph/micromark-extension-citekey`][micromark-extension-citekey]
    — mdast utility to support citation keys
*   [`syntax-tree/mdast-util-from-markdown`][from-markdown]
    — mdast parser using `micromark` to create mdast from markdown
*   [`syntax-tree/mdast-util-to-markdown`][to-markdown]
    — mdast serializer to create markdown from mdast

## Contribute

See [`contributing.md` in `micromark/.github`][contributing] for ways to get
started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © Bernd Rellermeyer

<!-- Definitions -->

[npm]: https://docs.npmjs.com/cli/install

[remark]: https://github.com/remarkjs/remark

[remark-citekey]: https://github.com/bernardjoseph/remark-citekey

[mdast]: https://github.com/syntax-tree/mdast

[from-markdown]: https://github.com/syntax-tree/mdast-util-from-markdown

[to-markdown]: https://github.com/syntax-tree/mdast-util-to-markdown

[dfn-phrasing-content]: https://github.com/syntax-tree/mdast#phrasingcontent

[micromark]: https://github.com/micromark/micromark

[micromark-extension-citekey]: https://github.com/bernardjoseph/micromark-extension-citekey

[traversal]: https://unifiedjs.com/learn/recipe/tree-traversal/

[pandoc]: https://pandoc.org

[pandoc-manual]: https://pandoc.org/MANUAL.html

[pandoc-citation-syntax]: https://pandoc.org/MANUAL.html#citation-syntax

[dfn-literal]: https://github.com/syntax-tree/mdast#literal

[contributing]: https://github.com/unifiedjs/.github/blob/HEAD/contributing.md

[support]: https://github.com/unifiedjs/.github/blob/HEAD/support.md

[coc]: https://github.com/unifiedjs/.github/blob/HEAD/code-of-conduct.md

[license]: https://github.com/micromark/micromark/blob/main/license
