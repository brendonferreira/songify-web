/* Spotify JS-SDK - v1.3.0-3eda9a0 */ ! function (t) {
    function e(n) {
        if (i[n]) return i[n].exports;
        var r = i[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return t[n].call(r.exports, r, r.exports, e), r.l = !0, r.exports
    }
    var i = {};
    e.m = t, e.c = i, e.d = function (t, i, n) {
        e.o(t, i) || Object.defineProperty(t, i, {
            configurable: !1,
            enumerable: !0,
            get: n
        })
    }, e.n = function (t) {
        var i = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return e.d(i, "a", i), i
    }, e.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, e.p = "", e(e.s = 36)
}([function (t, e, i) {
    "use strict";
    (function (e) {
        var i = e.Promise;
        if (!i) throw new Error("Fatal: no Promise implementation available.");
        var n;
        n = Object.defineProperty ? function (t, e, i) {
            return t[e] ? t : (Object.defineProperty(t, e, {
                value: i,
                configurable: !0,
                writable: !0
            }), t)
        } : function (t, e, i) {
            return t[e] ? t : (t[e] = i, t)
        }, n(i, "defer", function () {
            var t = {};
            return t.promise = new i(function (e, i) {
                t.resolve = e, t.reject = i
            }), t
        }), n(i.prototype, "spread", function (t, e) {
            return this.then(function (t) {
                return i.all(t)
            }).then(function (e) {
                return 1 === e.length ? t(e[0]) : t.apply(this, e)
            }, e)
        }), t.exports = i
    }).call(e, i(1))
}, function (t, e) {
    var i;
    i = function () {
        return this
    }();
    try {
        i = i || Function("return this")() || (0, eval)("this")
    } catch (t) {
        "object" == typeof window && (i = window)
    }
    t.exports = i
}, function (t, e, i) {
    "use strict";
    var n = function (t, e) {
        function i() {}
        var n = e.prototype;
        i.prototype = t._super = n, i.prototype.constructor = e, t.prototype = new i
    };
    t.exports = n
}, function (t, e, i) {
    "use strict";

    function n() {
        this._listenerMap = {}
    }
    var r = i(40),
        s = i(43),
        o = {
            ADD: "add:",
            REMOVE: "remove:"
        };
    n.createEvent = function (t, e) {
        if (!t) throw new TypeError("Cannot create event with empty type.");
        return new s(t, e)
    }, n.prototype._hasListenersFor = function (t) {
        var e = this._listenerMap,
            i = e && e[t];
        return !(!i || !i.length)
    }, n.prototype.on = function (t, e) {
        if (!t) throw new TypeError("Cannot add event listener with empty type.");
        var i = this._listenerMap || (this._listenerMap = {}),
            n = i[t] || (i[t] = []);
        if (-1 != n.indexOf(e)) return this;
        var r = o.ADD + t;
        if (this._hasListenersFor(r)) {
            if (this.emitSync(r, {
                    listener: e
                }).defaultPrevented) return this
        }
        return n.push(e), this
    }, n.prototype.once = function (t, e) {
        if (!t) throw new TypeError("Cannot add once listener with empty type.");
        var i = function () {
            return this.removeListener(t, i), e.apply(this, arguments)
        };
        return this.on(t, i), i
    }, n.prototype.addListeners = function (t) {
        for (var e in t) this.on(e, t[e]);
        return this
    }, n.prototype.removeListener = function (t, e) {
        var i = this._listenerMap,
            n = i && i[t];
        if (!n) return this;
        var r = n.indexOf(e);
        if (-1 == r) return this;
        var s = o.REMOVE + t;
        if (this._hasListenersFor(s)) {
            if (this.emitSync(s, {
                    listener: e,
                    remainingLength: n.length - 1
                }).defaultPrevented) return this
        }
        return n.splice(r, 1), n.length || (i[t] = null), this
    }, n.prototype.removeAllListeners = function (t) {
        var e = this._listenerMap;
        return e ? void 0 === t ? (this._listenerMap = {}, this) : (e[t] = null, this) : this
    }, n.prototype.removeListeners = function (t) {
        for (var e in t) this.removeListener(e, t[e]);
        return this
    }, n.prototype.addListener = function (t, e) {
        return this.on(t, e)
    }, n.prototype.addOnceListener = function (t, e) {
        return this.once(t, e)
    }, n.prototype.emit = function (t, e) {
        if (!t) throw new TypeError("Cannot emit empty type event.");
        var i = new s(t, e);
        return r(function () {
            this.emitEventSync(i)
        }.bind(this)), i
    }, n.prototype.emitAndWait = function (t, e, i) {
        if (!t) throw new TypeError("Cannot emit empty type event.");
        var n = new s(t, e);
        return r(function () {
            this.emitEventSync(n), "function" == typeof i && i(n)
        }.bind(this)), n
    }, n.prototype.emitEvent = function (t) {
        return r(function () {
            this.emitEventSync(t)
        }.bind(this)), t
    }, n.prototype.emitEventAndWait = function (t, e) {
        return r(function () {
            this.emitEventSync(t), "function" == typeof e && e(t)
        }.bind(this)), t
    }, n.prototype.emitSync = function (t, e) {
        var i = new s(t, e);
        return this.emitEventSync(i), i
    }, n.prototype.emitEventSync = function (t) {
        var e = t.type,
            i = this._listenerMap,
            n = i && i[e];
        if (!n || !n.length) return t;
        n = n.slice(0);
        for (var r = 0, o = n.length; r < o && (n[r].call(this, t), !s.wasImmediatePropagationStopped(t)); r++);
        return t
    }, n.prototype.proxyEmit = function (t, e, i) {
        if (!(t instanceof n)) throw new TypeError("Source must be an EventEmitter");
        if (t === this) throw new ReferenceError("Cannot create a recursive proxy.");
        if (!e || !i) throw new TypeError("Parameters sourceType and proxyType are required.");
        return t.on(e, this.emit.bind(this, i)), this
    }, n.prototype.proxyEmitSync = function (t, e, i) {
        if (!(t instanceof n)) throw new TypeError("Source must be an EventEmitter");
        if (t === this) throw new ReferenceError("Cannot create a recursive proxy.");
        if (!e || !i) throw new TypeError("Parameters sourceType and proxyType are required.");
        return t.on(e, this.emitSync.bind(this, i)), this
    }, n.prototype.onAddListener = function (t, e) {
        return this.on(o.ADD + t, e), this
    }, n.prototype.onRemoveListener = function (t, e) {
        return this.on(o.REMOVE + t, e), this
    }, t.exports = n
}, function (t, e, i) {
    "use strict";
    var n = i(6),
        r = {
            CAPPING_USER_IS_CAPPED: "CAPPING_USER_IS_CAPPED",
            EME_API_NOT_SUPPORTED: "EME_API_NOT_SUPPORTED",
            EME_MEDIA_KEYS_NOT_SUPPORTED: "EME_MEDIA_KEYS_NOT_SUPPORTED",
            EME_MEDIA_KEY_SESSION_NOT_SUPPORTED: "EME_MEDIA_KEY_SESSION_NOT_SUPPORTED",
            EME_NO_SUPPORTED_KEYSYSTEM: "EME_NO_SUPPORTED_KEYSYSTEM",
            EME_PLAYER_MEDIA_KEYS_SETTING_FAILED: "EME_PLAYER_MEDIA_KEYS_SETTING_FAILED",
            EME_LICENSE_REQUEST_EMPTY_RESPONSE: "EME_LICENSE_REQUEST_EMPTY_RESPONSE",
            EME_ERROR_UNKNOWN: "EME_ERROR_UNKNOWN",
            EME_LICENSE_REQUEST_FAILED_WITH_STATUS: "EME_LICENSE_REQUEST_FAILED_WITH_STATUS",
            EME_HEADER_KEY_VALUE_MISMATCH: "EME_HEADER_KEY_VALUE_MISMATCH",
            EME_HEADER_MISSING_CHALLENGE: "EME_HEADER_MISSING_CHALLENGE",
            EME_CANNOT_SET_CERTIFICATE_FOR_PLATFORM: "EME_CANNOT_SET_CERTIFICATE_FOR_PLATFORM",
            EME_MEDIA_KEY_SESSION_V0_1B_ERROR: "EME_MEDIA_KEY_SESSION_V0_1B_ERROR",
            EME_NO_SUPPORTED_CONFIGURATION: "EME_NO_SUPPORTED_CONFIGURATION",
            FILE_FORMAT_NOT_SUPPORTED: "FILE_FORMAT_NOT_SUPPORTED",
            FILE_MALFORMED_SEEKTABLE: "FILE_MALFORMED_SEEKTABLE",
            FILE_NOT_RESOLVED: "FILE_NOT_RESOLVED",
            FRAGMENT_REQUEST_FAILED_WITH_ZERO: "FRAGMENT_REQUEST_FAILED_WITH_ZERO",
            FRAGMENT_REQUEST_FAILED_WITH_STATUS: "FRAGMENT_REQUEST_FAILED_WITH_STATUS",
            FRAGMENT_REQUEST_EMPTY_RESPONSE: "FRAGMENT_REQUEST_EMPTY_RESPONSE",
            FRAGMENT_REQUEST_UNEXPECTED_LENGTH: "FRAGMENT_REQUEST_UNEXPECTED_LENGTH",
            PLAYER_ATTEMPTED_VOLUME_OUT_OF_RANGE: "PLAYER_ATTEMPTED_VOLUME_OUT_OF_RANGE",
            PLAYER_BUFFER_QUOTA_EXCEEDED: "PLAYER_BUFFER_QUOTA_EXCEEDED",
            PLAYER_CANNOT_FIND_PLAYABLE_URI: "PLAYER_CANNOT_FIND_PLAYABLE_URI",
            PLAYER_MEDIA_ERROR: "PLAYER_MEDIA_ERROR",
            PLAYER_PLAYBACK_ERROR: "PLAYER_PLAYBACK_ERROR",
            MEDIA_ABORTED: "MEDIA_ABORTED",
            MEDIA_DECODING_ERROR: "MEDIA_DECODING_ERROR",
            MEDIA_NETWORK_ERROR: "MEDIA_NETWORK_ERROR",
            MEDIA_NOT_SUPPORTED: "MEDIA_NOT_SUPPORTED",
            LICENSE_RESOLVER_CANT_RESOLVE_URL: "LICENSE_RESOLVER_CANT_RESOLVE_URL",
            LIST_PLAYER_NO_TRACK_PLAYER: "LIST_PLAYER_NO_TRACK_PLAYER",
            LIST_PLAYER_NO_LIST: "LIST_PLAYER_NO_LIST",
            LIST_PLAYER_INVALID_ARGUMENT: "LIST_PLAYER_INVALID_ARGUMENT",
            LIST_PLAYER_FORBIDDEN: "LIST_PLAYER_FORBIDDEN",
            STORAGE_ERROR: "STORAGE_ERROR",
            STORAGE_FAILED_WITH_STATUS: "STORAGE_FAILED_WITH_STATUS",
            STORAGE_RETURNED_NO_TRACKS: "STORAGE_RETURNED_NO_TRACKS",
            STORAGE_TRACK_MANIFEST_FAILED: "STORAGE_TRACK_MANIFEST_FAILED",
            STORAGE_VIDEO_MANIFEST_FAILED: "STORAGE_VIDEO_MANIFEST_FAILED",
            TRACK_DATA_ALREADY_FINALIZED: "TRACK_DATA_ALREADY_FINALIZED",
            TSV_SENDING_FAILED: "TSV_SENDING_FAILED",
            UNKNOWN: "UNKNOWN"
        };
    t.exports = n(r)
}, function (t, e, i) {
    "use strict";
    (function (e) {
        function n(t) {
            return !(!s.loggingPredicate || !s.loggingPredicate(t))
        }
        var r = i(57),
            s = e.__dbgLoggerRegistry;
        s || (s = {
            map: {},
            list: [],
            loggingPredicate: null
        }, Object.defineProperty ? Object.defineProperty(e, "__dbgLoggerRegistry", {
            value: s
        }) : e.__dbgLoggerRegistry = s);
        var o = s.map,
            a = s.list,
            _ = "log";
        t.exports = {
            intercept: function (t) {
                if ("function" != typeof t) throw new TypeError("Logging.intercept requires a function predicate.");
                s.loggingPredicate = t
            },
            unintercept: function () {
                s.loggingPredicate = null
            },
            list: function (t) {
                var e = Object.keys(o);
                e.sort();
                var i, n, r;
                if (t) {
                    var s = [];
                    for (i = 0, n = e.length; i < n; i++) r = e[i], o[r] && s.push({
                        tag: r,
                        description: o[r].description || "No description."
                    });
                    return s
                }
                var a = {};
                for (i = 0, n = e.length; i < n; i++) r = e[i], o[r] && (a[r] = o[r].description || "No description");
                return a
            },
            enable: function (t) {
                for (var e = Array.isArray(t) ? t : [t], i = e.length; i--;)
                    for (var n = e[i].toLowerCase(), r = a.length; r--;) {
                        var s = a[r];
                        s.matchesTag(n) && s.enable()
                    }
            },
            disable: function (t) {
                for (var e = Array.isArray(t) ? t : [t], i = e.length; i--;)
                    for (var n = e[i].toLowerCase(), r = a.length; r--;) {
                        var s = a[r];
                        s.matchesTag(n) && s.disable()
                    }
            },
            setLevel: function (t) {
                _ = t;
                for (var e = a.length; e--;) {
                    var i = a[e];
                    i && i.setLevel(t)
                }
            },
            enableAll: function () {
                for (var t = a.length; t--;) a[t] && a[t].enable()
            },
            disableAll: function () {
                for (var t = a.length; t--;) a[t] && a[t].disable()
            },
            forTag: function (t, e) {
                var i, s;
                if ("string" == typeof t ? (i = t.toLowerCase(), s = e) : (i = t.tag, s = t.description), o.hasOwnProperty(i) && o[i]) return o[i];
                var c = new r(i, s, n);
                return c.setLevel(_), o[i] = c, a.push(c), c
            },
            remove: function (t) {
                var e = t.toLowerCase();
                if (o.hasOwnProperty(e) && o[e]) {
                    var i = o[e];
                    o[e] = null;
                    var n = a.indexOf(i); - 1 !== n && a.splice(n, 1)
                }
            }
        }
    }).call(e, i(1))
}, function (t, e, i) {
    "use strict";
    (function (e, i) {
        var n, r = function () {};
        n = "true" === e.env.DEBUG ? function (t) {
            return i.Proxy && "function" != typeof i.Proxy.create && "function" == typeof i.Proxy ? new i.Proxy(t, {
                get: function (t, e) {
                    if (!t.hasOwnProperty(e)) throw new ReferenceError("Unknown enum value " + e);
                    return t[e]
                },
                set: r,
                delete: r
            }) : t
        } : function (t) {
            return t
        }, t.exports = n
    }).call(e, i(12), i(1))
}, function (t, e, i) {
    "use strict";
    var n = i(6),
        r = {
            KEY_SESSION_MESSAGE: "message",
            KEY_SESSION_STATUSES_CHANGE: "keystatuseschange",
            MEDIA_SOURCE_OPEN: "sourceopen",
            MEDIA_SOURCE_CLOSE: "sourceclose",
            SOURCE_BUFFER_UPDATE_END: "updateend",
            MS_KEY_ADDED: "mskeyadded",
            MS_KEY_ERROR: "mskeyerror",
            MS_KEY_MESSAGE: "mskeymessage",
            V0_1B_KEY_ADDED: "keyadded",
            V0_1B_KEY_ERROR: "keyerror",
            V0_1B_KEY_MESSAGE: "keymessage",
            MEDIA_DURATIONCHANGE: "durationchange",
            MEDIA_ENDED: "ended",
            MEDIA_ERROR: "error",
            MEDIA_LOADEDMETADATA: "loadedmetadata",
            MEDIA_PAUSE: "pause",
            MEDIA_PLAYING: "playing",
            MEDIA_SEEKING: "seeking",
            MEDIA_TIMEUPDATE: "timeupdate",
            MEDIA_WAITING: "waiting",
            INTERNAL_MEDIA_REQUIRES_DURATION: "__requiresduration",
            INTERNAL_PLAYER_LOADED_METADATA: "__loadedmetadata",
            BUFFER_APPEND_ERROR: "append_error",
            BUFFER_QUOTA_EXCEEDED: "quota_exceeded",
            BUFFER_STALLED: "stalled",
            BUFFER_SOURCE_OPEN: "source_open",
            BUFFER_SOURCE_CLOSE: "source_close",
            BUFFERING_START: "buffering_start",
            BUFFERING_END: "buffering_end",
            EME_LICENSE_REQUEST_ERROR: "license_request_error",
            EME_LICENSE_REQUEST_CAPPED: "license_request_capped",
            LIST_PLAYER_BEFORE_LIST_CHANGE: "before_list_change",
            LIST_PLAYER_BEFORE_NEXT: "before_next",
            LIST_PLAYER_BEFORE_PREVIOUS: "before_previous",
            LIST_PLAYER_BEFORE_TRACK_LOAD: "before_track_load",
            LIST_PLAYER_BUFFER_STALLED: "stalled",
            LIST_PLAYER_BUFFERING_START: "buffering_start",
            LIST_PLAYER_BUFFERING_END: "buffering_end",
            LIST_PLAYER_CAPPED: "capped",
            LIST_PLAYER_CLEARED: "cleared",
            LIST_PLAYER_DURATION_CHANGED: "duration_changed",
            LIST_PLAYER_ERROR: "error",
            LIST_PLAYER_ERROR_SYNC: "error_sync",
            LIST_PLAYER_LIST_CHANGED: "list_change",
            LIST_PLAYER_LIST_ENDED: "list_ended",
            LIST_PLAYER_LOAD_VIDEO: "load_video",
            LIST_PLAYER_MAX_LIST_ERRORS_REACHED: "max_list_errors_reached",
            LIST_PLAYER_PAUSED: "paused",
            LIST_PLAYER_PLAYING: "playing",
            LIST_PLAYER_PLAYED_THRESHOLD_REACHED: "played_threshold_reached",
            LIST_PLAYER_POSITION_CHANGED: "position_changed",
            LIST_PLAYER_PROGRESS: "progress",
            LIST_PLAYER_REPEAT_MODE_CHANGED: "repeat_mode_changed",
            LIST_PLAYER_SHUFFLE_CHANGED: "shuffle_changed",
            LIST_PLAYER_STOPPED: "stopped",
            LIST_PLAYER_STOPPED_VIDEO: "stopped_video",
            LIST_PLAYER_TRACKING_DATA_CREATED: "tracking_data_created",
            LIST_PLAYER_TRACKING_DATA_FINALIZED: "tracking_data_finalized",
            LIST_PLAYER_TRACK_ENDED: "track_ended",
            LIST_PLAYER_TRACK_LOADED: "track_loaded",
            LIST_PLAYER_TRACK_TIMEOUT: "track_timeout",
            LIST_PLAYER_TRACK_UNPLAYABLE: "track_unplayable",
            LIST_PLAYER_VOLUME_CHANGED: "volume_changed",
            LIST_PLAYER_VIDEO_ELEMENT_APPENDED: "video_element_appended",
            LIST_PLAYER_VIDEO_ELEMENT_REMOVED: "video_element_removed",
            LOGGER_ERROR: "error",
            PLAYER_BEFORE_LOAD: "before_load",
            PLAYER_BEFORE_STOP: "before_stop",
            PLAYER_BUFFER_STALLED: "stalled",
            PLAYER_BUFFERING_START: "buffering_start",
            PLAYER_BUFFERING_END: "buffering_end",
            PLAYER_CAN_PRELOAD: "can_preload",
            PLAYER_CAPPED: "capped",
            PLAYER_DURATION_CHANGED: "duration_changed",
            PLAYER_ENDED: "ended",
            PLAYER_ENDED_VIDEO: "ended_video",
            PLAYER_ERROR: "error",
            PLAYER_FIRST_BYTES: "first_bytes",
            PLAYER_KEY_RECEIVED: "key",
            PLAYER_LOAD: "load",
            PLAYER_LOAD_VIDEO: "load_video",
            PLAYER_LOADING_FAILED: "loading_failed",
            PLAYER_PAUSED: "paused",
            PLAYER_PLAYING: "playing",
            PLAYER_POSITION_CHANGED: "position_changed",
            PLAYER_PRELOADING_ERROR: "preloading_error",
            PLAYER_PROGRESS: "progress",
            PLAYER_STALLED: "stalled",
            PLAYER_STOPPED: "stopped",
            PLAYER_STOPPED_VIDEO: "stopped_video",
            PLAYER_PLAYED_THRESHOLD_REACHED: "played_threshold_reached",
            PLAYER_TIMEOUT: "timeout",
            PLAYER_TRACKING_DATA_CREATED: "tracking_data_created",
            PLAYER_TRACKING_DATA_FINALIZED: "tracking_data_finalized",
            PLAYER_VIDEO_ELEMENT_APPENDED: "video_element_appended",
            PLAYER_VIDEO_ELEMENT_REMOVED: "video_element_removed",
            PLAYER_MANAGER_READY: "ready",
            TRACKER_PLAYED_THRESHOLD_REACHED: "played_threshold_reached",
            TRACKER_TRACKING_DATA_CREATED: "tracking_data_created",
            TRACKER_TRACKING_DATA_FINALIZED: "tracking_data_finalized"
        };
    t.exports = n(r)
}, function (t, e, i) {
    "use strict";
    var n = i(6),
        r = {
            CONNECTION_ONLINE: "online",
            CONNECTION_OFFLINE: "offline",
            DEALER_AUTHENTICATED: "authenticated",
            DEALER_AUTHENTICATION_FAILED: "authentication_failed",
            DEALER_CONNECTED: "connected",
            DEALER_CONNECTION_ID: "connection_id",
            DEALER_ERROR: "error",
            DEALER_DISCONNECTED: "disconnected",
            DEALER_MESSAGE: "message",
            INTERNAL_DEALER_MESSAGE: "__dealer_message",
            PRODUCT_STATE_CHANGED: "product_state_changed",
            TRANSPORT_ACCESS_TOKEN: "access_token",
            TRANSPORT_AUTHENTICATED: "authenticated",
            TRANSPORT_AUTHENTICATION_FAILED: "authentication_failed",
            TRANSPORT_CONNECTED: "connected",
            TRANSPORT_CONNECTION_ERROR: "connection_error",
            TRANSPORT_CONNECTION_FAILED: "connection_failed",
            TRANSPORT_CONNECTION_ID: "connection_id",
            TRANSPORT_DEALER_MESSAGE: "dealer_message",
            TRANSPORT_DISCONNECTED: "disconnected",
            TRANSPORT_SHORT_SESSION_DISCONNECTED: "short_session_disconnected",
            TRANSPORT_RECONNECTED: "reconnected",
            TRANSPORT_RECONNECTING: "reconnecting"
        };
    t.exports = n(r)
}, function (t, e, i) {
    "use strict";
    var n = i(6),
        r = {
            UNKNOWN: 0,
            OK: 200,
            CREATED: 201,
            ACCEPTED: 202,
            NO_CONTENT: 204,
            PARTIAL_CONTENT: 206,
            BAD_REQUEST: 400,
            UNAUTHORIZED: 401,
            PAYMENT_REQUIRED: 402,
            FORBIDDEN: 403,
            NOT_FOUND: 404,
            METHOD_NOT_ALLOWED: 405,
            NOT_ACCEPTABLE: 406,
            PROXY_AUTHENTICATION_REQUIRED: 407,
            TIMED_OUT: 408,
            REQUEST_TIMEOUT: 408,
            CONFLICT: 409,
            GONE: 410,
            LENGTH_REQUIRED: 411,
            PRECONDITION_FAILED: 412,
            REQUEST_ENTITY_TOO_LARGE: 413,
            REQUEST_URI_TOO_LONG: 414,
            UNSUPPORTED_MEDIA_TYPE: 415,
            REQUESTED_RANGE_NOT_SATISFIABLE: 416,
            EXPECTATION_FAILED: 417,
            INTERNAL_SERVER_ERROR: 500,
            NOT_IMPLEMENTED: 501,
            BAD_GATEWAY: 502,
            SERVICE_UNAVAILABLE: 503,
            GATEWAY_TIMEOUT: 504,
            HTTP_VERSION_NOT_SUPPORTED: 505
        };
    t.exports = n(r)
}, function (t, e, i) {
    "use strict";
    var n = i(6),
        r = {
            DEALER_CONNECTION_ERROR: "DEALER_CONNECTION_ERROR",
            DEALER_AUTHENTICATION_FAILED: "DEALER_AUTHENTICATION_FAILED",
            DEALER_ERROR: "DEALER_ERROR",
            HTTP_REQUEST_FAILED: "HTTP_REQUEST_FAILED",
            LOGGING_REQUEST_FAILED: "LOGGING_REQUEST_FAILED"
        };
    t.exports = n(r)
}, function (t, e, i) {
    "use strict";
    var n = i(6),
        r = {
            WINDOW_BEFORE_UNLOAD: "beforeunload",
            CLIENT_AUTHENTICATED: "authenticated",
            CLIENT_AUTHENTICATION_ERROR: "authentication_error",
            CLIENT_BEFORE_DISCONNECT: "before_disconnect",
            CLIENT_BEFORE_OFFLINE_DISCONNECT: "before_offline_disconnect",
            CLIENT_CONNECTED: "connected",
            CLIENT_CONNECTION_ERROR: "connection_error",
            CLIENT_ERROR: "error",
            CLIENT_PRODUCT_STATE_CHANGED: "product_state_changed",
            CLIENT_RECONNECTED: "reconnected",
            CLIENT_RECONNECTING: "reconnecting",
            CLIENT_UNRECOVERABLE_FAILURE: "unrecoverable_failure",
            CONNECT_API_DEREGISTERED: "deregistered",
            CONNECT_API_DEVICE_STATE_CHANGED: "device_state_changed",
            CONNECT_API_MAX_SUBSCRIPTIONS_REACHED: "max_subscriptions_reached",
            CONNECT_API_PLAYER_STATE_CHANGED: "player_state_changed",
            CONNECT_API_REGISTERED: "registered",
            CONTROLLER_DEREGISTERED: "deregistered",
            CONTROLLER_DEVICE_INFO_CHANGED: "device_info_changed",
            CONTROLLER_MAX_SUBSCRIPTIONS_REACHED: "max_subscriptions_reached",
            CONTROLLER_PROGRESS: "progress",
            CONTROLLER_REGISTERED: "registered",
            CONTROLLER_STATE_CHANGED: "state_changed",
            STREAMER_CONTEXT_ENDED: "context_ended",
            STREAMER_DEREGISTERED: "deregistered",
            STREAMER_DEVICE_INFO_CHANGED: "device_info_changed",
            STREAMER_DURATION_CHANGED: "duration_changed",
            STREAMER_ERROR: "error",
            STREAMER_LOAD_VIDEO: "load_video",
            STREAMER_LOGGED_OUT: "logged_out",
            STREAMER_MAX_LIST_ERRORS_REACHED: "max_list_errors_reached",
            STREAMER_MAX_SUBSCRIPTIONS_REACHED: "max_subscriptions_reached",
            STREAMER_PLAYBACK_CAPPED: "playback_capped",
            STREAMER_PLAYER_INITIALIZATION_DONE: "player_initialization_done",
            STREAMER_PLAYER_INITIALIZATION_FAILED: "player_initialization_failed",
            STREAMER_PROGRESS: "progress",
            STREAMER_REGISTERED: "registered",
            STREAMER_REGISTRATION_ERROR: "registration_error",
            STREAMER_STATE_CHANGED: "state_changed",
            STREAMER_STOPPED_VIDEO: "stopped_video",
            STREAMER_VIDEO_ELEMENT_APPENDED: "video_element_appended",
            STREAMER_VIDEO_ELEMENT_REMOVED: "video_element_removed",
            PLAYBACK_STATE_OBSERVER_STATE_CHANGED: "state_changed",
            PRODUCT_STATE_OBSERVER_PRODUCT_STATE_CHANGED: "product_state_changed",
            TP_API_DEREGISTERED: "deregistered",
            TP_API_ERROR: "error",
            TP_API_LOGOUT: "logout",
            TP_API_MAX_SUBSCRIPTIONS_REACHED: "max_subscriptions_reached",
            TP_API_READY: "ready",
            TP_API_REGISTERED: "registered",
            TP_API_STATE_CHANGED: "state_changed",
            TP_API_STATE_CLEARED: "state_cleared"
        };
    t.exports = n(r)
}, function (t, e) {
    function i() {
        throw new Error("setTimeout has not been defined")
    }

    function n() {
        throw new Error("clearTimeout has not been defined")
    }

    function r(t) {
        if (u === setTimeout) return setTimeout(t, 0);
        if ((u === i || !u) && setTimeout) return u = setTimeout, setTimeout(t, 0);
        try {
            return u(t, 0)
        } catch (e) {
            try {
                return u.call(null, t, 0)
            } catch (e) {
                return u.call(this, t, 0)
            }
        }
    }

    function s(t) {
        if (h === clearTimeout) return clearTimeout(t);
        if ((h === n || !h) && clearTimeout) return h = clearTimeout, clearTimeout(t);
        try {
            return h(t)
        } catch (e) {
            try {
                return h.call(null, t)
            } catch (e) {
                return h.call(this, t)
            }
        }
    }

    function o() {
        E && p && (E = !1, p.length ? l = p.concat(l) : f = -1, l.length && a())
    }

    function a() {
        if (!E) {
            var t = r(o);
            E = !0;
            for (var e = l.length; e;) {
                for (p = l, l = []; ++f < e;) p && p[f].run();
                f = -1, e = l.length
            }
            p = null, E = !1, s(t)
        }
    }

    function _(t, e) {
        this.fun = t, this.array = e
    }

    function c() {}
    var u, h, d = t.exports = {};
    ! function () {
        try {
            u = "function" == typeof setTimeout ? setTimeout : i
        } catch (t) {
            u = i
        }
        try {
            h = "function" == typeof clearTimeout ? clearTimeout : n
        } catch (t) {
            h = n
        }
    }();
    var p, l = [],
        E = !1,
        f = -1;
    d.nextTick = function (t) {
        var e = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var i = 1; i < arguments.length; i++) e[i - 1] = arguments[i];
        l.push(new _(t, e)), 1 !== l.length || E || r(a)
    }, _.prototype.run = function () {
        this.fun.apply(null, this.array)
    }, d.title = "browser", d.browser = !0, d.env = {}, d.argv = [], d.version = "", d.versions = {}, d.on = c, d.addListener = c, d.once = c, d.off = c, d.removeListener = c, d.removeAllListeners = c, d.emit = c, d.prependListener = c, d.prependOnceListener = c, d.listeners = function (t) {
        return []
    }, d.binding = function (t) {
        throw new Error("process.binding is not supported")
    }, d.cwd = function () {
        return "/"
    }, d.chdir = function (t) {
        throw new Error("process.chdir is not supported")
    }, d.umask = function () {
        return 0
    }
}, function (t, e, i) {
    "use strict";

    function n(t, e) {
        this.url = t || "", this.status = e || 0, this.headers = null, this.body = null
    }
    n.prototype.getStatusFamily = function () {
        return 0 | this.status / 100
    }, t.exports = n
}, function (t, e, i) {
    "use strict";
    var n = i(10),
        r = i(4),
        s = i(6),
        o = function (t) {
            for (var e, i = 1; i < arguments.length; i++)
                if (e = arguments[i])
                    for (var n in e) n in e && (t[n] = e[n]);
            return t
        }({}, n, r, {
            USER_INFO_REQUEST_EMPTY_RESPONSE: "USER_INFO_REQUEST_EMPTY_RESPONSE",
            USER_INFO_REQUEST_FAILED_WITH_STATUS: "USER_INFO_REQUEST_FAILED_WITH_STATUS",
            HARMONY_NO_TRACKS_LOADED: "HARMONY_NO_TRACKS_LOADED",
            HARMONY_OPERATION_FORBIDDEN: "HARMONY_OPERATION_FORBIDDEN",
            CONNECTAPI_CLIENT_NO_ACTIVE_DEVICE: "CONNECT_API_CLIENT_NO_ACTIVE_DEVICE",
            CONNECTAPI_CLIENT_INVALID_POSITION: "CONNECT_API_CLIENT_INVALID_POSITION",
            CONNECTAPI_CLIENT_INVALID_VOLUME: "CONNECT_API_CLIENT_INVALID_VOLUME",
            CONNECTAPI_MAX_SUBSCRIPTIONS_REACHED: "CONNECTAPI_MAX_SUBSCRIPTIONS_REACHED",
            CONNECTAPI_REGISTRATION_FAILED_WITH_STATUS: "CONNECTAPI_REGISTRATION_FAILED_WITH_STATUS",
            TP_NO_RESPONSE_BODY: "TP_NO_RESPONSE_BODY",
            TP_REGISTRATION_FAILED_NON_PREMIUM: "TP_REGISTRATION_FAILED_NON_PREMIUM",
            TP_REGISTRATION_FAILED_WITH_STATUS: "TP_REGISTRATION_FAILED_WITH_STATUS",
            TP_MAX_SUBSCRIPTIONS_REACHED: "TP_MAX_SUBSCRIPTIONS_REACHED",
            TP_UPDATE_REQUEST_EMPTY_RESPONSE: "TP_UPDATE_REQUEST_EMPTY_RESPONSE",
            TP_PARSE_STATE_UPDATE_FAILED_WITH_STATUS: "TP_PARSE_STATE_UPDATE_FAILED_WITH_STATUS",
            TP_UNKNOWN_COMMAND: "TP_UNKNOWN_COMMAND",
            TP_CANNOT_CREATE_STATE_REF: "TP_CANNOT_CREATE_STATE_REF",
            TP_MISSING_INITIAL_STATE: "TP_MISSING_INITIAL_STATE",
            TP_INVALID_STATE_REFERENCE: "TP_INVALID_STATE_REFERENCE",
            TP_CONFLICT_REQUEST_FAILED_WITH_STATUS: "TP_CONFLICT_REQUEST_FAILED_WITH_STATUS",
            TP_STREAM_TIME_VALUE_OUT_OF_RANGE: "TP_STREAM_TIME_VALUE_OUT_OF_RANGE"
        });
    t.exports = s(o)
}, function (t, e, i) {
    "use strict";

    function n(t, e) {
        Error.call(this, e), this.code = t || r.STORAGE_ERROR, this.message = e || "Storage Error", this.status = -1, this.fileId = "", this.canPlayNext = !0
    }
    var r = i(4);
    n.prototype = new Error, n.prototype.constructor = n, n.prototype.name = "StorageError", t.exports = n
}, function (t, e, i) {
    "use strict";
    t.exports = {
        LOAD_TRACK: "load track",
        RESOLVE_CDN_URL: "resolve cdn url",
        GET_MANIFEST: "get manifest",
        FETCH_HEAD_FRAGMENT: "fetch head fragment",
        LOAD_TO_PLAYING: "load to playing",
        LICENSE_MESSAGE_GENERATED: "license message generated",
        LICENSE_REQUEST_FINISHED: "license request finished",
        LICENSE_SESSION_CREATED: "license session created",
        LICENSE_SESSION_UPDATED: "license session updated"
    }
}, function (t, e, i) {
    "use strict";

    function n(t, e) {
        Error.call(this, e), this.code = t || r.EME_ERROR_UNKNOWN, this.message = e, this.status = -1, this.licenseServer = "", this.shouldRefreshEndpoint = !1, this.unrecoverable = !1, this.debug = {}
    }
    var r = i(4);
    n.prototype = new Error, n.prototype.constructor = n, n.prototype.name = "EMEError", n.prototype.fatal = function () {
        return this.unrecoverable = !0, this
    }, t.exports = n
}, function (t, e, i) {
    "use strict";
    var n = {
        SPOTIFY_MESSAGE: "SP_MESSAGE",
        ACCOUNT_ERROR: "ACCOUNT_ERROR",
        AUTH_ERROR: "AUTH_ERROR",
        CONNECT: "CONNECT",
        CONNECTED: "CONNECTED",
        CURRENT_STATE: "CURRENT_STATE",
        DISCONNECT: "DISCONNECT",
        EVENT: "EVENT",
        GET_CURRENT_STATE: "GET_CURRENT_STATE",
        GET_TOKEN: "GET_TOKEN",
        GET_VOLUME: "GET_VOLUME",
        INIT: "INIT",
        LOADED: "LOADED",
        NEXT_TRACK: "NEXT_TRACK",
        PAUSE: "PAUSE",
        PLAYBACK_ERROR: "PLAYBACK_ERROR",
        PLAYER_INIT_ERROR: "PLAYER_INIT_ERROR",
        PLAYER_READY: "PLAYER_READY",
        PLAYER_STATE_CHANGED: "PLAYER_STATE_CHANGED",
        PREV_TRACK: "PREV_TRACK",
        RESUME: "RESUME",
        SEEK: "SEEK",
        SET_VOLUME: "SET_VOLUME",
        TOGGLE_PLAY: "TOGGLE_PLAY",
        TOKEN: "TOKEN",
        VOLUME: "VOLUME",
        accountError: function (t) {
            return this._createEventMessage(n.ACCOUNT_ERROR, {
                message: t
            })
        },
        authError: function (t) {
            return this._createEventMessage(n.AUTH_ERROR, t)
        },
        playbackError: function (t) {
            return this._createEventMessage(n.PLAYBACK_ERROR, t)
        },
        playerReady: function (t) {
            return this._createEventMessage(n.PLAYER_READY, t)
        },
        connect: function () {
            return this._createMessage(n.CONNECT)
        },
        connected: function (t, e) {
            return this._createMessage(n.CONNECTED, {
                connected: t,
                ref: e
            })
        },
        disconnect: function () {
            return this._createMessage(n.DISCONNECT)
        },
        init: function (t) {
            return this._createMessage(n.INIT, t)
        },
        playerInitError: function (t) {
            return this._createEventMessage(n.PLAYER_INIT_ERROR, t)
        },
        getToken: function () {
            return this._createMessage(n.GET_TOKEN)
        },
        token: function (t, e) {
            return this._createMessage(n.TOKEN, {
                token: t,
                ref: e
            })
        },
        pause: function () {
            return this._createMessage(n.PAUSE)
        },
        resume: function () {
            return this._createMessage(n.RESUME)
        },
        togglePlay: function () {
            return this._createMessage(n.TOGGLE_PLAY)
        },
        seek: function (t) {
            return this._createMessage(n.SEEK, t)
        },
        nextTrack: function (t) {
            return this._createMessage(n.NEXT_TRACK, t)
        },
        previousTrack: function (t) {
            return this._createMessage(n.PREV_TRACK, t)
        },
        getCurrentState: function () {
            return this._createMessage(n.GET_CURRENT_STATE)
        },
        currentState: function (t, e) {
            return this._createMessage(n.CURRENT_STATE, {
                state: t,
                ref: e
            })
        },
        playerStateChanged: function (t) {
            return this._createEventMessage(n.PLAYER_STATE_CHANGED, t)
        },
        getVolume: function () {
            return this._createMessage(n.GET_VOLUME)
        },
        volume: function (t, e) {
            return this._createMessage(n.VOLUME, {
                volume: t,
                ref: e
            })
        },
        setVolume: function (t) {
            return this._createMessage(n.SET_VOLUME, t)
        },
        embeddedLoaded: function () {
            return this._createMessage(n.LOADED)
        },
        _createEventMessage: function (t, e) {
            return this._createMessage(n.EVENT, {
                name: t,
                eventData: e
            })
        },
        _createMessage: function (t, e) {
            return {
                type: n.SPOTIFY_MESSAGE,
                body: {
                    topic: t,
                    data: e ? JSON.parse(JSON.stringify(e)) : null
                }
            }
        }
    };
    t.exports = n
}, function (t, e, i) {
    "use strict";
    e.counterDefaults = {
        algorithm: "lin",
        baseTime: 200
    }, e.backoffDefaults = {
        algorithm: "lin",
        baseTime: 200,
        maxDuration: 1 / 0,
        maxRetries: 1 / 0,
        maxTime: 1 / 0,
        retryPredicate: function () {
            return !0
        }
    }
}, function (t, e, i) {
    "use strict";

    function n(t) {
        var e = t / 5;
        return 0 | t - e / 2 + Math.random() * e
    }

    function r(t) {
        var e = t || {};
        this._algo = e.algo || s.algorithm, this._baseTime = e.baseTime || s.baseTime, this._jitter = !(!1 === e.jitter)
    }
    var s = i(19).counterDefaults;
    r.prototype.getTime = function (t) {
        var e;
        switch (this._algo) {
            case "static":
                e = 1;
                break;
            case "log":
                e = Math.log(t);
                break;
            case "exp":
                e = Math.pow(Math.E, t);
                break;
            case "lin":
            default:
                e = t
        }
        var i = e * this._baseTime | 0;
        return this._jitter ? n(i) : i
    }, t.exports = r
}, function (t, e, i) {
    "use strict";
    var n = i(6),
        r = {
            BROWSER_ERROR: 0,
            INFORMATIONAL: 1,
            SUCCESS: 2,
            REDIRECTION: 3,
            CLIENT_ERROR: 4,
            SERVER_ERROR: 5
        };
    t.exports = n(r)
}, function (t, e, i) {
    "use strict";
    t.exports = 4e3
}, function (t, e, i) {
    "use strict";

    function n(t, e) {
        var i = e || {};
        this._url = t, this._method = (i.method || "GET").toUpperCase(), this._payload = i.payload || "", this._headers = i.headers || null, this._responseType = i.responseType || "", this._canceller = i.canceller || r.defer().promise, this._ignoreResponseBody = i.ignoreResponseBody, this._parseResponseHeaders = i.parseResponseHeaders, this._withCredentials = "include" === i.credentials, this._forcePolyfill = i.forcePolyfill, this._xhr = new XMLHttpRequest, this._abort = this._abort.bind(this)
    }
    var r = i(0),
        s = i(13),
        o = i(53),
        a = i(54),
        _ = i(9),
        c = i(10),
        u = function () {},
        h = {
            POST: !0,
            PUT: !0,
            DELETE: !0
        },
        d = {
            json: !0,
            text: !0,
            document: !0
        },
        p = {},
        l = r.resolve(p);
    n.request = function (t, e) {
        return new n(t, e).send()
    }, n.prototype._abort = function () {
        this._xhr && (this._xhr.abort(), this._xhr.onprogress = u, this._xhr.onerror = u, this._xhr.onreadystatechange = u, this._xhr = null)
    }, n.prototype._handleStateChanged = function (t, e) {
        this._xhr && 4 === this._xhr.readyState && (this._xhr.onprogress = null, this._xhr.onerror = null, this._xhr.onreadystatechange = null, r.race([this._canceller, l]).then(function (i) {
            if (i === p && this._xhr) {
                var n = this._xhr;
                if (n) {
                    var r = n.status,
                        a = new s(n.responseURL || t, r);
                    if (a.body = null, this._parseResponseHeaders && (a.headers = new o(n.getAllResponseHeaders())), !this._ignoreResponseBody && r !== _.NO_CONTENT && 2 === a.getStatusFamily()) {
                        var c = this._responseType;
                        if (!this._forcePolyfill && "response" in n && c === n.responseType) a.body = n.response;
                        else if ("document" === c) a.body = n.responseXML;
                        else if ("json" === c) try {
                            a.body = JSON.parse(n.responseText)
                        } catch (t) {
                            a.body = null
                        } else "text" !== c && "" !== c || (a.body = n.responseText)
                    }
                    e.resolve(a), this._xhr = null
                }
            }
        }.bind(this)).catch(function (t) {}))
    }, n.prototype.send = function () {
        return r.race([this._canceller, l]).then(function (t) {
            var e = r.defer();
            if (t !== p) return e.promise;
            var i = this._url;
            if (!i) return e.reject(new TypeError("Request URL cannot be blank.")), e.promise;
            var n = null,
                s = this._payload,
                o = this._method;
            o in h && s ? n = s : s && (i += "?" + s);
            var _ = this._xhr;
            if (!_) return e.reject(new Error("Request has been closed.")), e.promise;
            _.open(o, i, !0), _.onprogress = u, _.onerror = function () {
                e.reject(new a(c.HTTP_REQUEST_FAILED, "Request cannot be completed.", this.status)), this.onerror = u
            }, _.onreadystatechange = this._handleStateChanged.bind(this, i, e);
            var l = this._responseType;
            if (l)
                if (this._forcePolyfill) {
                    if (!(l in d)) return e.reject(new TypeError('Cannot polyfill responseType "' + l + '"')), e.promise
                } else {
                    if (!("responseType" in _ || l in d)) return e.reject(new TypeError("Cannot set responseType: not supported in browser.")), e.promise;
                    if (_.responseType = l, l !== this._xhr.responseType && !(l in d)) return e.reject(new TypeError('Unknown responseType "' + l + '".')), e.promise
                }
            var E = this._headers;
            if (E)
                for (var f in E)
                    if (E.hasOwnProperty(f)) try {
                        _.setRequestHeader(f, E[f])
                    } catch (t) {
                        return e.reject(t), e.promise
                    }
            try {
                _.send(n)
            } catch (t) {
                e.reject(t)
            }
            return this._canceller.then(this._abort, this._abort), e.promise
        }.bind(this))
    }, t.exports = n
}, function (t, e, i) {
    "use strict";
    var n = i(6),
        r = {
            CONNECT_API: "connect-api",
            HARMONY: "harmony",
            PLAYBACK: "playback",
            TRACK_PLAYBACK: "track-playback",
            TRANSPORT: "transport"
        };
    t.exports = n(r)
}, function (t, e, i) {
    "use strict";

    function n(t, e, i) {
        for (var n = 0, r = 0; r < t.length; ++r) {
            var s = t[r] * e + n;
            t[r] = s % i, n = ~~(s / i)
        }
        for (; n;) t.push(n % i), n = ~~(n / i)
    }

    function r(t, e, i, n) {
        var r, s, o = 0;
        for (s = 0; s < e.length; ++s) r = ~~t[s] + e[s] * i + o, t[s] = r % n, o = ~~(r / n);
        for (; o;) r = ~~t[s] + o, t[s] = r % n, o = ~~(r / n), ++s
    }

    function s(t, e, i) {
        for (var s = [0], o = [1], a = 0; a < t.length; ++a) r(s, o, t[a], i), n(o, e, i);
        return s
    }

    function o(t, e) {
        for (var i = [], n = 0; n < t.length; ++n) i.push(e[t[n]]);
        return i.reverse()
    }

    function a(t, e) {
        for (; t.length < e;) t.push(0);
        return t
    }
    var _ = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
        c = {},
        u = {};
    ! function () {
        var t, e;
        for (t = 0, e = _.length; t < e; ++t) u[_[t]] = t;
        for (t = 0; t < 16; ++t) c["0123456789abcdef" [t]] = t;
        for (t = 0; t < 16; ++t) c["0123456789ABCDEF" [t]] = t
    }(), t.exports = {
        fromBytes: function (t, e) {
            return o(a(s(t.slice(0).reverse(), 256, 62), e), _).join("")
        },
        toBytes: function (t, e) {
            return a(s(o(t, u), 62, 256), e).reverse()
        },
        toHex: function (t, e) {
            return o(a(s(o(t, u), 62, 16), e), _).join("")
        },
        fromHex: function (t, e) {
            return o(a(s(o(t, c), 16, 62), e), _).join("")
        }
    }
}, function (t, e) {
    t.exports = {
        tagged: "3.4.1-ec88d11",
        version: "3.4.1",
        revision: "ec88d11"
    }
}, function (t, e, i) {
    "use strict";
    var n = {
        WIDEVINE: "com.widevine.alpha",
        PLAYREADY: "com.microsoft.playready",
        PLAYREADY_HARDWARE: "com.microsoft.playready.hardware"
    };
    t.exports = n
}, function (t, e, i) {
    "use strict";
    var n = function () {
        var t, e = [];
        for (t = 0; t < 256; ++t) e[t] = 255;
        for (t = 0; t < this.BASE64_DIGITS.length; ++t) e[this.BASE64_DIGITS.charCodeAt(t)] = t;
        this._inverseData = String.fromCharCode.apply(String, e)
    };
    n.prototype.BASE64_DIGITS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", n.prototype.STRING_CHUNK_SIZE = 4096, n.prototype._stringFromCharCode = function (t) {
        if (t.length < this.STRING_CHUNK_SIZE) return String.fromCharCode.apply(String, t);
        var e = 0,
            i = [];
        do {
            i.push(String.fromCharCode.apply(String, t.slice(e, e + this.STRING_CHUNK_SIZE))), e += this.STRING_CHUNK_SIZE
        } while (e < t.length);
        return i.join("")
    }, n.prototype.encode = function (t) {
        if ("string" != typeof t) return "";
        if ("undefined" != typeof window && void 0 !== window.btoa) return window.btoa(t);
        var e, i, n, r, s, o;
        for (n = t.length, i = 0, e = ""; i < n;) {
            if (r = 255 & t.charCodeAt(i++), i === n) {
                e += this.BASE64_DIGITS.charAt(r >> 2), e += this.BASE64_DIGITS.charAt((3 & r) << 4), e += "==";
                break
            }
            if (s = t.charCodeAt(i++), i === n) {
                e += this.BASE64_DIGITS.charAt(r >> 2), e += this.BASE64_DIGITS.charAt((3 & r) << 4 | (240 & s) >> 4), e += this.BASE64_DIGITS.charAt((15 & s) << 2), e += "=";
                break
            }
            o = t.charCodeAt(i++), e += this.BASE64_DIGITS.charAt(r >> 2), e += this.BASE64_DIGITS.charAt((3 & r) << 4 | (240 & s) >> 4), e += this.BASE64_DIGITS.charAt((15 & s) << 2 | (192 & o) >> 6), e += this.BASE64_DIGITS.charAt(63 & o)
        }
        return e
    }, n.prototype.decode = function (t) {
        if ("undefined" != typeof window && void 0 !== window.atob) return window.atob(t);
        for (var e, i, n = [], r = t.length, s = 0;;) {
            do {
                e = this._inverseData.charCodeAt(255 & t.charCodeAt(s++))
            } while (255 === e && s < r);
            do {
                i = this._inverseData.charCodeAt(255 & t.charCodeAt(s++))
            } while (255 === i && s < r);
            if (255 === i) break;
            n.push(255 & (e << 2 | i >> 4));
            do {
                e = this._inverseData.charCodeAt(255 & t.charCodeAt(s++))
            } while (255 === e && s < r);
            if (255 === e) break;
            n.push(255 & (i << 4 | e >> 2));
            do {
                i = this._inverseData.charCodeAt(255 & t.charCodeAt(s++))
            } while (255 === i && s < r);
            if (255 === i) break;
            n.push(255 & (e << 6 | i))
        }
        return this._stringFromCharCode(n)
    };
    var r = new n;
    t.exports = {
        encode: r.encode.bind(r),
        decode: r.decode.bind(r)
    }
}, function (t, e, i) {
    "use strict";

    function n(t, e, i) {
        Error.call(this, e), this.code = t, this.message = e, this.target = null, this.status = void 0 !== i ? i : -1
    }
    n.prototype = new Error, n.prototype.constructor = n, n.prototype.name = "FragmentError", t.exports = n
}, function (t, e, i) {
    "use strict";
    var n = {
        "com.widevine.alpha": {
            licenseServer: "https://@webgate/widevine-license",
            withCertificate: !0,
            pssh_field: "pssh_widevine"
        },
        "com.microsoft.playready": {
            licenseServer: "https://@webgate/playready-license",
            withCertificate: !1,
            pssh_field: "pssh_playready"
        }
    };
    t.exports = n
}, function (t, e, i) {
    "use strict";
    var n = {
        EMPTY: "",
        UNKNOWN: "unknown"
    };
    t.exports = n
}, function (t, e, i) {
    "use strict";

    function n(t, e) {
        Error.call(this, e), this.code = t, this.message = e, this.unrecoverable = !1, this.listPlayerIgnore = !1, this.debug = {}
    }
    n.prototype = new Error, n.prototype.constructor = n, n.prototype.name = "PlaybackError", n.prototype.fatal = function () {
        return this.unrecoverable = !0, this
    }, t.exports = n
}, function (t, e, i) {
    "use strict";
    var n = {
        SUCCESS: "RESULT_SUCCESS",
        INVALID: "RESULT_INVALID",
        FORBIDDEN: "RESULT_FORBIDDEN",
        OUT_OF_BOUNDS: "RESULT_OUT_OF_BOUNDS",
        NO_LIST: "RESULT_NO_LIST",
        NO_TRACK: "RESULT_NO_TRACK",
        LIST_END: "RESULT_LIST_END",
        INVALID_TRACK: "RESULT_INVALID_TRACK",
        CANCELLED: "CANCELLED",
        NO_TRACK_PLAYER: "NO_TRACK_PLAYER"
    };
    t.exports = n
}, function (t, e, i) {
    "use strict";

    function n(t, e) {
        this.code = t, this.message = e, this.status = -1, this.maxedSubscriptions = !1, this.unrecoverable = !1, this.debug = {}
    }
    n.prototype = new Error, n.prototype.constructor = new n, n.prototype.name = "TrackPlayerAPIClientError", n.prototype.fatal = function () {
        return this.unrecoverable = !0, this
    }, t.exports = n
}, function (t, e, i) {
    "use strict";

    function n(t, e) {
        for (var i = e.manifest, n = 0, o = t.length; n < o; n++) {
            var a = t[n];
            if (a in i) {
                var _ = i[a];
                if (_.length) {
                    var c = _[0];
                    if (c.file_id || c.file_url) {
                        var u = !!c.file_url,
                            h = c.file_id;
                        if ((h || (h = c.file_url.replace(r, "$2")) !== c.file_url) && h) {
                            var d = "manifest_ids_video" === a ? "video" : "audio";
                            return {
                                noLog: u,
                                noManifest: u,
                                uri: e.metadata.uri,
                                format: a.replace(s, "").toUpperCase(),
                                mediaType: d,
                                fileId: h,
                                bitrate: c.bitrate || 16e4,
                                impressionURL: c.impression_url,
                                impressionURLs: c.impression_urls,
                                playable: !!h
                            }
                        }
                    }
                }
            }
        }
        return null
    }
    var r = /^(.+?)\/([^.\/]+)(\.[^\/]*)?$/,
        s = /file_(id|url)s_/;
    t.exports = n
}, function (t, e, i) {
    "use strict";
    var n = i(37);
    window.addEventListener("load", function () {
        // if (window.parent === window) throw new Error("Embedded player needs to be in an iframe");
        new n(window, window.parent).listen()
    })
}, function (t, e, i) {
    "use strict";
    var n = i(38),
        r = i(18),
        s = i(39),
        o = i(70),
        a = i(0),
        _ = function (t, e) {
            this._currentWindow = t, this._loaderWindow = e, this._client = null, this._streamer = null, this._getTokenRequests = {}, this._msgDispatcher = new n, this._messageHandlers = {}, this._lastState = null, this._setupMessageHandlers()
        };
    _.prototype.listen = function () {
        this._msgDispatcher.listen(this._currentWindow, this._handleMessages.bind(this)), this._currentWindow.addEventListener("beforeunload", function () {
            this._client && this._client.disconnect()
        }.bind(this)), this._sendMessage(r.embeddedLoaded())
    }, _.prototype._setupMessageHandlers = function () {
        this._messageHandlers[r.INIT] = this._onInit.bind(this), this._messageHandlers[r.CONNECT] = this._onConnect.bind(this), this._messageHandlers[r.DISCONNECT] = this._onDisconnect.bind(this), this._messageHandlers[r.TOKEN] = this._onToken.bind(this), this._messageHandlers[r.GET_CURRENT_STATE] = this._onGetCurrentState.bind(this), this._messageHandlers[r.GET_VOLUME] = this._onGetVolume.bind(this), this._messageHandlers[r.SET_VOLUME] = this._onSetVolume.bind(this), this._messageHandlers[r.PAUSE] = this._onPause.bind(this), this._messageHandlers[r.RESUME] = this._onResume.bind(this), this._messageHandlers[r.TOGGLE_PLAY] = this._onTogglePlay.bind(this), this._messageHandlers[r.SEEK] = this._onSeek.bind(this), this._messageHandlers[r.PREV_TRACK] = this._onPrevTrack.bind(this), this._messageHandlers[r.NEXT_TRACK] = this._onNextTrack.bind(this)
    }, _.prototype._onConnect = function (t, e) {
        this._client.connect().then(function (t) {
            this._sendMessage(r.connected(t, e))
        }.bind(this))
    }, _.prototype._onInit = function (t) {
        this._client = s.create({
            getToken: this._getToken.bind(this),
            endpoints: {
                webgate: "https://api.spotify.com/v1"
            },
            descriptor: {
                id: t.id,
                name: t.name,
                brand: "public_js-sdk"
            }
        }), this._streamer = o.forClient(this._client), "volume" in t && this._streamer.once("registered", function () {
            this._streamer.setVolume(t.volume)
        }.bind(this)), this._streamer.addListeners({
            registered: this._onLocalPlayerEnabled.bind(this),
            state_changed: this._onStateChanged.bind(this),
            player_initialization_failed: this._onPlayerInitError.bind(this)
        }), this._client.addListeners({
            authentication_error: this._onAuthError.bind(this),
            error: this._onClientError.bind(this),
            product_state_changed: this._onProductStateChanged.bind(this)
        })
    }, _.prototype._onToken = function (t) {
        this._getTokenRequests[t.ref].resolve(t.token)
    }, _.prototype._onGetCurrentState = function (t, e) {
        this._streamer.getCurrentState().then(function (t) {
            this._sendMessage(r.currentState(t, e))
        }.bind(this))
    }, _.prototype._onProductStateChanged = function () {
        this._client.getProductState().then(function (t) {
            "1" === t.ads && (this._sendMessage(r.accountError("This functionality is restricted to premium users only")), this._client.disconnect())
        }.bind(this))
    }, _.prototype._onGetVolume = function (t, e) {
        this._streamer.getVolume().then(function (t) {
            this._sendMessage(r.volume(t, e))
        }.bind(this))
    }, _.prototype._onSetVolume = function (t) {
        this._streamer.setVolume(t)
    }, _.prototype._onDisconnect = function () {
        this._client.disconnect()
    }, _.prototype._onLocalPlayerEnabled = function () {
        this._client.getClientDescriptor().then(function (t) {
            this._sendMessage(r.playerReady({
                device_id: t.id
            }))
        }.bind(this))
    }, _.prototype._onStateChanged = function (t) {
        this._checkStateChange(t && t.state) && (this._sendMessage(r.playerStateChanged(t.state)), this._lastState = t.state)
    }, _.prototype._checkStateChange = function () {
        var t = function (e, i) {
            if (e !== i && e && i && "object" == typeof e && "object" == typeof i) {
                var n = Object.keys(e),
                    r = Object.keys(i);
                return n.length === r.length && n.every(function (n) {
                    return "timestamp" === n || t(e[n], i[n])
                })
            }
            return e === i
        };
        return function (e) {
            return !t(this._lastState, e)
        }
    }(), _.prototype._getToken = function (t) {
        var e = this._sendMessage(r.getToken());
        this._getTokenRequests[e] = a.defer(), this._getTokenRequests[e].promise.then(this._verifyToken.bind(this)).then(t)
    }, _.prototype._verifyToken = function (t) {
        return this._client ? this._client.request("@webgate/melody/v1/check_scope?scope=web-playback", {
            authorize: !1,
            headers: {
                Authorization: "Bearer " + t
            }
        }).then(function (e) {
            return 403 === e.status && this._sendMessage(r.authError({
                message: "Invalid token scopes."
            })), t
        }.bind(this)).catch(function () {
            return t
        }) : a.resolve(t)
    }, _.prototype._handleMessages = function (t, e, i) {
        t in this._messageHandlers && this._messageHandlers[t](e, i)
    }, _.prototype._onAuthError = function () {
        this._sendMessage(r.authError({
            message: "Authentication failed"
        }))
    }, _.prototype._playbackControl = function (t, e) {
        this._streamer[t](e).catch(function (t) {
            this._sendMessage(r.playbackError({
                message: t.message
            }))
        }.bind(this))
    }, _.prototype._onPause = function () {
        return this._playbackControl("pause")
    }, _.prototype._onResume = function () {
        return this._playbackControl("resume")
    }, _.prototype._onTogglePlay = function () {
        return this._playbackControl("togglePlay")
    }, _.prototype._onSeek = function (t) {
        return this._playbackControl("seek", t)
    }, _.prototype._onPrevTrack = function (t) {
        return this._playbackControl("previousTrack", t)
    }, _.prototype._onNextTrack = function (t) {
        return this._playbackControl("nextTrack", t)
    }, _.prototype._onPlayerInitError = function () {
        this._sendMessage(r.playerInitError({
            message: "Failed to initialize player"
        }))
    }, _.prototype._onClientError = function (t) {
        "listplayer" !== t.source && "playback" !== t.source || this._sendMessage(r.playbackError({
            message: "Playback error"
        }))
    }, _.prototype._sendMessage = function (t) {
        return this._msgDispatcher.send(this._loaderWindow, t)
    }, t.exports = _
}, function (t, e, i) {
    "use strict";
    var n = i(18),
        r = function () {
            this._onMessageCallback = function () {}, this._receiveMessage = this._receiveMessage.bind(this), this._messageId = 0
        };
    r.prototype.listen = function (t, e) {
        this._onMessageCallback = e, t.addEventListener("message", this._receiveMessage)
    }, r.prototype.stopListening = function (t) {
        t.removeEventListener("message", this._receiveMessage)
    }, r.prototype.send = function (t, e, i) {
        return t.postMessage(this._addMessageId(e), i || "*"), e.seq
    }, r.prototype._addMessageId = function (t) {
        return t.seq = this._messageId++, t
    }, r.prototype._receiveMessage = function (t) {
        var e = t.data;
        e.type === n.SPOTIFY_MESSAGE && e.body && e.body.topic && this._onMessageCallback(e.body.topic, e.body.data, e.seq)
    }, t.exports = r
}, function (t, e, i) {
    "use strict";
    (function (e) {
        function n(t) {
            if (!t || "function" != typeof t.getToken) throw new TypeError("options.getToken must be a function");
            this._clientDescriptor = null, this._transport = null, this._abbaClient = null, this._systemInfo = s.defer(), this._sdkVersion = g, this._logger = null, this.emitEvent = this.emitEvent.bind(this), this._init(t)
        }
        var r = i(2),
            s = i(0),
            o = i(3),
            a = i(44),
            _ = i(58),
            c = i(59),
            u = i(5),
            h = i(60),
            d = i(11),
            p = i(24),
            l = i(8),
            E = i(61),
            f = i(65),
            T = i(66),
            y = i(67),
            m = i(68),
            R = i(14),
            S = i(69),
            g = i(26),
            A = u.forTag("harmonyclient"),
            I = e.navigator;
        r(n, o), n.create = function (t) {
            return new n(t)
        }, n.of = function (t) {
            return t._client
        }, n.prototype._parseDeviceInfo = function (t, e) {
            var i = y(I.userAgent, I.platform),
                n = e.capabilities || {},
                r = {
                    change_volume: !("change_volume" in n) || n.change_volume,
                    audio_podcasts: !("audio_podcasts" in n) || n.audio_podcasts,
                    endsong_snooping: n.endsong_snooping,
                    enable_play_token: !0,
                    disable_connect: t,
                    video_playback: n.video_playback,
                    manifest_formats: ["file_urls_mp3"]
                };
            e.nameTemplate && (e.name = e.nameTemplate.replace(/\{\{([^}]+?)\}\}/g, function (t, e) {
                return e in i ? i[e] : ""
            }));
            var s = e.metadata || {};
            s.disable_connect_api_compat = "true";
            var o = {
                    id: f.get(e.id, e.randomizeId),
                    model: e.model || ["harmony-", i.name, ".", i.version, "-", i.platform || "unknown"].join("").toLowerCase(),
                    name: e.name || m(["Spotify (", i.name, "/", i.platform || "unknown", ")"].join("")),
                    type: e.type || h.COMPUTER,
                    brand: e.brand || "SpotifyHarmonyGeneric",
                    platform_identifier: e.platform_identifier,
                    metadata: s,
                    capabilities: r
                },
                a = e.platform_identifier || ["Partner", o.brand, o.model].join(" ");
            return this._systemInfo.resolve(a), o
        }, n.prototype._init = function (t) {
            this._initDeviceDescriptor(t), this._initTransport(t), this._initLogger()
        }, n.prototype._initLogger = function () {
            this._logger = new E({
                transport: this._transport,
                platform: this._systemInfo.promise,
                sdkId: this.getSDKId()
            })
        }, n.prototype._initDeviceDescriptor = function (t) {
            this._clientDescriptor = s.resolve(t.descriptor || {}).then(this._parseDeviceInfo.bind(this, t.hidden)).catch(function (t) {
                this._onError(p.HARMONY, {
                    error: t
                })
            }.bind(this))
        }, n.prototype._initTransport = function (t) {
            var e = T(t.xresolve),
                i = a({
                    providers: {
                        endpoints: function (i) {
                            return e(i).then(function (e) {
                                var i = t.endpoints;
                                if (i)
                                    for (var n in i) i.hasOwnProperty(n) && i[n] && (e[n] = i[n]);
                                return e
                            })
                        },
                        token: function () {
                            return new s(function (e) {
                                t.getToken(function (t, i) {
                                    if (void 0 !== i) return void e([t, i]);
                                    e(t)
                                })
                            })
                        }
                    },
                    requestMode: t.requestMode || "fetch",
                    reconnectionRetries: t.reconnectionRetries,
                    forcePolyfillTypes: t.forcePolyfillTypes,
                    systemInfo: this._systemInfo.promise,
                    sdkId: this.getSDKId()
                });
            i.on(l.TRANSPORT_AUTHENTICATED, this.emitEvent), i.on(l.TRANSPORT_RECONNECTING, this.emitEvent), i.on(l.TRANSPORT_RECONNECTED, this.emitEvent), i.on(l.TRANSPORT_CONNECTED, this._onConnected.bind(this)), i.on(l.TRANSPORT_CONNECTION_FAILED, this._onConnectionError.bind(this)), i.on(l.TRANSPORT_AUTHENTICATION_FAILED, this._onAuthenticationError.bind(this)), i.on(l.TRANSPORT_SHORT_SESSION_DISCONNECTED, this._onShortSessionDisconnect.bind(this)), this._transport = i, this._abbaClient = _.forSession(i);
            var n = c.create({
                transport: i
            });
            n.on(d.PRODUCT_STATE_OBSERVER_PRODUCT_STATE_CHANGED, this.emitEvent), this.on(d.CLIENT_BEFORE_DISCONNECT, function (t) {
                t && t.waiters.push(n.deregister().catch(function () {}))
            }), this._productStateObserver = n
        }, n.prototype._onError = function (t, e) {
            this.emit(d.CLIENT_ERROR, {
                source: t,
                name: e.name,
                error: e.error
            }), e.error && e.error.unrecoverable && this.emit(d.CLIENT_UNRECOVERABLE_FAILURE, {
                source: t,
                name: e.name,
                error: e.error
            })
        }, n.prototype._onConnected = function () {
            this.emit(d.CLIENT_CONNECTED), this._transport.authenticate().catch(function () {})
        }, n.prototype._onConnectionError = function (t) {
            var e = t && t.error ? t.error : t;
            this._onError(p.TRANSPORT, {
                error: e
            }), this.emit(d.CLIENT_CONNECTION_ERROR, t)
        }, n.prototype._onAuthenticationError = function (t) {
            var e = t && t.error ? t.error : t;
            this._onError(p.TRANSPORT, {
                error: e
            }), this.emit(d.CLIENT_AUTHENTICATION_ERROR, e)
        }, n.prototype._onShortSessionDisconnect = function (t) {
            this._logger.logClientEvent({
                source: "transport",
                source_version: g.tagged,
                source_vendor: "spotify",
                event: t.type,
                event_version: "1.0.0",
                json_data: {
                    disconnectCount: t.disconnectCount,
                    sessionLength: t.sessionLength
                }
            }).catch(function (e) {
                A.warn(t.type + " Logging Error", e)
            })
        }, n.prototype.getVersionDescriptor = function () {
            return this._sdkVersion
        }, n.prototype.getSDKId = function () {
            return "harmony:" + this._sdkVersion.tagged
        }, n.prototype.getLogger = function () {
            return this._logger
        }, n.prototype.logAppMetrics = function (t, e) {
            return this._logger.logMetrics(t, e)
        }, n.prototype.request = function (t, e) {
            return this._transport.request(t, e)
        }, n.prototype.getPublicTransport = function () {
            return this._transport.toPublic()
        }, n.prototype.getABBAClient = function () {
            return this._abbaClient
        }, n.prototype.getClientDescriptor = function () {
            return this._clientDescriptor
        }, n.prototype.getUserInfo = function () {
            return this._transport.request("https://@webapi/v1/me", {
                responseType: "json"
            }).then(function (t) {
                var e = t.body;
                if (200 !== t.status) {
                    var i = new S(R.USER_INFO_REQUEST_FAILED_WITH_STATUS, "User info request failed with status " + t.status);
                    return i.status = t.status, s.reject(i)
                }
                return e ? {
                    display_name: e.display_name,
                    followers: e.followers,
                    id: e.id,
                    images: e.images,
                    uri: e.uri
                } : s.reject(new S(R.USER_INFO_REQUEST_EMPTY_RESPONSE, "Unexpected empty response."))
            })
        }, n.prototype.getProductState = function () {
            return this._productStateObserver.getCurrentState()
        }, n.prototype.connect = function () {
            return this._transport.connect()
        }, n.prototype.disconnect = function () {
            var t = this._transport,
                e = t.isConnected() ? d.CLIENT_BEFORE_DISCONNECT : d.CLIENT_BEFORE_OFFLINE_DISCONNECT,
                i = [];
            return this.emitSync(e, {
                waiters: i
            }), s.all(i).then(function () {
                return t.disconnect()
            }).then(function () {
                return !0
            })
        }, n.prototype.notifyError = function (t, e, i) {
            this._onError(t, {
                name: e,
                error: i
            })
        }, t.exports = n
    }).call(e, i(1))
}, function (t, e, i) {
    (function (e) {
        ! function () {
            "use strict";

            function i() {
                if (u = window.location.origin || window.location.protocol + "//" + window.location.hostname, c = window.postMessage.bind(window, "@execute_deferreds", u), !window.__hasDeferredHandler) {
                    _ ? Object.defineProperty(window, "__hasDeferredHandler", {
                        value: 1
                    }) : window.__hasDeferredHandler = 1;
                    var t = function (t) {
                        t.origin != u && "@execute_deferreds" != t.data || o()
                    };
                    window.addEventListener ? window.addEventListener("message", t) : window.attachEvent("onmessage", t)
                }
            }

            function n() {
                c = e.bind(null, o)
            }

            function r() {
                c = setTimeout.bind(null, o, 10)
            }

            function s() {
                a && window.postMessage ? i() : void 0 !== e ? n() : r()
            }

            function o() {
                var t = h.splice(0);
                if (t.length)
                    for (var e = 0, i = t.length; e < i; e++) try {
                        t[e]()
                    } finally {}
            }
            var a = "undefined" != typeof window,
                _ = "function" == typeof Object.defineProperty;
            if (a && window.__modDefFn) return void(t.exports = window.__modDefFn);
            var c, u, h = [];
            s();
            var d = function (t) {
                var e = !h.length;
                h.push(t), e && c()
            };
            a && !window.__modDefFn && (_ ? Object.defineProperty(window, "__modDefFn", {
                value: d
            }) : window.__modDefFn = d), d.use = {
                auto: s,
                dom: i,
                immediate: n,
                timeout: r
            }, t.exports = d
        }()
    }).call(e, i(41).setImmediate)
}, function (t, e, i) {
    function n(t, e) {
        this._id = t, this._clearFn = e
    }
    var r = Function.prototype.apply;
    e.setTimeout = function () {
        return new n(r.call(setTimeout, window, arguments), clearTimeout)
    }, e.setInterval = function () {
        return new n(r.call(setInterval, window, arguments), clearInterval)
    }, e.clearTimeout = e.clearInterval = function (t) {
        t && t.close()
    }, n.prototype.unref = n.prototype.ref = function () {}, n.prototype.close = function () {
        this._clearFn.call(window, this._id)
    }, e.enroll = function (t, e) {
        clearTimeout(t._idleTimeoutId), t._idleTimeout = e
    }, e.unenroll = function (t) {
        clearTimeout(t._idleTimeoutId), t._idleTimeout = -1
    }, e._unrefActive = e.active = function (t) {
        clearTimeout(t._idleTimeoutId);
        var e = t._idleTimeout;
        e >= 0 && (t._idleTimeoutId = setTimeout(function () {
            t._onTimeout && t._onTimeout()
        }, e))
    }, i(42), e.setImmediate = setImmediate, e.clearImmediate = clearImmediate
}, function (t, e, i) {
    (function (t, e) {
        ! function (t, i) {
            "use strict";

            function n(t) {
                "function" != typeof t && (t = new Function("" + t));
                for (var e = new Array(arguments.length - 1), i = 0; i < e.length; i++) e[i] = arguments[i + 1];
                var n = {
                    callback: t,
                    args: e
                };
                return c[_] = n, a(_), _++
            }

            function r(t) {
                delete c[t]
            }

            function s(t) {
                var e = t.callback,
                    n = t.args;
                switch (n.length) {
                    case 0:
                        e();
                        break;
                    case 1:
                        e(n[0]);
                        break;
                    case 2:
                        e(n[0], n[1]);
                        break;
                    case 3:
                        e(n[0], n[1], n[2]);
                        break;
                    default:
                        e.apply(i, n)
                }
            }

            function o(t) {
                if (u) setTimeout(o, 0, t);
                else {
                    var e = c[t];
                    if (e) {
                        u = !0;
                        try {
                            s(e)
                        } finally {
                            r(t), u = !1
                        }
                    }
                }
            }
            if (!t.setImmediate) {
                var a, _ = 1,
                    c = {},
                    u = !1,
                    h = t.document,
                    d = Object.getPrototypeOf && Object.getPrototypeOf(t);
                d = d && d.setTimeout ? d : t, "[object process]" === {}.toString.call(t.process) ? function () {
                    a = function (t) {
                        e.nextTick(function () {
                            o(t)
                        })
                    }
                }() : function () {
                    if (t.postMessage && !t.importScripts) {
                        var e = !0,
                            i = t.onmessage;
                        return t.onmessage = function () {
                            e = !1
                        }, t.postMessage("", "*"), t.onmessage = i, e
                    }
                }() ? function () {
                    var e = "setImmediate$" + Math.random() + "$",
                        i = function (i) {
                            i.source === t && "string" == typeof i.data && 0 === i.data.indexOf(e) && o(+i.data.slice(e.length))
                        };
                    t.addEventListener ? t.addEventListener("message", i, !1) : t.attachEvent("onmessage", i), a = function (i) {
                        t.postMessage(e + i, "*")
                    }
                }() : t.MessageChannel ? function () {
                    var t = new MessageChannel;
                    t.port1.onmessage = function (t) {
                        o(t.data)
                    }, a = function (e) {
                        t.port2.postMessage(e)
                    }
                }() : h && "onreadystatechange" in h.createElement("script") ? function () {
                    var t = h.documentElement;
                    a = function (e) {
                        var i = h.createElement("script");
                        i.onreadystatechange = function () {
                            o(e), i.onreadystatechange = null, t.removeChild(i), i = null
                        }, t.appendChild(i)
                    }
                }() : function () {
                    a = function (t) {
                        setTimeout(o, 0, t)
                    }
                }(), d.setImmediate = n, d.clearImmediate = r
            }
        }("undefined" == typeof self ? void 0 === t ? this : t : self)
    }).call(e, i(1), i(12))
}, function (t, e, i) {
    "use strict";

    function n(t, e) {
        if (this.type = t, e)
            for (var i in e) e.hasOwnProperty(i) && "type" != i && (this[i] = e[i]);
        r ? (Object.defineProperty(this, "_prevented", s), Object.defineProperty(this, "_stopped", s), Object.defineProperty(this, "_immediateStopped", s), Object.defineProperty(this, "defaultPrevented", {
            get: function () {
                return this._prevented
            }.bind(this),
            set: function (t) {
                return t
            }
        })) : (this.defaultPrevented = !1, this._prevented = !1, this._stopped = !1, this._immediateStopped = !1)
    }
    var r = "function" == typeof Object.defineProperty,
        s = {
            value: !1,
            writable: !0
        };
    n.wasPropagationStopped = function (t) {
        return !!t._stopped
    }, n.wasImmediatePropagationStopped = function (t) {
        return !!t._immediateStopped
    }, n.prototype.preventDefault = function () {
        this._prevented = !0, r || (this.defaultPrevented = !0)
    }, n.prototype.stopPropagation = function () {
        this._stopped = !0
    }, n.prototype.stopImmediatePropagation = function () {
        this._immediateStopped = !0
    }, t.exports = n
}, function (t, e, i) {
    "use strict";
    var n = i(45);
    t.exports = n.create
}, function (t, e, i) {
    "use strict";
    (function (e) {
        function n(t) {
            if (!t) throw new TypeError("Argument `config` for Transport cannot be null.");
            if (!t.providers) throw new TypeError("Argument `config.providers` for Transport cannot be null.");
            _.call(this), this._tokenProvider = t.providers.token, this._endpointsProvider = t.providers.endpoints, this._reconnectionRetries = "reconnectionRetries" in t ? t.reconnectionRetries : 3, this._requestMode = t.requestMode in v ? t.requestMode : "xhr", this._forcePolyfillTypes = t.forcePolyfillTypes || {}, this._activated = !1, this._dealer = null, this._connectionObserver = null, this._endpoints = null, this._lastToken = null, this._lastTokenExpiry = 0, this._refreshTokenPromise = null, this._authenticationPromise = !1, this._reconnectTimeout = null, this._isReconnecting = !1, this._initTime = 0, this._lastDisconnect = 0, this._stateMask = 0, this._quickDisconnectCount = 0, this._counter = new a(t.backoffStrategy || {
                algo: "exp",
                baseTime: 5e3
            }), this._onAuthenticated = this._onAuthenticated.bind(this), this._onAuthenticationFailed = this._onAuthenticationFailed.bind(this), this._parseProvidedToken = this._parseProvidedToken.bind(this), this._init()
        }
        var r = i(2),
            s = i(46),
            o = i(47),
            a = i(20),
            _ = i(3),
            c = i(0),
            u = i(48),
            h = i(49),
            d = i(51),
            p = i(52),
            l = i(23),
            E = i(55),
            f = i(13),
            T = i(9),
            y = i(21),
            m = i(8),
            R = i(22),
            S = i(5).forTag("transport.transport"),
            g = /^(?:https?:\/\/)?@([^\/]+)\//,
            A = /^(ws|http)s?:\/\/.*[^\/]$/,
            I = {
                CONNECTED: 1,
                AUTHENTICATED: 4
            },
            v = {
                fetch: !0,
                xhr: !0
            };
        r(n, _), n.create = function (t) {
            return new n(t)
        }, n.prototype._init = function () {
            "fetch" !== this._requestMode || E.isSupported() || (S.warn('Default "fetch" request mode unavailable; Fallback to "xhr"'), this._requestMode = "xhr");
            var t = new h;
            this._dealer = t, t.on(m.DEALER_DISCONNECTED, this._onDealerDisconnected.bind(this)), this._dealerHeartbeat = new d(function (t) {
                return this.ping().then(function () {
                    return t
                })
            }.bind(this._dealer), 1e4), this.proxyEmit(t, m.DEALER_CONNECTION_ID, m.TRANSPORT_CONNECTION_ID), this.proxyEmitSync(t, m.DEALER_MESSAGE, m.INTERNAL_DEALER_MESSAGE);
            var e = new p;
            this._connectionObserver = e, e.on(m.CONNECTION_ONLINE, this._onOnline.bind(this)), e.on(m.CONNECTION_OFFLINE, this._onOffline.bind(this))
        }, n.prototype._onDealerDisconnected = function (t) {
            var e = Date.now(),
                i = e - this._lastDisconnect;
            if (this._disconnect(!0), t.wsCode === R) return void(this._quickDisconnectCount = 0);
            this._connectionObserver.isOnline() && (i < 5e3 ? (this._reconnectTimeout && (clearTimeout(this._reconnectTimeout), this._quickDisconnectCount++, this.emit(m.TRANSPORT_SHORT_SESSION_DISCONNECTED, {
                disconnectCount: this._quickDisconnectCount,
                sessionLength: i
            })), this._reconnectTimeout = setTimeout(this._tryToReconnect.bind(this), this._counter.getTime(this._quickDisconnectCount))) : (this._quickDisconnectCount = 0, this._lastDisconnect = e, this._tryToReconnect()))
        }, n.prototype._onAuthenticated = function () {
            return clearTimeout(this._reconnectTimeout), this._authenticationPromise = null, this._stateMask |= I.AUTHENTICATED, this._initTime = Date.now(), this._dealerHeartbeat.start(), this.emit(m.TRANSPORT_AUTHENTICATED), c.resolve(!0)
        }, n.prototype._onAuthenticationFailed = function (t) {
            return this._authenticationPromise = null, this._stateMask &= ~I.AUTHENTICATED, this.emit(m.TRANSPORT_AUTHENTICATION_FAILED, {
                error: t.error
            }), c.reject(t.error)
        }, n.prototype._onOffline = function () {
            this._disconnect(!0)
        }, n.prototype._onOnline = function () {
            this._activated && this._tryToReconnect()
        }, n.prototype._tryToReconnect = function () {
            if (this._reconnectionRetries < 0) return this._isReconnecting = !1, void this.emit(m.TRANSPORT_DISCONNECTED);
            if (!this._isReconnecting) {
                this._stateMask = 0;
                var t = function () {
                    return this._isReconnecting = !0, this.emit(m.TRANSPORT_RECONNECTING), this._disconnect(!0), this._connect().then(function () {
                        return this.authenticate()
                    }.bind(this)).then(function () {
                        return this._isReconnecting = !1, this.emit(m.TRANSPORT_RECONNECTED), !0
                    }.bind(this))
                }.bind(this);
                o.init(t, {
                    baseTime: 1e3,
                    maxTime: 15e3,
                    maxRetries: this._reconnectionRetries
                }).catch(function () {
                    this._stateMask = 0, this._isReconnecting = !1, this.emit(m.TRANSPORT_DISCONNECTED)
                }.bind(this))
            }
        }, n.prototype._connect = function () {
            return this._stateMask & I.CONNECTED ? c.resolve(!1) : this._connectionObserver.isOnline() ? this._performConnect() : new c(function (t, e) {
                this._connectionObserver.once(m.CONNECTION_ONLINE, function () {
                    this._performConnect().then(t, e)
                }.bind(this))
            }.bind(this))
        }, n.prototype._performConnect = function () {
            return this._endpointsProvider(this.toPublic()).then(this._connectToEndpoints.bind(this)).catch(function (t) {
                var e = t && t.error ? t.error : t;
                return this.emit(m.TRANSPORT_CONNECTION_FAILED, {
                    error: e
                }), c.reject(e)
            }.bind(this))
        }, n.prototype._connectToEndpoints = function (t) {
            var e = {};
            for (var i in t)
                if (t.hasOwnProperty(i) && t[i]) {
                    var n = t[i];
                    A.test(n) && (n += "/"), e[i] = n
                }
            this._endpoints = e;
            var r = function () {
                return this._stateMask |= I.CONNECTED, this.emit(m.TRANSPORT_CONNECTED), c.resolve(!0)
            }.bind(this);
            return t.dealer ? this._dealer.connect(e.dealer).then(r) : r()
        }, n.prototype._disconnect = function (t) {
            this._stateMask = 0, this._dealer.disconnect(), this._dealerHeartbeat.stop(), t || this.emit(m.TRANSPORT_DISCONNECTED)
        }, n.prototype._refreshToken = function (t) {
            if (!this._refreshTokenPromise) {
                if (!t && Date.now() < this._lastTokenExpiry) return c.resolve(this._lastToken);
                this._refreshTokenPromise = this._tokenProvider().then(this._parseProvidedToken)
            }
            return this._refreshTokenPromise
        }, n.prototype._parseProvidedToken = function (t) {
            var e, i;
            if (Array.isArray(t) ? (e = t[0], i = parseInt(t[1] || 3540, 10)) : (e = t, i = 3540), !e) throw new TypeError("Token provider returned an invalid token: " + e);
            return this._refreshTokenPromise = null, this._lastToken = e, this._lastTokenExpiry = Date.now() + 1e3 * i, this.emit(m.TRANSPORT_ACCESS_TOKEN, {
                token: e
            }), e
        }, n.prototype._authenticateWithToken = function (t) {
            return this._endpoints.dealer ? this._dealer.authenticate(t) : c.resolve(!0)
        }, n.prototype._tryExpandSpecialURL = function (t) {
            var e = this._endpoints;
            return t.replace(g, function (t, i) {
                if (!e.hasOwnProperty(i)) throw new TypeError("Cannot replace endpoint @" + i + "; Endpoint undefined.");
                return e[i]
            })
        }, n.prototype._processRequestArgs = function (t, e) {
            return new c(function (i) {
                var n = t,
                    r = e || {},
                    o = {
                        algo: "exp",
                        maxRetries: 2
                    };
                g.test(n) && (n = this._tryExpandSpecialURL(n), "authorize" in r || (r.authorize = !0)), r.forcePolyfill = r.responseType in this._forcePolyfillTypes, r.requestMode || (r.requestMode = this._requestMode), "retry" in r && s(o, r.retry), i({
                    url: n,
                    args: r,
                    backoffStrategy: o
                })
            }.bind(this))
        }, n.prototype._setAuthHeader = function (t, e) {
            if (!t.authorize) return c.resolve(t);
            var i = function () {
                return this._refreshToken(e).then(function (e) {
                    return t.headers || (t.headers = {}), t.headers.Authorization = "Bearer " + e, t
                })
            }.bind(this);
            return this._stateMask & I.AUTHENTICATED ? i() : new c(function (t, e) {
                this.once("authenticated", function () {
                    i().then(t, e)
                })
            }.bind(this))
        }, n.prototype._sendRetriedRequest = function (t) {
            var e = t.backoffStrategy,
                i = !1,
                n = function () {
                    return this._setAuthHeader(t.args, i)
                }.bind(this),
                r = this._connectionObserver,
                s = function () {
                    var s = null;
                    return s = r.isOnline() ? n() : new c(function (e, i) {
                        if (t.args.allowOffline) return void n().then(e, i);
                        r.on(m.CONNECTION_ONLINE, function () {
                            n().then(e, i)
                        })
                    }), s.then(function () {
                        return "fetch" === t.args.requestMode && E.isSupported() ? E.request(t.url, t.args) : l.request(t.url, t.args)
                    }).then(function (n) {
                        return n.status !== T.UNAUTHORIZED || t.args.ignoreUnauthorized ? "function" == typeof e.condition && e.condition(n, y) ? c.reject(n) : n : (i = !0, c.reject(n))
                    })
                };
            return o.init(s, e).catch(this._handleRetriedRequestError)
        }, n.prototype._handleRetriedRequestError = function (t) {
            return t instanceof f ? c.resolve(t) : c.reject(t)
        }, n.prototype._sendFireAndForgetRequest = function (t) {
            return "function" == typeof e.fetch ? e.fetch(t, {
                mode: "no-cors"
            }).catch(function () {}) : e.Image ? (new e.Image).src = t : this.request(t, {
                requestMode: "xhr",
                method: "GET",
                authorize: !1,
                ignoreResponseBody: !0
            }), c.resolve(new f(t, 0))
        }, n.prototype._sendRequest = function (t, e) {
            return this._processRequestArgs(t, e).then(function (t) {
                return t.args.forget ? this._sendFireAndForgetRequest(t.url) : this._sendRetriedRequest(t)
            }.bind(this))
        }, n.prototype.getInitTime = function () {
            return this._initTime
        }, n.prototype.getConnectionId = function () {
            return this._dealer.getConnectionId()
        }, n.prototype.isConnected = function () {
            return !!(this._stateMask & I.CONNECTED)
        }, n.prototype.forceTokenRefresh = function () {
            return this._refreshToken(!0).then(function () {
                return !0
            })
        }, n.prototype.connect = function () {
            return this._activated = !0, this._connect()
        }, n.prototype.disconnect = function () {
            return this._activated = !1, this._disconnect(), c.resolve(!0)
        }, n.prototype.authenticate = function () {
            return this._authenticationPromise || (this._authenticationPromise = o.init(function () {
                return this._refreshToken(!0).then(this._authenticateWithToken.bind(this))
            }.bind(this), {
                algo: "exp",
                maxRetries: 2,
                baseTime: 500
            }).then(this._onAuthenticated).catch(this._onAuthenticationFailed)), this._authenticationPromise
        }, n.prototype.request = function (t, e) {
            var i = this._sendRequest.bind(this, t, e);
            return this._connectionObserver.isOnline() && (!g.test(t) || this._stateMask & I.CONNECTED) ? i() : new c(function (t, e) {
                this.once("connected", function () {
                    i().then(t, e)
                })
            }.bind(this))
        }, n.prototype.matchMessages = function (t, e) {
            if (!t) throw new TypeError('Dealer message "matcher" cannot be null.');
            if ("function" != typeof e) throw new TypeError("Dealer message callback cannot be null.");
            var i = function (i) {
                var n = i.data;
                n.uri && n.uri.match(t) && e(n)
            };
            i.__matchMessagesExp = t, e.__matchMessagesWrapper = i, this.on(m.INTERNAL_DEALER_MESSAGE, i)
        }, n.prototype.unmatchMessages = function (t, e) {
            if ("function" != typeof e) throw new TypeError("Dealer message callback cannot be null.");
            var i = e.__matchMessagesWrapper;
            return i.__matchMessagesExp === t && (this.removeListener(m.INTERNAL_DEALER_MESSAGE, i), !0)
        }, n.prototype.toPublic = function () {
            return new u(this)
        }, t.exports = n
    }).call(e, i(1))
}, function (t, e, i) {
    "use strict";
    var n = function (t, e) {
        for (var i, n = 1; n < arguments.length; n++)
            if (i = arguments[n])
                for (var r in i) i.hasOwnProperty(r) && (t[r] = i[r]);
        return t
    };
    t.exports = n
}, function (t, e, i) {
    "use strict";

    function n(t, e) {
        var i = e || {};
        this._fn = t, this._resolver = s.defer(), this._maxDuration = i.maxDuration || r.maxDuration, this._maxRetries = i.maxRetries || r.maxRetries, this._maxTime = i.maxTime || r.maxTime, this._retryPredicate = i.retryPredicate || r.retryPredicate, this._ts = 0, this._retries = 0, this._tickInterval = null, this._isRunning = !1, this._counter = new o({
            algo: i.algo,
            baseTime: i.baseTime
        }), this._tick = this._tick.bind(this)
    }
    var r = i(19).backoffDefaults,
        s = i(0),
        o = i(20),
        a = Array.prototype.slice;
    n.init = function (t, e) {
        return new n(t, e).start()
    }, n.prototype.getResolver = function () {
        return this._resolver.promise
    }, n.prototype.start = function (t) {
        return !this._fn && t && (this._fn = t), this._isRunning || (this._ts = Date.now(), this._tick(), this._isRunning = !0), this._resolver.promise
    }, n.prototype.stop = function () {
        clearTimeout(this._tickInterval), this._isRunning = !1, this._destroy()
    }, n.prototype._destroy = function () {
        this._fn = null, this._resolver = null
    }, n.prototype._failure = function (t) {
        var e = this._counter.getTime(this._retries),
            i = Date.now() - this._ts + e;
        this._retries < this._maxRetries && e < this._maxTime && i < this._maxDuration && this._retryPredicate(t) ? (this._retries++, this._tickInterval = setTimeout(this._tick, e)) : (this._resolver.reject(t), this._destroy())
    }, n.prototype._success = function () {
        this._resolver.resolve.apply(null, a.call(arguments)), this._destroy()
    }, n.prototype._tick = function () {
        this._fn().then(this._success.bind(this)).catch(this._failure.bind(this))
    }, t.exports = n
}, function (t, e, i) {
    "use strict";

    function n(t) {
        s.call(this), this.request = t.request.bind(t), this.getInitTime = t.getInitTime.bind(t), this.matchMessages = t.matchMessages.bind(t), this.proxyEmit(t, o.TRANSPORT_CONNECTION_ID, this.EVENT_CONNECTION_ID)
    }
    var r = i(2),
        s = i(3),
        o = i(8),
        a = i(9),
        _ = i(21);
    r(n, s), n.prototype.EVENT_CONNECTION_ID = "connection_id", n.prototype.StatusCode = a, n.prototype.StatusFamily = _, t.exports = n
}, function (t, e, i) {
    "use strict";
    (function (e) {
        function n() {
            s.call(this), this._socket = null, this._lastPingDeferred = null, this._waitingForConnectionId = !0, this._connectionId = null
        }
        var r = i(2),
            s = i(3),
            o = i(0),
            a = i(8),
            _ = i(10),
            c = i(50),
            u = i(22),
            h = /hm:\/\/pusher\/(?:[^]+)?\/connections\/([^]+)/;
        r(n, s), n.create = function () {
            return new n
        }, n.prototype._prepareConnectionId = function (t) {
            if (!t.uri) return !1;
            var e = t.uri.match(h);
            if (!e) return !1;
            var i = this._connectionId = decodeURIComponent(e[1]);
            return this.emit(a.DEALER_CONNECTION_ID, {
                id: i,
                uri: t.uri
            }), !0
        }, n.prototype._parseMessage = function (t) {
            var e;
            try {
                e = JSON.parse(t)
            } catch (t) {
                return
            }
            this._waitingForConnectionId && this._prepareConnectionId(e) ? this._waitingForConnectionId = !1 : "pong" === e.type && this._lastPingDeferred ? (this._lastPingDeferred.resolve(!0), this._lastPingDeferred = null) : "message" === e.type && this.emit(a.DEALER_MESSAGE, {
                data: e
            })
        }, n.prototype._handleOpen = function (t) {
            t.resolve(!0), this._connected = !0, this.emit(a.DEALER_AUTHENTICATED)
        }, n.prototype._handleMessage = function (t) {
            var i = this,
                n = t.data;
            if (e.Blob && n instanceof e.Blob) {
                var r = new e.FileReader;
                r.onloadend = function () {
                    i._parseMessage(this.result)
                }, r.readAsText(n)
            } else e.Buffer && e.ArrayBuffer && n instanceof e.ArrayBuffer ? this._parseMessage(new e.Buffer(n).toString("ascii")) : this._parseMessage(n)
        }, n.prototype._handleClose = function (t) {
            var e = this._connected;
            if (this._connected = !1, !e) {
                var i = new c(_.DEALER_AUTHENTICATION_FAILED, "Dealer connection error", t);
                return void this.emit(a.DEALER_AUTHENTICATION_FAILED, {
                    error: i
                })
            }
            this.emitSync(a.DEALER_DISCONNECTED, {
                wsCode: t.code,
                reason: t.reason
            })
        }, n.prototype._handleError = function (t) {
            var e = new c(_.DEALER_CONNECTION_ERROR, "Cannot connect to dealer");
            t.reject(e), this._connected = !1, this.emit(a.DEALER_ERROR, {
                error: e
            })
        }, n.prototype.connect = function (t) {
            return this._endpoint = t, this._waitingForConnectionId = !0, this.emit(a.DEALER_CONNECTED), o.resolve(!0)
        }, n.prototype.authenticate = function (t) {
            var e = o.defer(),
                i = this._endpoint + "?access_token=" + t,
                n = this._socket = new WebSocket(i);
            return n.onopen = this._handleOpen.bind(this, e), n.onclose = this._handleClose.bind(this), n.onerror = this._handleError.bind(this, e), n.onmessage = this._handleMessage.bind(this), e.promise
        }, n.prototype.disconnect = function () {
            this._socket && (this._waitingForConnectionId = !0, this._connected = !1, this._socket.close(u, "internal-close"), this._socket.onopen = null, this._socket.onerror = null, this._socket.onmessage = null, this._socket.onclose = null, this._socket = null, this.emitSync("disconnected", {
                wsCode: u,
                reason: "internal-close"
            }))
        }, n.prototype.ping = function () {
            return this._socket && 1 === this._socket.readyState ? (this._lastPingDeferred = o.defer(), this._socket.send('{"type":"ping"}'), this._lastPingDeferred.promise) : o.reject(new c(_.DEALER_CONNECTION_ERROR, "Dealer connection error"))
        }, n.prototype.getConnectionId = function () {
            return this._waitingForConnectionId ? new o(function (t) {
                this.once("connection_id", function (e) {
                    t(e.id)
                })
            }.bind(this)) : o.resolve(this._connectionId)
        }, t.exports = n
    }).call(e, i(1))
}, function (t, e, i) {
    "use strict";

    function n(t, e, i) {
        Error.call(this, t);
        var n = i || {};
        this.code = t || r.DEALER_ERROR, this.raw = n, this.wsReason = n.reason || null, this.wsCode = n.code || null
    }
    var r = i(10);
    n.prototype = new Error, n.prototype.constructor = n, n.prototype.name = "DealerError", t.exports = n
}, function (t, e, i) {
    "use strict";

    function n(t, e, i) {
        if ("function" != typeof t) throw new TypeError("Argument monitorFn is not a function.");
        s.call(this), this._monitorFn = t, this._timeout = e, this._interval = void 0 !== i ? i : o, this._monitorTimeout = null, this._timeoutTimeout = null, this._heartbeatToken = null, this._monitor = this._monitor.bind(this), this._onHeartbeatResponse = this._onHeartbeatResponse.bind(this), this._onHeartbeatError = this._onHeartbeatError.bind(this)
    }
    var r = i(2),
        s = i(3),
        o = 3e4;
    r(n, s), n.prototype._monitor = function () {
        this._heartbeatToken = Date.now().toString(10), this._monitorFn(this._heartbeatToken).then(this._onHeartbeatResponse, this._onHeartbeatError);
        var t = this._timeout;
        t && t > 0 && (this._timeoutTimeout = setTimeout(this._onHeartbeatError, t))
    }, n.prototype._onHeartbeatResponse = function (t) {
        if (clearTimeout(this._timeoutTimeout), t !== this._heartbeatToken) return this.stop(), void this.emit("failed");
        this._monitorTimeout = setTimeout(this._monitor, this._interval)
    }, n.prototype._onHeartbeatError = function () {
        this.stop(), this.emit("failed")
    }, n.prototype.start = function () {
        this._monitor()
    }, n.prototype.stop = function () {
        clearTimeout(this._monitorTimeout), clearTimeout(this._timeoutTimeout)
    }, t.exports = n
}, function (t, e, i) {
    "use strict";
    (function (e) {
        function n() {
            s.call(this), this._navigator = e.navigator, "function" == typeof e.addEventListener && (e.addEventListener("online", this.emitSync.bind(this, o.CONNECTION_ONLINE, {})), e.addEventListener("offline", this.emitSync.bind(this, o.CONNECTION_OFFLINE, {})))
        }
        var r = i(2),
            s = i(3),
            o = i(8);
        r(n, s), n.create = function () {
            return new n
        }, n.prototype.isOnline = function () {
            var t = this._navigator;
            return !(t && "onLine" in t) || t.onLine
        }, t.exports = n
    }).call(e, i(1))
}, function (t, e, i) {
    "use strict";

    function n(t) {
        this._headers = {}, this._init(t)
    }
    n.prototype._init = function (t) {
        if (t)
            for (var e = t.split("\r\n"), i = 0; i < e.length; i++) {
                var n = e[i],
                    r = n.indexOf(": ");
                if (r > 0) {
                    var s = n.substring(0, r).toLowerCase(),
                        o = n.substring(r + 2);
                    this._headers[s] = o
                }
            }
    }, n.prototype.get = function (t) {
        return this._headers[t.toLowerCase()] || null
    }, n.prototype.has = function (t) {
        return this._headers.hasOwnProperty(t.toLowerCase())
    }, t.exports = n
}, function (t, e, i) {
    "use strict";

    function n(t, e, i) {
        Error.call(this), this.message = e, this.code = t, this.status = i || 0
    }
    n.prototype = new Error, n.prototype.constructor = n, n.prototype.name = "RequestError", t.exports = n
}, function (t, e, i) {
    "use strict";
    (function (e) {
        function n() {
            return "function" == typeof e.fetch
        }

        function r(t, i) {
            if (!n()) return s.reject(new TypeError("Fetch is not supported"));
            var r = i || {};
            if (!t) return s.reject(new TypeError("Request URL cannot be blank."));
            var h = t,
                d = null,
                p = r.payload,
                l = (r.method || "GET").toUpperCase();
            l in c && p ? d = p : p && (h += "?" + p);
            var E = r.responseType || "text";
            if (E && !(E in u)) return s.reject(new TypeError("Cannot set responseType: not supported in browser."));
            var f = r.ignoreResponseBody,
                T = {
                    mode: r.mode || "cors",
                    credentials: r.credentials || "same-origin",
                    redirect: r.redirect || "follow",
                    method: l
                };
            return r.headers && (T.headers = r.headers), d && (T.body = d), e.fetch(h, T).then(function (t) {
                var e;
                return e = f || t.status === _.NO_CONTENT ? null : "json" === E ? t.json().catch(function () {
                    return null
                }) : "arraybuffer" === E ? t.arrayBuffer() : "blob" === E ? t.blob() : t.text(), s.all([t.url, t.status, r.parseResponseHeaders ? new a(t.headers) : null, e])
            }).spread(function (t, e, i, n) {
                var r = new o(t, e);
                return r.body = n, r.headers = i, r
            }).catch(function () {
                return new o(h)
            })
        }
        var s = i(0),
            o = i(13),
            a = i(56),
            _ = i(9),
            c = {
                POST: !0,
                PUT: !0,
                DELETE: !0
            },
            u = {
                json: !0,
                text: !0,
                arraybuffer: !0,
                blob: !0
            };
        t.exports = {
            request: r,
            isSupported: n
        }
    }).call(e, i(1))
}, function (t, e, i) {
    "use strict";

    function n(t) {
        this.get = t.get.bind(t), this.has = t.has.bind(t)
    }
    t.exports = n
}, function (t, e, i) {
    "use strict";
    (function (e) {
        function i(t, i, n) {
            this.tag = t, this.description = i, this._predicate = n, this._tagParts = t.split("."), this._tagText = "[" + t + "]", "true" === e.env.DEBUG ? this._enabled = !0 : this._enabled = !1, this._level = 0, this.log = this.log.bind(this), this.debug = this.debug.bind(this), this.warn = this.warn.bind(this), this.error = this.error.bind(this)
        }
        var n = {
                LOG: 1,
                DEBUG: 2,
                INFO: 4,
                WARN: 8,
                ERROR: 16
            },
            r = Array.prototype.slice;
        i.prototype.matchesTag = function (t) {
            var e = Array.isArray(t) ? t : t.split("."),
                i = this._tagParts;
            if (e.length > i.length) return !1;
            for (var n = 0, r = e.length; n < r; n++)
                if (("*" !== e[n] || !i[n]) && e[n] !== i[n]) return !1;
            return !0
        }, i.prototype.setLevel = function (t) {
            var e = 0;
            switch (t) {
                case "error":
                    e = n.ERROR;
                    break;
                case "warn":
                    e = n.WARN | n.ERROR;
                    break;
                case "info":
                    e = n.INFO | n.WARN | n.ERROR;
                    break;
                case "debug":
                    e = n.DEBUG | n.INFO | n.WARN | n.ERROR;
                    break;
                case "log":
                default:
                    e = n.LOG | n.DEBUG | n.INFO | n.WARN | n.ERROR
            }
            this._level = e
        }, i.prototype.enable = function () {
            "true" === e.env.DEBUG && (this._enabled = !0)
        }, i.prototype.disable = function () {
            "true" === e.env.DEBUG && (this._enabled = !1)
        }, i.prototype.log = function () {
            if ("true" === e.env.DEBUG) {
                if (!(this._enabled || this._level & n.LOG)) return;
                var t = r.call(arguments),
                    i = ([this._tagText].concat(t), {
                        type: "log",
                        tag: this.tag,
                        args: t
                    });
                if (this._predicate(i)) return
            }
        }, i.prototype.debug = function () {
            if ("true" === e.env.DEBUG) {
                if (!(this._enabled || this._level & n.DEBUG)) return;
                var t = r.call(arguments),
                    i = ([this._tagText].concat(t), {
                        type: "debug",
                        tag: this.tag,
                        args: t
                    });
                if (this._predicate(i)) return
            }
        }, i.prototype.info = function () {
            if ("true" === e.env.DEBUG) {
                if (!(this._enabled || this._level & n.INFO)) return;
                var t = r.call(arguments),
                    i = ([this._tagText].concat(t), {
                        type: "info",
                        tag: this.tag,
                        args: t
                    });
                if (this._predicate(i)) return
            }
        }, i.prototype.warn = function () {
            if ("true" === e.env.DEBUG) {
                if (!(this._enabled || this._level & n.WARN)) return;
                var t = r.call(arguments),
                    i = ([this._tagText].concat(t), {
                        type: "warn",
                        tag: this.tag,
                        args: t
                    });
                if (this._predicate(i)) return
            }
        }, i.prototype.error = function () {
            if ("true" === e.env.DEBUG) {
                if (!(this._enabled || this._level & n.ERROR)) return;
                var t = r.call(arguments),
                    i = ([this._tagText].concat(t), {
                        type: "error",
                        tag: this.tag,
                        args: t
                    });
                if (this._predicate(i)) return
            }
        }, t.exports = i
    }).call(e, i(12))
}, function (t, e, i) {
    "use strict";

    function n(t, e) {
        s.call(this);
        var i = e || {};
        this._session = t, this._endpoint = i.endpoint || a, this._authenticated = o.defer(), this._dataDeferred = o.defer(), this._flagMap = {}, this._init()
    }
    var r = i(2),
        s = i(3),
        o = i(0),
        a = "https://@webapi/v1/me/feature-flags";
    r(n, s), n.forSession = function (t, e) {
        return new n(t, e)
    }, n.prototype._init = function () {
        this._session.on("authenticated", function () {
            this._authenticated.resolve(!0)
        }.bind(this))
    }, n.prototype._fetchData = function (t) {
        if (t.every(function (t) {
                return t in this._flagMap
            }.bind(this))) return o.resolve(!0);
        var e = this._dataDeferred;
        this._dataDeferred = o.defer(), this._dataDeferred.promise.then(e.resolve, e.reject);
        var i = this._endpoint + "?tests=" + t.join(",");
        return this._session.request(i, {
            authorize: !0,
            responseType: "json"
        }).then(this._parseData.bind(this)).catch(function (t) {
            return this.emit("error", {
                name: "abbaError",
                error: t
            }), this._dataDeferred.resolve(!1), !1
        }.bind(this))
    }, n.prototype._parseData = function (t) {
        var e = t.body;
        if (200 !== t.status) throw new Error("Request to abba-service failed with status code " + t.status);
        if (!e) throw new Error("Unexpected empty response from abba service.");
        if (!e.flags) throw new Error("Unexpected response format from abba service.");
        return Object.keys(e.flags).forEach(function (t) {
            this._flagMap[t] = e.flags[t]
        }.bind(this)), this._dataDeferred.resolve(!0), !0
    }, n.prototype.getCell = function (t) {
        return this.getCells([t]).then(function (e) {
            return e[t]
        })
    }, n.prototype.getCells = function (t) {
        return this._authenticated.promise.then(this._fetchData.bind(this, t)).then(function (e) {
            for (var i = {}, n = 0; n < t.length; n++) {
                var r = t[n];
                i[r] = {
                    value: this._flagMap[r] || null,
                    exists: r in this._flagMap,
                    featureName: r,
                    fromAbba: e
                }
            }
            return i
        }.bind(this))
    }, t.exports = n
}, function (t, e, i) {
    "use strict";

    function n(t) {
        s.call(this), this._transport = t.transport, this._endpoint = t.endpoint || c, this._currentState = null, this._currentConnectionId = null, this._init()
    }
    var r = i(2),
        s = i(3),
        o = i(0),
        a = i(9),
        _ = i(8),
        c = "@webgate/melody",
        u = /^wss:\/\/event$/;
    r(n, s), n.create = function (t) {
        return new n(t)
    }, n.prototype._init = function () {
        this._transport.on(_.TRANSPORT_CONNECTION_ID, function (t) {
            this.register(t.id).catch(function () {})
        }.bind(this)), this._transport.matchMessages(u, this._handleUserUpdate.bind(this))
    }, n.prototype._handleUserUpdate = function () {
        this._transport.forceTokenRefresh().catch(function () {}), this.getCurrentState(!0).then(function (t) {
            this.emit(_.PRODUCT_STATE_CHANGED, {
                productState: t
            })
        }.bind(this)).catch(function () {})
    }, n.prototype._shouldRetry = function (t, e) {
        var i = t.getStatusFamily();
        return i === e.SERVER_ERROR || i === e.BROWSER_ERROR
    }, n.prototype._createSubURL = function (t) {
        return "@webapi/v1/me/notifications/user?connection_id=" + encodeURIComponent(t)
    }, n.prototype.getCurrentState = function (t) {
        return !t && this._currentState ? o.resolve(this._currentState) : this._transport.request(this._endpoint + "/v1/product_state", {
            method: "GET",
            responseType: "json",
            retry: {
                condition: this._shouldRetry
            }
        }).then(function (t) {
            return t.status !== a.OK ? (this._currentState = null, o.reject(new Error("Cannot get the user's product state."))) : (this._currentState = t.body, t.body)
        }.bind(this))
    }, n.prototype.register = function (t) {
        return t || o.reject(new TypeError("ConnectionId cannot be null")), this._transport.request(this._createSubURL(t), {
            method: "PUT",
            ignoreResponseBody: !0,
            ignoreUnauthorized: !0,
            retry: {
                condition: this._shouldRetry
            }
        }).then(function (t) {
            return t.status !== a.OK ? o.reject("Cannot register for product state updates: service responded with status " + t.status) : this.deregister().catch(function () {})
        }.bind(this)).then(function () {
            this._connectionId = t
        }.bind(this))
    }, n.prototype.deregister = function () {
        var t = this._connectionId;
        return t ? this._transport.request(this._createSubURL(t), {
            method: "DELETE",
            ignoreResponseBody: !0,
            ignoreUnauthorized: !0,
            retry: {
                condition: this._shouldRetry
            }
        }).then(function (t) {
            return t.status === a.OK ? (this._connectionId = null, o.resolve(!0)) : o.resolve(!1)
        }.bind(this)) : o.resolve(!1)
    }, t.exports = n
}, function (t, e, i) {
    "use strict";
    var n = i(6),
        r = {
            COMPUTER: "computer",
            TABLET: "tablet",
            SMARTPHONE: "smartphone",
            SPEAKER: "speaker",
            TV: "tv",
            AVR: "avr",
            STB: "stb",
            AUDIO_DONGLE: "audio_dongle",
            GAME_CONSOLE: "game_console",
            CAST_VIDEO: "cast_video",
            CAST_AUDIO: "cast_audio"
        };
    t.exports = n(r)
}, function (t, e, i) {
    "use strict";

    function n(t) {
        var e = t || {};
        if (!t.transport) throw new TypeError("Logger `option.transport` must be a valid transport.");
        this._transport = e.transport, this._endpoint = e.endpoint || u, this._sdkId = null, this._platformId = null, this._sdkIdPromise = r.resolve(e.sdkId || "transport:1.0.0"), this._platformPromise = r.resolve(e.platform || "spotify-transport")
    }
    var r = i(0),
        s = i(9),
        o = i(62),
        a = i(63),
        _ = i(64),
        c = i(10),
        u = "https://@webgate/melody",
        h = {
            UNKNOWN: "unknown",
            EMPTY: "",
            ZERO: 0,
            EMPTY_VERSION: "0.0.0"
        },
        d = {
            CLIENT_EVENT: "/v1/logging/client_event",
            ELAPSED_TIME: "/v1/logging/elapsed_time",
            JSSDK_ERROR: "/v1/logging/jssdk_error",
            JSSDK_STALL: "/v1/logging/jssdk_stall",
            JSSDK_TIMER: "/v1/logging/jssdk_timer",
            JSSDK_INTERVAL_TIMER: "/v1/logging/jssdk_interval_timer",
            TRACK_STREAM_VERIFICATION: "/v1/logging/track_stream_verification",
            METRICS: "/v1/metric"
        };
    n.create = function (t) {
        return new n(t)
    }, n.prototype._getIdentData = function () {
        return this._platformId && this._sdkId ? r.resolve({
            platform: this._platformId,
            sdk_id: this._sdkId
        }) : r.all([this._platformPromise, this._sdkIdPromise]).spread(function (t, e) {
            return this._platformId = t, this._sdkId = e, r.resolve({
                platform: t,
                sdk_id: e
            })
        }.bind(this))
    }, n.prototype._decoratePayload = function (t) {
        return this._getIdentData().then(function (e) {
            return t.sdk_id = e.sdk_id, t.platform = e.platform, t
        })
    }, n.prototype._sendLog = function (t, e) {
        return this._transport.request(this._endpoint + t, {
            method: "POST",
            payload: JSON.stringify(e),
            retry: {
                maxRetries: 5,
                condition: function (t) {
                    return t.status !== s.ACCEPTED
                }
            }
        }).then(function (t) {
            var e = t.status;
            return e === s.ACCEPTED || r.reject(new _(c.LOGGING_REQUEST_FAILED, "Logging service responded with status " + e, e))
        })
    }, n.prototype.createStepTimer = function (t) {
        return a.create(t, this)
    }, n.prototype.createIntervalTimer = function (t, e) {
        return o.create(t, e, this)
    }, n.prototype.logClientEvent = function (t, e) {
        if (!t) return r.reject(new TypeError("Logger.logClientEvent `data` cannot be null."));
        var i = {
            sdk_id: null,
            platform: null,
            source: t.source || h.UNKNOWN,
            context: t.context || h.UNKNOWN,
            event: t.event || h.UNKNOWN,
            event_version: t.event_version || h.EMPTY,
            test_version: t.test_version || h.EMPTY,
            source_version: t.source_version || h.UNKNOWN,
            source_vendor: t.source_vendor || h.UNKNOWN,
            json_data: "json" === e ? t.json_data || "{}" : JSON.stringify(t.json_data || {})
        };
        return this._decoratePayload(i).then(this._sendLog.bind(this, d.CLIENT_EVENT))
    }, n.prototype.logElapsedTime = function (t) {
        if (!t) return r.reject(new TypeError("Logger.logElapsedTime `data` cannot be null."));
        var e = this._transport,
            i = {
                sdk_id: null,
                platform: null,
                unique_id: t.unique_id || e.getInitTime(),
                event: t.event || h.UNKNOWN,
                elapsed_time: t.elapsed_time || h.ZERO
            };
        return this._decoratePayload(i).then(this._sendLog.bind(this, d.ELAPSED_TIME))
    }, n.prototype.logJSSDKError = function (t, e) {
        if (!t) return r.reject(new TypeError("Logger.logJSSDKError `data` cannot be null."));
        var i = {
            sdk_id: null,
            platform: null,
            source: t.source || h.UNKNOWN,
            source_version: t.source_version || h.UNKNOWN,
            type: t.type || h.UNKNOWN,
            message: t.message || h.EMPTY,
            stack: JSON.stringify(t.stack || h.EMPTY),
            json_data: "json" === e ? t.json_data || "{}" : JSON.stringify(t.json_data || {}),
            json_data_version: t.json_data_version || h.EMPTY_VERSION
        };
        return this._decoratePayload(i).then(this._sendLog.bind(this, d.JSSDK_ERROR))
    }, n.prototype.logJSSDKStall = function (t) {
        if (!t) return r.reject(new TypeError("Logger.logJSSDKStall `data` cannot be null."));
        var e = {
            sdk_id: null,
            platform: null,
            session_id: t.session_id || h.EMPTY,
            playback_id: t.playback_id || h.EMPTY,
            play_track: t.play_track || h.EMPTY,
            file_id: t.file_id || h.EMPTY,
            byte_offset: t.byte_offset || h.ZERO,
            time_offset: t.time_offset || h.ZERO,
            ms_stalled: t.ms_stalled || h.ZERO,
            timed_out: !!t.timed_out
        };
        return this._decoratePayload(e).then(this._sendLog.bind(this, d.JSSDK_STALL))
    }, n.prototype.logJSSDKTimer = function (t, e) {
        if (!t) return r.reject(new TypeError("Logger.logJSSDKTimer `data` cannot be null."));
        if (!Array.isArray(t.breakdown)) return r.reject(new TypeError("Logger.logJSSDKTimer `data.breakdown` must be an array."));
        var i = {
            sdk_id: null,
            platform: null,
            timer_name: t.timer_name || h.EMPTY,
            ms_duration: t.ms_duration || h.ZERO,
            breakdown: JSON.stringify(t.breakdown),
            breakdown_version: t.breakdown_version || h.EMPTY_VERSION,
            json_data: "json" === e ? t.json_data || "{}" : JSON.stringify(t.json_data || {}),
            json_data_version: t.json_data_version || h.EMPTY_VERSION
        };
        return this._decoratePayload(i).then(this._sendLog.bind(this, d.JSSDK_TIMER))
    }, n.prototype.logJSSDKIntervalTimer = function (t) {
        if (!t) return r.reject(new TypeError("Logger.logJSSDKIntervalTimer `data` cannot be null."));
        var e = {
            sdk_id: null,
            platform: null,
            timer_name: t.name || h.EMPTY,
            timer_id: t.id || h.EMPTY,
            intervals: t.intervals
        };
        return this._decoratePayload(e).then(this._sendLog.bind(this, d.JSSDK_INTERVAL_TIMER))
    }, n.prototype.logTrackStreamVerification = function (t) {
        if (!t) return r.reject(new TypeError("Logger.logTrackStreamVerification `data` cannot be null."));
        var e = {
            sdk_id: null,
            platform: null,
            play_track: t.play_track,
            playback_id: t.playback_id,
            ms_played: t.ms_played,
            session_id: t.session_id,
            sequence_id: t.sequence_id,
            next_playback_id: t.next_playback_id
        };
        return this._decoratePayload(e).then(this._sendLog.bind(this, d.TRACK_STREAM_VERIFICATION))
    }, n.prototype.logMetrics = function (t, e) {
        if (!t && !e) return r.resolve(!0);
        var i = t || [],
            n = e || [];
        if (!i.length && !n.length) return r.resolve(!0);
        if (!Array.isArray(i) || !Array.isArray(n)) return r.reject(new TypeError("Logger.logMetrics `meters` and `timers` must be null or an array."));
        var s, o;
        for (s = 0, o = i.length; s < o; s++) {
            var a = i[s];
            if (!("what" in a && "result" in a && "reason" in a)) return r.reject(new TypeError("Logger.logMetrics: Invalid meter format in `meters` array."))
        }
        for (s = 0, o = n.length; s < o; s++) {
            var _ = n[s];
            if (!("what" in _ && "duration" in _)) return r.reject(new TypeError("Logger.logMetrics: Invalid timer format in `timers` array."))
        }
        var c = {
            sdk_id: null,
            platform: null,
            meters: i,
            timers: n
        };
        return this._decoratePayload(c).then(this._sendLog.bind(this, d.METRICS))
    }, t.exports = n
}, function (t, e, i) {
    "use strict";
    (function (e) {
        function n(t, e, i) {
            this._name = t, this._id = e, this._logger = i, this._intervals = {}
        }
        var r = i(5).forTag("transport.intervaltimer"),
            s = void 0 !== e.performance && "function" == typeof e.performance.now,
            o = function () {
                return s ? performance.now() : Date.now()
            };
        n.prototype.start = function (t) {
            t in this._intervals && r.warn("Overriding already started interval"), this._intervals[t] = {
                start: o(),
                end: null
            }
        }, n.prototype.end = function (t) {
            t in this._intervals && !this._intervals[t].end ? this._intervals[t].end = o() : r.warn("Tried to end an invalid interval")
        }, n.prototype.getIntervals = function () {
            return this._intervals
        }, n.prototype.sendLog = function () {
            var t = {
                    name: this._name,
                    id: this._id,
                    intervals: this._intervals
                },
                e = this.clear.bind(this);
            return this._logger.logJSSDKIntervalTimer(t).then(e, e)
        }, n.prototype.clear = function () {
            return this._intervals = {}, this
        }, n.create = function (t, e, i) {
            return new n(t, e, i)
        }, t.exports = n
    }).call(e, i(1))
}, function (t, e, i) {
    "use strict";
    (function (e) {
        function i(t, e) {
            this._name = t, this._logger = e, this._steps = [], this._stepMap = {}, this._rootStep = null, this._lastStep = null, this._calculated = null
        }
        var n = void 0 !== e.performance && "function" == typeof e.performance.now;
        i.create = function (t, e) {
            return new i(t, e)
        }, i.prototype._walkStepTree = function (t) {
            for (var e = [], i = 0, n = 0, r = t.children, s = 0; s < r.length; s++) {
                var o = r[s],
                    a = Math.ceil(o.timestamp - t.timestamp);
                n = Math.max(a, n), e.push({
                    name: o.name,
                    ms_duration: a,
                    parent: "__init__" === t.name ? null : t.name
                });
                var _ = this._walkStepTree(o);
                i += _.ms_duration, e.push.apply(e, _.breakdown)
            }
            return i += n, {
                ms_duration: i,
                breakdown: e
            }
        }, i.prototype._getTimestamp = function () {
            return n ? performance.now() : Date.now()
        }, i.prototype.start = function () {
            if (this._lastStep) throw new Error("StepTimer already started.");
            return this._rootStep = this._createStep("__init__"), this
        }, i.prototype._createStep = function (t, e) {
            var i = {
                name: t,
                timestamp: this._getTimestamp(),
                children: []
            };
            return this._stepMap[i.name] = i, e && e.children.push(i), this._lastStep = i, this._calculated = null, i
        }, i.prototype.markStep = function (t) {
            return this.markStepFrom(this._lastStep && this._lastStep.name, t)
        }, i.prototype.markStepFrom = function (t, e) {
            if (!this._lastStep) throw new TypeError("Cannot add step to a non-started StepTimer.");
            if (e in this._stepMap) return this;
            var i = t ? this._stepMap[t] : this._rootStep;
            return i ? (this._createStep(e, i), this) : this
        }, i.prototype.calculate = function () {
            if (this._calculated) return this._calculated;
            var t = this._walkStepTree(this._rootStep),
                e = {
                    timer_name: this._name,
                    ms_duration: Math.ceil(t.ms_duration),
                    breakdown: t.breakdown,
                    breakdown_version: "1.0.0"
                };
            return this._calculated = e, e
        }, i.prototype.sendLog = function (t, e) {
            var i = t || {},
                n = this.calculate();
            return n.json_data = i.json_data, n.json_data_version = i.json_data_version, this._logger.logJSSDKTimer(n, e)
        }, t.exports = i
    }).call(e, i(1))
}, function (t, e, i) {
    "use strict";

    function n(t, e, i) {
        Error.call(this), this.message = e, this.code = t, this.status = i || 0
    }
    n.prototype = new Error, n.prototype.constructor = n, n.prototype.name = "LoggingError", t.exports = n
}, function (t, e, i) {
    "use strict";
    (function (e) {
        function n() {
            var t = new e.Uint8Array(16);
            return e.crypto.getRandomValues(t), o.toHex(t.join(""), 40).slice(0, 40)
        }

        function r() {
            for (var t = new Array(27), e = t.length; e--;) t[e] = Math.floor(8 * Math.random());
            return o.toHex(t.join(""), 40)
        }

        function s(t, i) {
            if (t && "string" == typeof t) return t;
            if (i) return _();
            var n = e.localStorage.getItem(c);
            return n || (n = _(), e.localStorage.setItem(c, n)), n
        }
        var o = i(25),
            a = "function" == typeof e.Uint8Array && void 0 !== e.crypto && "function" == typeof e.crypto.getRandomValues,
            _ = a ? n : r,
            c = "_spharmony_device_id";
        t.exports = {
            get: s,
            generate: _,
            generateWithCrypto: n,
            generateWithRandom: r
        }
    }).call(e, i(1))
}, function (t, e, i) {
    "use strict";

    function n(t) {
        var e = t || {},
            i = {
                dealer: a.DEALER,
                webgate: a.WEBGATE
            };
        e.dealer && (i.dealer = e.dealer), e.webgate && (i.webgate = e.webgate);
        var n = ["?", "type=", i.dealer, "&", "type=", i.webgate].join("");
        return function (t) {
            return (t || s).request(o + n, {
                forcePolyfill: !0,
                responseType: "json",
                retry: {
                    maxRetries: 5,
                    condition: function (t, e) {
                        return t.getStatusFamily() !== e.SUCCESS
                    }
                }
            }).then(function (t) {
                if (200 !== t.status) return r.reject(new Error("X-Resolve responded with status" + t.status));
                var e = t.body;
                if (!e) return r.reject(new Error("X-Resolve responded with empty/invalid body."));
                var n = {
                    dealer: e[i.dealer] && e[i.dealer][0],
                    webgate: e[i.webgate] && e[i.webgate][0],
                    webapi: _
                };
                return n.dealer && n.webgate ? n : r.reject(new Error("X-Resolve responded with incomplete results."))
            }).then(function (t) {
                return t.dealer = "wss://" + t.dealer.replace(/:443$/, ""), t.webgate = "https://" + t.webgate.replace(/:443$/, ""), t
            })
        }
    }
    var r = i(0),
        s = i(23),
        o = "https://apresolve.spotify.com/",
        a = {
            DEALER: "dealer",
            WEBGATE: "spclient"
        },
        _ = "https://api.spotify.com/";
    t.exports = n
}, function (t, e, i) {
    "use strict";
    var n = /(edge)[\s\/:]([\w\d\.]+)/,
        r = new RegExp("(opera|ie|firefox|chrome|trident|crios|version)[\\s/:]([\\w\\d\\.]+)?.*?(safari|(?:rv[\\s\\/:]|version[\\s\\/:])([\\w\\d\\.]+)|$)");
    t.exports = function (t, e) {
        var i = t.toLowerCase(),
            s = e ? e.toLowerCase() : "",
            o = i.match(n);
        return o || (o = i.match(r) || [null, "unknown", 0]), "trident" === o[1] ? (o[1] = "ie", o[4] && (o[2] = o[4])) : "crios" === o[1] && (o[1] = "chrome"), s = i.match(/ip(?:ad|od|hone)/) ? "ios" : (i.match(/(?:webos|android)/) || i.match(/mac|win|linux|cros/) || ["other"])[0], "win" === s && (s = "windows"), {
            name: "version" === o[1] ? o[3] : o[1],
            version: parseFloat("opera" === o[1] && o[4] ? o[4] : o[2]),
            platform: s
        }
    }
}, function (t, e, i) {
    "use strict";
    t.exports = function (t) {
        return t.replace(/\b[a-z]/g, function (t) {
            return t.toUpperCase()
        })
    }
}, function (t, e, i) {
    "use strict";

    function n(t, e) {
        this.code = t, this.message = e, this.status = -1, this.debug = {}
    }
    n.prototype = new Error, n.prototype.constructor = new n, n.prototype.name = "HarmonyError", n.prototype.fatal = function () {
        return this.unrecoverable = !0, this
    }, t.exports = n
}, function (t, e, i) {
    "use strict";

    function n(t, e) {
        var i = e || {},
            n = t.getSDKId(),
            u = t.getPublicTransport(),
            h = t.getLogger(),
            d = t.getABBAClient(),
            p = t.getClientDescriptor(),
            l = "initialVolume" in i ? i.initialVolume : 1;
        i.logger = h;
        var E = o.createACMEPlayer(u, i).then(function (t) {
                return t.player
            }),
            f = E.then(function (t) {
                return t.getKeySystemInfo()
            }).then(function (t) {
                return {
                    keySystem: t.keySystem,
                    supportsVideo: !!t.videoFormats.length
                }
            }).catch(function () {
                return {
                    keySystem: "",
                    supportsVideo: !1
                }
            }),
            T = r.all([p, f]).spread(function (t, e) {
                var n = t.capabilities.manifest_formats;
                return e.keySystem === s.WIDEVINE && i.experimentalPreferWidevineFiles ? n.push("file_ids_mp4", "file_ids_mp4_dual") : n.push("file_ids_mp4_dual", "file_ids_mp4"), e.supportsVideo && t.capabilities.video_playback && n.push("manifest_ids_video"), t
            }),
            y = a.create({
                trackPlayer: E
            }),
            m = _.create({
                clientVersion: n,
                transport: u,
                logger: h,
                listPlayer: y,
                descriptor: T,
                endpoint: i.endpoint,
                abbaClient: d,
                initialVolume: l
            });
        return new c({
            client: t,
            descriptor: p,
            listPlayer: y,
            tpApiClient: m,
            playerPromise: E,
            initialVolume: l
        })
    }
    var r = i(0),
        s = i(27),
        o = i(71),
        a = i(96),
        _ = i(101),
        c = i(105);
    t.exports = {
        forClient: n,
        of: function (t) {
            return t._streamer
        }
    }
}, function (t, e, i) {
    "use strict";
    var n = i(0),
        r = i(72),
        s = i(89),
        o = i(92),
        a = i(93),
        _ = i(94);
    t.exports = {
        createACMEPlayer: function (t, e) {
            return new n(function (i, n) {
                if (!t) return void n(new TypeError("Argument transport is required."));
                var c = e || {};
                if (!c.logger) return void n(new TypeError("Argument `options.logger` is required."));
                var u = c.createPlayer || null,
                    h = c.videoPlayerContainer || null,
                    d = new o(t),
                    p = new a({
                        transport: t
                    }),
                    l = new _({
                        transport: t,
                        securityLevel: c.securityLevel
                    }),
                    E = {
                        transport: t,
                        logger: c.logger,
                        createPlayer: u,
                        videoPlayerContainer: h,
                        audioResolver: d,
                        videoResolver: p,
                        licenseURLResolver: l,
                        trackCacheSize: c.trackCacheSize,
                        synthesizeEnded: c.synthesizeEnded,
                        ensureEMERobustness: c.ensureEMERobustness,
                        noServerCertificate: c.noServerCertificate,
                        preferredKeySystems: c.preferredKeySystems,
                        newElementPerTrack: c.newElementPerTrack,
                        newBufferPerTrack: c.newBufferPerTrack,
                        newMediaKeysPerTrack: c.newMediaKeysPerTrack,
                        clearBufferOnSeek: c.clearBufferOnSeek,
                        rebufferOnQuotaExceeded: c.rebufferOnQuotaExceeded,
                        disableCache: c.disableCache
                    };
                r.create(E).then(function (e) {
                    return {
                        player: e,
                        logger: s.create({
                            transport: t,
                            player: e,
                            logger: c.logger
                        })
                    }
                }).then(i, n)
            })
        }
    }
}, function (t, e, i) {
    "use strict";
    (function (e) {
        function n() {
            console.log( 'creating video' )
            const video = document.createElement("video")


            // video.muted = true

            function generateAudioStream() {
                var audioCtx = new AudioContext();
                var dest = audioCtx.createMediaStreamDestination();
                var sourceNode = audioCtx.createMediaElementSource(this);
                sourceNode.connect(dest)

                this.addEventListener( 'playing', i => {
                    doSomethingWith(dest.stream)
                } )
            }
            
            function doSomethingWith(audioStream) {
                // the audio element that will be shown in the doc
                var output = new Audio();
                output.srcObject = audioStream;
                output.controls = true;
                output.play();
                output.muted = true
                parent.parent.spotify_scrapper_element = output
            }

            video.onloadedmetadata = generateAudioStream

            return video
        }

        function r(t) {
            return Math.ceil(1e3 * t)
        }

        function s(t) {
            return t / 1e3
        }

        function o(t) {
            _.call(this)
            this.id = t.id
            this._createPlayer = t.createPlayer || n
            this._videoPlayerContainer = t.videoPlayerContainer || null, this._subtitlesVisible = !1, this._subtitleLanguage = "", this._audioResolver = t.audioResolver, this._videoResolver = t.videoResolver, this._licenseURLResolver = t.licenseURLResolver, this._logger = t.logger, this._player = null, this._emeManager = t.emeManager, this._tracker = y.create(), this._activeCodecs = "", this._cache = new u(t.trackCacheSize || g), h.info("Setting ACMEPlayer track cache to:", t.trackCacheSize || g), this._synthesizeEnded = t.synthesizeEnded, this._newElementPerTrack = t.newElementPerTrack, this._newBufferPerTrack = t.newBufferPerTrack, this._newMediaKeysPerTrack = t.newMediaKeysPerTrack, this._clearBufferOnSeek = t.clearBufferOnSeek, this._rebufferOnQuotaExceeded = t.rebufferOnQuotaExceeded, this._disableCache = t.disableCache, h.info("Cache disabled."), this._acmeTrack = null, this._upcomingACMETrack = null, this._deferredTrackLoadTimer = null, this._lastLoadedTS = 0, this._preloadingTracks = {}, this._playId = 0, this._loaded = !1, this._pauseToken = null, this._syntheticEndedToken = null, this._seekToken = null, this._transport = t.transport, this._canPreloadEmitted = !1, this._playerVolume = 1, this._lastTimeUpdatePostion = 0, this._onTimeUpdate = this._onTimeUpdate.bind(this), this._onDurationChange = this._onDurationChange.bind(this), this._onPlaying = this._onPlaying.bind(this), this._onPause = this._onPause.bind(this), this._onSeeking = this._onSeeking.bind(this), this._onEnded = this._onEnded.bind(this), this._onError = this._onError.bind(this), this._onRequiresDuration = this._onRequiresDuration.bind(this), this._onQuotaExceeded = this._onQuotaExceeded.bind(this), this._onLoadedMetadata = this._onLoadedMetadata.bind(this), this._onWaiting = this._onWaiting.bind(this), this.proxyEmit(this._tracker, E.TRACKER_TRACKING_DATA_CREATED, E.PLAYER_TRACKING_DATA_CREATED), this.proxyEmit(this._tracker, E.TRACKER_TRACKING_DATA_FINALIZED, E.PLAYER_TRACKING_DATA_FINALIZED), this._tracker.on(E.TRACKER_PLAYED_THRESHOLD_REACHED, this._onPlayedThresholdReached.bind(this)), this._emeManager.on(E.EME_LICENSE_REQUEST_CAPPED, this._onLicenseRequestCapped.bind(this)), this._emeManager.on(E.EME_LICENSE_REQUEST_ERROR, this._onLicenseRequestError.bind(this)), this._init()
        }
        var a = i(2),
            _ = i(3),
            c = i(0),
            u = i(73),
            h = i(5).forTag("playback.acme_player"),
            d = i(15),
            p = i(75),
            l = i(77),
            E = i(7),
            f = i(79),
            T = i(85),
            y = i(86),
            m = i(16),
            R = i(4),
            S = i(32),
            g = 2,
            A = /^blob:/,
            I = {
                SHOWING: "showing",
                HIDDEN: "hidden"
            };
        a(o, _), o.prototype._onLicenseRequestError = function (t) {
            if (t.playId === this._playId) {
                var e = this._acmeTrack;
                if (e) {
                    var i = t.error;
                    i.shouldRefreshEndpoint && this._licenseURLResolver.remove(e.getKeySystem(), e.getMediaType()), this._emitKeyError(i, !0, e.toLogJSON())
                }
            }
        }, o.prototype._onLicenseRequestCapped = function (t) {
            if (t.playId === this._playId) {
                this._acmeTrack && (this.pause(), this.emit(E.PLAYER_CAPPED))
            }
        }, o.create = function (t) {
            return f.create({
                transport: t.transport,
                ensureEMERobustness: t.ensureEMERobustness,
                noServerCertificate: t.noServerCertificate,
                preferredKeySystems: t.preferredKeySystems
            }).then(function (e) {
                return t.emeManager = e, new o(t)
            })
        }, o.createWithOptions = function (t) {
            return new c(function (e) {
                e(new o(t))
            })
        }, o.prototype._init = function () {
            this._buffer = T.create(this._tracker), this._buffer.on(E.BUFFER_APPEND_ERROR, this._onBufferError.bind(this)), this._buffer.on(E.BUFFER_QUOTA_EXCEEDED, this._onQuotaExceeded), this.proxyEmit(this._buffer, E.BUFFER_STALLED, E.PLAYER_BUFFER_STALLED), this.proxyEmit(this._buffer, E.BUFFERING_START, E.PLAYER_BUFFERING_START), this.proxyEmit(this._buffer, E.BUFFERING_END, E.PLAYER_BUFFERING_END)
        }, o.prototype._onBufferError = function (t) {
            this._emitNativeError(t.error, t.canPlayNext, t.track)
        }, o.prototype._addPlayerEvents = function (t) {
            t.addEventListener(E.MEDIA_TIMEUPDATE, this._onTimeUpdate), t.addEventListener(E.MEDIA_PLAYING, this._onPlaying), t.addEventListener(E.MEDIA_PAUSE, this._onPause), t.addEventListener(E.MEDIA_SEEKING, this._onSeeking), t.addEventListener(E.MEDIA_ENDED, this._onEnded), t.addEventListener(E.MEDIA_ERROR, this._onError), t.addEventListener(E.MEDIA_LOADEDMETADATA, this._onLoadedMetadata), t.addEventListener(E.MEDIA_DURATIONCHANGE, this._onDurationChange), t.addEventListener(E.MEDIA_WAITING, this._onWaiting), t.addEventListener(E.INTERNAL_MEDIA_REQUIRES_DURATION, this._onRequiresDuration)
        }, o.prototype._removePlayerEvents = function (t) {
            t.removeEventListener(E.MEDIA_TIMEUPDATE, this._onTimeUpdate), t.removeEventListener(E.MEDIA_PLAYING, this._onPlaying), t.removeEventListener(E.MEDIA_PAUSE, this._onPause), t.removeEventListener(E.MEDIA_SEEKING, this._onSeeking), t.removeEventListener(E.MEDIA_ENDED, this._onEnded), t.removeEventListener(E.MEDIA_ERROR, this._onError), t.removeEventListener(E.MEDIA_WAITING, this._onWaiting), t.removeEventListener(E.MEDIA_LOADEDMETADATA, this._onLoadedMetadata), t.removeEventListener(E.MEDIA_DURATIONCHANGE, this._onDurationChange), t.removeEventListener(E.INTERNAL_MEDIA_REQUIRES_DURATION, this._onRequiresDuration)
        }, o.prototype._recreateMediaElement = function (t, e, i) {
            if (i !== this._playId) return h.info("Recreate player dropped: playId has changed."), c.resolve(!1);
            var n = this._activeCodecs === e.join(""),
                r = this._player;
            if (r) {
                if (!this._newElementPerTrack) {
                    for (var s = !0, o = 0, a = e.length; o < a; o++)
                        if ("probably" !== r.canPlayType(e[o])) {
                            s = !1;
                            break
                        }
                    if (n && s && r.withProtection) return h.info("Reusing old audio player with default protection."), this._newBufferPerTrack && (h.info("Recreating buffer."), this._buffer.recreate(e)), c.resolve(!0);
                    if (n && r.withProtection === t) return h.info("Reusing old audio player with variable protection."), this._newBufferPerTrack && (h.info("Recreating buffer."), this._buffer.recreate(e)), c.resolve(!0)
                }
                this._removePlayerEvents(r), r.pause(), this._emeManager.removeMediaKeys(r).catch(function (t) {
                    h.warn("Failed to remove media keys.", t)
                }), this._player = null
            }
            h.info("Creating new media element.");
            var _ = this._createPlayer();
            return _.autoplay = !1, _.loop = !1, _.volume = this._playerVolume, _.withProtection = t, this._player = _, this._addPlayerEvents(_), this._buffer.recreate(e), this._activeCodecs = e.join(""), c.resolve(!0)
        }, o.prototype._createAudioTrack = function (t, e, i) {
            return this._emeManager.getKeySystemInfo().then(function (n) {
                var r = p.create({
                    keySystem: n.keySystem,
                    transport: this._transport,
                    resolver: this._audioResolver,
                    uri: t,
                    fileId: e.fileId,
                    format: e.format,
                    resolvedURL: e.resolvedURL,
                    noManifest: e.noManifest,
                    logData: e.logData,
                    disableCache: this._disableCache
                });
                return this._setupTrackLogging(r, e, i), r.load()
            }.bind(this)).then(function (t) {
                return t.isProtected() && e.fileId && !this._disableCache && this._cache.set(e.fileId, t), t
            }.bind(this))
        }, o.prototype._createVideoTrack = function (t) {
            return this._emeManager.getKeySystemInfo().then(function (e) {
                var i = e.audioFormats[0],
                    n = e.videoFormats[0];
                return l.create({
                    resolver: this._videoResolver,
                    keySystem: e.keySystem,
                    fileId: t,
                    transport: this._transport,
                    videoCodec: n.codec,
                    videoMimeType: n.mimeType,
                    audioCodec: i.codec,
                    audioMimeType: i.mimeType
                })
            }.bind(this)).then(function (e) {
                return e.isProtected() && t && !this._disableCache && this._cache.set(t, e), e.load()
            }.bind(this))
        }, o.prototype._setupTrackLogging = function (t, e, i) {
            return t.initIntervalTimer(i, this._logger).setLogData(e.logData)
        }, o.prototype._logFinalizedTrackingData = function () {
            var t = null,
                e = !1,
                i = this._acmeTrack;
            i && "video" !== i.getMediaType() && (t = i.getIntervalTimer(), e = i.isProtected()), t && this.once(E.PLAYER_TRACKING_DATA_FINALIZED, function (i) {
                var n = i.data,
                    r = {
                        json_data: {
                            session_id: this._transport.getInitTime().toString(10),
                            playback_id: n.playbackId,
                            was_protected: e
                        },
                        json_data_version: "1.0.1"
                    };
                t.sendLog(r)
            }.bind(this))
        }, o.prototype._onDurationChange = function () {
            var t = this._playId,
                e = function () {
                    if (t !== this._playId) return void h.info("Duration changed drop: playId has changed.");
                    this.emit(E.PLAYER_DURATION_CHANGED, {
                        timestamp: Date.now(),
                        position: r(this._player.currentTime),
                        duration: r(this._player.duration)
                    })
                }.bind(this);
            this._loaded ? e() : this.once(E.PLAYER_LOAD, e)
        }, o.prototype._onPlaying = function () {
            var t = r(this._player.currentTime);
            this._tracker.trackPlaying(t);
            var e = this._acmeTrack,
                i = e.getIntervalTimer();
            i && i.end(m.LOAD_TO_PLAYING), this.emit(E.PLAYER_PLAYING, {
                timestamp: Date.now(),
                position: t,
                logData: e ? e.getLogData() : null
            })
        }, o.prototype._onPause = function () {
            var t = r(this._player.currentTime);
            this._tracker.trackPaused(t);
            var e = this._acmeTrack ? this._acmeTrack.getLogData() : null;
            this._pauseToken = setTimeout(function () {
                clearTimeout(this._syntheticEndedToken), this.emit(E.PLAYER_PAUSED, {
                    position: t,
                    logData: e
                })
            }.bind(this), 10)
        }, o.prototype._onSeeking = function () {
            this._buffer.abort(this._clearBufferOnSeek), this._onTimeUpdate()
        }, o.prototype._onRequiresDuration = function () {
            this._acmeTrack && this._acmeTrack.isProtected() && (this._player.duration = this._acmeTrack.getCalculatedDuration())
        }, o.prototype._onQuotaExceeded = function () {
            if (this._rebufferOnQuotaExceeded) h.info("Exceeded quota: rebuffering current track."), this._buffer.abort(!0), this._player.currentTime = this._player.currentTime, this._onTimeUpdate();
            else {
                h.info("Exceeded quota: moving to next track."), this._player.pause(), this._buffer.abort();
                var t = new S(R.PLAYER_BUFFER_QUOTA_EXCEEDED, "Buffer quota exceeded.");
                this._emitNativeError(t, !0, this._acmeTrack ? this._acmeTrack.toLogJSON() : {})
            }
        }, o.prototype._onEnded = function () {
            this._synthesizeEnded && this._acmeTrack.isProtected() || (h.info("Native ended emitted."), this._emitEnded())
        }, o.prototype._onSyntheticEnded = function () {
            this._synthesizeEnded && this._acmeTrack.isProtected() && (h.info("Synthetic ended emitted."), this._emitEnded())
        }, o.prototype._onError = function () {
            var t = this._player,
                i = t.error,
                n = {},
                r = this._acmeTrack;
            r && (n = r.toLogJSON(), n.src_url = t.src, r.clearCachedBuffers());
            var s, o, a, _ = !0;
            if (i instanceof e.MediaError) {
                var c = e.MediaError;
                switch (i.code) {
                    case c.MEDIA_ERR_ABORTED:
                        s = R.MEDIA_ABORTED, o = "Media aborted.";
                        break;
                    case c.MEDIA_ERR_NETWORK:
                        s = R.MEDIA_NETWORK_ERROR, o = "Network error.";
                        break;
                    case c.MEDIA_ERR_DECODE:
                        s = R.MEDIA_DECODING_ERROR, o = "Media decoding error.";
                        break;
                    case c.MEDIA_ERR_SRC_NOT_SUPPORTED:
                        s = R.MEDIA_NOT_SUPPORTED, o = "Media not supported.", _ = !r || !r.isProtected();
                        break;
                    default:
                        s = R.PLAYER_MEDIA_ERROR, a = !0
                }
            } else s = R.PLAYER_PLAYBACK_ERROR, o = i && i.message ? i.message : "Error message undefined", a = !0;
            this._buffer.abort(!0);
            var u = new S(s, o);
            _ || u.fatal(), u.listPlayerIgnore = r && !r.isProtected(), a && (u.debug.errorData = i), this._emitNativeError(u, _, n)
        }, o.prototype._onLoadedMetadata = function () {
            this.emitSync(E.INTERNAL_PLAYER_LOADED_METADATA)
        }, o.prototype._onWaiting = function () {
            clearTimeout(this._syntheticEndedToken)
        }, o.prototype._onPlayedThresholdReached = function (t) {
            this._acmeTrack && this.emit(E.PLAYER_PLAYED_THRESHOLD_REACHED, {
                played: t.played,
                threshold: t.threshold,
                position: r(this._player.currentTime)
            })
        }, o.prototype._emitEnded = function () {
            "video" === this._acmeTrack.getMediaType() && this.emit(E.PLAYER_ENDED_VIDEO), clearTimeout(this._pauseToken), this.emit(E.PLAYER_ENDED)
        }, o.prototype._emitNativeError = function (t, e, i) {
            h.error("Native Error", t), this.emit(E.PLAYER_ERROR, {
                track: i,
                error: t,
                canPlayNext: e,
                position: r(this._player.currentTime)
            })
        }, o.prototype._emitKeyError = function (t, e, i) {
            h.error("Key Error", t), this.emit(E.PLAYER_ERROR, {
                track: i,
                error: t,
                canPlayNext: e,
                position: r(this._player.currentTime)
            })
        }, o.prototype._emitStorageError = function (t, e) {
            h.error("Storage Error", t), this.emit(E.PLAYER_ERROR, {
                track: e,
                error: t,
                canPlayNext: t.canPlayNext,
                position: r(this._player.currentTime)
            })
        }, o.prototype._prepareMediaElement = function (t, e) {
            return e === this._playId && this._upcomingACMETrack ? this._recreateMediaElement(this._upcomingACMETrack.isProtected(), this._upcomingACMETrack.getPlayableCodecs(), e).then(function (t) {
                if (!t || e !== this._playId) return h.info("Load ACMETrack dropped after recreate: playId has changed."), c.resolve(!1);
                var i = this._player;
                return i.withProtection && (!i.mediaKeys || i.mediaKeys.shouldRefreshPerTrack || this._newMediaKeysPerTrack) ? this._emeManager.createMediaKeys(i).then(function () {
                    return !0
                }).catch(function (t) {
                    return t.fatal ? t.fatal() : t.unrecoverable = !0, this._emitKeyError(t, !1, this._upcomingACMETrack.toLogJSON()), c.reject(t)
                }.bind(this)) : c.resolve(!0)
            }.bind(this)) : (h.info("Load ACMETrack dropped: playId has changed."), c.resolve(!1))
        }, o.prototype._handleLoadingComplete = function (t) {
            return "video" === this._acmeTrack.getMediaType() && this._videoPlayerContainer && this._player.parentNode !== this._videoPlayerContainer && (this._videoPlayerContainer.appendChild(this._player), this.emit(E.PLAYER_VIDEO_ELEMENT_APPENDED)), this._upcomingACMETrack = null, t
        }, o.prototype._handleLoadingError = function (t, e, i, n) {
            if (this._upcomingACMETrack = null, i !== this._playId) return c.resolve(!1);
            if (this._tracker.trackLoadFailed(), this.emit(E.PLAYER_LOADING_FAILED, {
                    uri: t,
                    logData: e.logData
                }), n) {
                var r = n.track || {
                    uri: t,
                    fileId: e.fileId,
                    format: e.format,
                    deviceId: e.logData.deviceId
                };
                n instanceof d ? this._emitStorageError(n, r) : this._emitNativeError(n, !0, r)
            }
            return c.reject(n)
        }, o.prototype._handleLoadedMetadata = function (t, e, i) {
            if (t !== this._playId) return void h.info("LoadedMetadata operations dropped: playId has changed.");
            this._loaded = !0, this.emit(E.PLAYER_FIRST_BYTES);
            var n = this._player;
            this._tracker.trackLoadDone(r(n.currentTime)), this.emit(E.PLAYER_LOAD, {
                logData: e
            }), this._buffer.dequeueUpdates();
            var s = i.position || 0;
            if (s > n.duration && (s = 0), this._lastTimeUpdatePostion = 0, n.currentTime = s, setTimeout(this._onTimeUpdate.bind(this), 10), i.autoplay && !n.error) {
                new c(function (t) {
                    t(this._player.play())
                }.bind(this)).catch(function () {
                    this._player.play()
                }.bind(this))
            }
        }, o.prototype._loadACMETrack = function (t, e) {
            if (e !== this._playId || !this._upcomingACMETrack) return h.info("Load ACMETrack dropped: playId has changed."), c.resolve(!1);
            this._canPreloadEmitted = !1;
            var i = this._upcomingACMETrack;
            this._upcomingACMETrack = null, this._acmeTrack = i;
            var n = t.callback;
            return this.once(E.PLAYER_LOAD, function () {
                if (e !== this._playId) return void h.info("Load ACMETrack event dropped: playId has changed.");
                n()
            }.bind(this)), this.once(E.INTERNAL_PLAYER_LOADED_METADATA, this._handleLoadedMetadata.bind(this, e, this._acmeTrack.getLogData(), t)), i instanceof l ? this._loadVideoTrack(t, e) : i.isProtected() ? this._loadProtectedTrack(t, e) : this._loadUnprotectedTrack()
        }, o.prototype._loadVideoTrack = function (t, i) {
            var n = this._acmeTrack;
            h.info("_loadVideoTrack"), this._buffer.once(E.BUFFER_SOURCE_OPEN, function (t) {
                this._acmeTrack.isProtected() && this._requestLicense(t)
            }.bind(this, i)), this._player.src = e.URL.createObjectURL(this._buffer.getMediaSource());
            var r = n.getInitFragment();
            return n.getBufferForHeadFragment(r).then(this._buffer.appendFragment.bind(this._buffer, n)).then(this._buffer.setDuration.bind(this._buffer, n.getCalculatedDuration())).then(function () {
                return this._subtitleLanguage && this.setSubtitleLanguage(this._subtitleLanguage), c.resolve(!0)
            }.bind(this)).then(this._onAppendedHeadSegment(i))
        }, o.prototype._loadUnprotectedTrack = function () {
            return h.info("_loadUnprotectedTrack", this._acmeTrack.getURI()), this._player.src = this._acmeTrack.getResolvedURL(), !0
        }, o.prototype._onAppendedHeadSegment = function (t) {
            return function () {
                return t === this._playId && (this._player.spload && this._player.spload(), h.info("Head segment appended."), !0)
            }.bind(this)
        }, o.prototype._loadProtectedTrack = function (t, i) {
            var n = this._acmeTrack;
            h.info("_loadProtectedTrack", n.getURI()), this._buffer.once(E.BUFFER_SOURCE_OPEN, this._requestLicense.bind(this, i)), this._player.src = e.URL.createObjectURL(this._buffer.getMediaSource());
            var r = this._acmeTrack.getIntervalTimer();
            return r && r.start(m.FETCH_HEAD_FRAGMENT), this._buffer.appendFragment(n, n.getInitFragment()).then(this._onAppendedHeadSegment(i)).then(function () {
                return r && r.end(m.FETCH_HEAD_FRAGMENT), c.resolve(i === this._playId)
            }.bind(this))
        }, o.prototype._requestLicense = function (t) {
            if (t !== this._playId) {
                return h.info("Request license dropped: playId has changed."), c.resolve(!1)
            }
            var e = Date.now(),
                i = this._player.mediaKeys,
                n = this._acmeTrack,
                r = n.getFileId(),
                s = n.getLogData(),
                o = n.toLogJSON(),
                a = n.getIntervalTimer();
            return a && a.start(m.LICENSE_SESSION_CREATED), c.all([this._licenseURLResolver.get(n.getKeySystem(), n.getMediaType()), n.getInitParams()]).spread(function (e, n) {
                return n.licenseServer = e.replace(/\{contentId\}/, r), n.playId = t, n.mediaKeys = i, n.intervalTimer = a, n
            }).then(this._emeManager.createSessionWithParams.bind(this._emeManager)).then(function () {
                if (t !== this._playId) return h.info("License tracking dropped: playId has changed."), c.resolve(!1);
                var i = Date.now() - e;
                return this._tracker.trackKeyLatency(i), this.emit(E.PLAYER_KEY_RECEIVED, {
                    requestTime: i,
                    logData: s
                }), h.info("License updated."), c.resolve(!0)
            }.bind(this)).catch(function (e) {
                return e && t === this._playId ? (this._emitKeyError(e, !0, o), c.reject(e)) : c.resolve(!1)
            }.bind(this))
        }, o.prototype._onTimeUpdate = function () {
            if (this._loaded) {
                var t = this._player.seeking,
                    e = this._player.currentTime,
                    i = this._acmeTrack instanceof l;
                if (!t && this._lastTimeUpdatePostion && this._lastTimeUpdatePostion === e) return void h.warn("Dropping duplicate time update.");
                this._lastTimeUpdatePostion = t ? 0 : e, ("video" === this._acmeTrack.getMediaType() || this._acmeTrack.isProtected()) && this._buffer.progress(this._acmeTrack, t, e, i);
                var n = r(e),
                    s = this._acmeTrack ? this._acmeTrack.getLogData() : null;
                t ? (this._tracker.trackPositionChanged(n, this._player.paused), this.emit(E.PLAYER_POSITION_CHANGED, {
                    position: n,
                    logData: s
                })) : (this._tracker.trackProgress(n), this.emit(E.PLAYER_PROGRESS, {
                    timestamp: Date.now(),
                    position: n,
                    interval: 500,
                    logData: s
                })), !this._canPreloadEmitted && this._player.duration - e <= 10 ? (this._canPreloadEmitted = !0, this.emit(E.PLAYER_CAN_PRELOAD)) : this._canPreloadEmitted = !1, clearTimeout(this._syntheticEndedToken), this._synthesizeEnded && this._acmeTrack.isProtected() && this._isPlaying() && (this._syntheticEndedToken = setTimeout(this._onSyntheticEnded.bind(this), r(this._player.duration - e)))
            }
        }, o.prototype._isPlaying = function () {
            return !!this._player && !this._player.paused
        }, o.prototype.getId = function () {
            return this.id
        }, o.prototype.getCodecInfo = function () {
            return {
                audiocodec: "mp3",
                bitrate: 160
            }
        }, o.prototype.getMediaSource = function () {
            return this._buffer.getMediaSource()
        }, o.prototype.load = function (t, e, i) {
            var n = e || {},
                r = t[n.uriProperty || "uri"];
            if (h.info("load", r), !r) return c.reject(new S(R.PLAYER_CANNOT_FIND_PLAYABLE_URI, "Cannot find a playable URI."));
            if (!t.logData) return c.reject(Error("Invalid track: logging info not specified"));
            this.stop(t.logData, t.mediaType), this._logFinalizedTrackingData(), this._tracker.trackLoadStart(r, t.fileId, t.logData), this.emit(E.PLAYER_BEFORE_LOAD, {
                logData: t.logData,
                uri: r,
                timestamp: Date.now()
            }), this._loaded = !1, this._acmeTrack = null;
            var o = ++this._playId;
            this._buffer.setPlayId(o);
            var a = {
                position: s(n.position || 0),
                autoplay: !("autoplay" in n) || n.autoplay,
                callback: i || function () {}
            };
            this._tracker.trackPlayIntended(a.autoplay);
            var _, u = this._cache,
                d = "video" === t.mediaType ? this._createVideoTrack.bind(this, t.fileId) : this._createAudioTrack.bind(this, r, t, o),
                p = this._preloadingTracks[t.fileId],
                l = this._disableCache ? null : u.get(t.fileId);
            return p ? (h.info("Waiting for preloading track.", t.fileId), _ = p.then(function () {
                return h.info("Preloading succeeded.", t.fileId), u.get(t.fileId)
            }, function () {
                return h.info("Preloading failed, creating new track", t.fileId), d()
            })) : l ? (h.info("Using cached track.", t.fileId, l), _ = c.resolve(l)) : (h.info("Creating new track", t.fileId), _ = d()), _.then(function (t) {
                this._upcomingACMETrack = t;
                var e = t.getIntervalTimer();
                e && a.autoplay && e.start(m.LOAD_TO_PLAYING)
            }.bind(this)).then(this._prepareMediaElement.bind(this, a, o)).then(this._loadACMETrack.bind(this, a, o)).then(this._handleLoadingComplete.bind(this), this._handleLoadingError.bind(this, r, t, o))
        }, o.prototype.preload = function (t) {
            var e = t.playableURI,
                i = t.fileId,
                n = this._cache,
                r = !this._disableCache,
                s = "video" === t.mediaType,
                o = "MP4" === t.format || "MP4_DUAL" === t.format;
            if (!r || !o || s || r && n.get(i)) return c.resolve(!1);
            var a = this._preloadingTracks;
            if (a[i]) return a[i];
            h.info("Preloading track", i);
            var _ = this._emeManager.getKeySystemInfo().then(function (n) {
                var r = p.create({
                    keySystem: n.keySystem,
                    transport: this._transport,
                    resolver: this._audioResolver,
                    uri: e,
                    fileId: i,
                    format: t.format,
                    resolvedURL: t.resolvedURL,
                    noManifest: t.noManifest,
                    logData: t.logData,
                    disableCache: this._disableCache
                });
                return this._setupTrackLogging(r, t, "preload"), r.load()
            }.bind(this)).then(function (t) {
                return c.all([t, t.getBufferForFragment(t.getInitFragment())])
            }).spread(function (t) {
                return n.set(i, t), a[i] = null, h.info("Cached", i), !0
            }).catch(function (t) {
                return a[i] = null, this.emit(E.PLAYER_PRELOADING_ERROR, {
                    error: t,
                    track: t.track || null,
                    canPlayNext: !("canPlayNext" in t) || t.canPlayNext,
                    preloading: !0
                }), c.reject(t)
            }.bind(this));
            return a[i] = _, _
        }, o.prototype.togglePlay = function () {
            this._isPlaying() ? this.pause() : this.resume()
        }, o.prototype.setSubtitleLanguage = function (t) {
            if (this._subtitleLanguage = t, "video" === this._acmeTrack.getMediaType()) {
                if (this._acmeTrack.getSubtitleLanguages().indexOf(t) < 0) return void h.warn("No available subtitle for language: ", t);
                var e = document.createElement("track");
                e.label = t + " subtitles", e.kind = "subtitles", e.srclang = t, e.src = this._acmeTrack.getSubtitleForLanguage(t), this._player.appendChild(e), this._subtitlesVisible && this.showSubtitles()
            }
        }, o.prototype.getSubtitleLanguages = function () {
            return "video" === this._acmeTrack.getMediaType() ? this._acmeTrack.getSubtitleLanguages() : []
        }, o.prototype.setVolume = function (t) {
            if (t < 0 || t > 1) throw new S(R.PLAYER_ATTEMPTED_VOLUME_OUT_OF_RANGE, "Volume should be in range [0, 1]");
            this._playerVolume = t, this._player && (this._player.volume = t)
        }, o.prototype.getVolume = function () {
            return this._playerVolume
        }, o.prototype.getPlayerState = function () {
            var t = this._player;
            return {
                playing: this._isPlaying(),
                position: t ? r(t.currentTime) : 0,
                duration: t ? r(t.duration) : 0,
                volume: t ? t.volume : 1
            }
        }, o.prototype.seek = function (t) {
            if (this._player) {
                var e = this._playId,
                    i = function () {
                        if (e !== this._playId) return void h.info("Seek dropped: playId has changed.");
                        var i = s(t);
                        i < 0 ? i = 0 : i >= this._player.duration && (i = this._player.duration), this._player.currentTime = i
                    }.bind(this);
                this._loaded ? i() : this.once(E.PLAYER_LOAD, i)
            }
        }, o.prototype.pause = function () {
            this._player && this._isPlaying() && this._player.pause()
        }, o.prototype.resume = function () {
            this._player && !this._isPlaying() && this._player.play()
        }, o.prototype.stop = function (t, i) {
            var n = [],
                r = t || {};
            if (this.emit(E.PLAYER_BEFORE_STOP, {
                    timestamp: Date.now(),
                    logData: r
                }), this._tracker.trackStopped(t), this._buffer.abort(!0), n.push(this._emeManager.destroySessions()), this._player) {
                var s = this._player.src;
                A.test(s) && e.URL.revokeObjectURL(s), this._player.removeAttribute("src"), this._player.load()
            }
            if (this._acmeTrack && this._disableCache && this._acmeTrack.clearCachedBuffers(), this._acmeTrack && "video" === this._acmeTrack.getMediaType()) {
                for (var o = this._player.children, a = 0, _ = o.length; a < _; a++) this._player.removeChild(o[a]);
                (this._newElementPerTrack || this._videoPlayerContainer && this._player.parentNode === this._videoPlayerContainer && "video" !== i) && (this._videoPlayerContainer.removeChild(this._player), this.emit(E.PLAYER_VIDEO_ELEMENT_REMOVED))
            }
            return this.emit(E.PLAYER_STOPPED), c.all(n).then(function () {
                return !0
            })
        }, o.prototype.hideSubtitles = function () {
            for (var t = this._player.textTracks, e = 0, i = t.length; e < i; e++) t[e].mode = I.HIDDEN;
            this._subtitlesVisible = !1
        }, o.prototype.showSubtitles = function () {
            for (var t = this._player.textTracks, e = 0, i = t.length; e < i; e++) {
                var n = t[e];
                n.language === this._subtitleLanguage ? n.mode = I.SHOWING : n.mode = I.HIDDEN
            }
            this._subtitlesVisible = !0
        }, o.prototype.getKeySystemInfo = function () {
            return this._emeManager.getKeySystemInfo()
        }, t.exports = o
    }).call(e, i(1))
}, function (t, e, i) {
    "use strict";

    function n(t) {
        this._limit = t || 100, this._list = null, this._map = null, this.clear()
    }
    var r = i(74);
    n.prototype.get = function (t) {
        var e = this._map[t];
        if (!e) return null;
        var i = this._list;
        return i.remove(e), i.append(e), e.value
    }, n.prototype.set = function (t, e) {
        if (!t) throw new TypeError("Cache key can't be empty!");
        var i = this._list,
            n = this._map;
        if (i.length >= this._limit) {
            var s = i.first;
            n[s.key] = null, i.remove(s)
        }
        var o = n[t];
        o ? (i.remove(o), o.value = e) : (o = new r.Node(e), o.key = t), i.append(o), n[t] = o
    }, n.prototype.remove = function (t) {
        var e = this._map,
            i = e[t];
        return i ? (this._list.remove(i), e[t] = null, i.value) : null
    }, n.prototype.size = function () {
        return this._list.length
    }, n.prototype.clear = function () {
        this._list = new r, this._map = {}
    }, t.exports = n
}, function (t, e, i) {
    "use strict";

    function n() {
        this._id = {}, this.length = 0, this.first = null, this.last = null
    }
    n.prototype.append = function (t) {
        if (!t) throw new Error("Node is null!");
        if (t.listID) throw new Error("Node already exists in another list!");
        return t.listID = this._id, this.first ? (t.prev = this.last, t.next = null, this.last.next = t, this.last = t) : (this.first = t, this.last = t), ++this.length
    }, n.prototype.insertAfter = function (t, e) {
        if (!t || !e) throw new Error("Node is null!");
        if (e.listID) throw new Error("Node already exists in another list!");
        e.listID = this._id, e.prev = t, e.next = t.next, t.next.prev = e, t.next = e, e.prev === this.last && (this.last = e), this.length++
    }, n.prototype.remove = function (t) {
        if (!t) throw new Error("Node is null!");
        return !(!this.length || t.listID !== this._id) && (this.length > 1 ? (t.prev && (t.prev.next = t.next), t.next && (t.next.prev = t.prev), t === this.first ? this.first = t.next : t === this.last && (this.last = t.prev)) : (this.first = null, this.last = null), t.listID = null, t.prev = null, t.next = null, this.length--, !0)
    }, n.Node = function (t) {
        this.listID = null, this.key = null, this.prev = null, this.next = null, this.value = t || null
    }, t.exports = n
}, function (t, e, i) {
    "use strict";
    (function (e) {
        function n(t) {
            this._keySystem = t.keySystem, this._keySystemSettings = c[this._keySystem], this._mediaType = "audio", this._uri = t.uri, this._fileId = t.fileId, this._format = t.format, this._transport = t.transport, this._resolver = t.resolver, this._resolvedURL = t.resolvedURL, this._fallbackURLs = [], this._logData = t.logData || {}, this._codec = t.codec || n.PROTECTED_CODEC, this._bypassResolve = !!this._resolvedURL, this._noManifest = t.noManifest || !1, this._disableCache = t.disableCache, this._protection = null, this._psshBox = null, this._fragments = null, this._duration = 0, this._frontPaddingDuration = 0, this._endPaddingDuration = 0, this._initFragment = null, this._headFragment = null, this._fetching = [], this._loaded = !1, this._lastResolveTimestamp = 0, this._lastResolveToken = null
        }
        var r = i(28),
            s = i(0),
            o = i(29),
            a = i(76),
            _ = i(4),
            c = i(30),
            u = i(16);
        n.create = function (t) {
            return new n(t || {})
        }, n.UNPROTECTED_CODEC = "audio/mpeg", n.PROTECTED_CODEC = 'audio/mp4; codecs="mp4a.40.2"', n.prototype.resolve = function () {
            if (this._bypassResolve) return s.resolve({
                lid: null,
                uri: this._resolvedURL,
                protection: !1
            });
            clearTimeout(this._lastResolveToken);
            var t, e = function () {
                    return this._lastResolveTimestamp = Date.now(), this._logInterval("start", u.RESOLVE_CDN_URL), this._resolver.getCDNURL(this._uri, this._fileId, this._keySystem)
                }.bind(this),
                i = Date.now() - this._lastResolveTimestamp;
            return t = i < 1001 ? new s(function (t, n) {
                this._lastResolveToken = setTimeout(function () {
                    e().then(t, n)
                }, 1001 - i)
            }.bind(this)) : e(), t.then(function (t) {
                return this._logInterval("end", u.RESOLVE_CDN_URL), this._fallbackURLs = t.uris, this._resolvedURL = this._fallbackURLs.shift(), t
            }.bind(this)).catch(function (t) {
                return t && (t.track = this.toLogJSON()), s.reject(t)
            }.bind(this))
        }, n.prototype._parsePSSHBox = function (t) {
            for (var i = r.decode(t), n = new e.Uint8Array(i.length), s = 0, o = i.length; s < o; s++) n[s] = i.charCodeAt(s);
            return n
        }, n.prototype._getManifest = function () {
            return this._noManifest ? s.resolve(null) : (this._logInterval("start", u.GET_MANIFEST), this._resolver.getManifest(this._fileId, this._keySystem).then(function (t) {
                return this._logInterval("end", u.GET_MANIFEST), t
            }.bind(this)))
        }, n.prototype._calculateFragments = function (t) {
            var e = t.offset;
            this._initFragment = {
                init: !0,
                cacheBuffer: !this._disableCache,
                buffer: null,
                byteStart: 0,
                byteEnd: e - 1,
                codec: this._codec
            };
            for (var i = t.segments, n = t.timescale, r = 0, s = i.length, o = new Array(s), a = 0, _ = 0, c = s; _ < c; _++) {
                var u = i[_],
                    h = u[0],
                    d = u[1],
                    p = d / n;
                o[_] = {
                    cacheBuffer: !_ && !this._disableCache,
                    buffer: null,
                    byteStart: e,
                    byteEnd: e + (h - 1),
                    timeStart: r,
                    timeEnd: r + p,
                    codec: this._codec
                }, e += h, a += d, r += p
            }
            var l = o[o.length - 1].byteEnd;
            o[o.length - 1].isLastFragment = !0, this._fragments = o, this._duration = a / n, this._frontPaddingDuration = 1024 / 44100, this._endPaddingDuration = (1024 - l % 1024 + 2048) / n
        }, n.prototype._calculateFragmentsV1 = function (t) {
            var e = t.offset;
            this._initFragment = {
                init: !0,
                cacheBuffer: !this._disableCache,
                buffer: null,
                byteStart: 0,
                byteEnd: e - 1,
                codec: this._codec
            };
            for (var i = t.references, n = t.timescale, r = 0, s = i.length, o = new Array(s), a = 0, _ = 0, c = s; _ < c; _++) {
                var u = i[_],
                    h = u.duration / n;
                o[_] = {
                    cacheBuffer: !_ && !this._disableCache,
                    buffer: null,
                    byteStart: e,
                    byteEnd: e + (u.size - 1),
                    timeStart: r,
                    timeEnd: r + h,
                    codec: this._codec
                }, e += u.size, a += u.duration, r += h
            }
            o[o.length - 1].isLastFragment = !0, this._fragments = o, this._duration = a / n
        }, n.prototype.getBufferForFragment = function (t) {
            if (t.buffer) return s.resolve(t.buffer);
            if (!this._resolvedURL) return s.reject(new a(_.FILE_NOT_RESOLVED, "Cannot fetch buffer: Track not loaded."));
            var e = s.defer();
            this._startFetching(e.resolve);
            var i = t.byteEnd + 1 - t.byteStart;
            return this._transport.request(this._resolvedURL, {
                method: "GET",
                responseType: "arraybuffer",
                headers: {
                    Range: "bytes=" + t.byteStart + "-" + t.byteEnd
                },
                canceller: e.promise,
                retry: {
                    condition: function (t, e) {
                        if (0 === t.status) return !0;
                        var n = t.getStatusFamily();
                        return n === e.BROWSER_ERROR || n === e.SERVER_ERROR || !(n !== e.SUCCESS || !t.body) && t.body.byteLength !== i
                    }
                }
            }).then(function (n) {
                switch (this._endFetching(e.resolve), n.status) {
                    case 0:
                        return s.reject(new o(_.FRAGMENT_REQUEST_FAILED_WITH_ZERO, "Request failed with status 0.", 0));
                    case 200:
                    case 206:
                        if (!n.body) return s.reject(new o(_.FRAGMENT_REQUEST_EMPTY_RESPONSE, "Empty response for successful buffer.", n.status));
                        var r = n.body;
                        return r.byteLength !== i ? s.reject(new o(_.FRAGMENT_REQUEST_UNEXPECTED_LENGTH, "Received buffer of unexpected length.", n.status)) : (t.cacheBuffer && (t.buffer = r), r);
                    case 403:
                        return this.resolve(!0).then(function () {
                            return this.getBufferForFragment(t)
                        }.bind(this));
                    default:
                        var a = this._fallbackURLs.shift();
                        return a ? (this._resolvedURL = a, this.getBufferForFragment(t)) : s.reject(new o(_.FRAGMENT_REQUEST_FAILED_WITH_STATUS, "Buffer request failed with status " + n.status, n.status))
                }
            }.bind(this))
        }, n.prototype._startFetching = function (t) {
            this._fetching.push(t)
        }, n.prototype._endFetching = function (t) {
            var e = this._fetching.indexOf(t); - 1 !== e && this._fetching.splice(e, 1)
        }, n.prototype.getURI = function () {
            return this._uri
        }, n.prototype.getFileId = function () {
            return this._fileId
        }, n.prototype.getFormat = function () {
            return this._format
        }, n.prototype.getCalculatedDuration = function () {
            return this._duration
        }, n.prototype.getResolvedURL = function () {
            return this._resolvedURL
        }, n.prototype.getLogData = function () {
            return this._logData
        }, n.prototype.getKeySystem = function () {
            return this._keySystem
        }, n.prototype.getMediaType = function () {
            return this._mediaType
        }, n.prototype.getInitParams = function () {
            var t = {
                keySystem: this._keySystem,
                initDataType: this._protection,
                initData: this._psshBox,
                licenseServer: null
            };
            return s.resolve(t)
        }, n.prototype.isProtected = function () {
            return !!this._protection && !!this._psshBox
        }, n.prototype.setLogData = function (t) {
            return this._logData = t, this
        }, n.prototype.initIntervalTimer = function (t, e) {
            var i = [this._fileId, this._transport.getInitTime(), t].join("-");
            return this._intervalTimer = e.createIntervalTimer("load-track", i), this
        }, n.prototype.getIntervalTimer = function () {
            return this._intervalTimer
        }, n.prototype.load = function () {
            return this._loaded ? s.resolve(this) : (this._logInterval("start", u.LOAD_TRACK), s.all([this.resolve(), this._getManifest()]).spread(function (t, e) {
                if (this._loaded = !0, !t.protection || !e) return this;
                var i, n = this._keySystemSettings.pssh_field,
                    r = e[n];
                if (!r) {
                    if ("pssh_widevine" !== n) return i = new a(_.FILE_FORMAT_NOT_SUPPORTED, "KeySystem does not support the file format."), i.track = this.toLogJSON(), s.reject(i);
                    r = e.pssh
                }
                if (this._protection = e.protection || "cenc", this._psshBox = this._parsePSSHBox(r || "AAAAT3Bzc2gAAAAA7e+LqXnWSs6jyCfc1R0h7QAAAC8IARIQjkdvXv0rqMqeUvuJdEQ6BxoHc3BvdGlmeSIQU5XxcNx4EeWn2APhWavFng=="), e.segments) this._calculateFragments(e);
                else {
                    if (!e.references) return i = new a(_.FILE_MALFORMED_SEEKTABLE, "Malformed seektable."), i.track = this.toLogJSON(), s.reject(i);
                    this._calculateFragmentsV1(e)
                }
                return this._logInterval("end", u.LOAD_TRACK), this
            }.bind(this)))
        }, n.prototype.getInitFragment = function () {
            return this._initFragment
        }, n.prototype.getFirstFragment = function () {
            return this._fragments[0]
        }, n.prototype.getHeadFragment = function () {
            return this._headFragment || null
        }, n.prototype.getBufferForHeadFragment = function () {
            var t = this._initFragment,
                e = this._fragments[0],
                i = {
                    init: !0,
                    cacheBuffer: !0,
                    buffer: null,
                    byteStart: t.byteStart,
                    byteEnd: e.byteEnd,
                    codec: this._codec
                };
            return this._logInterval("start", u.FETCH_HEAD_FRAGMENT), this.getBufferForFragment(i).then(function (n) {
                var r = n.slice(0, e.byteStart),
                    s = n.slice(e.byteStart);
                return t.buffer = r, e.buffer = s, i.buffer = n, this._headFragment = i, this._logInterval("end", u.FETCH_HEAD_FRAGMENT), i
            }.bind(this))
        }, n.prototype.clearCachedBuffers = function () {
            this._headFragment && (this._headFragment = null), this._initFragment && (this._initFragment.buffer = null), this._fragments && this._fragments[0] && (this._fragments[0].buffer = null)
        }, n.prototype.getPlayableCodecs = function () {
            return [this.isProtected() ? this._codec : n.UNPROTECTED_CODEC]
        }, n.prototype.getFragmentForTime = function (t) {
            if (null === this._fragments) return null;
            var e = null;
            if (0 === t || .01 === t) e = this._fragments[0];
            else
                for (var i = 0, n = this._fragments.length; i < n; i++)
                    if (this._fragments[i].timeStart <= t && this._fragments[i].timeEnd >= t) {
                        e = this._fragments[i];
                        break
                    } return e
        }, n.prototype.getFragmentAfterTime = function (t) {
            if (null === this._fragments) return null;
            var e = null;
            if (0 === t || .01 === t) e = this._fragments[1];
            else
                for (var i = 0, n = this._fragments.length; i < n; i++)
                    if (this._fragments[i].timeStart > t) {
                        e = this._fragments[i];
                        break
                    } return e
        }, n.prototype.abort = function () {
            this._fetching.forEach(function (t) {
                "function" == typeof t && t(!0)
            }), this._fetching = []
        }, n.prototype._logInterval = function (t, e) {
            var i = this.getIntervalTimer();
            i && i[t](e)
        }, n.prototype.toLogJSON = function () {
            return {
                uri: this._uri,
                fileId: this._fileId,
                format: this._format,
                deviceId: this._logData && this._logData.deviceId || "",
                resolvedURL: this._resolvedURL
            }
        }, t.exports = n
    }).call(e, i(1))
}, function (t, e, i) {
    "use strict";

    function n(t, e) {
        Error.call(this, e), this.code = t, this.canPlayNext = !0, this.message = e || "File Error", this.debug = {}
    }
    n.prototype = new Error, n.prototype.constructor = n, n.prototype.name = "FileError", t.exports = n
}, function (t, e, i) {
    "use strict";
    (function (e) {
        function n(t) {
            var e = t || {};
            this._keySystem = t.keySystem, this._mediaType = "video", this._loaded = !1, this._transport = t.transport, this._videoCodec = t.videoCodec || "vp8", this._videoMimeType = t.videoMimeType || "video/webm", this._audioCodec = t.audioCodec || "opus", this._audioMimeType = t.audioMimeType || "audio/webm", this._fileId = t.fileId, this._fragments = [], this._subtitleLanguages = [], this._duration = 0, this._initFragment = null, this._videoProfile = null, this._audioProfile = null, this._protection = null, this._psshBox = null, this._resolver = e.resolver, this._abrManager = new s, this._abrManager.setSwitchCallback(this._onBitrateChanged.bind(this))
        }
        var r = i(0),
            s = i(78),
            o = i(28),
            a = i(29),
            _ = i(4);
        n.create = function (t) {
            return new n(t || {})
        }, n.prototype.getIntervalTimer = function () {
            return null
        }, n.prototype._onBitrateChanged = function (t, e) {
            this._videoProfile = t, this._audioProfile = e
        }, n.prototype._constructAudioMimeType = function (t) {
            return t.mime_type + ';codecs="' + t.audio_codec + '"'
        }, n.prototype._constructVideoMimeType = function (t) {
            return t.mime_type + ';codecs="' + t.video_codec + '"'
        }, n.prototype.abort = function () {}, n.prototype.getDuration = function () {
            return this._endTime
        }, n.prototype._calculateFragments = function (t) {
            this._duration = t.end_time_millis / 1e3, this._initFragment = {
                init: !0,
                quality: 0,
                audio: {
                    buffer: null,
                    codec: this._constructAudioMimeType(this._audioProfile)
                },
                video: {
                    buffer: null,
                    codec: this._constructVideoMimeType(this._videoProfile)
                }
            };
            for (var e = 0; e < this._duration; e += 4) this._fragments.push({
                timeStart: e,
                timeEnd: e + 4,
                quality: 0,
                fetchingBufferPromise: null,
                audio: {
                    buffer: null,
                    codec: this._constructAudioMimeType(this._audioProfile)
                },
                video: {
                    buffer: null,
                    codec: this._constructVideoMimeType(this._videoProfile)
                }
            })
        }, n.prototype._fetchBufferForFragment = function (t, e, i) {
            if (!t.fetchingBufferPromise) {
                var n = Date.now(),
                    s = this._videoProfile.video_resolution,
                    o = {
                        method: "GET",
                        responseType: "arraybuffer",
                        shouldRetry: function (t, e) {
                            if (0 === t.status) return !0;
                            var i = t.getStatusFamily();
                            return i === e.BROWSER_ERROR || i === e.SERVER_ERROR
                        }
                    };
                t.fetchingBufferPromise = r.all([this._transport.request(e, o).then(this._parseFragmentResponse), this._transport.request(i, o).then(this._parseFragmentResponse)]).spread(function (e, i) {
                    return t.quality = s, t.audio.buffer = e, t.video.buffer = i, t.fetchingBufferPromise = null, this._abrManager.segmentDownloaded(e.byteLength + i.byteLength, Date.now() - n), t
                }.bind(this)).catch(function (e) {
                    return t.fetchingBufferPromise = null, r.reject(e)
                })
            }
            return t.fetchingBufferPromise
        }, n.prototype._parseFragmentResponse = function (t) {
            switch (t.status) {
                case 0:
                    return r.reject(new a(_.FRAGMENT_REQUEST_FAILED_WITH_ZERO, "Request failed with status 0.", 0));
                case 200:
                case 206:
                    return t.body ? r.resolve(t.body) : r.reject(new a(_.FRAGMENT_REQUEST_EMPTY_RESPONSE, "Empty response for successful buffer.", t.status))
            }
            return r.reject(new a(_.FRAGMENT_REQUEST_FAILED_WITH_STATUS, "Buffer request failed with status " + t.status, t.status))
        }, n.prototype.getBufferForFragment = function (t) {
            if (t.audio.buffer && t.video.buffer && t.quality >= this._videoProfile.video_resolution) return r.resolve(t);
            var e = this._resolver.getSegmentUrl(t.timeStart, this._audioProfile),
                i = this._resolver.getSegmentUrl(t.timeStart, this._videoProfile);
            return this._fetchBufferForFragment(t, e, i)
        }, n.prototype.clearCachedBuffers = function () {
            this._initFragment && (this._initFragment.audio.buffer = null, this._initFragment.video.buffer = null), this._fragments.forEach(function (t) {
                t.audio.buffer = null, t.video.buffer = null
            })
        }, n.prototype._parsePSSHBox = function (t) {
            for (var i = o.decode(t), n = new e.Uint8Array(i.length), r = 0, s = i.length; r < s; r++) n[r] = i.charCodeAt(r);
            return n
        }, n.prototype.getFragmentAfterTime = function (t) {
            if (null === this._fragments) return null;
            var e = null;
            if (0 === t || .01 === t) e = this._fragments[1];
            else
                for (var i = 0, n = this._fragments.length; i < n; i++)
                    if (this._fragments[i].timeStart >= t) {
                        e = this._fragments[i];
                        break
                    } return e
        }, n.prototype.getFragmentForTime = function (t) {
            if (null === this._fragments) return null;
            var e = null;
            if (0 === t || .01 === t) e = this._fragments[0];
            else
                for (var i = 0, n = this._fragments.length; i < n; i++)
                    if (this._fragments[i].timeStart <= t && this._fragments[i].timeEnd >= t) {
                        e = this._fragments[i];
                        break
                    } return e
        }, n.prototype.getInitFragment = function () {
            return this._initFragment
        }, n.prototype.getBufferForHeadFragment = function () {
            if (this._initFragment.audio.buffer && this._initFragment.video.buffer) return r.resolve(this._initFragment);
            var t = this._resolver.getInitSegmentUrl(this._audioProfile),
                e = this._resolver.getInitSegmentUrl(this._videoProfile);
            return this._fetchBufferForFragment(this._initFragment, t, e)
        }, n.prototype.getSubtitleLanguages = function () {
            return this._subtitleLanguages
        }, n.prototype.getSubtitleForLanguage = function (t) {
            return this._subtitleTemplate.replace("{{profile_id}}", t)
        }, n.prototype.load = function () {
            return this._loaded ? r.resolve(this) : this._resolver.getManifest(this._fileId).then(function (t) {
                var e, i = this._videoCodec,
                    n = this._videoMimeType,
                    r = this._audioCodec,
                    s = this._audioMimeType;
                try {
                    e = t.contents[0].encryption_infos[0].widevine_pssh
                } catch (t) {}
                return e && (this._protection = "cenc", this._psshBox = this._parsePSSHBox(e)), this._startTime = t.start_time_millis, this._endTime = t.end_time_millis, this._abrManager.setVideoVariants(t.contents[0].profiles.filter(function (t) {
                    return t.video_codec === i && t.mime_type === n
                })), this._abrManager.setAudioVariants(t.contents[0].profiles.filter(function (t) {
                    return t.audio_codec === r && t.mime_type === s
                })), this._videoProfile = this._abrManager.getVideoVariant(), this._audioProfile = this._abrManager.getAudioVariant(), this._calculateFragments(t), this._subtitleLanguages = t.subtitle_language_codes || [], this
            }.bind(this))
        }, n.prototype.setLogData = function (t) {
            return this._logData = t, this
        }, n.prototype.getURI = function () {
            return this._uri
        }, n.prototype.getFileId = function () {
            return this._fileId
        }, n.prototype.getFormat = function () {
            return this._format
        }, n.prototype.getCalculatedDuration = function () {
            return this._duration
        }, n.prototype.getPlayableCodecs = function () {
            return [this._constructVideoMimeType(this._videoProfile), this._constructAudioMimeType(this._audioProfile)]
        }, n.prototype.getResolvedURL = function () {
            return this._resolvedURL
        }, n.prototype.getLogData = function () {
            return this._logData
        }, n.prototype.getInitParams = function () {
            var t = {
                keySystem: this._keySystem,
                initDataType: this._protection,
                initData: this._psshBox,
                licenseServer: null
            };
            return r.resolve(t)
        }, n.prototype.isProtected = function () {
            return !!this._protection && !!this._psshBox
        }, n.prototype.getKeySystem = function () {
            return this._keySystem
        }, n.prototype.getMediaType = function () {
            return this._mediaType
        }, n.prototype.toLogJSON = function () {
            return {
                uri: this._uri,
                fileId: this._fileId,
                format: this._format,
                deviceId: this._logData && this._logData.deviceId || ""
            }
        }, t.exports = n
    }).call(e, i(1))
}, function (t, e, i) {
    "use strict";

    function n(t, e, i) {
        this._estimatedBandwidth = n.DEFAULT_BANDWIDTH_ESTIMATE, this._lastEstimatedBandwidths = [], this._maxResolution = Number.MAX_VALUE, this._videoVariants = [], this._audioVariants = [], this._videoVariant = null, this._audioVariant = null, this._switchCallback = function () {}, t && this.setVideoVariants(t), e && this.setAudioVariants(e), i && this.setSwitchCallback(i)
    }
    n.DEFAULT_BANDWIDTH_ESTIMATE = 512e3, n.MAX_BANDWIDTH_CONSUMPTION = .85, n.MAX_NUMBER_OF_SAMPLES = 3, n.prototype.segmentDownloaded = function (t, e) {
        var i = e / 1e3,
            r = t / i * 8,
            s = this._videoVariant && this._videoVariant.max_bitrate || 0,
            o = this._audioVariant && this._audioVariant.max_bitrate || 0,
            a = s + o;
        r * n.MAX_BANDWIDTH_CONSUMPTION < a ? this._lastEstimatedBandwidths = [] : this._lastEstimatedBandwidths.length === n.MAX_NUMBER_OF_SAMPLES && this._lastEstimatedBandwidths.shift(), this._lastEstimatedBandwidths.push(r);
        var _ = this._lastEstimatedBandwidths.length,
            c = this._lastEstimatedBandwidths.reduce(function (t, e) {
                return t + e / _
            }, 0);
        this.setBandwidth(c)
    }, n.prototype.setBandwidth = function (t) {
        this._estimatedBandwidth = t, this._updateVariant()
    }, n.prototype.getEstimatedBandwidth = function () {
        return this._estimatedBandwidth
    }, n.prototype.setMaxResolution = function (t) {
        this._maxResolution = t, this._updateVariant()
    }, n.prototype.setVideoVariants = function (t) {
        this._videoVariants = this._sortByBitrate(t), this._videoVariant = this._videoVariants[0] || null
    }, n.prototype.setAudioVariants = function (t) {
        this._audioVariants = this._sortByBitrate(t), this._audioVariant = this._audioVariants[0] || null
    }, n.prototype.getVideoVariant = function () {
        return this._videoVariant
    }, n.prototype.getAudioVariant = function () {
        return this._audioVariant
    }, n.prototype.setSwitchCallback = function (t) {
        this._switchCallback = t
    }, n.prototype._sortByBitrate = function (t) {
        return t.sort(function (t, e) {
            return t.max_bitrate - e.max_bitrate
        })
    }, n.prototype._getAvailableBandwidth = function () {
        return this._estimatedBandwidth * n.MAX_BANDWIDTH_CONSUMPTION
    }, n.prototype._updateVariant = function () {
        var t = this.getVideoVariant(),
            e = this.getAudioVariant(),
            i = this._getHighestQualityVariant(this._videoVariants),
            n = this._getHighestQualityVariant(this._audioVariants);
        (e !== n || t !== i) && (this._videoVariant = i, this._audioVariant = n, this._switchCallback(i, n))
    }, n.prototype._getHighestQualityVariant = function (t) {
        return t.filter(function (t) {
            var e = t.max_bitrate <= this._getAvailableBandwidth(),
                i = (t.video_resolution || 0) <= this._maxResolution;
            return e && i
        }.bind(this)).pop() || t[0] || null
    }, t.exports = n
}, function (t, e, i) {
    "use strict";
    (function (e) {
        function n(t) {
            c.call(this), this._transport = t.transport, this._noServerCertificate = t.noServerCertificate, this._ensureEMERobustness = t.ensureEMERobustness, this._preferredKeySystems = t.preferredKeySystems || [d.WIDEVINE, d.PLAYREADY, d.PLAYREADY_HARDWARE], this._keySystemDeferred = s.defer(), this._configuration = s.defer(), this._keySystemSettings = null, this._keySessions = []
        }
        var r = i(2),
            s = i(0),
            o = i(17),
            a = i(80),
            _ = i(16),
            c = i(3),
            u = i(7),
            h = i(4),
            d = i(27),
            p = i(81),
            l = i(30),
            E = i(84),
            f = i(5).forTag("playback.eme_manager"),
            T = /([^;]+)(?:;\s?codecs="(.*)")?/;
        r(n, c), n.create = function (t) {
            return new s(function (e) {
                if (!p.install()) throw new o(h.EME_API_NOT_SUPPORTED, "Platform does not support navigator.requestMediaKeySystemAccess").fatal();
                e(new n(t).init())
            })
        }, n.prototype._prepareConfiguration = function (t) {
            var e = t.getConfiguration(),
                i = {
                    keySystem: t.keySystem,
                    audioFormats: this._parseCapabilities(e.audioCapabilities),
                    videoFormats: this._parseCapabilities(e.videoCapabilities)
                };
            return this._keySystemSettings = l[t.keySystem], this._configuration.resolve(i), i
        }, n.prototype._parseCapabilities = function (t) {
            if (!t) return [];
            for (var e = [], i = 0, n = t.length; i < n; i++) {
                var r = t[i];
                if (r && r.contentType) {
                    var s = r.contentType.match(T);
                    e.push({
                        contentType: r.contentType,
                        mimeType: s[1],
                        codec: s[2]
                    })
                }
            }
            return e
        }, n.prototype._trySetServerCertificate = function (t, e) {
            return this._transport.request(t + "/v1/application-certificate", {
                authorize: !0,
                responseType: "arraybuffer",
                retry: {
                    condition: function (t, e) {
                        return t.getStatusFamily() === e.SERVER_ERROR
                    }
                }
            }).then(function (t) {
                return e.setServerCertificate(t.body)
            }).then(function () {
                return this
            }.bind(this)).catch(function (t) {
                return f.warn("Error from setting server certificate", t), this
            }.bind(this))
        }, n.prototype._extractPlayReadyChallenge = function (t, i) {
            var n = null,
                r = String.fromCharCode.apply(null, new e.Uint16Array(t));
            if (-1 === r.indexOf("PlayReadyKeyMessage")) return f.info("Using unextracted PlayReady message."), t;
            var s = (new e.DOMParser).parseFromString(r, "application/xml");
            if (s.getElementsByTagName("Challenge")[0]) try {
                n = atob(s.getElementsByTagName("Challenge")[0].childNodes[0].nodeValue);
                var a = s.getElementsByTagName("name"),
                    _ = s.getElementsByTagName("value");
                if (a.length !== _.length) throw new o(h.EME_HEADER_KEY_VALUE_MISMATCH, "Mismatched header <name>/<value> pair in key message")
            } catch (t) {
                this.emit(u.EME_LICENSE_REQUEST_ERROR, {
                    playId: i,
                    error: t
                }), n = null
            } else this.emit(u.EME_LICENSE_REQUEST_ERROR, {
                playId: i,
                error: new o(h.EME_HEADER_KEY_VALUE_MISMATCH, "Mismatched header <name>/<value> pair in key message")
            });
            return n
        }, n.prototype._onMessage = function (t, e, i, n, r, s) {
            this._logInterval(r, "end", _.LICENSE_MESSAGE_GENERATED), this._logInterval(r, "start", _.LICENSE_REQUEST_FINISHED), f.info("Got EME message event with type", s.messageType);
            var c = s.message;
            if (c && t === d.PLAYREADY && (c = this._extractPlayReadyChallenge(c, n)), !c) return void f.info("Ignoring message event: no valid request payload");
            this._transport.request(i, {
                method: "POST",
                payload: c,
                responseType: "arraybuffer",
                retry: {
                    condition: function (t, e) {
                        return 400 !== t.status && 402 !== t.status && 403 !== t.status && (!t.body || t.getStatusFamily() !== e.SUCCESS)
                    }
                }
            }).then(function (t) {
                if (this._logInterval(r, "end", _.LICENSE_REQUEST_FINISHED), this._logInterval(r, "start", _.LICENSE_SESSION_UPDATED), 200 === t.status)
                    if (t.body) {
                        var s = function (t) {
                            t.licenseServer = i, this.emit(u.EME_LICENSE_REQUEST_ERROR, {
                                playId: n,
                                error: t
                            })
                        }.bind(this);
                        try {
                            e.update(t.body).catch(s), f.info("KeySession updated.")
                        } catch (t) {
                            s(t)
                        }
                    } else {
                        var c = new o(h.EME_LICENSE_REQUEST_EMPTY_RESPONSE, "Empty license response body");
                        c.status = t.status, c.licenseServer = i, this.emit(u.EME_LICENSE_REQUEST_ERROR, {
                            playId: n,
                            error: c
                        })
                    }
                else if (402 === t.status) this.emit(u.EME_LICENSE_REQUEST_CAPPED, {
                    playId: n,
                    error: new a(h.CAPPING_USER_IS_CAPPED, "User is capped.")
                });
                else {
                    var d = new o(h.EME_LICENSE_REQUEST_FAILED_WITH_STATUS, "Empty license request");
                    d.status = t.status, d.shouldRefreshEndpoint = 400 === t.status || 403 === t.status, d.licenseServer = i, this.emit(u.EME_LICENSE_REQUEST_ERROR, {
                        playId: n,
                        error: d
                    })
                }
            }.bind(this))
        }, n.prototype._saveSession = function (t) {
            this._keySessions.push(t)
        }, n.prototype.destroySessions = function () {
            for (var t = [], e = this._keySessions, i = 0, n = e.length; i < n; i++) try {
                var r = e[i],
                    o = r.keySession;
                o.removeEventListener("message", r.onMessageListener), o.removeEventListener("keystatuseschange", r.onKeyStatusChangeListener);
                var a = s.resolve(o.close()).catch(function (t) {
                    f.warn("Failed to close KeySession", t)
                });
                t.push(a), r.keySession = null, r.onMessageListener = null, r.onKeyStatusChangeListener = null, f.info("Closed KeySession")
            } catch (t) {
                f.warn("Failed to close KeySession", t)
            }
            return this._keySessions = [], s.all(t)
        }, n.prototype.init = function () {
            for (var t = this._keySystemDeferred, i = e.navigator, n = {}, r = [], a = [], _ = 0, c = E.length; _ < c; _++) {
                var u = E[_],
                    p = u.label;
                this._ensureEMERobustness && -1 !== p.indexOf("no-robustness") || a.push(u)
            }
            for (var l in d) Object.prototype.hasOwnProperty.call(d, l) && r.push(i.requestMediaKeySystemAccess(d[l], a).then(function (t) {
                n[t.keySystem] = t
            }).catch(function () {}));
            return s.all(r).then(this._selectKeySystem.bind(this, n)).then(function (t) {
                return t ? this._testMediaKeys(t) : s.reject(new o(h.EME_NO_SUPPORTED_KEYSYSTEM, "No supported keysystem was found."))
            }.bind(this)).then(function (e) {
                return this._prepareConfiguration(e), t.resolve(e), this
            }.bind(this)).catch(function (e) {
                var i = e.code || h.EME_NO_SUPPORTED_KEYSYSTEM,
                    n = e.message || "No supported keysystem";
                return t.reject(new o(i, n).fatal()), t.promise
            })
        }, n.prototype._selectKeySystem = function (t) {
            for (var e = this._preferredKeySystems, i = 0, n = e.length; i < n; i++) {
                var r = e[i];
                if (r in t) return t[r]
            }
            return null
        }, n.prototype._testMediaKeys = function (t) {
            return new s(function (e) {
                e(t.createMediaKeys())
            }).then(function (e) {
                if (!e) return s.reject(new o(h.EME_MEDIA_KEYS_NOT_SUPPORTED, "Cannot create MediaKeys from KeySystemAccess").fatal());
                try {
                    if (!e.createSession()) throw new Error("")
                } catch (t) {
                    return s.reject(new o(h.EME_MEDIA_KEY_SESSION_NOT_SUPPORTED, t.message || "Cannot create MediaKeySession from KeySystemAccess").fatal())
                }
                return t
            }, function (t) {
                return f.error(t.name), s.reject(new o(h.EME_MEDIA_KEYS_NOT_SUPPORTED, t.message || "Unknown error").fatal())
            })
        }, n.prototype.createMediaKeys = function (t) {
            return this._keySystemDeferred.promise.then(function (t) {
                return t.createMediaKeys()
            }).then(function (e) {
                return s.all([t.setMediaKeys(e), e])
            }).spread(function (e, i) {
                if (!t.mediaKeys) throw new o(h.EME_PLAYER_MEDIA_KEYS_SETTING_FAILED, "Failed to set MediaKeys on HTMLMediaElement");
                return this._configuration.promise.then(function () {
                    var t = this._keySystemSettings;
                    return this._noServerCertificate || !t.withCertificate ? this : this._trySetServerCertificate(t.licenseServer, i)
                }.bind(this))
            }.bind(this))
        }, n.prototype.removeMediaKeys = function (t) {
            return s.resolve(t.setMediaKeys(null)).then(function () {
                return this
            }.bind(this))
        }, n.prototype.getKeySystemInfo = function () {
            return this._configuration.promise
        }, n.prototype.createSessionWithParams = function (t) {
            return new s(function (e) {
                f.info("Creating KeySession", t.keySystem);
                var i = t.mediaKeys.createSession(),
                    n = t.licenseServer || this._keySystemSettings.licenseServer,
                    r = t.intervalTimer,
                    s = t.playId,
                    o = this._onMessage.bind(this, t.keySystem, i, n, s, r);
                i.addEventListener(u.KEY_SESSION_MESSAGE, o);
                var a = function () {
                    f.info("KeyStatus change"), r && r.end(_.LICENSE_SESSION_UPDATED), e(!0)
                };
                i.addEventListener(u.KEY_SESSION_STATUSES_CHANGE, a), this._saveSession({
                    keySession: i,
                    onMessageListener: o,
                    onKeyStatusChangeListener: a
                }), this._logInterval(r, "end", _.LICENSE_SESSION_CREATED), this._logInterval(r, "start", _.LICENSE_MESSAGE_GENERATED), f.info("Generating KeySession request", t.keySystem), i.generateRequest(t.initDataType, t.initData.buffer)
            }.bind(this))
        }, n.prototype._logInterval = function (t, e, i) {
            t && t[e](i)
        }, t.exports = n
    }).call(e, i(1))
}, function (t, e, i) {
    "use strict";

    function n(t, e) {
        Error.call(this, t), this.code = t, this.message = e
    }
    n.prototype = new Error, n.prototype.constructor = n, n.prototype.name = "CappingError", t.exports = n
}, function (t, e, i) {
    "use strict";
    (function (e) {
        var n = i(5).forTag("eme_polyfills.tester"),
            r = i(82),
            s = i(83);
        t.exports = {
            install: function () {
                var t = e.navigator;
                return t && t.requestMediaKeySystemAccess && e.MediaKeySystemAccess && e.MediaKeySystemAccess.prototype.getConfiguration ? (n.log("Using native EME implementation."), !0) : e.HTMLMediaElement && e.HTMLMediaElement.prototype.webkitGenerateKeyRequest ? (n.log('Detected "webkit" Prefixed EME v0.1b. Polyfilling.'), s.setup("webkit"), !0) : e.HTMLMediaElement && e.HTMLMediaElement.prototype.generateKeyRequest ? (n.log("Detected Unprefixed EME v0.1b. Polyfilling."), s.setup(), !0) : e.MSMediaKeys ? (n.log("Detected MS IE EME. Polyfilling."), r.setup(), !0) : (n.warn("Detected no EME APIs."), !1)
            }
        }
    }).call(e, i(1))
}, function (t, e, i) {
    "use strict";
    (function (e) {
        function n(t) {
            var e = this.mediaKeys;
            return e && e !== t && e.detach(this), delete this.mediaKeys, this.mediaKeys = t, t ? t.attach(this) : c.resolve()
        }

        function r(t, e) {
            if (this.keySystem = t, this._configuration = null, !this._checkConfig(e)) throw new d(h.EME_NO_SUPPORTED_CONFIGURATION, "No supported configurations")
        }

        function s(t) {
            this._nativeMediaKeys = new e.MSMediaKeys(t), this._lastBoundSetter = null, this.shouldRefreshPerTrack = !0
        }

        function o(t) {
            _.call(this), this._nativeMediaKeys = t, this._nativeKeySession = null, this._lastUpdateDeferred = null, this._lastGenerateDeferred = null, this.addEventListener = this.addListener, this.removeEventListener = this.removeListener, this._onKeyMessage = this._onKeyMessage.bind(this), this._onKeyAdded = this._onKeyAdded.bind(this), this._onKeyError = this._onKeyError.bind(this)
        }
        var a = i(2),
            _ = i(3),
            c = i(0),
            u = i(7),
            h = i(4),
            d = i(17);
        r.prototype._checkConfig = function (t) {
            for (var i = this.keySystem, n = !1, r = 0, s = t.length; r < s; r++) {
                var o, a, _, c, u = t[r],
                    h = {
                        initDataTypes: u.initiDataTypes,
                        audioCapabilities: [],
                        videoCapabilities: [],
                        persistentState: "optional",
                        distinctiveIdentifier: "optional",
                        sessionTypes: ["temporary"]
                    };
                if (u.audioCapabilities)
                    for (o = 0, a = u.audioCapabilities.length; o < a; o++) _ = u.audioCapabilities[o], c = _.contentType.split(";")[0], e.MSMediaKeys.isTypeSupported(i, c) && (h.audioCapabilities.push(_), n = !0);
                if (u.videoCapabilities)
                    for (o = 0, a = u.videoCapabilities.length; o < a; o++) _ = u.videoCapabilities[o], c = _.contentType.split(";")[0], e.MSMediaKeys.isTypeSupported(i, c) && (h.videoCapabilities.push(_), n = !0);
                if (n) return this._configuration = h, !0
            }
            return !1
        }, r.prototype.getConfiguration = function () {
            return this._configuration
        }, r.prototype.createMediaKeys = function () {
            var t = this.keySystem;
            return new c(function (e) {
                e(new s(t))
            })
        }, s.prototype.attach = function (t) {
            return new c(function (e) {
                if (t.readyState >= 1) return t.msSetMediaKeys(this._nativeMediaKeys), void e();
                var i = function () {
                    t.removeEventListener(u.MEDIA_LOADEDMETADATA, i), this._lastBoundSetter = null, t.msSetMediaKeys(this._nativeMediaKeys)
                }.bind(this);
                this._lastBoundSetter = i, t.addEventListener(u.MEDIA_LOADEDMETADATA, i), e()
            }.bind(this))
        }, s.prototype.detach = function (t) {
            this._lastBoundSetter && (t.removeEventListener(u.MEDIA_LOADEDMETADATA, this._lastBoundSetter), this._lastBoundSetter = null)
        }, s.prototype.setServerCertificate = function () {
            return c.reject(new d(h.EME_CANNOT_SET_CERTIFICATE_FOR_PLATFORM, "Cannot set server certificate on this platform."))
        }, s.prototype.createSession = function () {
            return new o(this._nativeMediaKeys)
        }, a(o, _), o.prototype._attach = function () {
            var t = this._nativeKeySession;
            t.addEventListener(u.MS_KEY_ADDED, this._onKeyAdded), t.addEventListener(u.MS_KEY_ERROR, this._onKeyError), t.addEventListener(u.MS_KEY_MESSAGE, this._onKeyMessage)
        }, o.prototype._detach = function () {
            var t = this._nativeKeySession;
            t.removeEventListener(u.MS_KEY_ADDED, this._onKeyAdded), t.removeEventListener(u.MS_KEY_ERROR, this._onKeyError), t.removeEventListener(u.MS_KEY_MESSAGE, this._onKeyMessage)
        }, o.prototype._onKeyMessage = function (t) {
            t.message && t.message.buffer && (this.emit(u.KEY_SESSION_MESSAGE, {
                messageType: "license-request",
                message: t.message.buffer
            }), this._lastGenerateDeferred && (this._lastGenerateDeferred.resolve(!0), this._lastGenerateDeferred = null))
        }, o.prototype._onKeyAdded = function () {
            this._lastUpdateDeferred && (this._lastUpdateDeferred.resolve(!0), this._lastUpdateDeferred = null), this._lastGenerateDeferred && (this._lastGenerateDeferred.resolve(!0), this._lastGenerateDeferred = null), this.emit(u.KEY_SESSION_STATUSES_CHANGE)
        }, o.prototype._onKeyError = function () {
            var t = this._nativeKeySession.error;
            this._lastGenerateDeferred && (this._lastGenerateDeferred.reject(t), this._lastGenerateDeferred = null), this._lastUpdateDeferred && (this._lastUpdateDeferred.reject(t), this._lastUpdateDeferred = null), this.emit(u.KEY_SESSION_STATUSES_CHANGE)
        }, o.prototype.generateRequest = function (t, i) {
            return new c(function (t, n) {
                this._lastGenerateDeferred = {
                    resolve: t,
                    reject: n
                }, this._nativeKeySession = this._nativeMediaKeys.createSession("audio/mp4", new e.Uint8Array(i), null), this._attach()
            }.bind(this))
        }, o.prototype.update = function (t) {
            return new c(function (i, n) {
                this._lastUpdateDeferred = {
                    resolve: i,
                    reject: n
                }, this._nativeKeySession.update(new e.Uint8Array(t))
            }.bind(this))
        }, o.prototype.close = function () {
            return new c(function (t) {
                this._nativeKeySession.close(), this._detach(), t(!0)
            }.bind(this))
        }, t.exports = {
            setup: function () {
                e.navigator.requestMediaKeySystemAccess = function (t, e) {
                    return new c(function (i) {
                        i(new r(t, e))
                    })
                };
                var t = e.HTMLMediaElement;
                t && (delete t.prototype.mediaKeys, t.prototype.setMediaKeys = n)
            }
        }
    }).call(e, i(1))
}, function (t, e, i) {
    "use strict";
    (function (e) {
        function n(t) {
            var e = this.mediaKeys;
            return e && e !== t && e.detach(this), delete this.mediaKeys, this.mediaKeys = t, t && t.attach(this), c.resolve()
        }

        function r(t, e, i) {
            if (this.keySystem = t, this._configuration = null, this._prefix = i, !this._checkConfig(e)) throw new d(h.EME_NO_SUPPORTED_CONFIGURATION, "No supported configurations")
        }

        function s(t, e) {
            this._keySystem = t, this._prefix = e, this._mediaElement = null, this._waitingForSessionIds = [], this._sessionMap = {}, this.shouldRefreshPerTrack = !0, this._onKeyMessage = this._onKeyMessage.bind(this), this._onKeyAdded = this._onKeyAdded.bind(this), this._onKeyError = this._onKeyError.bind(this)
        }

        function o(t, e, i) {
            _.call(this), this._keySystem = t, this._mediaElement = e, this._prefix = i, this._lastUpdateDeferred = null, this._lastGenerateDeferred = null, this.sessionId = null, this.addEventListener = this.addListener, this.removeEventListener = this.removeListener
        }
        var a = i(2),
            _ = i(3),
            c = i(0),
            u = i(7),
            h = i(4),
            d = i(17),
            p = i(5).forTag("eme_polyfill.v0_1b");
        r.prototype._checkConfig = function (t) {
            for (var e = this.keySystem, i = document.createElement("video"), n = !1, r = 0, s = t.length; r < s; r++) {
                var o, a, _, c, u = t[r],
                    h = {
                        initDataTypes: u.initiDataTypes,
                        audioCapabilities: [],
                        videoCapabilities: [],
                        persistentState: "optional",
                        distinctiveIdentifier: "optional",
                        sessionTypes: ["temporary"]
                    };
                if (u.audioCapabilities)
                    for (o = 0, a = u.audioCapabilities.length; o < a; o++) _ = u.audioCapabilities[o], c = _.contentType.split(";")[0], i.canPlayType(c, e) && (h.audioCapabilities.push(_), n = !0);
                if (u.videoCapabilities)
                    for (o = 0, a = u.videoCapabilities.length; o < a; o++) _ = u.videoCapabilities[o], c = _.contentType, i.canPlayType(c, e) && (h.videoCapabilities.push(_), n = !0);
                if (n) return this._configuration = h, !0
            }
            return !1
        }, r.prototype.getConfiguration = function () {
            return this._configuration
        }, r.prototype.createMediaKeys = function () {
            var t = this.keySystem,
                e = this._prefix;
            return new c(function (i) {
                i(new s(t, e))
            })
        }, s.prototype.attach = function (t) {
            this._mediaElement = t;
            var e = this._prefix;
            t.addEventListener(e + u.V0_1B_KEY_ADDED, this._onKeyAdded), t.addEventListener(e + u.V0_1B_KEY_ERROR, this._onKeyError), t.addEventListener(e + u.V0_1B_KEY_MESSAGE, this._onKeyMessage)
        }, s.prototype.detach = function (t) {
            this._mediaElement = null;
            var e = this._prefix;
            t.removeEventListener(e + u.V0_1B_KEY_ADDED, this._onKeyAdded), t.removeEventListener(e + u.V0_1B_KEY_ERROR, this._onKeyError), t.removeEventListener(e + u.V0_1B_KEY_MESSAGE, this._onKeyMessage)
        }, s.prototype._getSession = function (t) {
            var e = this._sessionMap[t];
            if (e) return e;
            var i = this._waitingForSessionIds.shift();
            return i ? (i.sessionId = t, this._sessionMap[t] = i, i) : null
        }, s.prototype._onKeyMessage = function (t) {
            var e = this._getSession(t.sessionId);
            if (!e) return void p.warn("Got keymessage without session.");
            e.generateComplete(t.message)
        }, s.prototype._onKeyAdded = function (t) {
            var e = this._getSession(t.sessionId);
            if (!e) return void p.warn("Got keyadded without session.");
            e.updateComplete()
        }, s.prototype._onKeyError = function (t) {
            var e = this._getSession(t.sessionId);
            if (!e) return void p.warn("Got keyerror without session.");
            e.handleErrorEvent(t)
        }, s.prototype.setServerCertificate = function () {
            return c.reject(new d(h.EME_CANNOT_SET_CERTIFICATE_FOR_PLATFORM, "Cannot set server certificate on this platform."))
        }, s.prototype.createSession = function () {
            var t = new o(this._keySystem, this._mediaElement, this._prefix);
            return this._waitingForSessionIds.push(t), t
        }, a(o, _), o.prototype._addPrefix = function (t) {
            return this._prefix ? this._prefix + t.replace(/\b[a-z]/, function (t) {
                return t.toUpperCase()
            }) : t
        }, o.prototype.generateComplete = function (t) {
            this.emit(u.KEY_SESSION_MESSAGE, {
                messageType: "license-request",
                message: t
            }), this._lastGenerateDeferred && (this._lastGenerateDeferred.resolve(!0), this._lastGenerateDeferred = null)
        }, o.prototype.updateComplete = function () {
            this._lastUpdateDeferred && (this._lastUpdateDeferred.resolve(!0), this._lastUpdateDeferred = null), this.emit(u.KEY_SESSION_STATUSES_CHANGE)
        }, o.prototype.handleErrorEvent = function (t) {
            var e = new d(h.EME_MEDIA_KEY_SESSION_V0_1B_ERROR, "MediaKeySession v0.1b Error");
            e.debug.errorCode = t.errorCode, e.debug.systemCode = t.systemCode, !t.sessionId && this._lastGenerateDeferred ? (this._lastGenerateDeferred.reject(e), this._lastGenerateDeferred = null) : t.sessionId && this._lastUpdateDeferred ? (this._lastUpdateDeferred.reject(e), this._lastUpdateDeferred = null) : this.emit(u.KEY_SESSION_STATUSES_CHANGE)
        }, o.prototype.generateRequest = function (t, i) {
            return new c(function (t, n) {
                this._lastGenerateDeferred = {
                    resolve: t,
                    reject: n
                };
                try {
                    this._mediaElement[this._addPrefix("generateKeyRequest")](this._keySystem, new e.Uint8Array(i))
                } catch (t) {
                    n(t), this._lastGenerateDeferred = null
                }
            }.bind(this))
        }, o.prototype.update = function (t) {
            if (this._lastUpdateDeferred) {
                var i = this.update.bind(this, t);
                return this._lastUpdateDeferred.promise.then(i, i)
            }
            var n = c.defer();
            this._lastUpdateDeferred = n;
            try {
                this._mediaElement[this._addPrefix("addKey")](this._keySystem, new e.Uint8Array(t), null, this.sessionId)
            } catch (t) {
                n.reject(t), this._lastUpdateDeferred = null
            }
            return n.promise
        }, o.prototype.close = function () {
            if (this.sessionId) try {
                this._mediaElement[this._addPrefix("cancelKeyRequest")](this._keySystem, this.sessionId)
            } catch (t) {
                p.warn("Could not close keysession", t)
            }
            return c.resolve(!0)
        }, t.exports = {
            setup: function (t) {
                e.navigator.requestMediaKeySystemAccess = function (e, i) {
                    return new c(function (n) {
                        n(new r(e, i, t))
                    })
                };
                var i = e.HTMLMediaElement;
                i && (delete i.prototype.mediaKeys, i.prototype.setMediaKeys = n)
            }
        }
    }).call(e, i(1))
}, function (t, e, i) {
    "use strict";
    t.exports = [{
        label: "audio-video-webm-secure-decode",
        initDataTypes: ["cenc"],
        audioCapabilities: [{
            contentType: 'audio/mp4; codecs="mp4a.40.2"',
            robustness: "SW_SECURE_CRYPTO"
        }, {
            contentType: 'audio/webm;codecs="opus"',
            robustness: "SW_SECURE_CRYPTO"
        }],
        videoCapabilities: [{
            contentType: 'video/webm;codecs="vp8"',
            robustness: "SW_SECURE_DECODE"
        }],
        distinctiveIdentifier: "optional",
        persistenceState: "optional",
        sessionTypes: ["temporary"]
    }, {
        label: "audio-video-webm-secure-crypto",
        initDataTypes: ["cenc"],
        audioCapabilities: [{
            contentType: 'audio/mp4; codecs="mp4a.40.2"',
            robustness: "SW_SECURE_CRYPTO"
        }, {
            contentType: 'audio/webm;codecs="opus"',
            robustness: "SW_SECURE_CRYPTO"
        }],
        videoCapabilities: [{
            contentType: 'video/webm;codecs="vp8"',
            robustness: "SW_SECURE_CRYPTO"
        }],
        distinctiveIdentifier: "optional",
        persistenceState: "optional",
        sessionTypes: ["temporary"]
    }, {
        label: "audio-video-webm-no-robustness",
        initDataTypes: ["cenc"],
        audioCapabilities: [{
            contentType: 'audio/mp4; codecs="mp4a.40.2"',
            robustness: ""
        }, {
            contentType: 'audio/webm;codecs="opus"',
            robustness: ""
        }],
        videoCapabilities: [{
            contentType: 'video/webm;codecs="vp8"',
            robustness: ""
        }],
        distinctiveIdentifier: "optional",
        persistenceState: "optional",
        sessionTypes: ["temporary"]
    }, {
        label: "audio-video-avc1-secure-decode",
        initDataTypes: ["cenc"],
        audioCapabilities: [{
            contentType: 'audio/mp4; codecs="mp4a.40.2"',
            robustness: "SW_SECURE_CRYPTO"
        }],
        videoCapabilities: [{
            contentType: 'video/mp4; codecs="avc1.4d401f"',
            robustness: "SW_SECURE_DECODE"
        }],
        distinctiveIdentifier: "optional",
        persistenceState: "optional",
        sessionTypes: ["temporary"]
    }, {
        label: "audio-video-avc1-secure-crypto",
        initDataTypes: ["cenc"],
        audioCapabilities: [{
            contentType: 'audio/mp4; codecs="mp4a.40.2"',
            robustness: "SW_SECURE_CRYPTO"
        }],
        videoCapabilities: [{
            contentType: 'video/mp4; codecs="avc1.4d401f"',
            robustness: "SW_SECURE_CRYPTO"
        }],
        distinctiveIdentifier: "optional",
        persistenceState: "optional",
        sessionTypes: ["temporary"]
    }, {
        label: "audio-video-avc1-no-robustness",
        initDataTypes: ["cenc"],
        audioCapabilities: [{
            contentType: 'audio/mp4; codecs="mp4a.40.2"',
            robustness: ""
        }],
        videoCapabilities: [{
            contentType: 'video/mp4; codecs="avc1.4d401f"',
            robustness: ""
        }],
        distinctiveIdentifier: "optional",
        persistenceState: "optional",
        sessionTypes: ["temporary"]
    }, {
        label: "audio-video-mp2t-secure-decode",
        initDataTypes: ["cenc"],
        audioCapabilities: [{
            contentType: 'audio/mp4; codecs="mp4a.40.2"',
            robustness: "SW_SECURE_CRYPTO"
        }, {
            contentType: 'audio/mp2t; codecs="mp4a.40.2"',
            robustness: "SW_SECURE_CRYPTO"
        }],
        videoCapabilities: [{
            contentType: 'video/mp2t; codecs="avc1.4d401f"',
            robustness: "SW_SECURE_DECODE"
        }],
        distinctiveIdentifier: "optional",
        persistenceState: "optional",
        sessionTypes: ["temporary"]
    }, {
        label: "audio-video-mp2t-secure-crypto",
        initDataTypes: ["cenc"],
        audioCapabilities: [{
            contentType: 'audio/mp4; codecs="mp4a.40.2"',
            robustness: "SW_SECURE_CRYPTO"
        }, {
            contentType: 'audio/mp2t; codecs="mp4a.40.2"',
            robustness: "SW_SECURE_CRYPTO"
        }],
        videoCapabilities: [{
            contentType: 'video/mp2t; codecs="avc1.4d401f"',
            robustness: "SW_SECURE_CRYPTO"
        }],
        distinctiveIdentifier: "optional",
        persistenceState: "optional",
        sessionTypes: ["temporary"]
    }, {
        label: "audio-video-mp2t-no-robustness",
        initDataTypes: ["cenc"],
        audioCapabilities: [{
            contentType: 'audio/mp4; codecs="mp4a.40.2"',
            robustness: ""
        }, {
            contentType: 'audio/mp2t; codecs="mp4a.40.2"',
            robustness: ""
        }],
        videoCapabilities: [{
            contentType: 'video/mp2t; codecs="avc1.4d401f"',
            robustness: ""
        }],
        distinctiveIdentifier: "optional",
        persistenceState: "optional",
        sessionTypes: ["temporary"]
    }, {
        label: "audio-only-sw-crypto",
        initDataTypes: ["cenc"],
        audioCapabilities: [{
            contentType: 'audio/mp4; codecs="mp4a.40.2"',
            robustness: "SW_SECURE_CRYPTO"
        }],
        distinctiveIdentifier: "optional",
        persistenceState: "optional",
        sessionTypes: ["temporary"]
    }, {
        label: "audio-only-no-robustness",
        initDataTypes: ["cenc"],
        audioCapabilities: [{
            contentType: 'audio/mp4; codecs="mp4a.40.2"',
            robustness: ""
        }],
        distinctiveIdentifier: "optional",
        persistenceState: "optional",
        sessionTypes: ["temporary"]
    }]
}, function (t, e, i) {
    "use strict";

    function n(t) {
        return Math.ceil(1e3 * t)
    }

    function r(t, e) {
        o.call(this), this._mediaSource = null, this._sourceBuffers = {}, this._appendingFragments = [], this._updateQueue = [], this._codecs = e || [], this._playId = 0, this._lastBufferClearTime = Date.now(), this._tracker = t, this._onSourceOpen = this._onSourceOpen.bind(this), this._onSourceClose = this._onSourceClose.bind(this), this.dequeueUpdates = this.dequeueUpdates.bind(this), this._init()
    }
    var s = i(2),
        o = i(3),
        a = i(0),
        _ = i(7),
        c = i(5).forTag("playback.acme_buffer");
    s(r, o), r.create = function (t, e) {
        return new r(t, e)
    }, r.prototype._init = function () {
        var t = new MediaSource;
        t.addEventListener(_.MEDIA_SOURCE_OPEN, this._onSourceOpen), t.addEventListener(_.MEDIA_SOURCE_CLOSE, this._onSourceClose), this._mediaSource = t, this._sourceBuffers = {}
    }, r.prototype._onSourceOpen = function () {
        c.info("MediaSource opened.");
        var t = this._mediaSource;
        if (0 === t.sourceBuffers.length && "open" === t.readyState) {
            c.info("Creating source buffers for codecs", this._codecs);
            for (var e = 0, i = this._codecs.length; e < i; e++) this._addSourceBuffer(this._codecs[e])
        }
        this.dequeueUpdates(), this.emit(_.BUFFER_SOURCE_OPEN)
    }, r.prototype._onSourceClose = function () {
        c.info("MediaSource closed."), this.emit(_.BUFFER_SOURCE_CLOSE)
    }, r.prototype._removeAppendingFragment = function (t) {
        if (t) {
            var e = this._appendingFragments,
                i = e.indexOf(t); - 1 !== i && e.splice(i, 1)
        }
    }, r.prototype.dequeueUpdates = function () {
        this._updateQueue.length && this.tryUpdate(this._updateQueue.shift())
    }, r.prototype._addSourceBuffer = function (t) {
        var e = this._mediaSource.addSourceBuffer(t);
        e.addEventListener(_.SOURCE_BUFFER_UPDATE_END, this.dequeueUpdates.bind(this)), this._sourceBuffers[t] = e
    }, r.prototype.appendFragment = function (t, e, i) {
        if (-1 !== this._appendingFragments.indexOf(e)) return a.resolve([!1]);
        this._appendingFragments.push(e), this.emit(_.BUFFERING_START);
        var n = Date.now(),
            r = this._playId,
            s = t.getMediaType(),
            o = t.toLogJSON();
        return t.getBufferForFragment(e).then(function (t) {
            return r !== this._playId ? (c.info("Append fragment dropped: playId has changed."), [!1]) : (i || this._checkStalling(Date.now() - n, e, !1), this._appendBufferData(s, t, e, r, n))
        }.bind(this)).catch(function (t) {
            return this._removeAppendingFragment(e), i || this._checkStalling(Date.now() - n, e, !0), this.emit(_.BUFFER_APPEND_ERROR, {
                error: t,
                canPlayNext: !0,
                track: o
            }), a.reject(t)
        }.bind(this))
    }, r.prototype._checkStalling = function (t, e, i) {
        t > 9e3 && (this._tracker.trackStutter(), this.emit(_.BUFFER_STALLED, {
            byteStart: e.byteStart,
            timeStart: n(e.timeStart),
            stallAmount: t - 9e3,
            didTimeout: i
        }))
    }, r.prototype._appendBufferData = function (t, e, i, n, r) {
        this.emit(_.BUFFERING_END);
        var s, o = "video" === t;
        s = o ? [e.audio, e.video] : [e];
        for (var c, u = r || Date.now(), h = [], d = 0; d < s.length; d++) {
            c = a.defer();
            var p = o ? s[d].codec : i.codec;
            this.tryUpdate({
                playId: n,
                timestamp: u,
                type: "append",
                buffer: o ? s[d].buffer : s[d],
                fragment: i,
                codec: p,
                init: i.init,
                resolve: c.resolve
            }), h.push(c.promise)
        }
        return a.all(h)
    }, r.prototype._appendUpdate = function (t) {
        var e = this._sourceBuffers[t.codec];
        if (!e || e.updating) return void this._updateQueue.push(t);
        this._removeAppendingFragment(t.fragment);
        try {
            e.appendBuffer(t.buffer)
        } catch (e) {
            if ("QuotaExceededError" === e.name && this.emitSync(_.BUFFER_QUOTA_EXCEEDED), c.warn("Failed to append buffer", e), a.resolve().then(this.dequeueUpdates.bind(this)).then(function () {
                    if (t.init) return void this._updateQueue.push(t)
                }.bind(this)), t.init) return
        }
        t.resolve && t.resolve(!0)
    }, r.prototype.abort = function (t) {
        if (this._lastBufferClearTime = Date.now(), this._mediaSource)
            for (var e = this._mediaSource.sourceBuffers, i = 0, n = e.length; i < n; i++)
                if ("open" === this._mediaSource.readyState) {
                    var r = e[i];
                    try {
                        r.abort();
                        var s = r.buffered;
                        if (t && s.length) {
                            var o = s.start(0),
                                a = s.end(s.length - 1);
                            r.remove(o, a), c.info("Cleared buffer range", o, a)
                        }
                    } catch (t) {
                        c.warn("ACMEBuffer.clear failed.", t)
                    }
                }
        this._appendingFragments = []
    }, r.prototype._getBufferedFor = function (t) {
        var e = this._mediaSource.sourceBuffers && this._mediaSource.sourceBuffers.length > 0 && this._mediaSource.sourceBuffers[0].buffered;
        if (e)
            for (var i, n, r = 0; r < e.length; r++)
                if (i = e.start(r), n = e.end(r), i <= t && t <= n) return {
                    start: i,
                    end: n
                };
        return null
    }, r.prototype.getMediaSource = function () {
        return this._mediaSource
    }, r.prototype.tryUpdate = function (t) {
        if (t) {
            if (t.playId !== this._playId) return c.info("Try update dropped: playId has changed"), void this._abortUpdate(t);
            if (t.timestamp < this._lastBufferClearTime) return c.info("Try update dropped: update is older than the last clear"), void this._abortUpdate(t);
            var e = this._mediaSource;
            "open" !== e.readyState && "ended" !== e.readyState ? this._updateQueue.push(t) : this._processUpdate(t)
        }
    }, r.prototype._abortUpdate = function (t) {
        t.fragment && this._removeAppendingFragment(t.fragment), t.resolve && t.resolve(!1), a.resolve().then(this.dequeueUpdates.bind(this))
    }, r.prototype._processUpdate = function (t) {
        "end" === t.type ? this._endUpdate(t) : "duration" === t.type ? this._durationUpdate(t) : "append" === t.type && this._appendUpdate(t)
    }, r.prototype._isUpdating = function () {
        for (var t = this._mediaSource, e = t.sourceBuffers, i = 0, n = e.length; i < n; i++) {
            var r = e[i];
            if (r && r.updating) return !0
        }
        return !1
    }, r.prototype._endUpdate = function (t) {
        this._isUpdating() ? this._updateQueue.push(t) : "open" === this._mediaSource.readyState && (this._mediaSource.endOfStream(), t.resolve && t.resolve(!0))
    }, r.prototype._durationUpdate = function (t) {
        this._isUpdating() ? this._updateQueue.push(t) : (this._mediaSource.duration = t.duration, t.resolve && t.resolve(!0))
    }, r.prototype.destroy = function () {
        var t = this._mediaSource;
        if (t) {
            c.info("Source destroyed"), t.removeEventListener("sourceopen", this._onSourceOpen), t.removeEventListener("sourceclose", this._onSourceClose);
            var e = t.sourceBuffers;
            if (e.length)
                for (var i = 0, n = e.length; i < n; i++) {
                    var r = e[i];
                    r.removeEventListener("updateend", this.dequeueUpdates);
                    try {
                        t.removeSourceBuffer(r), c.info("Removed source buffer")
                    } catch (t) {
                        c.warn("Failed to remove sourcebuffer", t)
                    }
                }
            this._sourceBuffers = {}, this._mediaSource = null
        }
    }, r.prototype._endOfStream = function () {
        "ended" !== this._mediaSource.readyState && this.tryUpdate({
            playId: this._playId,
            timestamp: Date.now(),
            type: "end"
        })
    }, r.prototype.progress = function (t, e, i) {
        var n = this._mediaSource;
        if (n && t && ("open" === n.readyState || "ended" === n.readyState)) {
            var r, s, o = this._getBufferedFor(i),
                a = "video" === t.getMediaType();
            if (o) i + 10 > o.end && (s = a ? Math.floor(o.end) : o.end, r = t.getFragmentAfterTime(s), r ? this.appendFragment(t, r, e) : this._endOfStream());
            else if ((r = t.getFragmentForTime(i)) && (this.appendFragment(t, r, e), r.timeEnd < i + 5)) {
                s = a ? Math.floor(i) : i;
                var _ = t.getFragmentAfterTime(s);
                _ ? this.appendFragment(t, _, e) : this._endOfStream()
            }
        }
    }, r.prototype.recreate = function (t) {
        this.abort(), this.destroy(), this._codecs = t, this._init()
    }, r.prototype.setDuration = function (t) {
        this.tryUpdate({
            playId: this._playId,
            timestamp: Date.now(),
            type: "duration",
            duration: t
        })
    }, r.prototype.setPlayId = function (t) {
        this._playId = t
    }, t.exports = r
}, function (t, e, i) {
    "use strict";

    function n(t) {
        var e = t || {};
        this._playedThreshold = e.playedThreshold || u, this._playedThresholdReached = !1, this._trackingData = null, this._totalStreamTime = 0
    }
    var r = i(2),
        s = i(3),
        o = i(87),
        a = i(31),
        _ = i(7),
        c = i(5).forTag("playback.tracker"),
        u = 31e3;
    r(n, s), n.create = function (t) {
        return new n(t)
    }, n.prototype._checkPlayedThreshold = function () {
        var t = this._trackingData;
        !t || this._playedThresholdReached || t.msPlayed < this._playedThreshold || (this._playedThresholdReached = !0, this.emit(_.TRACKER_PLAYED_THRESHOLD_REACHED, {
            played: t.msPlayed,
            threshold: this._playedThreshold
        }))
    }, n.prototype.trackLoadStart = function (t, e, i) {
        var n = o.create();
        this._trackingData = n, this._playedThresholdReached = !1, n.fileId = e, n.currentTrackUri = t, n.lastPlayRequestTime = Date.now(), n.displayTrack = i.displayTrack || a.EMPTY, n.playContext = i.playContext || a.EMPTY, n.reasonStart = i.reason || a.UNKNOWN, n.sourceStart = i.source || a.UNKNOWN;
        var r = i.referrer || {};
        n.referrer = r.name || a.UNKNOWN, n.referrerVersion = r.version || a.UNKNOWN, n.referrerVendor = r.vendor || a.UNKNOWN;
        var s = i.format || {};
        s.codec && (n.audiocodec = s.codec), s.bitrate && (n.bitrate = s.bitrate), n.gaiaDevId = i.deviceId || "none", n.playbackId = i.playbackId || null, n.noLog = "noLog" in i && i.noLog, this.emit(_.TRACKER_TRACKING_DATA_CREATED, {
            data: n
        })
    }, n.prototype.trackLoadDone = function (t) {
        var e = this._trackingData;
        if (e) {
            var i = Date.now();
            e.msPlayLatency = i - e.lastPlayRequestTime, e.lastPlayStartTime = i, e.position = t, e.addStartSegment()
        }
    }, n.prototype.trackPlayIntended = function (t) {
        this._trackingData.playIntended = !!t
    }, n.prototype.trackLoadFailed = function () {
        var t = this._trackingData;
        t && (t.msPlayLatency = Date.now() - t.lastPlayRequestTime, t.position = 0, t.addStartSegment())
    }, n.prototype.trackStutter = function () {
        var t = this._trackingData;
        t && t.nStutter++
    }, n.prototype.trackStopped = function (t) {
        var e = t || {},
            i = this._trackingData;
        i && !i.isFinalized() && (i.lastPlayStartTime && (i.addMSPlayed(Date.now() - i.lastPlayStartTime), this._checkPlayedThreshold()), i.addEndSegment(), i.sourceEnd = e.source || a.UNKNOWN, i.reasonEnd = e.reason || a.UNKNOWN, i.nextPlaybackId = e.playbackId || a.EMPTY, i.finalize(), this._totalStreamTime += i.msPlayed, c.info("Tracker data finalized."), this.emit(_.TRACKER_TRACKING_DATA_FINALIZED, {
            data: i
        }))
    }, n.prototype.trackPositionChanged = function (t, e) {
        var i = this._trackingData;
        if (i) {
            var n = i.position;
            t !== n && (i.addEndSegment(), t > n ? (i.nSeeksForward++, i.msSeeksForward += t - n) : t < n && (i.nSeeksBackward++, i.msSeeksBackward += n - t), e || (i.lastPlayStartTime = Date.now()), i.position = t, i.addStartSegment())
        }
    }, n.prototype.trackKeyLatency = function (t) {
        var e = this._trackingData;
        e && (e.msKeyLatency = t)
    }, n.prototype.trackPlaying = function (t) {
        var e = this._trackingData;
        e && (e.played = !0, e.lastPlayStartTime = Date.now(), e.position = t)
    }, n.prototype.trackPaused = function (t) {
        var e = this._trackingData;
        e && (e.lastPlayStartTime = 0, e.position = t)
    }, n.prototype.trackProgress = function (t) {
        var e = this._trackingData;
        if (e) {
            var i = Date.now(),
                n = 0;
            e.lastPlayStartTime && (n = i - e.lastPlayStartTime), e.lastPlayStartTime = i, e.addMSPlayed(n), this._checkPlayedThreshold(), e.position = t
        }
    }, t.exports = n
}, function (t, e, i) {
    "use strict";

    function n() {
        this._segments = [], this._needsEndSegment = !1, this._isFinalized = !1, this.lastPlayRequestTime = 0, this.lastPlayStartTime = 0, this.currentTrackUri = s.EMPTY, this.msPlayLatency = 0, this.position = 0, this.maxContinuous = 0, this.msPlayed = 0, this.msPlayedUnion = 0, this.nSeeksForward = 0, this.nSeeksBackward = 0, this.msSeeksForward = 0, this.msSeeksBackward = 0, this.fileId = "", this.displayTrack = s.EMPTY, this.playContext = s.EMPTY, this.sourceStart = s.UNKNOWN, this.sourceEnd = s.UNKNOWN, this.reasonStart = s.UNKNOWN, this.reasonEnd = s.UNKNOWN, this.referrer = s.UNKNOWN, this.referrerVersion = s.UNKNOWN, this.referrerVendor = s.UNKNOWN, this.gaiaDevId = "none", this.msKeyLatency = 0, this.nStutter = 0, this.bitrate = 16e4, this.audiocodec = "mp3", this.streamingRule = "none", this.playbackId = "", this.nextPlaybackId = "", this.noLog = !1, this.playIntended = !1, this.played = !1
    }
    var r = i(88),
        s = i(31),
        o = i(4);
    n.create = function () {
        return new n
    }, n.prototype._calculateUnion = function () {
        for (var t = this._segments.slice(0), e = 0, i = 0, n = 0, r = 0, s = 0, o = 0, a = this.maxContinuous; s < t.length; s++) s % 2 != 0 && void 0 !== t[s - 1] && "start" === t[s - 1].type && (o = t[s].time - t[s - 1].time, a = o > a ? o : a);
        for (this.maxContinuous = a, t.sort(function (t, e) {
                return t.time - e.time
            }); r < t.length; r++) "start" === t[r].type && (0 === i && (n = r), ++i), "end" === t[r].type && 0 === --i && (e += t[r].time - t[n].time);
        return e
    }, n.prototype.addStartSegment = function () {
        this._segments.push({
            type: "start",
            time: this.position
        }), this._needsEndSegment = !0
    }, n.prototype.addEndSegment = function () {
        this._needsEndSegment && (this._segments.push({
            type: "end",
            time: this.position
        }), this._needsEndSegment = !1)
    }, n.prototype.addMSPlayed = function (t) {
        t && (this.msPlayed += t)
    }, n.prototype.finalize = function () {
        if (this._isFinalized) throw new r(o.TRACK_DATA_ALREADY_FINALIZED, "TrackData already finalized.");
        return this.msPlayedUnion = this._calculateUnion(), this.nSeeksBackward || this.nSeeksForward || (this.msPlayed = this.maxContinuous = this.msPlayedUnion), this._isFinalized = !0, !0
    }, n.prototype.isFinalized = function () {
        return this._isFinalized
    }, t.exports = n
}, function (t, e, i) {
    "use strict";

    function n(t, e) {
        Error.call(this, e), this.code = t, this.message = e, this.debug = {}
    }
    n.prototype = new Error, n.prototype.constructor = n, n.prototype.name = "TrackingError", t.exports = n
}, function (t, e, i) {
    "use strict";

    function n(t) {
        this._transport = t.transport, this._transportLogger = t.logger, this._player = t.player, this._currentTrackingData = null, this._sequenceId = 0, this._sequenceSessionStorage = {}, this._init()
    }
    var r = i(2),
        s = i(3),
        o = i(90),
        a = i(7),
        _ = i(4),
        c = i(5).forTag("playback.logger"),
        u = i(91);
    r(n, s), n.create = function (t) {
        return new n(t)
    }, n.prototype._init = function () {
        var t = this._player;
        t.on(a.PLAYER_LOAD, this._onPlayerLoad.bind(this)), t.on(a.PLAYER_ERROR, this._onError.bind(this)), t.on(a.PLAYER_STALLED, this._onStalled.bind(this)), t.on(a.PLAYER_PRELOADING_ERROR, this._onError.bind(this)), t.on(a.PLAYER_TRACKING_DATA_CREATED, this._onTrackingDataCreated.bind(this)), t.on(a.PLAYER_TRACKING_DATA_FINALIZED, this._onTrackingDataFinalized.bind(this))
    }, n.prototype._emitError = function (t, e) {
        this.emit(a.LOGGER_ERROR, {
            error: t,
            data: e
        })
    }, n.prototype._onError = function (t) {
        var e = t.error,
            i = this._currentTrackingData;
        this._logError(e.code || _.UNKNOWN, e, {
            track: t.track || {},
            debug: e && e.debug,
            preloading: !!t.preloading,
            session_id: this._sessionId,
            playback_id: i ? i.playbackId : null,
            http_status_code: "status" in e ? e.status : null,
            license_server: e.licenseServer || null
        })
    }, n.prototype._onStalled = function (t) {
        var e = this._currentTrackingData;
        e && e.playbackId && this._transportLogger.logJSSDKStall({
            session_id: this._sessionId,
            playback_id: e.playbackId,
            play_track: e.currentTrackUri,
            file_id: e.fileId,
            byte_offset: t.byteStart,
            time_offset: t.timeStart,
            ms_stalled: t.stallAmount,
            timed_out: !!t.didTimeout
        })
    }, n.prototype._onPlayerLoad = function (t) {
        var e = t.logData;
        if (e)
            if (e.impressionURLs)
                for (var i = e.impressionURLs.length; i--;) this._logImpression(e.impressionURLs[i]);
            else e.impressionURL && this._logImpression(e.impressionURL)
    }, n.prototype._onTrackingDataCreated = function (t) {
        var e = t.data;
        e.playbackId && !e.noLog && (this._currentTrackingData = e, this._setSessionAndSequenceIds())
    }, n.prototype._setSessionAndSequenceIds = function () {
        this._sessionId = this._transport.getInitTime().toString(), this._sequenceId = this._getSequenceId(this._sessionId)
    }, n.prototype._onTrackingDataFinalized = function (t) {
        var e = t.data;
        if (e.playbackId && !e.noLog) {
            if (this._sessionId !== this._transport.getInitTime().toString() && this._setSessionAndSequenceIds(), !e.playIntended && !e.played) return void this._rollbackSequenceId(this._sessionId);
            var i = {
                play_track: "",
                playback_id: e.playbackId,
                ms_played: e.msPlayed,
                session_id: this._sessionId,
                sequence_id: this._sequenceId,
                next_playback_id: e.nextPlaybackId
            };
            c.debug("Logged TrackStreamVerification", i), this._transportLogger.logTrackStreamVerification(i).catch(function (t) {
                var n = new o(_.TSV_SENDING_FAILED, t.message || "Unknown reason.");
                this._logError(n.code, t, i), this._emitError(n, e)
            }.bind(this))
        }
    }, n.prototype._getSequenceId = function (t) {
        var e = this._sequenceSessionStorage[t];
        return e || (e = 0), e + 1 >= 9007199254740991 && (e = 0), this._sequenceSessionStorage[t] = e + 1, e
    }, n.prototype._rollbackSequenceId = function (t) {
        var e = this._sequenceSessionStorage[t];
        e && (this._sequenceSessionStorage[t] = Math.max(e - 1, 0))
    }, n.prototype._logImpression = function (t) {
        this._transport.request(t, {
            touch: !0
        }).catch(function (t) {
            c.warn("Unable to send impression request", t)
        })
    }, n.prototype._logError = function (t, e, i) {
        var n = "";
        e && ((n = e.stack) || (n = e.toString())), this._transportLogger.logJSSDKError({
            source: "playback",
            source_version: u.tagged,
            type: t,
            message: e && e.message,
            stack: n,
            json_data: i,
            json_data_version: "1.0.0"
        })
    }, t.exports = n
}, function (t, e, i) {
    "use strict";

    function n(t, e) {
        Error.call(this, t), this.code = t, this.message = e, this.debug = {}
    }
    n.prototype = new Error, n.prototype.constructor = n, n.prototype.name = "LoggingError", t.exports = n
}, function (t, e) {
    t.exports = {
        tagged: "5.1.3-0b15b2c",
        version: "5.1.3",
        revision: "0b15b2c"
    }
}, function (t, e, i) {
    "use strict";

    function n(t) {
        this._transport = t
    }
    var r = i(0),
        s = i(15),
        o = i(4),
        a = i(5).forTag("playback.storage_resolve");
    n.prototype._parseResponse = function (t, e) {
        var i;
        if (200 !== e.status) return i = new s(o.STORAGE_FAILED_WITH_STATUS, "Storage Resolve responded with " + e.status), i.status = e.status, i.fileId = t, r.reject(i);
        var n = e.body;
        return n && n.cdnurl && n.cdnurl.length ? {
            uri: n.cdnurl[0],
            uris: n.cdnurl,
            protection: "cenc"
        } : (i = new s(o.STORAGE_RETURNED_NO_TRACKS, "Storage Resolve returned no tracks for fileId " + t), i.fileId = t, r.reject(i))
    }, n.prototype.getCDNURL = function (t, e) {
        a.info("Requesting CDN URL for ", e);
        var i = ["http://@webgate/storage-resolve/files/audio/interactive/", e, "?version=10000000&product=9&platform=39&alt=json"].join("");
        return this._transport.request(i, {
            responseType: "json",
            retry: {
                condition: function (t, e) {
                    return t.getStatusFamily() !== e.SUCCESS
                }
            }
        }).then(this._parseResponse.bind(this, e))
    }, n.prototype.getManifest = function (t) {
        var e = "https://seektables.scdn.co/seektable/" + t + ".json";
        return a.info("Requesting JSON manifest for ", t), this._transport.request(e, {
            responseType: "json",
            retry: {
                condition: function (t, e) {
                    return t.getStatusFamily() !== e.SUCCESS
                }
            }
        }).then(function (t) {
            if (200 !== t.status) {
                var e = new s(o.STORAGE_TRACK_MANIFEST_FAILED, "Track manifest request failed with status code " + t.status);
                return e.status = t.status, r.reject(e)
            }
            return t.body
        })
    }, t.exports = n
}, function (t, e, i) {
    "use strict";

    function n(t) {
        if (!t.transport) throw new TypeError("Argument options.transport is required.");
        this._transport = t.transport, this._baseUrl = null, this._segmentTemplate = null, this._initTemplate = null, this._fallbackUrls = [], this._logData = null, this._licenseFetcher = t.licenseFetcher
    }
    var r = i(0),
        s = i(15),
        o = i(4);
    n.create = function (t) {
        return new n(t)
    }, n.prototype.getInitSegmentUrl = function (t) {
        var e = this._initTemplate.replace("{{profile_id}}", t.id).replace("{{file_type}}", t.file_type);
        return this._baseUrl + e
    }, n.prototype.getSegmentUrl = function (t, e) {
        var i = this._segmentTemplate.replace("{{profile_id}}", e.id).replace("{{segment_timestamp}}", t).replace("{{file_type}}", e.file_type);
        return this._baseUrl + i
    }, n.prototype._constructManifestUrl = function (t) {
        return r.resolve(["https://@webgate/manifests/v3/json/sources/", t, "/options/partner=spotify-employee-premium+supports_drm"].join(""))
    }, n.prototype.getManifest = function (t) {
        return this._constructManifestUrl(t).then(function (t) {
            return this._transport.request(t, {
                authorize: !0,
                responseType: "json",
                retry: {
                    condition: function (t, e) {
                        return t.getStatusFamily() !== e.SUCCESS
                    }
                }
            }).then(function (t) {
                if (200 !== t.status) {
                    var e = new s(o.STORAGE_VIDEO_MANIFEST_FAILED, "Video manifest request failed with status " + t.status);
                    return e.status = t.status, r.reject(e)
                }
                var i = t.body;
                return this._baseUrl = "https://video-fa.scdn.co/segments", this._fallbackUrls = i.base_urls, this._initTemplate = i.initialization_template, this._segmentTemplate = i.segment_template, i
            }.bind(this))
        }.bind(this))
    }, t.exports = n
}, function (t, e, i) {
    "use strict";

    function n(t) {
        this._transport = t.transport, this._securityLevel = t.securityLevel, this._urls = {}, this._init()
    }
    var r = i(0),
        s = i(95),
        o = i(4);
    n.prototype._init = function () {
        this._transport.on(this._transport.EVENT_CONNECTION_ID, function () {
            this._urls = {}
        }.bind(this))
    }, n.prototype.get = function (t, e) {
        var i = t + ":" + e,
            n = this._urls[i];
        if (n && n.expires > Date.now() + 6e4) return r.resolve(n.uri);
        var a = ["@webgate/melody/v1/license_url", "?keysystem=", t, "&mediatype=", e].join("");
        return this._transport.request(a, {
            responseType: "json",
            retry: {
                condition: function (t, e) {
                    var i = t.getStatusFamily();
                    return i === e.SERVER_ERROR || i === e.BROWSER_ERROR
                }
            }
        }).then(function (t) {
            if (200 !== t.status) {
                var e = new s(o.LICENSE_RESOLVER_CANT_RESOLVE_URL, "License URL endpoint responded with status " + t.status);
                return e.status = t.status, r.reject(e)
            }
            var n = t.body;
            return n.expires *= 1e3, n.uri = "@webgate/" + n.uri, this._securityLevel && (n.uri += [-1 !== n.uri.indexOf("?") ? "&" : "?", "sl=", this._securityLevel].join("")), this._urls[i] = n, n.uri
        }.bind(this))
    }, n.prototype.remove = function (t, e) {
        this._urls[t + ":" + e] = null
    }, t.exports = n
}, function (t, e, i) {
    "use strict";

    function n(t, e) {
        Error.call(this, e), this.code = t, this.message = e, this.status = -1, this.debug = {}
    }
    n.prototype = new Error, n.prototype.constructor = n, n.prototype.name = "LicenseError", t.exports = n
}, function (t, e, i) {
    "use strict";

    function n(t) {
        var e = t || {};
        if (!e.trackPlayer) throw new TypeError("Argument `options.trackPlayerManager` not found.");
        this._trackPlayerPromise = o.defer(), this._maxListErrors = e.maxListErrors || E, this._uid = 0, this._loadedList = null, this._loadedOptions = null, this._currentTrack = null, this._currentTrackOptions = null, this._listPlayCount = 0, this._listErrorCount = 0, this._shuffled = !1, this._repeatMode = c.NONE, this._currentSeqId = 0, this._setListOptions = this._setListOptions.bind(this), this._replaceCurrentList = this._replaceCurrentList.bind(this), this._handleCapped = this._handleCapped.bind(this), this._handlePlaying = this._handlePlaying.bind(this), this._handlePaused = this._handlePaused.bind(this), this._handleEnded = this._handleEnded.bind(this), this._handleCanPreload = this._handleCanPreload.bind(this), this._handleError = this._handleError.bind(this), this._handlePositionChanged = this._handlePositionChanged.bind(this), this._handleDurationChanged = this._handleDurationChanged.bind(this), this._handleTimeout = this._handleTimeout.bind(this), this._handlePlayedThresholdReached = this._handlePlayedThresholdReached.bind(this), this._handleTrackingData = this._handleTrackingData.bind(this), this._init(e.trackPlayer)
    }
    var r = i(2),
        s = i(3),
        o = i(0),
        a = i(4),
        _ = i(33),
        c = i(97),
        u = i(98),
        h = i(99),
        d = i(7),
        p = i(32),
        l = i(100),
        E = 5;
    r(n, s), n.create = function (t) {
        return new n(t)
    }, n.prototype._init = function (t) {
        this._trackPlayerPromise.promise.catch(function () {}), o.resolve(t).then(function (t) {
            this._attachPlayerEvents(t), this._trackPlayerPromise.resolve(t)
        }.bind(this)).catch(this._handlePlayerInitError.bind(this))
    }, n.prototype._attachPlayerEvents = function (t) {
        t.on(d.PLAYER_CAN_PRELOAD, this._handleCanPreload), t.on(d.PLAYER_CAPPED, this._handleCapped), t.on(d.PLAYER_ENDED, this._handleEnded), t.on(d.PLAYER_ERROR, this._handleError), t.on(d.PLAYER_PAUSED, this._handlePaused), t.on(d.PLAYER_PLAYING, this._handlePlaying), t.on(d.PLAYER_TIMEOUT, this._handleTimeout), t.on(d.PLAYER_POSITION_CHANGED, this._handlePositionChanged), t.on(d.PLAYER_DURATION_CHANGED, this._handleDurationChanged), t.on(d.PLAYER_TRACKING_DATA_CREATED, this._handleTrackingData), t.on(d.PLAYER_TRACKING_DATA_FINALIZED, this._handleTrackingData), t.on(d.PLAYER_PLAYED_THRESHOLD_REACHED, this._handlePlayedThresholdReached), this.proxyEmit(t, d.PLAYER_PROGRESS, d.LIST_PLAYER_PROGRESS), this.proxyEmit(t, d.PLAYER_BUFFER_STALLED, d.LIST_PLAYER_BUFFER_STALLED), this.proxyEmit(t, d.PLAYER_BUFFERING_START, d.LIST_PLAYER_BUFFERING_START), this.proxyEmit(t, d.PLAYER_BUFFERING_END, d.LIST_PLAYER_BUFFERING_END), this.proxyEmit(t, d.PLAYER_VIDEO_ELEMENT_APPENDED, d.LIST_PLAYER_VIDEO_ELEMENT_APPENDED), this.proxyEmit(t, d.PLAYER_VIDEO_ELEMENT_REMOVED, d.LIST_PLAYER_VIDEO_ELEMENT_REMOVED)
    }, n.prototype._handlePlayerInitError = function (t) {
        this._trackPlayerPromise.reject(new p(a.LIST_PLAYER_NO_TRACK_PLAYER, t.message || "Track player promise was rejected."))
    }, n.prototype._handleCapped = function () {
        var t = this._currentTrack;
        t && this.emit(d.LIST_PLAYER_CAPPED, {
            uid: this._uid,
            track: t,
            options: this._currentTrackOptions,
            list: this._loadedList
        })
    }, n.prototype._handlePlaying = function (t) {
        var e = this._currentTrack;
        e && this.emit(d.LIST_PLAYER_PLAYING, {
            uid: this._uid,
            track: e,
            options: this._currentTrackOptions,
            list: this._loadedList,
            position: t.position
        })
    }, n.prototype._handlePaused = function (t) {
        var e = this._currentTrack;
        e && this.emit(d.LIST_PLAYER_PAUSED, {
            uid: this._uid,
            track: e,
            options: this._currentTrackOptions,
            list: this._loadedList,
            position: t.position
        })
    }, n.prototype._handleCanPreload = function () {
        this._preloadUpcomingTrack()
    }, n.prototype._handleEnded = function () {
        var t = this._currentTrack;
        t && (this.emit(d.LIST_PLAYER_TRACK_ENDED, {
            uid: this._uid,
            track: t,
            options: this._currentTrackOptions,
            list: this._loadedList
        }), this.next(h.TRACK_DONE))
    }, n.prototype._handleTimeout = function () {
        var t = this._currentTrack;
        t && (this.emit(d.LIST_PLAYER_TRACK_TIMEOUT, {
            uid: this._uid,
            track: t,
            options: this._currentTrackOptions,
            list: this._loadedList
        }), this.next(h.TRACK_ERROR))
    }, n.prototype._handlePositionChanged = function (t) {
        var e = this._currentTrack;
        e && this.emit(d.LIST_PLAYER_POSITION_CHANGED, {
            uid: this._uid,
            track: e,
            options: this._currentTrackOptions,
            list: this._loadedList,
            position: t.position
        })
    }, n.prototype._handleDurationChanged = function (t) {
        var e = this._currentTrack;
        e && this.emit(d.LIST_PLAYER_DURATION_CHANGED, {
            uid: this._uid,
            track: e,
            options: this._currentTrackOptions,
            list: this._loadedList,
            position: t.position,
            duration: t.duration
        })
    }, n.prototype._handlePlayedThresholdReached = function (t) {
        var e = this._currentTrack;
        e && this.emit(d.LIST_PLAYER_PLAYED_THRESHOLD_REACHED, {
            uid: this._uid,
            track: e,
            options: this._currentTrackOptions,
            list: this._loadedList,
            total: t.total,
            threshold: t.threshold,
            position: t.position
        })
    }, n.prototype._handleTrackingData = function (t) {
        this.emit(t.type)
    }, n.prototype._handleError = function (t) {
        if (this._currentTrack) {
            this.emit(d.LIST_PLAYER_ERROR, t), this.emitSync(d.LIST_PLAYER_ERROR_SYNC, t);
            var e = !!t.error && t.error.listPlayerIgnore;
            e || this._listErrorCount++, t.canPlayNext && (e || this._listErrorCount <= this._maxListErrors ? this.next(h.TRACK_ERROR) : this.emit(d.LIST_PLAYER_MAX_LIST_ERRORS_REACHED, {
                count: this._listErrorCount,
                threshold: this._maxListErrors
            }))
        }
    }, n.prototype._handleTrackLoaded = function (t) {
        this.emitSync(d.LIST_PLAYER_TRACK_LOADED, t)
    }, n.prototype._incrementSeqId = function () {
        return this._currentSeqId >= 9007199254740991 ? this._currentSeqId = 0 : this._currentSeqId += 1, this._currentSeqId
    }, n.prototype._getTrackPlayer = function () {
        return this._trackPlayerPromise.promise
    }, n.prototype._setListIndex = function (t, e) {
        var i = e.index && -1 !== e.index ? e.index : 0;
        return o.all([t, e, t.startAt(i)])
    }, n.prototype._setListOptions = function (t, e) {
        return o.all([t.setShuffle(!!this._shuffled), t.setRepeatMode(this._repeatMode)]).then(function () {
            return [t, e]
        })
    }, n.prototype._replaceCurrentList = function (t, e) {
        return this.emitSync(d.LIST_PLAYER_BEFORE_LIST_CHANGE, {
            newList: t,
            newOptions: e,
            oldList: this._loadedList,
            oldOptions: this._loadedOptions
        }), this._loadedList = t, this._loadedOptions = e, this._listPlayCount = 0, this._listErrorCount = 0, this.emit(d.LIST_PLAYER_LIST_CHANGED, {
            list: t,
            options: e
        }), _.SUCCESS
    }, n.prototype._preloadTrack = function (t) {
        return this._getTrackPlayer().then(function (e) {
            return e.preload(t), _.SUCCESS
        })
    }, n.prototype._changeTrack = function (t, e, i) {
        if (this._currentSeqId !== i) return _.CANCELLED;
        this.emitSync(d.LIST_PLAYER_BEFORE_TRACK_LOAD, {
            list: this._loadedList,
            newTrack: t,
            oldTrack: this._currentTrack
        }), this._uid++;
        var n = ++this._listPlayCount,
            r = this._loadedOptions,
            s = !0,
            a = 0;
        1 === n ? (s = !r.paused, a = r.initialPosition || r.position || 0) : a = r.position || 0;
        var c = e === h.TRACK_DONE;
        if ("options" in t) {
            var u = t.options;
            "paused" in u && (s = !u.paused), "position" in u && (a = u.position)
        }
        this._currentTrack = t, this._currentTrackOptions = {
            reason: e,
            paused: !s,
            position: a
        };
        var p = this._handleTrackLoaded.bind(this, {
            uid: this._uid,
            track: this._currentTrack,
            options: this._currentTrackOptions,
            list: this._loadedList
        });
        return this._getTrackPlayer().then(function (e) {
            return this._currentSeqId !== i ? _.CANCELLED : (o.resolve(e.load(t, {
                uriProperty: "playableURI",
                autoplay: s,
                position: a,
                continuePrevious: c
            }, p)).catch(function () {}), _.SUCCESS)
        }.bind(this))
    }, n.prototype.load = function (t, e) {
        var i = e || this._loadedOptions || {},
            n = l.create(i);
        return this._setListIndex(t, n).spread(this._setListOptions).spread(this._replaceCurrentList)
    }, n.prototype.play = function (t, e) {
        var i = this;
        return this.load(t, e).then(function () {
            return i._loadedList !== t ? _.CANCELLED : i.next(i._loadedOptions.reason)
        })
    }, n.prototype.canChangeTrack = function () {
        return this._loadedList ? this._loadedList.peekNext({
            reason: h.FORWARD_BUTTON,
            listConstants: u
        }).then(function (t) {
            return t !== u.FORBIDDEN
        }) : o.resolve(!0)
    }, n.prototype._preloadUpcomingTrack = function () {
        var t = this._loadedList;
        if (!t) return o.reject(new p(a.LIST_PLAYER_NO_LIST, "Cannot perform operation; no list was loaded."));
        var e = {
            reason: h.TRACK_DONE,
            listConstants: u
        };
        return t.peekNext(e).then(function (t) {
            return t === u.FORBIDDEN ? _.FORBIDDEN : t === u.NULL_VALUE ? this._preloadUpcomingTrack() : t === u.LIST_END ? _.LIST_END : t.playable ? this._preloadTrack(t) : _.INVALID
        }.bind(this))
    }, n.prototype.next = function (t) {
        if (!t) return o.reject(new p(a.LIST_PLAYER_INVALID_ARGUMENT, "The argument `reason` is required."));
        var e = this._loadedList;
        if (!e) return o.reject(new p(a.LIST_PLAYER_NO_LIST, "Cannot perform operation; no list was loaded."));
        this.emitSync(d.LIST_PLAYER_BEFORE_NEXT, {
            list: e,
            reason: t
        });
        var i = this._incrementSeqId(),
            n = {
                reason: t,
                listConstants: u
            };
        return e.next(n).then(function (n) {
            return this._currentSeqId !== i ? _.CANCELLED : n === u.FORBIDDEN ? _.FORBIDDEN : n === u.NULL_VALUE ? this.next(t) : n === u.LIST_END ? (this.emit(d.LIST_PLAYER_LIST_ENDED, {
                list: e,
                reason: h.END_PLAY
            }), this.clear(t), _.LIST_END) : n.playable ? this._changeTrack(n, t, i) : (this.emit(d.LIST_PLAYER_TRACK_UNPLAYABLE, {
                track: n,
                list: e
            }), this.next(t))
        }.bind(this))
    }, n.prototype.previous = function (t) {
        if (!t) return o.reject(new p(a.LIST_PLAYER_INVALID_ARGUMENT, "The argument `reason` is required."));
        var e = this._loadedList;
        if (!e) return o.reject(new p(a.LIST_PLAYER_NO_LIST, "Cannot perform operation; no list was loaded."));
        this.emitSync(d.LIST_PLAYER_BEFORE_PREVIOUS, {
            list: e,
            reason: t
        });
        var i = this._incrementSeqId(),
            n = {
                reason: t,
                listConstants: u
            };
        return e.previous(n).then(function (n) {
            return this._currentSeqId !== i ? _.CANCELLED : n === u.FORBIDDEN ? _.FORBIDDEN : n === u.NULL_VALUE ? this.previous(t) : n === u.LIST_START ? (this.emit(d.LIST_PLAYER_LIST_ENDED, {
                list: e,
                reason: h.END_PLAY
            }), this.clear(t), _.LIST_END) : n.playable ? this._changeTrack(n, t, i) : (this.emit(d.LIST_PLAYER_TRACK_UNPLAYABLE, {
                track: n,
                list: e
            }), this.previous(t))
        }.bind(this))
    }, n.prototype.pause = function () {
        return this._loadedList ? this._currentTrack ? this._getTrackPlayer().then(function (t) {
            return t.pause(), _.SUCCESS
        }) : o.resolve(_.SUCCESS) : o.reject(new p(a.LIST_PLAYER_NO_LIST, "Cannot perform operation; no list was loaded."))
    }, n.prototype.resume = function () {
        return this._loadedList ? this._currentTrack ? this._getTrackPlayer().then(function (t) {
            return t.resume(), _.SUCCESS
        }) : o.resolve(_.SUCCESS) : o.reject(new p(a.LIST_PLAYER_NO_LIST, "Cannot perform operation; no list was loaded."))
    }, n.prototype.togglePlay = function () {
        return this._loadedList ? this._currentTrack ? this._getTrackPlayer().then(function (t) {
            return t.togglePlay(), _.SUCCESS
        }) : o.resolve(_.SUCCESS) : o.reject(new p(a.LIST_PLAYER_NO_LIST, "Cannot perform operation; no list was loaded."))
    }, n.prototype.stop = function (t) {
        var e = {
                reason: t || "unknown"
            },
            i = this._currentTrack;
        return i && i.logData && (e.source = i.logData.source), this._incrementSeqId(), this._getTrackPlayer().then(function (t) {
            return t.stop(e), this.emit(d.LIST_PLAYER_STOPPED, {
                uid: this._uid,
                options: this._currentTrackOptions,
                list: this._loadedList
            }), _.SUCCESS
        }.bind(this))
    }, n.prototype.clear = function (t) {
        return this.stop(t).then(function () {
            return this._loadedList = null, this._loadedOptions = null, this._currentTrack = null, this._currentTrackOptions = null, this.emit(d.LIST_PLAYER_CLEARED), _.SUCCESS
        }.bind(this))
    }, n.prototype.setShuffle = function (t) {
        var e = !!t;
        if (this._shuffled !== e) {
            this._shuffled = e, this.emit(d.LIST_PLAYER_SHUFFLE_CHANGED, {
                player: this,
                shuffled: e
            });
            var i = this._loadedList;
            i && i.setShuffle(this._shuffled)
        }
        return o.resolve(_.SUCCESS)
    }, n.prototype.setRepeatMode = function (t) {
        if (!(t in c)) return o.reject(new p(a.LIST_PLAYER_INVALID_ARGUMENT, "The value of repeat mode is not a correct RepeatMode enum value"));
        if (this._repeatMode !== t) {
            this._repeatMode = t, this.emit(d.LIST_PLAYER_REPEAT_MODE_CHANGED, {
                player: this,
                repeatMode: t
            });
            var e = this._loadedList;
            e && e.setRepeatMode(this._repeatMode)
        }
        return o.resolve(_.SUCCESS)
    }, n.prototype.getVolume = function () {
        return this._getTrackPlayer().then(function (t) {
            return t.getVolume()
        })
    }, n.prototype.setVolume = function (t, e) {
        return this._getTrackPlayer().then(function (i) {
            return i.setVolume(t), this.emit(d.LIST_PLAYER_VOLUME_CHANGED, {
                volume: t,
                commandId: e || null
            }), _.SUCCESS
        }.bind(this))
    }, n.prototype.seek = function (t) {
        var e = this._loadedList;
        return e ? "function" != typeof e.allowSeeking || e.allowSeeking() ? this._currentTrack ? this._getTrackPlayer().then(function (e) {
            return e.seek(t), _.SUCCESS
        }) : o.resolve(_.SUCCESS) : o.reject(new p(a.LIST_PLAYER_FORBIDDEN, "The operation is not allowed.")) : o.reject(new p(a.LIST_PLAYER_NO_LIST, "Cannot perform operation; no list was loaded."))
    }, n.prototype.getListConstants = function () {
        return u
    }, n.prototype.getLoadedList = function () {
        return this._loadedList
    }, n.prototype.getLoadedOptions = function () {
        return this._loadedOptions
    }, n.prototype.getPlayerState = function () {
        return this._getTrackPlayer().then(function (t) {
            return t.getPlayerState()
        })
    }, t.exports = n
}, function (t, e, i) {
    "use strict";
    var n = {
        NONE: "NONE",
        CONTEXT: "CONTEXT",
        TRACK: "TRACK"
    };
    t.exports = n
}, function (t, e, i) {
    "use strict";
    var n = {
        NULL_VALUE: new function () {},
        LIST_START: new function () {},
        LIST_END: new function () {},
        FORBIDDEN: new function () {}
    };
    t.exports = n
}, function (t, e, i) {
    "use strict";
    var n = {
        APPLOAD: "appload",
        BACK_BUTTON: "backbtn",
        CLICK_ROW: "clickrow",
        CLICK_SIDE: "clickside",
        END_PLAY: "endplay",
        FORWARD_BUTTON: "fwdbtn",
        LOGOUT: "logout",
        PLAY_BUTTON: "playbtn",
        POPUP: "popup",
        REMOTE: "remote",
        TRACK_DONE: "trackdone",
        TRACK_ERROR: "trackerror",
        UNKNOWN: "unknown",
        URI_OPEN: "uriopen"
    };
    t.exports = n
}, function (t, e, i) {
    "use strict";

    function n(t) {
        if (!(this instanceof n)) return new n(t);
        var e = t || {};
        this.index = "index" in e ? e.index : -1, this.position = "position" in e ? e.position : 0, this.initialPosition = "initialPosition" in e ? e.initialPosition : 0, this.duration = "duration" in e ? e.duration : -1, this.paused = "paused" in e && e.paused, this.reason = e.reason || "unknown"
    }
    n.create = function (t) {
        return t instanceof n ? t : new n(t)
    }, t.exports = n
}, function (t, e, i) {
    "use strict";
    var n = i(0),
        r = i(102),
        s = i(104);
    t.exports = {
        create: function (t) {
            if (!t) throw new TypeError("Cannot create TrackPlayerAPIClient with no options.");
            if (!t.clientVersion) throw new TypeError("Option `clientVersion` not provided.");
            if (!t.transport) throw new TypeError("Option `transport` not provided.");
            if (!t.listPlayer) throw new TypeError("Option `listPlayer` not provided.");
            var e = n.resolve(t.descriptor).then(function (t) {
                    if (!(t && t.name && t.model && t.type)) throw new TypeError("Incomplete `descriptor` value.");
                    if (t.capabilities && ("boolean" != typeof t.capabilities.change_volume || !Array.isArray(t.capabilities.manifest_formats))) throw new TypeError("Invalid `capabilities` value.");
                    return t.id ? t : n.reject(new TypeError("No descriptor.id provided."))
                }),
                i = "initialVolume" in t ? t.initialVolume : 1,
                o = {};
            return o.clientVersion = t.clientVersion, o.logger = t.logger, o.endpoint = t.endpoint, o.transport = t.transport, o.listPlayer = t.listPlayer, o.descriptor = e, o.ListClass = s, o.abbaClient = t.abbaClient, o.initialVolume = i, o.logger = t.logger, new r(o)
        }
    }
}, function (t, e, i) {
    "use strict";

    function n(t) {
        s.call(this), this._transport = t.transport, this._logger = t.logger, this._endpoint = t.endpoint || m, this._listPlayer = t.listPlayer, this._ListClass = t.ListClass, this._abbaClient = t.abbaClient, this._gaiaVolume = t.initialVolume * R, this._clientVersion = t.clientVersion, this._descriptor = t.descriptor, this._deviceInfo = null, this._deviceId = null, this._manifestFormats = [], this._registered = !1, this._connectionId = null, this._sequenceNumber = 0, this._currentContext = null, this._lastSentState = null, this._totalStreamTime = 0, this._queuedRejectedStates = [], this._isSendingConflict = !1, this._isSendingUpdate = !1, this._queueSendUpdate = [], this._previousTrackPosition = void 0, this._trackPosition = void 0, this._trackDuration = void 0, this._waitingForTrackingData = null, this._lastProcessedStateId = null, this._limitStateUpdates = !0, this._volumeDebouncer = new a(this._sendVolume.bind(this), {
            blockInitial: !0
        }), this._performCommand = this._performCommand.bind(this), this._sendStateUpdateRequest = this._sendStateUpdateRequest.bind(this), this._parseStateUpdateResponse = this._parseStateUpdateResponse.bind(this), this._init()
    }
    var r = i(2),
        s = i(3),
        o = i(0),
        a = i(103),
        _ = i(5),
        c = i(11),
        u = i(7),
        h = i(26),
        d = i(34),
        p = i(14),
        l = _.forTag("tpapiclient"),
        E = _.forTag("tpapiclient.endsong"),
        f = _.forTag("tpapiclient.endsongs"),
        T = /^hm:\/\/track-playback\/v1/,
        y = /^hm:\/\/play-token\/lost/,
        m = "http://@webgate/track-playback",
        R = 65535,
        S = function (t, e) {
            return t.getStatusFamily() === e.SERVER_ERROR
        },
        g = {
            condition: S,
            algo: "exp",
            maxRetries: 8
        },
        A = {
            condition: S,
            maxRetries: 2
        };
    r(n, s), n.create = function (t) {
        return new n(t)
    }, n.prototype._init = function () {
        this._waitingForTrackingData = o.defer(), this._waitingForTrackingData.resolve(!0), this._transport.on(this._transport.EVENT_CONNECTION_ID, this._onConnectionId.bind(this)), this._transport.matchMessages(y, this._onPlayTokenLost.bind(this)), this._transport.matchMessages(T, this._onTrackPlaybackMessage.bind(this));
        var t = this._listPlayer;
        t.on(u.LIST_PLAYER_CAPPED, this._onCapped.bind(this)), t.on(u.LIST_PLAYER_ERROR, this._onError.bind(this)), t.on(u.LIST_PLAYER_BEFORE_TRACK_LOAD, this._onBeforeTrackLoad.bind(this)), t.on(u.LIST_PLAYER_TRACK_LOADED, this._onTrackLoaded.bind(this)), t.on(u.LIST_PLAYER_POSITION_CHANGED, this._onPositionChanged.bind(this)), t.on(u.LIST_PLAYER_DURATION_CHANGED, this._onDurationChanged.bind(this)), t.on(u.LIST_PLAYER_VOLUME_CHANGED, this._onVolumeChanged.bind(this)), t.on(u.LIST_PLAYER_PAUSED, this._setPaused.bind(this, !0)), t.on(u.LIST_PLAYER_PLAYING, this._setPaused.bind(this, !1)), t.on(u.LIST_PLAYER_PLAYED_THRESHOLD_REACHED, this._onPlayThresholdReached.bind(this)), t.on(u.PLAYER_PROGRESS, this._onProgress.bind(this)), t.on(u.PLAYER_TRACKING_DATA_CREATED, this._onTrackingData.bind(this, "created")), t.on(u.PLAYER_TRACKING_DATA_FINALIZED, this._onTrackingData.bind(this, "finalized"))
    }, n.prototype._clearSessionData = function () {
        this._connectionId = null, this._sequenceNumber = 0, this._currentContext = null, this._lastSentState = null, this._totalStreamTime = 0, this._isSendingConflict = !1, this._isSendingUpdate = !1, this._queueSendUpdate = [], this._previousTrackPosition = void 0, this._trackPosition = void 0, this._trackDuration = void 0, this._lastProcessedStateId = null, this.emit(c.TP_API_STATE_CLEARED)
    }, n.prototype._emitError = function (t, e) {
        this._logger.logJSSDKError({
            source: "tpapi-client",
            version: h.tagged,
            type: t.code,
            message: t && t.message,
            stack: t && t.stack,
            json_data: e,
            json_data_version: "1.0.0"
        }).catch(function (t) {
            l.error("Track-Playback Logging Error", t)
        }), this.emit(c.TP_API_ERROR, {
            error: t,
            data: e
        })
    }, n.prototype._logUnsentStateUpdate = function (t) {
        l.info("Unsent state update.", t), this._logger.logClientEvent({
            source: "tpapi-client",
            source_version: h.tagged,
            source_vendor: "spotify",
            event: "unsent-state-update",
            event_version: "1.0.0",
            json_data: t
        }).catch(function (t) {
            l.error("Track-Playback Logging Error", t)
        })
    }, n.prototype._setTrackPosition = function (t) {
        this._previousTrackPosition = this._trackPosition, this._trackPosition = t
    }, n.prototype._setAllPositions = function (t) {
        this._previousTrackPosition = t, this._trackPosition = t
    }, n.prototype._onConnectionId = function (t) {
        this._connectionId = t.id, this._registered = !1, o.all([this._abbaClient ? this._abbaClient.getCell("tps_send_all_state_updates").then(function (t) {
            "on" === t.value && (this._limitStateUpdates = !1)
        }.bind(this)).catch(function () {
            return !1
        }) : null, o.resolve(this._descriptor).then(this._parseDescriptor.bind(this))]).then(this.register.bind(this))
    }, n.prototype._parseDescriptor = function (t) {
        return this._deviceId = t.id, this._deviceInfo = {
            device_id: t.id,
            device_type: t.type,
            name: t.name,
            brand: t.brand,
            model: t.model,
            platform_identifier: t.platform_identifier || void 0,
            capabilities: t.capabilities,
            metadata: t.metadata
        }, t.capabilities && t.capabilities.manifest_formats && (this._manifestFormats = t.capabilities.manifest_formats), !0
    }, n.prototype._onPlayTokenLost = function () {
        this._listPlayer.pause().catch(function () {})
    }, n.prototype._onTrackPlaybackMessage = function (t) {
        var e = t.payloads;
        Array.isArray(e) && e.length && this._performCommand(e[0])
    }, n.prototype._sendRegisterRequest = function (t) {
        var e = this._endpoint + "/v1/devices";
        return this._transport.request(e, {
            authorize: !0,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            responseType: "json",
            payload: t,
            retry: g
        })
    }, n.prototype._parseRegisterResponse = function (t) {
        var e;
        return 429 === t.status ? (e = new d(p.TP_MAX_SUBSCRIPTIONS_REACHED, "Max connections reached").fatal(), e.maxedSubscriptions = !0, e.status = t.status, this.emit(c.TP_API_MAX_SUBSCRIPTIONS_REACHED, {
            error: e
        }), o.reject(e)) : 200 !== t.status ? (e = new d(p.TP_REGISTRATION_FAILED_WITH_STATUS, "track-playback service responded with status " + t.status + " when registering device").fatal(), e.status = t.status, o.reject(e)) : t.body ? t.body : (e = new d(p.TP_NO_RESPONSE_BODY, "Unexpected empty response body from registration request.").fatal(), e.status = t.status, o.reject(e))
    }, n.prototype._performCommand = function (t) {
        switch (t.type) {
            case "set_volume":
                this._setVolume(t);
                break;
            case "log_out":
                this._logout();
                break;
            case "replace_state":
                this._replaceState(t);
                break;
            case "ping":
                this._updateState("ping");
                break;
            default:
                var e = new d(p.TP_UNKNOWN_COMMAND, "Received unknown command.");
                this._emitError(e, {
                    command: t
                })
        }
    }, n.prototype._logout = function () {
        this._listPlayer.pause().catch(function () {}), this.emit(c.TP_API_STATE_CLEARED), this.deregister().then(function (t) {
            this._currentContext = null, this._setTrackPosition(void 0), t && this.emit(c.TP_API_LOGOUT)
        }.bind(this))
    }, n.prototype._isCurrentStateRef = function (t) {
        var e = this._currentContext ? this._currentContext.getStateRef() : null;
        return !e && !t || !(!e || !t) && (e.state_machine_id === t.state_machine_id && e.state_id === t.state_id && e.paused === t.paused)
    }, n.prototype._createStateRef = function (t, e) {
        if (!e) return null;
        var i = t.states[e.state_index];
        if (!i) throw new d(p.TP_CANNOT_CREATE_STATE_REF, "Invalid state reference.");
        return {
            state_machine_id: t.state_machine_id,
            state_id: i.state_id,
            paused: e.paused
        }
    }, n.prototype._replaceState = function (t) {
        var e = this._listPlayer,
            i = t.state_machine,
            n = t.state_ref,
            r = this._createStateRef(i, n);
        if (!this._isCurrentStateRef(t.prev_state_ref)) return void this._sendStateConflict(r);
        if (!n) return e.pause().catch(function () {}), this._listPlayer.clear("remote"), this._currentContext = null, this._updateState("state_clear"), this._setAllPositions(void 0), this._lastProcessedStateId = null, this.emit(c.TP_API_STATE_CLEARED), void(this._loading = !0);
        var s = this._currentContext ? this._currentContext.getStateRef() : null;
        this._lastProcessedStateId = r.state_id;
        var o;
        if (s && s.state_id === r.state_id) {
            o = this._currentContext, o.setStateMachine(i), o.setCurrentState(n), n.paused ? (o.setPaused(!0), e.pause()) : (o.setPaused(!1), e.resume());
            var a = parseInt(t.seek_to, 10);
            return o.allowSeeking() && !isNaN(a) && (e.seek(a), this._setTrackPosition(a)), void this._updateState("modify_current_state")
        }
        var _ = t.seek_to || 0;
        o = this._ListClass.create("spotify:app:jsspeaker", this._manifestFormats), o.setStateMachine(i), o.startAtState(n), o.setDeviceId(this._deviceId), this._currentContext = o, o.setInitialPosition(_), this._setTrackPosition(_);
        var u = o.getCurrentTrack();
        this._trackDuration = u ? u.metadata.duration : 0, this._updateState("optimistic_replace_state");
        this._loading = !0, e.play(o, {
            reason: "remote"
        })
    }, n.prototype._shouldSendUpdateForEvent = function (t) {
        return !(!t || t === this._lastProcessedStateId)
    }, n.prototype._setPaused = function (t, e) {
        var i = this._currentContext;
        i && (i.setPaused(t), "position" in e && this._setAllPositions(e.position), this._shouldSendUpdateForEvent(e.track.stateId) ? this._updateState(t ? "pause" : "resume") : (this._lastProcessedStateId = null, this._emitStateChanged()))
    }, n.prototype._onPlayThresholdReached = function (t) {
        this._setAllPositions(t.position), this._updateState("played_threshold_reached")
    }, n.prototype._onTrackingData = function (t) {
        switch (t) {
            case "created":
                this._waitingForTrackingData = o.defer();
                break;
            case "finalized":
                this._waitingForTrackingData.resolve(!0);
                break;
            default:
                return
        }
    }, n.prototype._onProgress = function (t) {
        this._loading || (this._setAllPositions(t.position), t.logData && !t.logData.noLog && (this._totalStreamTime += t.interval || 500))
    }, n.prototype._onError = function (t) {
        "position" in t && (this._setTrackPosition(t.position), this._updateState("error"))
    }, n.prototype._onPositionChanged = function (t) {
        this._loading || (this._setTrackPosition(t.position), this._shouldSendUpdateForEvent(t.track.stateId) ? this._updateState("position_changed") : (this._lastProcessedStateId = null, this._emitStateChanged()))
    }, n.prototype._onDurationChanged = function (t) {
        this._trackDuration = t.duration, this._emitStateChanged()
    }, n.prototype._onVolumeChanged = function (t) {
        this._gaiaVolume = t.volume * R;
        var e = t.command_id || "",
            i = {
                seq_num: null,
                volume: this._gaiaVolume,
                command_id: e
            };
        return this._volumeDebouncer.async(i)
    }, n.prototype._sendVolume = function (t) {
        var e = this._endpoint + "/v1/devices/" + this._deviceId + "/volume";
        return this._setSequenceNumber(t), this._transport.request(e, {
            authorize: !0,
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            payload: JSON.stringify(t)
        })
    }, n.prototype._onCapped = function () {
        this._listPlayer.clear("capped"), this._currentContext = null, this._updateState("capped"), this._setTrackPosition(void 0), this._lastProcessedStateId = null, this.emit(c.TP_API_STATE_CLEARED)
    }, n.prototype._onBeforeTrackLoad = function () {
        this._loading = !0
    }, n.prototype._onTrackLoaded = function (t) {
        this._loading = !1;
        var e = this._currentContext;
        if (e) {
            var i = e.getCurrentTrack();
            this._trackDuration = i && i.metadata ? i.metadata.duration || 0 : 0;
            var n = t.options;
            e.setPaused(!!n && n.paused), t.track && this._shouldSendUpdateForEvent(t.track.stateId) ? (this._setTrackPosition(n ? n.position || 0 : 0), this._updateState("track_loaded")) : (this._lastProcessedStateId = null, this._setAllPositions(n ? n.position || 0 : 0), this._emitStateChanged())
        }
    }, n.prototype._sendStateConflict = function (t) {
        var e = this._queuedRejectedStates;
        if (void 0 !== t && e.push(t), !this._registered || this._isSendingConflict || !e.length) return o.resolve(!1);
        this._isSendingConflict = !0;
        var i = e.splice(0, 5),
            n = null;
        this._currentContext && (n = this._currentContext.getStateRef());
        var r = this._generateStatePayload(n);
        r.rejected_state_refs = i, this._setSequenceNumbers(r, i.length);
        var s = this._endpoint + "/v1/devices/" + this._deviceId + "/state_conflict";
        return this._transport.request(s, {
            authorize: !0,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            responseType: "json",
            payload: JSON.stringify(r),
            retry: A
        }).then(function (t) {
            if (t.status >= 200 && t.status < 300) {
                if (!t.body) return !0;
                var e = t.body;
                if (e.commands && e.commands.length)
                    for (var i = e.commands, n = 0, r = i.length; n < r; n++) this._performCommand(i[n]);
                return !0
            }
            var s = new d(p.TP_CONFLICT_REQUEST_FAILED_WITH_STATUS, "Track-Playback service responded with " + t.status);
            return s.status = t.status, this._emitError(s), !1
        }.bind(this)).then(function (t) {
            return this._isSendingConflict = !1, this._sendStateConflict(), t
        }.bind(this))
    }, n.prototype._setVolume = function (t) {
        var e = t.volume / R;
        return this._listPlayer.setVolume(e, t.command_id)
    }, n.prototype._updateState = function (t) {
        if (this._registered) {
            var e = this._currentContext ? this._currentContext.getStateRef() : null,
                i = this._generateStatePayload(e, t);
            if (!this._requiresStateUpdate(i)) return void l.info("State update ignored.", i);
            if (this._emitStateChanged(), this._isSendingUpdate && this._limitStateUpdates) return this._logUnsentStateUpdate(i), void this._queueSendUpdate.push(t);
            this._isSendingUpdate = !0, this._queueSendUpdate = [], this._setSequenceNumber(i), this._lastSentState = i, this._sendStateUpdateRequest(JSON.stringify(i)).then(this._parseStateUpdateResponse).then(this._updateStateMachine.bind(this, e)).catch(function (t) {
                this._emitError(t)
            }.bind(this)).then(function () {
                this._isSendingUpdate = !1, this._queueSendUpdate.length && this._updateState(this._queueSendUpdate.join(",")), l.info("State update sent.", i)
            }.bind(this))
        }
    }, n.prototype._requiresStateUpdate = function (t) {
        var e = this._lastSentState;
        if (!e || !e.state_ref || !t.state_ref) return !0;
        var i = t.state_ref,
            n = e.state_ref;
        if (i.paused !== n.paused || i.state_id !== n.state_id || i.state_machine_id !== n.state_machine_id) return !0;
        var r = t.sub_state,
            s = e.sub_state;
        return r.playback_speed !== s.playback_speed || r.position !== s.position || r.duration !== s.duration || r.stream_time !== s.stream_time || t.previous_position !== e.previous_position
    }, n.prototype._emitStateChanged = function () {
        var t = this._currentContext;
        t && this.emit(c.TP_API_STATE_CHANGED, {
            stateMachine: t.getStateMachine(),
            stateRef: t.getInternalStateRef(),
            position: this._trackPosition || 0,
            duration: this._trackDuration || 0,
            paused: t.isPaused()
        })
    }, n.prototype._makeSequenceNumber = function () {
        return ++this._sequenceNumber
    }, n.prototype._setSequenceNumber = function (t) {
        return t.seq_num = this._makeSequenceNumber(), t
    }, n.prototype._setSequenceNumbers = function (t, e) {
        t.seq_nums = [];
        for (var i = 0; i < e; i++) t.seq_nums.push(this._makeSequenceNumber());
        return t
    }, n.prototype._generateStatePayload = function (t, e) {
        return {
            seq_num: void 0,
            seq_nums: void 0,
            state_ref: t,
            sub_state: {
                playback_speed: t && !t.paused ? 1 : 0,
                position: this._trackPosition,
                duration: this._trackDuration || void 0,
                stream_time: this._totalStreamTime
            },
            previous_position: this._previousTrackPosition,
            rejected_state_refs: void 0,
            debug_source: e
        }
    }, n.prototype._sendStateUpdateRequest = function (t) {
        var e = this._endpoint + "/v1/devices/" + this._deviceId + "/state";
        return this._transport.request(e, {
            authorize: !0,
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            responseType: "json",
            payload: t,
            retry: g
        })
    }, n.prototype._parseStateUpdateResponse = function (t) {
        var e;
        return 200 !== t.status ? (e = new d(p.TP_PARSE_STATE_UPDATE_FAILED_WITH_STATUS, "Service responded with status " + t.status), e.status = t.status, o.reject(e)) : t.body ? t.body : (e = new d(p.TP_UPDATE_REQUEST_EMPTY_RESPONSE, "Unexpected empty response body from state update request."), e.status = t.status, o.reject(e))
    }, n.prototype._updateStateMachine = function (t, e) {
        e.endsong && E.log(e.endsong), e.endsongs && f.log(e.endsongs);
        var i = this._currentContext;
        if (i) {
            var n = e.state_machine,
                r = e.updated_state_ref;
            this._isCurrentStateRef(t) && (i.setStateMachine(n), i.setCurrentState(r), this._emitStateChanged())
        }
    }, n.prototype.register = function () {
        if (this._registered) return o.resolve(!1);
        var t, e = this._currentContext;
        e ? (t = this._generateStatePayload(e.getStateRef(), "register"), this._setSequenceNumber(t)) : t = null;
        var i = JSON.stringify({
            device: this._deviceInfo,
            connection_id: this._connectionId,
            client_version: this._clientVersion,
            previous_session_state: t,
            volume: this._gaiaVolume
        });
        return this._sendRegisterRequest(i).then(this._parseRegisterResponse.bind(this)).then(function (t) {
            return t.endsong && E.log(t.endsong), t.endsongs && f.log(t.endsongs), this._registered = !0, this._sequenceNumber = t.initial_seq_num, this.emit(c.TP_API_REGISTERED, {
                deviceId: this._deviceId
            }), this.emit(c.TP_API_READY, {
                settings: {}
            }), !0
        }.bind(this)).catch(function (t) {
            if (t) {
                if (t.maxedSubscriptions) return !1;
                t.registration = !0
            }
            return this._emitError(t), !1
        }.bind(this))
    }, n.prototype.deregister = function () {
        if (!this._registered) return o.resolve(!1);
        this._registered = !1;
        var t = this._listPlayer;
        return t.getPlayerState().then(function (e) {
            var i = this._currentContext,
                n = null;
            i && (i.setPaused(!e.playing), this._setAllPositions(e.position), n = i.getStateRef());
            var r = this._generateStatePayload(n, "deregister");
            this._setSequenceNumber(r);
            var s = this._endpoint + "/v1/devices/" + this._deviceId;
            return o.all([this._transport.request(s, {
                authorize: !0,
                method: "DELETE",
                payload: JSON.stringify(r),
                responseType: "json",
                retry: A
            }), this._waitingForTrackingData.promise, t.stop().catch(function () {})]).spread(function (t) {
                return t
            })
        }.bind(this), function () {
            return this._registered = !0, !1
        }.bind(this)).then(function (t) {
            if (!t || 200 !== t.status && 204 !== t.status) return this._registered = !0, !1;
            var e = t.body;
            return e && e.endsong && E.log(e.endsong), e && e.endsongs && f.log(e.endsongs), this._clearSessionData(), this.emit(c.TP_API_DEREGISTERED), !0
        }.bind(this))
    }, n.prototype.getStreamTime = function () {
        return o.resolve(this._totalStreamTime)
    }, n.prototype.setStreamTime = function (t) {
        var e = parseFloat(t);
        if (isNaN(e) || e < this._totalStreamTime || !(e < 1 / 0)) throw new d(p.TP_STREAM_TIME_VALUE_OUT_OF_RANGE, "Cannot set stream time to less than the current time.");
        this._totalStreamTime = e
    }, t.exports = n
}, function (t, e, i) {
    "use strict";

    function n(t, e) {
        var i = e || {};
        this._fn = t, this._cancelFn = i.cancel || null, this._threshold = i.threshold || o.threshold, this._ts = i.initialTimetamp || o.timestamp, this._blockInital = i.blockInitial || o.blockInitial, this._deferredTimer = null, this.sync = this.sync.bind(this), this.async = this.async.bind(this)
    }
    var r = i(0),
        s = Array.prototype.slice,
        o = {
            threshold: 1e3,
            timestamp: 0,
            blockInitial: !1
        };
    n.prototype._deferFn = function (t) {
        this._fn.apply(this._fn, t)
    }, n.prototype._deferPromise = function (t, e) {
        this._fn.apply(this._fn, t).then(function (t) {
            e.resolve(t)
        })
    }, n.prototype.sync = function () {
        var t = s.call(arguments),
            e = Date.now() - this._ts;
        return this._ts = Date.now(), e < this._threshold ? (this._cancelFn && this._deferredTimer && this._cancelFn(), clearTimeout(this._deferredTimer), void(this._deferredTimer = setTimeout(this._deferFn.bind(this, t), this._threshold))) : !0 === this._blockInital ? void this.sync.apply(this, t) : void this._fn.apply(this._fn, t)
    }, n.prototype.async = function () {
        var t = s.call(arguments),
            e = Date.now() - this._ts;
        if (this._ts = Date.now(), e < this._threshold) {
            this._cancelFn && this._deferredTimer && this._cancelFn(), clearTimeout(this._deferredTimer);
            var i = r.defer();
            return this._deferredTimer = setTimeout(this._deferPromise.bind(this, t, i), this._threshold), i.promise
        }
        return !0 === this._blockInital ? this.async.apply(this, t) : this._fn.apply(this._fn, t)
    }, n.prototype.setCancel = function (t) {
        this._cancelFn = t
    }, t.exports = n
}, function (t, e, i) {
    "use strict";

    function n(t, e) {
        this._uri = t, this._manifestFormats = e, this._deviceId = null, this._stateMachine = null, this._currentState = null, this._currentStateIndex = null, this._pausedState = !1, this._initialPlaybackPosition = null
    }
    var r = i(0),
        s = i(35),
        o = i(34),
        a = i(14);
    n.create = function (t, e) {
        return new n(t, e)
    }, n.prototype.setPaused = function (t) {
        this._pausedState = !!t
    }, n.prototype.isPaused = function () {
        return this._currentStateIndex < 0 ? this._currentState.transitions.advance.paused : this._pausedState
    }, n.prototype.setInitialPosition = function (t) {
        this._initialPlaybackPosition = t
    }, n.prototype.setStateMachine = function (t) {
        this._stateMachine = t
    }, n.prototype.setDeviceId = function (t) {
        this._deviceId = t
    }, n.prototype.startAtState = function (t) {
        var e = this._stateMachine.states[t.state_index];
        if (!e) throw new o(a.TP_MISSING_INITIAL_STATE, "Invalid state reference.");
        var i = e.transitions;
        this._currentStateIndex = -1, this._currentState = {
            decoy: !0,
            paused: !!t.paused,
            track: -1,
            state_id: null,
            transitions: {
                advance: t,
                show_next: i.show_next,
                show_prev: i.show_prev,
                skip_next: t,
                skip_prev: i.skip_prev
            }
        }
    }, n.prototype.setCurrentState = function (t) {
        var e = t.state_index;
        this._currentStateIndex = e, this._currentState = this._stateMachine.states[e]
    }, n.prototype.getStateMachine = function () {
        return this._stateMachine
    }, n.prototype.getInternalStateRef = function () {
        var t = this._pausedState,
            e = this._currentStateIndex;
        if (e < 0) {
            var i = this._currentState.transitions.advance;
            e = i.state_index, t = i.paused
        }
        return {
            paused: t,
            state_index: e
        }
    }, n.prototype.getStateRef = function () {
        var t = this._stateMachine;
        if (!t) return null;
        var e, i;
        if (this._currentStateIndex < 0) {
            var n = this._currentState.transitions.advance;
            e = t.states[n.state_index], i = n.paused
        } else e = t.states[this._currentStateIndex], i = this._pausedState;
        return e ? {
            state_machine_id: t.state_machine_id,
            state_id: e.state_id,
            paused: i
        } : null
    }, n.prototype.getCurrentTrack = function () {
        var t, e = this._stateMachine;
        if (this._currentStateIndex < 0) {
            var i = this._currentState.transitions.advance;
            t = e.states[i.state_index]
        } else t = e.states[this._currentStateIndex];
        return t ? null : e.tracks[t.track]
    }, n.prototype.startAt = function () {
        return r.resolve(!0)
    }, n.prototype.setShuffle = function () {
        return r.resolve(!0)
    }, n.prototype.setRepeatMode = function () {}, n.prototype.next = function (t) {
        var e = this._currentState,
            i = e.transitions,
            n = null;
        switch (t.reason) {
            case "nextbtn":
            case "fwdbtn":
                "skip_next" in i && (n = i.skip_next);
                break;
            default:
                "advance" in i && (n = i.advance)
        }
        return this._transitionTo(n, t, !1)
    }, n.prototype.peekNext = function (t) {
        var e = this._currentState,
            i = e.transitions,
            n = null;
        switch (t.reason) {
            case "nextbtn":
            case "fwdbtn":
                "skip_next" in i && (n = i.skip_next);
                break;
            default:
                "advance" in i && (n = i.advance)
        }
        return this._transitionTo(n, t, !0)
    }, n.prototype.previous = function (t) {
        var e = this._currentState,
            i = e.transitions,
            n = i.skip_prev;
        return this._transitionTo(n, t, !1)
    }, n.prototype.allowSeeking = function () {
        return this._currentState && !this._currentState.disallow_seeking
    }, n.prototype._transitionTo = function (t, e, i) {
        var n = e.reason,
            o = e.listConstants;
        if (!t || null === t) return r.resolve(o.FORBIDDEN);
        var a = this._stateMachine,
            _ = a.states,
            c = _[t.state_index];
        if (!c) return r.resolve(o.NULL_VALUE);
        var u = a.tracks[c.track];
        if (!u || !u.metadata || !u.metadata.uri) return r.resolve(o.NULL_VALUE);
        var h = this._currentState,
            d = h.decoy ? !!h.paused : t.paused;
        i || (this._currentState = c, this._currentStateIndex = t.state_index, this._pausedState = d);
        var p = 0;
        i || null === this._initialPlaybackPosition ? "initial_playback_position" in c ? p = c.initial_playback_position || 0 : "seek_to" in c && (p = c.seek_to || 0) : (p = this._initialPlaybackPosition, this._initialPlaybackPosition = null);
        var l = s(this._manifestFormats, u);
        if (!l) return r.resolve(o.NULL_VALUE);
        var E = this._uri;
        u.metadata && u.metadata.context_uri && (E = u.metadata.context_uri);
        var f = n,
            T = {
                uri: l.uri,
                playableURI: l.uri,
                playable: l.playable,
                fileId: l.fileId,
                format: l.format,
                mediaType: l.mediaType,
                noManifest: l.noManifest,
                options: {
                    position: p,
                    paused: d
                },
                logData: {
                    noLog: !!l.noLog,
                    deviceId: this._deviceId,
                    playbackId: c.state_id,
                    reason: f,
                    displayTrack: l.uri,
                    playContext: E,
                    impressionURL: l.impressionURL,
                    impressionURLs: l.impressionURLs,
                    format: {
                        codec: l.format,
                        bitrate: l.bitrate
                    }
                },
                stateId: c.state_id
            };
        return r.resolve(T)
    }, t.exports = n
}, function (t, e, i) {
    "use strict";

    function n(t) {
        s.call(this), this._descriptor = t.descriptor, this._client = t.client, this._listPlayer = t.listPlayer, this._tpApiClient = t.tpApiClient, this._playerPromise = t.playerPromise, this._initialVolume = t.initialVolume, this.emitEvent = this.emitEvent.bind(this), this._init()
    }
    var r = i(2),
        s = i(3),
        o = i(106),
        a = i(24),
        _ = i(11),
        c = i(7),
        u = i(33);
    r(n, s), n.prototype._init = function () {
        this._client.on(_.CLIENT_BEFORE_DISCONNECT, this._onClientBeforeDisconnect.bind(this)), this._client.on(_.CLIENT_BEFORE_OFFLINE_DISCONNECT, this._onClientBeforeOfflineDisconnect.bind(this));
        var t = this._listPlayer;
        t.on(c.LIST_PLAYER_TRACK_LOADED, this.emitEvent), t.on(c.LIST_PLAYER_PLAYING, this.emitEvent), t.on(c.LIST_PLAYER_PAUSED, this.emitEvent), t.on(c.LIST_PLAYER_DURATION_CHANGED, this.emitEvent), t.on(c.LIST_PLAYER_POSITION_CHANGED, this.emitEvent), t.on(c.LIST_PLAYER_LOAD_VIDEO, this.emitEvent), t.on(c.LIST_PLAYER_STOPPED_VIDEO, this.emitEvent), t.on(c.LIST_PLAYER_CAPPED, this._onCapped.bind(this)), t.on(c.LIST_PLAYER_MAX_LIST_ERRORS_REACHED, this.emitEvent), t.on(c.LIST_PLAYER_VIDEO_ELEMENT_APPENDED, this.emitEvent), t.on(c.LIST_PLAYER_VIDEO_ELEMENT_REMOVED, this.emitEvent), t.on(c.LIST_PLAYER_LIST_ENDED, this._onListEnded.bind(this)), t.on(c.LIST_PLAYER_ERROR, this._onError.bind(this, a.PLAYBACK)), t.on(c.PLAYER_PROGRESS, this.emitEvent);
        var e = this._tpApiClient;
        e.on(_.TP_API_ERROR, this._onError.bind(this, a.TRACK_PLAYBACK)), e.on(_.TP_API_DEREGISTERED, this.emitEvent), e.on(_.TP_API_LOGOUT, this._onTPAPILogout.bind(this)), e.on(_.TP_API_MAX_SUBSCRIPTIONS_REACHED, this.emitEvent), e.on(_.TP_API_REGISTERED, this._onTPAPIRegistered.bind(this));
        var i = new o(this._tpApiClient, {
            manifestFormats: this._descriptor.then(function (t) {
                return t.capabilities.manifest_formats
            })
        });
        i.on(_.PLAYBACK_STATE_OBSERVER_STATE_CHANGED, this.emitEvent), this._playbackState = i, this._playerPromise.then(function (t) {
            t.setVolume(this._initialVolume), this.emit(_.STREAMER_PLAYER_INITIALIZATION_DONE)
        }.bind(this), function (t) {
            this.emit(_.STREAMER_PLAYER_INITIALIZATION_FAILED, {
                reason: t.message,
                error: t
            })
        }.bind(this))
    }, n.prototype._assertOperationSuccess = function (t) {
        return t === u.SUCCESS
    }, n.prototype._onClientBeforeDisconnect = function (t) {
        t && t.waiters.push(this.deregister().catch(function () {}))
    }, n.prototype._onClientBeforeOfflineDisconnect = function (t) {
        t && t.waiters.push(this.pause().catch(function () {}))
    }, n.prototype._onCapped = function () {
        this.emit(_.STREAMER_PLAYBACK_CAPPED)
    }, n.prototype._onError = function (t, e) {
        var i = e.error;
        "tpapi-client" === t && i && i.registration && this.emit(_.STREAMER_REGISTRATION_ERROR, {
            error: i
        }), this.emit(_.STREAMER_ERROR, {
            source: t,
            name: e.name,
            error: i
        }), this._client.notifyError(t, e.name, e.error)
    }, n.prototype._onTPAPILogout = function () {
        this._client.disconnect(), this.emit(_.STREAMER_LOGGED_OUT)
    }, n.prototype._onTPAPIRegistered = function () {
        this.emit(_.STREAMER_REGISTERED)
    }, n.prototype._onListEnded = function (t) {
        this.emit(_.STREAMER_CONTEXT_ENDED, t)
    }, n.prototype.register = function () {
        return this._tpApiClient.register()
    }, n.prototype.deregister = function () {
        return this._tpApiClient.deregister()
    }, n.prototype.resume = function () {
        return this._listPlayer.resume().then(this._assertOperationSuccess)
    }, n.prototype.pause = function () {
        return this._listPlayer.pause().then(this._assertOperationSuccess)
    }, n.prototype.nextTrack = function (t) {
        return this._listPlayer.next(t || "nextbtn").then(this._assertOperationSuccess)
    }, n.prototype.canChangeTrack = function () {
        return this._listPlayer.canChangeTrack()
    }, n.prototype.previousTrack = function (t) {
        return this._listPlayer.previous(t || "prevbtn").then(this._assertOperationSuccess)
    }, n.prototype.togglePlay = function () {
        return this._listPlayer.togglePlay().then(this._assertOperationSuccess)
    }, n.prototype.setVolume = function (t) {
        return this._listPlayer.setVolume(t).then(this._assertOperationSuccess)
    }, n.prototype.getVolume = function () {
        return this._listPlayer.getVolume()
    }, n.prototype.seek = function (t) {
        return this._listPlayer.seek(t).then(this._assertOperationSuccess)
    }, n.prototype.getCurrentState = function () {
        return this._playbackState.getCurrentState()
    }, n.prototype.getCurrentTrackBitrate = function () {
        return this._playbackState.getCurrentTrackBitrate()
    }, n.prototype.setStreamTime = function (t) {
        this._tpApiClient.setStreamTime(t)
    }, n.prototype.getStreamTime = function () {
        return this._tpApiClient.getStreamTime()
    }, t.exports = n
}, function (t, e, i) {
    "use strict";

    function n(t, e) {
        a.call(this), this._tpApiClient = t;
        var i = e || {};
        this._numPreviousTracks = i.numPrevious || 2, this._numNextTracks = i.numNextTracks || 2, this._manifestFormats = i.manifestFormats || s.resolve([]), this._state = null, this._init()
    }
    var r = i(5).forTag("stream.PlaybackStateObserver"),
        s = i(0),
        o = i(2),
        a = i(3),
        _ = i(107),
        c = i(35),
        u = i(11),
        h = i(108),
        d = /^disallow_([^]+)_reasons$/;
    o(n, a), n.prototype._init = function () {
        this._tpApiClient.on(u.TP_API_STATE_CHANGED, this._onStateChanged.bind(this)), this._tpApiClient.on(u.TP_API_STATE_CLEARED, this._onStateCleared.bind(this))
    }, n.prototype._parseDisallows = function (t) {
        var e = {},
            i = t.restrictions;
        for (var n in i)
            if (i.hasOwnProperty(n)) {
                var r = !(!i[n] || !i[n].length);
                e[n.replace(d, "$1")] = r
            }
        return e
    }, n.prototype._onStateChanged = function (t) {
        var e = t.position,
            i = t.duration,
            n = Date.now(),
            s = t.paused,
            o = t.stateMachine,
            a = t.stateRef.state_index,
            _ = o.states,
            h = _[a],
            d = h.restrictions || {},
            p = this._parseDisallows(h);
        if (!h) return void r.warn("_onStateChanged called with no current state", t);
        var l = this,
            E = function (t, e) {
                return l._getTrackMetadata(o, t, e)
            },
            f = {
                current_track: E(h, i),
                next_tracks: this._getNextStates(h, _).map(E),
                previous_tracks: this._getPreviousStates(h, _).map(E)
            },
            T = this._getRepeatSetting(o),
            y = {
                context: {
                    uri: null,
                    metadata: {}
                },
                bitrate: null,
                position: e,
                duration: i,
                paused: s,
                shuffle: this._getShuffleSetting(o),
                repeat_mode: T,
                track_window: f,
                timestamp: n,
                restrictions: d,
                disallows: p
            },
            m = o.tracks[h.track];
        m && m.metadata && (m.metadata.context_uri && (y.context.uri = m.metadata.context_uri), m.metadata.context_description && (y.context.metadata.context_description = m.metadata.context_description)), this._manifestFormats.then(function (t) {
            var e = c(t, m);
            y.bitrate = e.bitrate, this._state = y, this.emit(u.PLAYBACK_STATE_OBSERVER_STATE_CHANGED, {
                state: this._copyState()
            })
        }.bind(this))
    }, n.prototype._onStateCleared = function () {
        this._state = null, this.emit(u.PLAYBACK_STATE_OBSERVER_STATE_CHANGED, {
            state: null
        })
    }, n.prototype._getRepeatSetting = function (t) {
        var e = t.attributes.options;
        return e.repeating_track ? h.TRACK : e.repeating_context ? h.CONTEXT : h.OFF
    }, n.prototype._getShuffleSetting = function (t) {
        return t.attributes.options.shuffling_context
    }, n.prototype._getNextStates = function (t, e) {
        for (var i = this._numNextTracks, n = [], r = t; r && "show_next" in r.transitions && r.transitions.show_next;) {
            var s = r.transitions,
                o = e[s.show_next.state_index];
            if (n.push(o), r = o, n.length >= i) break
        }
        return n
    }, n.prototype._getPreviousStates = function (t, e) {
        for (var i = this._numPreviousTracks, n = [], r = t; r && "show_prev" in r.transitions && r.transitions.show_prev;) {
            var s = r.transitions,
                o = e[s.show_prev.state_index];
            if (n.unshift(o), r = o, n.length >= i) break
        }
        return n
    }, n.prototype._getTrackMetadata = function (t, e, i) {
        var n = t.tracks[e.track];
        if (!n && n.metadata) return null;
        var r = n.metadata,
            s = n.manifest && "manifest_ids_video" in n.manifest,
            o = _.from(r.uri),
            a = r.linked_from_uri ? _.fromString(r.linked_from_uri) : null;
        return {
            id: o ? _.hexToId(o.id) : null,
            uri: r.uri,
            type: o ? o.type : null,
            linked_from_uri: r.linked_from_uri || null,
            linked_from: {
                uri: r.linked_from_uri || null,
                id: a ? _.hexToId(a.id) : null
            },
            media_type: s ? "video" : "audio",
            name: r.name,
            duration_ms: i || r.duration,
            artists: r.authors,
            album: {
                uri: r.group_uri,
                name: r.group_name,
                images: r.images
            },
            is_playable: !0
        }
    }, n.prototype._getTrackBitrate = function (t, e) {
        var i = t.tracks[e.track];
        if (!i && i.metadata) return null;
        var n = i.manifest;
        return n.file_ids_mp4 ? n.file_ids_mp4.map(function (t) {
            return t.bitrate
        }) : n.file_ids_mp3.map(function (t) {
            return t.bitrate
        })
    }, n.prototype.getCurrentState = function () {
        if (this._state && !this._state.paused) {
            var t = Date.now(),
                e = this._state.position + (t - this._state.timestamp);
            this._state.position = e, this._state.timestamp = t
        }
        return s.resolve(this._copyState())
    }, n.prototype._copyState = function () {
        return JSON.parse(JSON.stringify(this._state))
    }, n.prototype.getCurrentTrackBitrate = function () {
        var t = s.defer();
        return this._state ? t.resolve(this._state.bitrate) : this.once(u.PLAYBACK_STATE_OBSERVER_STATE_CHANGED, function (e) {
            e.state && t.resolve(e.state.bitrate)
        }), t.promise
    }, t.exports = n
}, function (t, e, i) {
    "use strict";

    function n(t, e) {
        this.type = t;
        for (var i in e) "function" != typeof e[i] && (this[i] = e[i])
    }
    var r = i(25),
        s = new TypeError("Invalid Spotify URI!"),
        o = (new TypeError("Not implemented!"), {
            URI: 0,
            URL: 1
        }),
        a = function (t) {
            var e, i, n, r, a = t.split("?");
            if (a.length > 1) {
                t = a.shift(), n = a.pop();
                var _ = n.split("#");
                _.length > 1 && (n = _.shift(), r = _.pop()), n = d(n)
            }
            var c = t.split("#");
            if (c.length > 1 && (t = c.shift(), r = c.pop()), 0 === t.indexOf("spotify:")) e = t.slice("spotify:".length).split(":"), i = o.URI;
            else {
                if (t = t.split("?")[0], 0 === t.indexOf("http://play.spotify.com/")) e = t.slice("http://play.spotify.com/".length).split("/");
                else if (0 === t.indexOf("https://play.spotify.com/")) e = t.slice("https://play.spotify.com/".length).split("/");
                else if (0 === t.indexOf("http://open.spotify.com/")) e = t.slice("http://open.spotify.com/".length).split("/");
                else {
                    if (0 !== t.indexOf("https://open.spotify.com/")) throw s;
                    e = t.slice("https://open.spotify.com/".length).split("/")
                }
                i = o.URL
            }
            return r && e.push(r), {
                format: i,
                components: e,
                query: n
            }
        },
        _ = function (t, e) {
            return t = encodeURIComponent(t), e === o.URI && (t = t.replace(/%20/g, "+")), t = t.replace(/[!'()]/g, escape), t = t.replace(/\*/g, "%2A")
        },
        c = function (t, e) {
            var i = e == o.URI ? t.replace(/\+/g, "%20") : t;
            return decodeURIComponent(i)
        },
        u = function (t, e) {
            var i;
            t.id && (i = t._base62Id);
            var r, o, a;
            switch (t.type) {
                case n.Type.ALBUM:
                    return r = [n.Type.ALBUM, i], t.disc && r.push(t.disc), r;
                case n.Type.AD:
                    return [n.Type.AD, t._base62Id];
                case n.Type.ARTIST:
                    return [n.Type.ARTIST, i];
                case n.Type.ARTIST_TOPLIST:
                    return [n.Type.ARTIST, i, n.Type.TOP, t.toplist];
                case n.Type.SEARCH:
                    return [n.Type.SEARCH, _(t.query, e)];
                case n.Type.TRACK:
                    return (t.context || t.play) && (i += h({
                        context: t.context,
                        play: t.play
                    })), t.anchor && (i += "#" + t.anchor), [n.Type.TRACK, i];
                case n.Type.TRACKSET:
                    var c = [];
                    for (o = 0, a = t.tracks.length; o < a; o++) c.push(t.tracks[o]._base62Id);
                    return c = [c.join(",")], null !== t.index && c.push("#", t.index), [n.Type.TRACKSET, _(t.name)].concat(c);
                case n.Type.FACEBOOK:
                    return [n.Type.USER, n.Type.FACEBOOK, t.uid];
                case n.Type.AUDIO_FILE:
                    return [n.Type.AUDIO_FILE, t.extension, t._base62Id];
                case n.Type.FOLDER:
                    return [n.Type.USER, _(t.username, e), n.Type.FOLDER, t._base62Id];
                case n.Type.FOLLOWERS:
                    return [n.Type.USER, _(t.username, e), n.Type.FOLLOWERS];
                case n.Type.FOLLOWING:
                    return [n.Type.USER, _(t.username, e), n.Type.FOLLOWING];
                case n.Type.PLAYLIST:
                    return [n.Type.USER, _(t.username, e), n.Type.PLAYLIST, i];
                case n.Type.STARRED:
                    return [n.Type.USER, _(t.username, e), n.Type.STARRED];
                case n.Type.TEMP_PLAYLIST:
                    return [n.Type.TEMP_PLAYLIST, t.origin, t.data];
                case n.Type.CONTEXT_GROUP:
                    return [n.Type.CONTEXT_GROUP, t.origin, t.name];
                case n.Type.USER_TOPLIST:
                    return [n.Type.USER, _(t.username, e), n.Type.TOP, t.toplist];
                case n.Type.USER_TOP_TRACKS:
                    return [n.Type.USER, _(t.username, e), n.Type.TOPLIST];
                case n.Type.TOPLIST:
                    return [n.Type.TOP, t.toplist].concat(t.global ? [n.Type.GLOBAL] : ["country", t.country]);
                case n.Type.INBOX:
                    return [n.Type.USER, _(t.username, e), n.Type.INBOX];
                case n.Type.ROOTLIST:
                    return [n.Type.USER, _(t.username, e), n.Type.ROOTLIST];
                case n.Type.PUBLISHED_ROOTLIST:
                    return [n.Type.USER, _(t.username, e), n.Type.PUBLISHED_ROOTLIST];
                case n.Type.COLLECTION_TRACK_LIST:
                    return [n.Type.USER, _(t.username, e), n.Type.COLLECTION_TRACK_LIST, i];
                case n.Type.PROFILE:
                    return t.args && t.args.length > 0 ? [n.Type.USER, _(t.username, e)].concat(t.args) : [n.Type.USER, _(t.username, e)];
                case n.Type.LOCAL_ARTIST:
                    return [n.Type.LOCAL, _(t.artist, e)];
                case n.Type.LOCAL_ALBUM:
                    return [n.Type.LOCAL, _(t.artist, e), _(t.album, e)];
                case n.Type.LOCAL:
                    return [n.Type.LOCAL, _(t.artist, e), _(t.album, e), _(t.track, e), t.duration];
                case n.Type.LIBRARY:
                    return [n.Type.USER, _(t.username, e), n.Type.LIBRARY].concat(t.category ? [t.category] : []);
                case n.Type.IMAGE:
                    return [n.Type.IMAGE, t._base62Id];
                case n.Type.MOSAIC:
                    return r = t.ids.slice(0), r.unshift(n.Type.MOSAIC), r;
                case n.Type.RADIO:
                    return [n.Type.RADIO, t.args];
                case n.Type.SPECIAL:
                    r = [n.Type.SPECIAL];
                    var u = t.args || [];
                    for (o = 0, a = u.length; o < a; ++o) r.push(_(u[o], e));
                    return r;
                case n.Type.STATION:
                    r = [n.Type.STATION];
                    var u = t.args || [];
                    for (o = 0, a = u.length; o < a; o++) r.push(_(u[o], e));
                    return r;
                case n.Type.APPLICATION:
                    r = [n.Type.APP, t._base62Id];
                    var u = t.args || [];
                    for (o = 0, a = u.length; o < a; ++o) r.push(_(u[o], e));
                    return r;
                case n.Type.COLLECTION_ALBUM:
                    return [n.Type.USER, _(t.username, e), n.Type.COLLECTION, n.Type.ALBUM, i];
                case n.Type.COLLECTION_MISSING_ALBUM:
                    return [n.Type.USER, _(t.username, e), n.Type.COLLECTION, n.Type.ALBUM, i, "missing"];
                case n.Type.COLLECTION_ARTIST:
                    return [n.Type.USER, _(t.username, e), n.Type.COLLECTION, n.Type.ARTIST, i];
                case n.Type.COLLECTION:
                    return [n.Type.USER, _(t.username, e), n.Type.COLLECTION].concat(t.category ? [t.category] : []);
                case n.Type.EPISODE:
                    return (t.context || t.play) && (i += h({
                        context: t.context,
                        play: t.play
                    })), [n.Type.EPISODE, i];
                case n.Type.SHOW:
                    return [n.Type.SHOW, i];
                case n.Type.CONCERT:
                    return [n.Type.CONCERT, i];
                default:
                    throw s
            }
        },
        h = function (t) {
            var e = "?";
            for (var i in t) t.hasOwnProperty(i) && void 0 !== t[i] && (e.length > 1 && (e += "&"), e += i + "=" + encodeURIComponent(t[i]));
            return e
        },
        d = function (t) {
            return t.split("&").reduce(function (t, e) {
                return e = e.split("="), t[e[0]] = decodeURIComponent(e[1]), t
            }, {})
        },
        p = function (t, e, i) {
            var r = 0;
            i = i || {};
            var a, u, h, d = function () {
                    return t[r++]
                },
                p = function () {
                    var t = d();
                    if (t.length > 22) throw new Error("Invalid ID");
                    return t
                },
                l = function () {
                    return t.slice(r)
                },
                E = function () {
                    var i = e == o.URI ? ":" : "/";
                    return t.slice(r).join(i)
                },
                f = d();
            switch (f) {
                case n.Type.ALBUM:
                    return n.albumURI(p(), parseInt(d(), 10));
                case n.Type.AD:
                    return n.adURI(d());
                case n.Type.ARTIST:
                    return a = p(), d() == n.Type.TOP ? n.artistToplistURI(a, d()) : n.artistURI(a);
                case n.Type.AUDIO_FILE:
                    return n.audioFileURI(d(), d());
                case n.Type.TEMP_PLAYLIST:
                    return n.temporaryPlaylistURI(d(), E());
                case n.Type.SEARCH:
                    return n.searchURI(c(E(), e));
                case n.Type.TRACK:
                    return n.trackURI(p(), d(), i.context, i.play);
                case n.Type.TRACKSET:
                    var T = c(d()),
                        y = d(),
                        m = d(),
                        R = parseInt(d(), 10);
                    ("%23" !== m || isNaN(R)) && (R = null);
                    var S = [];
                    if (y)
                        for (y = c(y).split(","), u = 0, h = y.length; u < h; u++) {
                            var g = y[u];
                            S.push(n.trackURI(g))
                        }
                    return n.tracksetURI(S, T, R);
                case n.Type.CONTEXT_GROUP:
                    return n.contextGroupURI(d(), d());
                case n.Type.TOP:
                    var A = d();
                    return d() == n.Type.GLOBAL ? n.toplistURI(A, null, !0) : n.toplistURI(A, d(), !1);
                case n.Type.USER:
                    var I = c(d(), e),
                        v = d();
                    if (I == n.Type.FACEBOOK && null != v) return n.facebookURI(parseInt(v, 10));
                    if (null != v) switch (v) {
                        case n.Type.PLAYLIST:
                            return n.playlistURI(I, p());
                        case n.Type.FOLDER:
                            return n.folderURI(I, p());
                        case n.Type.COLLECTION_TRACK_LIST:
                            return n.collectionTrackList(I, p());
                        case n.Type.COLLECTION:
                            var L = d();
                            switch (L) {
                                case n.Type.ALBUM:
                                    return a = p(), "missing" === d() ? n.collectionMissingAlbumURI(I, a) : n.collectionAlbumURI(I, a);
                                case n.Type.ARTIST:
                                    return n.collectionArtistURI(I, p());
                                default:
                                    return n.collectionURI(I, L)
                            }
                        case n.Type.STARRED:
                            return n.starredURI(I);
                        case n.Type.FOLLOWERS:
                            return n.followersURI(I);
                        case n.Type.FOLLOWING:
                            return n.followingURI(I);
                        case n.Type.TOP:
                            return n.userToplistURI(I, d());
                        case n.Type.INBOX:
                            return n.inboxURI(I);
                        case n.Type.ROOTLIST:
                            return n.rootlistURI(I);
                        case n.Type.PUBLISHED_ROOTLIST:
                            return n.publishedRootlistURI(I);
                        case n.Type.TOPLIST:
                            return n.userTopTracksURI(I);
                        case n.Type.LIBRARY:
                            return n.libraryURI(I, d())
                    }
                    var C = l();
                    return null != v && C.length > 0 ? n.profileURI(I, [v].concat(C)) : null != v ? n.profileURI(I, [v]) : n.profileURI(I);
                case n.Type.LOCAL:
                    var O = d(),
                        P = O && c(O, e),
                        D = d(),
                        N = D && c(D, e),
                        b = d(),
                        k = b && c(b, e),
                        U = d(),
                        M = parseInt(U, 10);
                    return void 0 !== b ? n.localURI(P, N, k, M) : void 0 !== D ? n.localAlbumURI(P, N) : n.localArtistURI(P);
                case n.Type.IMAGE:
                    return n.imageURI(p());
                case n.Type.MOSAIC:
                    return n.mosaicURI(t.slice(r));
                case n.Type.RADIO:
                    return n.radioURI(E());
                case n.Type.SPECIAL:
                    var w = l();
                    for (u = 0, h = w.length; u < h; ++u) w[u] = c(w[u], e);
                    return n.specialURI(w);
                case n.Type.STATION:
                    return n.stationURI(l());
                case n.Type.EPISODE:
                    return n.episodeURI(p(), i.context, i.play);
                case n.Type.SHOW:
                    return n.showURI(p());
                case n.Type.CONCERT:
                    return n.concertURI(p());
                case "":
                    break;
                default:
                    a = f === n.Type.APP ? d() : f;
                    var F = c(a, e);
                    if (_(F, e) !== a) break;
                    var w = l();
                    for (u = 0, h = w.length; u < h; ++u) w[u] = c(w[u], e);
                    return n.applicationURI(F, w)
            }
            throw s
        };
    Object.defineProperty(n.prototype, "id", {
        get: function () {
            return this._hexId || (this._hexId = this._base62Id ? n.idToHex(this._base62Id) : void 0), this._hexId
        },
        set: function (t) {
            this._base62Id = t ? n.hexToId(t) : void 0, this._hexId = void 0
        },
        enumerable: !0,
        configurable: !0
    }), n.prototype.toAppType = function () {
        if (this.type == n.Type.APPLICATION) return n.applicationURI(this.id, this.args);
        var t = u(this, o.URL),
            e = t.shift(),
            i = t.length;
        if (i)
            for (; i--;) t[i] = c(t[i], o.URL);
        return this.type == n.Type.RADIO && (t = t.shift().split(":")), n.applicationURI(e, t)
    }, n.prototype.toRealType = function () {
        return this.type == n.Type.APPLICATION ? p([this.id].concat(this.args), o.URI) : new n(null, this)
    }, n.prototype.toURI = function () {
        return "spotify:" + u(this, o.URI).join(":")
    }, n.prototype.toString = function () {
        return this.toURI()
    }, n.prototype.toURLPath = function (t) {
        var e = u(this, o.URL);
        e[0] === n.Type.APP && e.shift();
        var i = e[0] === n.Type.TRACKSET,
            r = e[0] === n.Type.LOCAL;
        if (!i && !r) {
            for (var s = [], a = 0, _ = e.length; a < _; a++) {
                var c = e[a];
                c && s.push(c)
            }
            e = s
        }
        var h = e.join("/");
        return t ? "/" + h : h
    }, n.prototype.toPlayURL = function () {
        return "https://play.spotify.com/" + this.toURLPath()
    }, n.prototype.toURL = function () {
        return this.toPlayURL()
    }, n.prototype.toOpenURL = function () {
        return "https://open.spotify.com/" + this.toURLPath()
    }, n.prototype.toSecurePlayURL = function () {
        return this.toPlayURL()
    }, n.prototype.toSecureURL = function () {
        return this.toPlayURL()
    }, n.prototype.toSecureOpenURL = function () {
        return this.toOpenURL()
    }, n.prototype.idToByteString = function () {
        var t = r.toBytes(this._base62Id);
        for (t = t.map(function (t) {
                return String.fromCharCode(t)
            }).join(""); t.length < 16;) t = String.fromCharCode(0) + t;
        return t
    }, n.prototype.getPath = function () {
        return this.toString().replace(/[#?].*/, "")
    }, n.prototype.getBase62Id = function () {
        return this._base62Id
    }, n.Type = {
        EMPTY: "empty",
        ALBUM: "album",
        AD: "ad",
        APP: "app",
        APPLICATION: "application",
        ARTIST: "artist",
        ARTIST_TOPLIST: "artist-toplist",
        AUDIO_FILE: "audiofile",
        COLLECTION: "collection",
        COLLECTION_ALBUM: "collection-album",
        COLLECTION_MISSING_ALBUM: "collection-missing-album",
        COLLECTION_ARTIST: "collection-artist",
        CONTEXT_GROUP: "context-group",
        EPISODE: "episode",
        FACEBOOK: "facebook",
        FOLDER: "folder",
        FOLLOWERS: "followers",
        FOLLOWING: "following",
        GLOBAL: "global",
        IMAGE: "image",
        INBOX: "inbox",
        LOCAL_ARTIST: "local-artist",
        LOCAL_ALBUM: "local-album",
        LOCAL: "local",
        LIBRARY: "library",
        MOSAIC: "mosaic",
        PLAYLIST: "playlist",
        PROFILE: "profile",
        PUBLISHED_ROOTLIST: "published-rootlist",
        RADIO: "radio",
        ROOTLIST: "rootlist",
        COLLECTION_TRACK_LIST: "collectiontracklist",
        SEARCH: "search",
        SHOW: "show",
        CONCERT: "concert",
        SPECIAL: "special",
        STARRED: "starred",
        STATION: "station",
        TEMP_PLAYLIST: "temp-playlist",
        TOP: "top",
        TOPLIST: "toplist",
        TRACK: "track",
        TRACKSET: "trackset",
        USER: "user",
        USER_TOPLIST: "user-toplist",
        USER_TOP_TRACKS: "user-top-tracks",
        USET_TOP_TRACKS: "user-top-tracks"
    }, n.fromString = function (t) {
        var e = a(t);
        return p(e.components, e.format, e.query)
    }, n.from = function (t) {
        try {
            return t instanceof n ? t : "object" == typeof t && t.type ? new n(null, t) : n.fromString(t.toString())
        } catch (t) {
            return null
        }
    }, n.fromByteString = function (t, e, i) {
        for (var s = [], o = 0; o < e.length; o++) s.push(e.charCodeAt(o));
        var a = r.fromBytes(s, 22),
            _ = i || {};
        return _.id = a, new n(t, _)
    }, n.clone = function (t) {
        return t instanceof n ? new n(null, t) : null
    }, n.getCanonical = function (t) {
        return this.getCanonical(t)
    }, n.getCanonicalUsername = function (t) {
        return _(t, o.URI)
    }, n.getDisplayUsername = function (t) {
        return c(t, o.URI)
    }, n.idToHex = function (t) {
        return 22 == t.length ? r.toHex(t, 32) : t
    }, n.hexToId = function (t) {
        return 32 == t.length ? r.fromHex(t, 22) : t
    }, n.emptyURI = function () {
        return new n(n.Type.EMPTY, {})
    }, n.albumURI = function (t, e) {
        return new n(n.Type.ALBUM, {
            id: t,
            disc: e
        })
    }, n.adURI = function (t) {
        return new n(n.Type.AD, {
            id: t
        })
    }, n.audioFileURI = function (t, e) {
        return new n(n.Type.AUDIO_FILE, {
            id: e,
            extension: t
        })
    }, n.artistURI = function (t) {
        return new n(n.Type.ARTIST, {
            id: t
        })
    }, n.artistToplistURI = function (t, e) {
        return new n(n.Type.ARTIST_TOPLIST, {
            id: t,
            toplist: e
        })
    }, n.searchURI = function (t) {
        return new n(n.Type.SEARCH, {
            query: t
        })
    }, n.trackURI = function (t, e, i, r) {
        return new n(n.Type.TRACK, {
            id: t,
            anchor: e,
            context: i ? n.fromString(i) : i,
            play: r
        })
    }, n.tracksetURI = function (t, e, i) {
        return new n(n.Type.TRACKSET, {
            tracks: t,
            name: e || "",
            index: isNaN(i) ? null : i
        })
    }, n.facebookURI = function (t) {
        return new n(n.Type.FACEBOOK, {
            uid: t
        })
    }, n.followersURI = function (t) {
        return new n(n.Type.FOLLOWERS, {
            username: t
        })
    }, n.followingURI = function (t) {
        return new n(n.Type.FOLLOWING, {
            username: t
        })
    }, n.playlistURI = function (t, e) {
        return new n(n.Type.PLAYLIST, {
            username: t,
            id: e
        })
    }, n.folderURI = function (t, e) {
        return new n(n.Type.FOLDER, {
            username: t,
            id: e
        })
    }, n.collectionTrackList = function (t, e) {
        return new n(n.Type.COLLECTION_TRACK_LIST, {
            username: t,
            id: e
        })
    }, n.starredURI = function (t) {
        return new n(n.Type.STARRED, {
            username: t
        })
    }, n.userToplistURI = function (t, e) {
        return new n(n.Type.USER_TOPLIST, {
            username: t,
            toplist: e
        })
    }, n.userTopTracksURI = function (t) {
        return new n(n.Type.USER_TOP_TRACKS, {
            username: t
        })
    }, n.toplistURI = function (t, e, i) {
        return new n(n.Type.TOPLIST, {
            toplist: t,
            country: e,
            global: !!i
        })
    }, n.inboxURI = function (t) {
        return new n(n.Type.INBOX, {
            username: t
        })
    }, n.rootlistURI = function (t) {
        return new n(n.Type.ROOTLIST, {
            username: t
        })
    }, n.publishedRootlistURI = function (t) {
        return new n(n.Type.PUBLISHED_ROOTLIST, {
            username: t
        })
    }, n.localArtistURI = function (t) {
        return new n(n.Type.LOCAL_ARTIST, {
            artist: t
        })
    }, n.localAlbumURI = function (t, e) {
        return new n(n.Type.LOCAL_ALBUM, {
            artist: t,
            album: e
        })
    }, n.localURI = function (t, e, i, r) {
        return new n(n.Type.LOCAL, {
            artist: t,
            album: e,
            track: i,
            duration: r
        })
    }, n.libraryURI = function (t, e) {
        return new n(n.Type.LIBRARY, {
            username: t,
            category: e
        })
    }, n.collectionURI = function (t, e) {
        return new n(n.Type.COLLECTION, {
            username: t,
            category: e
        })
    }, n.temporaryPlaylistURI = function (t, e) {
        return new n(n.Type.TEMP_PLAYLIST, {
            origin: t,
            data: e
        })
    }, n.contextGroupURI = function (t, e) {
        return new n(n.Type.CONTEXT_GROUP, {
            origin: t,
            name: e
        })
    }, n.profileURI = function (t, e) {
        return new n(n.Type.PROFILE, {
            username: t,
            args: e
        })
    }, n.imageURI = function (t) {
        return new n(n.Type.IMAGE, {
            id: t
        })
    }, n.mosaicURI = function (t) {
        return new n(n.Type.MOSAIC, {
            ids: t
        })
    }, n.radioURI = function (t) {
        return t = void 0 === t ? "" : t, new n(n.Type.RADIO, {
            args: t
        })
    }, n.specialURI = function (t) {
        return t = void 0 === t ? [] : t, new n(n.Type.SPECIAL, {
            args: t
        })
    }, n.stationURI = function (t) {
        return t = void 0 === t ? [] : t, new n(n.Type.STATION, {
            args: t
        })
    }, n.applicationURI = function (t, e) {
        return e = void 0 === e ? [] : e, new n(n.Type.APPLICATION, {
            id: t,
            args: e
        })
    }, n.collectionAlbumURI = function (t, e) {
        return new n(n.Type.COLLECTION_ALBUM, {
            username: t,
            id: e
        })
    }, n.collectionMissingAlbumURI = function (t, e) {
        return new n(n.Type.COLLECTION_MISSING_ALBUM, {
            username: t,
            id: e
        })
    }, n.collectionArtistURI = function (t, e) {
        return new n(n.Type.COLLECTION_ARTIST, {
            username: t,
            id: e
        })
    }, n.episodeURI = function (t, e, i) {
        return new n(n.Type.EPISODE, {
            id: t,
            context: e ? n.fromString(e) : e,
            play: i
        })
    }, n.showURI = function (t) {
        return new n(n.Type.SHOW, {
            id: t
        })
    }, n.concertURI = function (t) {
        return new n(n.Type.CONCERT, {
            id: t
        })
    }, t.exports = n
}, function (t, e, i) {
    "use strict";
    var n = i(6),
        r = {
            OFF: 0,
            CONTEXT: 1,
            TRACK: 2
        };
    t.exports = n(r)
}]);