(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'assert', '../../rpc/jsonrpc'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports, require('assert'), require('../../rpc/jsonrpc'));
  } else {
    const mod = {
      exports: {},
    };
    factory(mod.exports, global.assert, global.jsonrpc);
    global.rpc = mod.exports;
  }
}(this, (exports, _assert, _jsonrpc) => {
  Object.defineProperty(exports, '__esModule', {
    value: true,
  });

  const _assert2 = _interopRequireDefault(_assert);

  const _jsonrpc2 = _interopRequireDefault(_jsonrpc);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj,
    };
  }

  const _extends = Object.assign || function (target) {
    for (let i = 1; i < arguments.length; i++) {
      const source = arguments[i];

      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }

  const _createClass = (function () {
    function defineProperties(target, props) {
      for (let i = 0; i < props.length; i++) {
        const descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }());

  const JsonRpcProvider = (function () {
    function JsonRpcProvider(jsonRpc) {
      _classCallCheck(this, JsonRpcProvider);

      this.rpc = jsonRpc;
    }

    _createClass(JsonRpcProvider, [{
      key: 'currentVersion',
      value: function currentVersion() {
        return this.rpc.call('emerald_currentVersion', []);
      },
    }, {
      key: 'listAccounts',
      value: function listAccounts(chain) {
        const showHidden = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        this.notNull(chain, 'chain');
        return this.rpc.call('emerald_listAccounts', [{ chain, show_hidden: showHidden }]).then(accounts => accounts.map(a => ({
          address: a.address,
          name: a.name,
          description: a.description,
          hardware: a.hardware,
          hidden: a.is_hidden,
        })));
      },
    }, {
      key: 'signTransaction',
      value: function signTransaction(tx, passphrase, chain) {
        this.notNull(chain, 'chain');
        const withPass = _extends({}, tx, { passphrase });
        return this.rpc.call('emerald_signTransaction', [withPass, { chain }]);
      },
    }, {
      key: 'importAccount',
      value: function importAccount(data, chain) {
        this.notNull(chain, 'chain');
        return this.rpc.call('emerald_importAccount', [data, { chain }]);
      },
    }, {
      key: 'unhideAccount',
      value: function unhideAccount(address, chain) {
        this.notNull(chain, 'chain');
        return this.rpc.call('emerald_unhideAccount', [{ address }, { chain }]);
      },
    }, {
      key: 'hideAccount',
      value: function hideAccount(address, chain) {
        this.notNull(chain, 'chain');
        return this.rpc.call('emerald_hideAccount', [{ address }, { chain }]);
      },
    }, {
      key: 'exportAccount',
      value: function exportAccount(address, chain) {
        this.notNull(chain, 'chain');
        return this.rpc.call('emerald_exportAccount', [{ address }, { chain }]);
      },
    }, {
      key: 'updateAccount',
      value: function updateAccount(address, name) {
        const description = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
        const chain = arguments[3];

        this.notNull(chain, 'chain');
        return this.rpc.call('emerald_updateAccount', [{ name, description, address }, { chain }]);
      },
    }, {
      key: 'newAccount',
      value: function newAccount(passphrase, name, description, chain) {
        this.notNull(chain, 'chain');
        const params = [{ passphrase, name, description }, { chain }];
        return this.rpc.call('emerald_newAccount', params);
      },
    }, {
      key: 'importContract',
      value: function importContract(address, name, abi, chain) {
        this.notNull(chain, 'chain');
        return this.rpc.call('emerald_importContract', [{ address, name }, { chain }]);
      },
    }, {
      key: 'listContracts',
      value: function listContracts(chain) {
        this.notNull(chain, 'chain');
        return this.rpc.call('emerald_listContracts', [{ chain }]);
      },
    }, {
      key: 'importAddress',
      value: function importAddress(item, chain) {
        this.notNull(chain, 'chain');
        return this.rpc.call('emerald_importAddress', [item, { chain }]);
      },
    }, {
      key: 'listAddresses',
      value: function listAddresses(chain) {
        this.notNull(chain, 'chain');
        return this.rpc.call('emerald_listAddresses', [{ chain }]);
      },
    }, {
      key: 'deleteAddress',
      value: function deleteAddress(address, chain) {
        this.notNull(chain, 'chain');
        return this.rpc.call('emerald_deleteAddress', [address, { chain }]);
      },
    }, {
      key: 'generateMnemonic',
      value: function generateMnemonic() {
        return this.rpc.call('emerald_generateMnemonic', []);
      },
    }, {
      key: 'importMnemonic',
      value: function importMnemonic(passphrase, name, description, mnemonic, path, chain) {
        this.notNull(chain, 'chain');
        const params = {
          name,
          description,
          mnemonic,
          password: passphrase,
          hd_path: path,
        };
        return this.rpc.call('emerald_importMnemonic', [params, { chain }]);
      },
    }, {
      key: 'notNull',
      value: function notNull(value, param) {
        return (0, _assert2.default)(value, `${param} must not be null`);
      },
    }]);

    return JsonRpcProvider;
  }());

  exports.default = JsonRpcProvider;
}));
