System.register(["aurelia-framework", "aurelia-event-aggregator"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var aurelia_framework_1, aurelia_event_aggregator_1, MessageQueue;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (aurelia_event_aggregator_1_1) {
                aurelia_event_aggregator_1 = aurelia_event_aggregator_1_1;
            }
        ],
        execute: function () {
            MessageQueue = class MessageQueue {
                constructor(ea) {
                    this.ea = ea;
                }
                Subscribe(callback) {
                    return this.ea.subscribe('react', callback);
                }
                SendMessage(msg) {
                    this.ea.publish('react', msg);
                }
            };
            MessageQueue = __decorate([
                aurelia_framework_1.inject(aurelia_event_aggregator_1.EventAggregator),
                __metadata("design:paramtypes", [aurelia_event_aggregator_1.EventAggregator])
            ], MessageQueue);
            exports_1("MessageQueue", MessageQueue);
        }
    };
});
