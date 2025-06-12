
import type { CodegenConfig } from '@graphql-codegen/cli';
import 'dotenv/config';

const config: CodegenConfig = {
  overwrite: true,
  // schema: "http://maramckevitt.com/wp/graphql",
  schema: [{
    "https://maramckevitt.com/wp/graphql" : {
      headers: {
        // 'Authorization': 'Basic YW5kcmVqc3BvaWthbnM6MjM4OSBYZGFYIGk5S0ogcEgySCBuSlZiIGdKam0='
        'Authorization': process.env.GRAPHQL_AUTH || ''
      }
    }
  }],
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript"]
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
