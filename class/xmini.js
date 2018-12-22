import PluginDemo from './plugin-demo';

function xmini({ plugins, ...rest }) {
  console.log('plugins:', plugins)
  console.log('config:', rest);
}

xmini({
  appId: 123,
  appName: 'test',
  plugins: [
    new PluginDemo({ siteId: 2 }),
  ],
});
