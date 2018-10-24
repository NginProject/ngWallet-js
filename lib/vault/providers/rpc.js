(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'assert', '../../rpc/jsonrpc'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('assert'), require('../../rpc/jsonrpc'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.assert, global.jsonrpc);
    global.rpc = mod.exports;
  }
})(this, function (exports, _assert, _jsonrpc) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _assert2 = _interopRequireDefault(_assert);

  var _jsonrpc2 = _interopRequireDefault(_jsonrpc);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var JsonRpcProvider = function () {
    function JsonRpcProvider(jsonRpc) {
      _classCallCheck(this, JsonRpcProvider);

      this.rpc = jsonRpc;
    }

    _createClass(JsonRpcProvider, [{
      key: 'currentVersion',
      value: function currentVersion() {
        return this.rpc.call('emerald_currentVersion', []);
      }
    }, {
      key: 'listAccounts',
      value: function listAccounts(chain) {
        var showHidden = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        this.notNull(chain, 'chain');
        return this.rpc.call('emerald_listAccounts', [{ chain: chain, show_hidden: showHidden }]).then(function (accounts) {
          return accounts.map(function (a) {
            return {
              address: a.address,
              name: a.name,
              description: a.description,
              hardware: a.hardware,
              hidden: a.is_hidden
            };
          });
        });
      }
    }, {
      key: 'signTransaction',
      value: function signTransaction(tx, passphrase, chain) {
        this.notNull(chain, 'chain');
        var withPass = _extends({}, tx, { passphrase: passphrase });
        return this.rpc.call('emerald_signTransaction', [withPass, { chain: chain }]);
      }
    }, {
      key: 'importAccount',
      value: function importAccount(data, chain) {
        this.notNull(chain, 'chain');
        return this.rpc.call('emerald_importAccount', [data, { chain: chain }]);
      }
    }, {
      key: 'unhideAccount',
      value: function unhideAccount(address, chain) {
        this.notNull(chain, 'chain');
        return this.rpc.call('emerald_unhideAccount', [{ address: address }, { chain: chain }]);
      }
    }, {
      key: 'hideAccount',
      value: function hideAccount(address, chain) {
        this.notNull(chain, 'chain');
        return this.rpc.call('emerald_hideAccount', [{ address: address }, { chain: chain }]);
      }
    }, {
      key: 'exportAccount',
      value: function exportAccount(address, chain) {
        this.notNull(chain, 'chain');
        return this.rpc.call('emerald_exportAccount', [{ address: address }, { chain: chain }]);
      }
    }, {
      key: 'updateAccount',
      value: function updateAccount(address, name) {
        var description = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
        var chain = arguments[3];

        this.notNull(chain, 'chain');
        return this.rpc.call('emerald_updateAccount', [{ name: name, description: description, address: address }, { chain: chain }]);
      }
    }, {
      key: 'newAccount',
      value: function newAccount(passphrase, name, description, chain) {
        this.notNull(chain, 'chain');
        var params = [{ passphrase: passphrase, name: name, description: description }, { chain: chain }];
        return this.rpc.call('emerald_newAccount', params);
      }
    }, {
      key: 'importContract',
      value: function importContract(address, name, abi, chain) {
        this.notNull(chain, 'chain');
        return this.rpc.call('emerald_importContract', [{ address: address, name: name }, { chain: chain }]);
      }
    }, {
      key: 'listContracts',
      value: function listContracts(chain) {
        this.notNull(chain, 'chain');
        return this.rpc.call('emerald_listContracts', [{ chain: chain }]);
      }
    }, {
      key: 'importAddress',
      value: function importAddress(item, chain) {
        this.notNull(chain, 'chain');
        return this.rpc.call('emerald_importAddress', [item, { chain: chain }]);
      }
    }, {
      key: 'listAddresses',
      value: function listAddresses(chain) {
        this.notNull(chain, 'chain');
        return this.rpc.call('emerald_listAddresses', [{ chain: chain }]);
      }
    }, {
      key: 'deleteAddress',
      value: function deleteAddress(address, chain) {
        this.notNull(chain, 'chain');
        return this.rpc.call('emerald_deleteAddress', [address, { chain: chain }]);
      }
    }, {
      key: 'generateMnemonic',
      value: function generateMnemonic() {
        return this.rpc.call('emerald_generateMnemonic', []);
      }
    }, {
      key: 'importMnemonic',
      value: function importMnemonic(passphrase, name, description, mnemonic, path, chain) {
        this.notNull(chain, 'chain');
        var params = {
          name: name,
          description: description,
          mnemonic: mnemonic,
          password: passphrase,
          hd_path: path
        };
        return this.rpc.call('emerald_importMnemonic', [params, { chain: chain }]);
      }
    }, {
      key: 'notNull',
      value: function notNull(value, param) {
        return (0, _assert2.default)(value, param + ' must not be null');
      }
    }]);

    return JsonRpcProvider;
  }();

  exports.default = JsonRpcProvider;
});