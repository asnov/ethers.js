'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var contract_1 = require("./contract");
exports.Contract = contract_1.Contract;
exports.ContractFactory = contract_1.ContractFactory;
exports.VoidSigner = contract_1.VoidSigner;
var abstract_signer_1 = require("./abstract-signer");
exports.Signer = abstract_signer_1.Signer;
var wallet_1 = require("./wallet");
exports.Wallet = wallet_1.Wallet;
var constants = tslib_1.__importStar(require("./constants"));
exports.constants = constants;
var errors = tslib_1.__importStar(require("./errors"));
exports.errors = errors;
var providers = tslib_1.__importStar(require("./providers"));
exports.providers = providers;
var utils = tslib_1.__importStar(require("./utils"));
exports.utils = utils;
var wordlists = tslib_1.__importStar(require("./wordlists"));
exports.wordlists = wordlists;
////////////////////////
// Compile-Time Constants
// This is empty in node, and used by browserify to inject extra goodies
var shims_1 = require("./utils/shims");
exports.platform = shims_1.platform;
// This is generated by "npm run dist"
var _version_1 = require("./_version");
exports.version = _version_1.version;
////////////////////////
// Helper Functions
function getDefaultProvider(network) {
    return new providers.FallbackProvider([
        new providers.InfuraProvider(network),
        new providers.EtherscanProvider(network),
    ]);
}
exports.getDefaultProvider = getDefaultProvider;
