import { setupDevtools } from './ColadaDevToolsPlugin/index';
import { PiniaColadaPlugin } from './PiniaColadaPlugin/index';

export default {
  install(app: any) {
    setupDevtools(app);
  }
};

export { PiniaColadaPlugin };


