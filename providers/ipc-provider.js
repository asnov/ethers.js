"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var net_1 = tslib_1.__importDefault(require("net"));
var json_rpc_provider_1 = require("./json-rpc-provider");
var properties_1 = require("../utils/properties");
var errors = tslib_1.__importStar(require("../errors"));
var IpcProvider = /** @class */ (function (_super) {
    tslib_1.__extends(IpcProvider, _super);
    function IpcProvider(path, network) {
        var _this = this;
        if (path == null) {
            errors.throwError('missing path', errors.MISSING_ARGUMENT, { arg: 'path' });
        }
        _this = _super.call(this, 'ipc://' + path, network) || this;
        errors.checkNew(_this, IpcProvider);
        properties_1.defineReadOnly(_this, 'path', path);
        return _this;
    }
    // @TODO: Create a connection to the IPC path and use filters instead of polling for block
    IpcProvider.prototype.send = function (method, params) {
        // This method is very simple right now. We create a new socket
        // connection each time, which may be slower, but the main
        // advantage we are aiming for now is security. This simplifies
        // multiplexing requests (since we do not need to multiplex).
        var _this = this;
        var payload = JSON.stringify({
            method: method,
            params: params,
            id: 42,
            jsonrpc: "2.0"
        });
        return new Promise(function (resolve, reject) {
            var stream = net_1.default.connect(_this.path);
            stream.on('data', function (data) {
                try {
                    resolve(JSON.parse(data.toString('utf8')).result);
                    // @TODO: Better pull apart the error
                    stream.destroy();
                }
                catch (error) {
                    reject(error);
                    stream.destroy();
                }
            });
            stream.on('end', function () {
                stream.destroy();
            });
            stream.on('error', function (error) {
                reject(error);
                stream.destroy();
            });
            stream.write(payload);
            stream.end();
        });
    };
    return IpcProvider;
}(json_rpc_provider_1.JsonRpcProvider));
exports.IpcProvider = IpcProvider;
