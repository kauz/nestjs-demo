// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack');

module.exports = function (options) {
  const { plugins, ...config } = options;
  return {
    ...config,
    externals: [],
    plugins: [
      ...plugins,
      new webpack.IgnorePlugin({
        checkResource(resource) {
          const lazyImports = [
            'oracledb',
            'sqlite3',
            'mysql2',
            'mysql',
            'tedious',
            'pg-native',
            'pg-query-stream',
            'point-of-view',
            '@nestjs/microservices',
            'cache-manager',
            'class-validator',
            'class-transformer',
            'class-transformer/storage',
            '@nestjs/platform-express',
            '@nestjs/platform-socket.io',
            '@nestjs/websockets/socket-module',
            '@nestjs/microservices/microservices-module',
            'fastify-swagger',
            'swagger-ui-express',
          ];
          if (!lazyImports.includes(resource)) {
            return false;
          }
          try {
            require.resolve(resource, {
              paths: [process.cwd()],
            });
          } catch (err) {
            return true;
          }
          return false;
        },
      }),
    ],
  };
};
