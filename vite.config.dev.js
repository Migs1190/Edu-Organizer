Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = undefined;

const _vite = require("vite");

const _pluginReact = _interopRequireDefault(require("@vitejs/plugin-react"));

function _interopRequireDefault(obj) {
  return obj?.__esModule ? obj : { default: obj };
}

// https://vitejs.dev/config/
const _default = (0, _vite.defineConfig)({
  plugins: [(0, _pluginReact.default)()], // base: `/tables/`
});

exports.default = _default;
