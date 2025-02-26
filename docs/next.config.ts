import nextra from 'nextra'

const withNextra = nextra({
  latex: false,
  codeHighlight: true,
  defaultShowCopyCode: true,
  contentDirBasePath: '/',
  search: { codeblocks: true }
})

export default withNextra({
  reactStrictMode: true,
})
