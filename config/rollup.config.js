import NodePath from 'path'
import RollupJson from '@rollup/plugin-json'
// import RollupNodeResolve from '@rollup/plugin-node-resolve'
import RollupCommonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import RollupCopy from 'rollup-plugin-copy'
import Package from '../package.json'

const resolveFile = path => NodePath.resolve(__dirname, '..', path)

const externalPackages = [
  'react',
  'react-dom',
  '@tarojs/components',
  '@tarojs/runtime',
  '@tarojs/taro',
  '@tarojs/react'
]

export default {
  input: resolveFile(Package.source),
  output: [
    {
      file: resolveFile(Package.main),
      format: 'cjs',
    },
    {
      file: resolveFile(Package.module),
      format: 'es',
    }
  ],
  // cssModules: true,
  external: externalPackages,
  plugins: [
    postcss({
      extract: false,
      modules: true,
      use: ['sass'],
    }),
    // RollupNodeResolve({
    //   customResolveOptions: {
    //     moduleDirectory: 'node_modules'
    //   }
    // }),
    RollupCommonjs({
      include: /\/node_modules\//
    }),
    RollupJson(),
    RollupCopy({
      targets: [
        {
          src: resolveFile('src/style'),
          dest: resolveFile('dist')
        }
      ]
    })
  ]
}