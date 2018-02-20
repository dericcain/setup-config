# setup-config

I work with various JS frameworks and got really tired of always having to create ESLint and Prettier
config files so I created this. This is a good starting point to create an ESLint config that also
uses Prettier for formatting.

#### Install
`npx setup-config setup`
    
`npx` allows you to use the command without installing it locally, which is the preferred method.

or you can just install as a dev dependency like so...

```
npm i -D setup-config 
```

#### Usage
```
setup-config setup
```
If you do not want to use Prettier...

```
setup-config setup -p

# or

setup-config setup --no-prettier
```

Want to remove the config files?
```
setup-config remove

# or

setup-config rm
```

> `remove` does not remove the entries in your `package.json`, so if you want to remove those, then
> you must manually do that.

Need help?

```
setup-config --help
```

##### All `npx` commands
```
npx setup-config setup
npx setup-config setup -p    # without Prettier
npx setup-config remove      # removes conig files
```

#### Config files
Here are the config files that are created in the root of your project

`.eslintrc.js` with Prettier
```js
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb-base/legacy', 'prettier'],
  plugins: ['prettier', 'import'],
  // add your custom rules here
  rules: {
    'prettier/prettier': 1,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 1 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 1 : 0,
  },
};

```

`.eslintrc.js` without Prettier
```js
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb-base/legacy'],
  plugins: ['import'],
  // add your custom rules here
  rules: {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 1 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 1 : 0,
  },
};
```

`.prettierrc.js`
```js
module.exports = {
  printWidth: 100,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  arrowParens: 'avoid',
};
```

When you run `setup-config setup`, here is the `npm install` command that is run:
```
npm i -D babel-eslint eslint eslint-config-airbnb-base eslint-config-prettier eslint-plugin-import eslint-plugin-prettier prettier
```

When you run the `setup-config setup -p`, here is the `npm install` command that is run:
```
npm i -D babel-eslint eslint eslint-config-airbnb-base eslint-plugin-import
```

#### Thoughts
This is a good base for how I use ESLint and Prettier. If you want something changed, create an 
issue and we can discuss it.

#### The future
I will probably end up creating a `--react` flag that is setup to use React because I do spend a lot
of time in React.
