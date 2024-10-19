export default {
    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['@components', './src/components'],
            ['@pages', './src/pages'],
            ['@context', './src/context'],
            ['@hooks', './src/hooks'],
            ['@services', './src/services'],
            ['@styles', './src/styles'],
            ['@utils', './src/utils'],
            ['@assets', './src/assets'],
            ['@store', './src/store'],
          ],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  };