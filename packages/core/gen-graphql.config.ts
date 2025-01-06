import type { CodegenConfig } from '@graphql-codegen/cli';

const inDir = 'sources/graphql';
const outDir = 'src/graphql';
const schemaUrl = 'https://api.studio.thegraph.com';

const config: CodegenConfig = {
  schema: schemaUrl,
  documents: [`${inDir}/*.graphql`],
  ignoreNoDocuments: true,
  overwrite: true,
  debug: true,
  generates: {
    [`${outDir}/graphql.ts`]: {
      plugins: ['typescript', 'typescript-operations', 'typescript-generic-sdk'],
      config: {
        namingConvention: 'change-case-all#pascalCase',
        onlyOperationTypes: true,
        scalars: {
          ID: 'string',
          BigInt: '`${number}` | string',
          BigDecimal: '`${number}` | string',
          Int8: 'number',
          Bytes: '`0x${string}`',
          Timestamp: 'number',
        },
      },
    },
  },
};

export default config;
