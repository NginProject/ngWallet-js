(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'bignumber.js', '../convert', './format', './jsonrpc'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('bignumber.js'), require('../convert'), require('./format'), require('./jsonrpc'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.bignumber, global.convert, global.format, global.jsonrpc);
    global.ethrpc = mod.exports;
  }
})(this, function (exports, _bignumber, _convert, _format, _jsonrpc) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _bignumber2 = _interopRequireDefault(_bignumber);

  var _convert2 = _interopRequireDefault(_convert);

  var _format2 = _interopRequireDefault(_format);

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

  var EthApi = function () {
    function EthApi(jsonRpc) {
      _classCallCheck(this, EthApi);

      this.rpc = jsonRpc;
      this.compile = {
        solidity: this.compileSolidity.bind(this)
      };
    }

    /**
     * Gets a list of available compilers
     */


    _createClass(EthApi, [{
      key: 'getCompilers',
      value: function getCompilers() {
        return this.rpc.call('ngin_getCompilers', []);
      }
    }, {
      key: 'compileSolidity',
      value: function compileSolidity(code) {
        return this.rpc.call('ngin_compileSolidity', [code]);
      }
    }, {
      key: 'protocolVersion',
      value: function protocolVersion() {
        return this.rpc.call('ngin_protocolVersion', []);
      }
    }, {
      key: 'getBalance',
      value: function getBalance(address) {
        var blockNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'latest';

        return this.rpc.call('ngin_getBalance', [address, blockNumber]).then(function (hexBalance) {
          return _convert2.default.toBigNumber(hexBalance);
        });
      }
    }, {
      key: 'gasPrice',
      value: function gasPrice() {
        return this.rpc.call('ngin_gasPrice', []).then(function (hexPrice) {
          return _convert2.default.toBigNumber(hexPrice);
        });
      }
    }, {
      key: 'getSyncing',
      value: function getSyncing() {
        return this.rpc.call('ngin_syncing', []).then(function (result) {
          if (!result) {
            return false;
          }
          return {
            startingBlock: _convert2.default.toNumber(result.startingBlock),
            currentBlock: _convert2.default.toNumber(result.currentBlock),
            highestBlock: _convert2.default.toNumber(result.highestBlock)
          };
        });
      }
    }, {
      key: 'call',
      value: function call(callData) {
        var blockNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'latest';

        return this.rpc.call('ngin_call', [{ to: callData.to, data: callData.data }, blockNumber]);
      }
    }, {
      key: 'estimateGas',
      value: function estimateGas(call) {
        var txData = _extends({}, call, {
          gas: call.gas !== undefined ? _format2.default.toHex(call.gas) : call.gas,
          nonce: call.nonce !== undefined ? _format2.default.toHex(call.nonce) : call.nonce
        });
        return this.rpc.call('ngin_estimateGas', [txData]).then(function (gas) {
          return _convert2.default.toNumber(gas);
        });
      }
    }, {
      key: 'getCode',
      value: function getCode(address) {
        var blockNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'latest';

        return this.rpc.call('ngin_getCode', [address, blockNumber]);
      }
    }, {
      key: 'getBlockNumber',
      value: function getBlockNumber() {
        return this.rpc.call('ngin_blockNumber', []).then(function (result) {
          return _convert2.default.toNumber(result);
        });
      }
    }, {
      key: 'getBlockByNumber',
      value: function getBlockByNumber() {
        var blockNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'latest';
        var full = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        return this.rpc.call('ngin_getBlockByNumber', [blockNumber, full]);
      }
    }, {
      key: 'getBlock',
      value: function getBlock(hashOrNumber) {
        var full = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var method = typeof hashOrNumber === 'string' && hashOrNumber.indexOf('0x') === 0 ? 'ngin_getBlockByHash' : 'ngin_getBlockByNumber';
        var block = hashOrNumber;
        if (method === 'ngin_getBlockByNumber') {
          if (!_format2.default.isPredefinedBlockNumber(hashOrNumber)) {
            block = _format2.default.toHex(hashOrNumber);
          }
        }
        return this.rpc.call(method, [block, full]).then(function (b) {
          return _format2.default.block(b);
        });
      }
    }, {
      key: 'getTransactionCount',
      value: function getTransactionCount(address) {
        var blockNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'latest';

        return this.rpc.call('ngin_getTransactionCount', [address, blockNumber]).then(_convert2.default.toNumber);
      }
    }, {
      key: 'getTransactionReceipt',
      value: function getTransactionReceipt(hash) {
        return this.rpc.call('ngin_getTransactionReceipt', [hash]).then(_format2.default.transactionReceipt);
      }
    }, {
      key: 'sendRawTransaction',
      value: function sendRawTransaction(rawTxData) {
        return this.rpc.call('ngin_sendRawTransaction', [rawTxData]);
      }
    }, {
      key: 'getTransaction',
      value: function getTransaction(hash) {
        return this.rpc.call('ngin_getTransactionByHash', [hash]).then(_format2.default.transaction);
      }
    }, {
      key: 'getAddressTransactions',
      value: function getAddressTransactions(address, blockNumFloor, blockNumCeil, toOrFrom, standardOrContract, beginPageIndex, endPageIndex, orderByOldest) {
        return this.rpc.call('ngind_getAddressTransactions', [address, blockNumFloor, blockNumCeil, toOrFrom, standardOrContract, beginPageIndex, endPageIndex, orderByOldest]);
      }
    }]);

    return EthApi;
  }();

  var NetApi = function () {
    function NetApi(jsonRpc) {
      _classCallCheck(this, NetApi);

      this.rpc = jsonRpc;
    }

    /**
     * Returns the current network id.
     */


    _createClass(NetApi, [{
      key: 'version',
      value: function version() {
        return this.rpc.call('net_version', []);
      }
    }, {
      key: 'listening',
      value: function listening() {
        return this.rpc.call('net_listening', []);
      }
    }, {
      key: 'peerCount',
      value: function peerCount() {
        return this.rpc.call('net_peerCount', []).then(function (result) {
          return _convert2.default.toNumber(result);
        });
      }
    }]);

    return NetApi;
  }();

  var Web3Api = function () {
    function Web3Api(jsonRpc) {
      _classCallCheck(this, Web3Api);

      this.rpc = jsonRpc;
    }

    /**
     * Returns the current client version.
     */


    _createClass(Web3Api, [{
      key: 'clientVersion',
      value: function clientVersion() {
        return this.rpc.call('web3_clientVersion', []);
      }
    }]);

    return Web3Api;
  }();

  var formatBatchBlockResponse = function formatBatchBlockResponse(responses) {
    return responses.filter(function (r) {
      return r.result;
    }).map(function (r) {
      return _format2.default.block(r.result);
    });
  };
  /**
   * Extended API
   */

  var ExtApi = function () {
    function ExtApi(jsonRpc) {
      _classCallCheck(this, ExtApi);

      this.rpc = jsonRpc;
    }

    _createClass(ExtApi, [{
      key: 'getBlocks',
      value: function getBlocks(from, to) {
        var requests = [];

        for (var i = from; i <= to; i += 1) {
          requests.push(this.rpc.newBatchRequest('ngin_getBlockByNumber', [_format2.default.toHex(i), false]));
        }

        return this.rpc.batch(requests).then(formatBatchBlockResponse);
      }
    }, {
      key: 'getBlocksByNumbers',
      value: function getBlocksByNumbers(number) {
        var _this = this;

        var formattedNumber = number;
        if (typeof number === 'number') {
          formattedNumber = _format2.default.toHex(number);
        }

        var requests = formattedNumber.map(function (blockNumber) {
          return _this.rpc.newBatchRequest('ngin_getBlockByNumber', [blockNumber, false]);
        });
        return this.rpc.batch(requests).then(formatBatchBlockResponse);
      }
    }, {
      key: 'getBalances',
      value: function getBalances(addresses) {
        var _this2 = this;

        var blockNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'latest';

        var balances = {};
        var requests = addresses.map(function (a) {
          return _this2.rpc.newBatchRequest('ngin_getBalance', [a, blockNumber], function (resp) {
            balances[a] = resp.result;
          });
        });

        return this.rpc.batch(requests).then(function () {
          return balances;
        });
      }
    }, {
      key: 'getTransactions',
      value: function getTransactions(hashes) {
        var _this3 = this;

        var requests = hashes.map(function (h) {
          return _this3.rpc.newBatchRequest('ngin_getTransactionByHash', [h]);
        });
        return this.rpc.batch(requests);
      }
    }, {
      key: 'batchCall',
      value: function batchCall(calls) {
        var _this4 = this;

        var blockNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'latest';

        var results = {};
        var responseHandler = function responseHandler(id) {
          return function (resp) {
            results[id] = resp;
          };
        };

        var requests = calls.map(function (c) {
          return _this4.rpc.newBatchRequest('ngin_call', [{ to: c.to, data: c.data }, blockNumber], responseHandler(c.id));
        });
        return this.rpc.batch(requests).then(function () {
          return results;
        });
      }
    }]);

    return ExtApi;
  }();

  var EthRpc = function () {
    function EthRpc(jsonRpc) {
      _classCallCheck(this, EthRpc);

      this.rpc = jsonRpc;
      this.eth = new EthApi(jsonRpc);
      this.net = new NetApi(jsonRpc);
      this.web3 = new Web3Api(jsonRpc);
      this.ext = new ExtApi(jsonRpc);
    }

    _createClass(EthRpc, [{
      key: 'raw',
      value: function raw(method, params) {
        return this.rpc.call(method, params);
      }
    }]);

    return EthRpc;
  }();

  exports.default = EthRpc;
});