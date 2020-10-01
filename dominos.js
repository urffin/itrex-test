angular.module('dominos', [])
    .component('face', {
        bindings: {
            num: '<'
        },
        template: `<div ng-repeat="n in $ctrl.nums track by $index" ng-class="['dot', 'dot-'+($index+1)]"></div>`,
        controller: ['$element', function ($element) {
            this.$onInit = function () {
                $element.addClass(`face-${this.num} d-flex flex-column flex-wrap`);
                this.nums = Array(this.num);
            };
            this.$onChanges = function ({ num }) {
                if (num && !num.isFirstChange()) {
                    $element.removeClass(`face-${num.previousValue}`).addClass(`face-${this.num}`);
                    this.nums = Array(this.num);
                }
            };
        }]
    })
    .component('bone', {
        bindings: {
            up: '<',
            down: '<'
        },
        template: `
            <face num="$ctrl.up"></face>
            <div class="bone-separator"></div>
            <face num="$ctrl.down"></face>
        `
    })
    .component('dominos', {
        template: `<div class="btn-group" role="group">
            <button type="button" class="btn" ng-click="$ctrl.rotateLeft()">&circlearrowleft;</button>
            <button type="button" class="btn btn-light" ng-click="$ctrl.reset()">New</button>
            <button type="button" class="btn" ng-click="$ctrl.rotateRight()">&circlearrowright;</button>
        </div>
        <div class="bone-container">
            <bone up="$ctrl.up" down="$ctrl.down" ng-style="{ 'transform': 'rotate('+$ctrl.angle+'deg) scale('+$ctrl.size+')', 'transition': 'transform '+(1-$ctrl.speed)+'s' }"></bone>
        </div>
        <div class="bone-settings">
            <div class="input-group mb-3">
                <div class="input-group-prepend">Size:</div>
                <input type="range" class="custom-range" step="0.1" min="0.5" max="1.5" ng-model="$ctrl.size">
            </div>
            <div class="input-group">
                <div class="input-group-prepend">Speed:</div>
                <input type="range" class="custom-range" step="0.01" min="0" max="1" ng-model="$ctrl.speed">
            </div>
        </div>
        <div ng-if="$ctrl.showAFS" class="avaialble-faces-settings">
            <div class="d-flex justify-content-between">
                <div class="avaialble-faces">
                    Up
                    <div class="bone-separator"></div>
                    <face ng-repeat-start="num in $ctrl.availableFaces track by $index" ng-class="{selected: $index+1==$ctrl.up}" num="$index+1" ng-click="$ctrl.up=$index+1"></face>
                    <div ng-if="!$last" ng-repeat-end class="bone-separator"></div>
                </div>
                <div class="avaialble-faces">
                    Down
                    <div class="bone-separator"></div>
                    <face ng-repeat-start="num in $ctrl.availableFaces track by $index" ng-class="{selected: $index+1==$ctrl.down}" num="$index+1" ng-click="$ctrl.down=$index+1"></face>
                    <div ng-if="!$last" ng-repeat-end class="bone-separator"></div>
                </div>
            </div>
            <button type="button" class="btn btn-success mt-2" ng-click="$ctrl.showAFS=false">OK</button>
        </div>
        `,
        controller: function () {
            this.angle = 0;
            this.size = 1;
            this.speed = 0.5;
            this.up = 1;
            this.down = 1;
            this.availableFaces = Array(6);
            this.rotateLeft = function () {
                this.angle -= 90;
            };
            this.rotateRight = function () {
                this.angle += 90;
            };
            this.reset = function() {
                this.angle = 0;
                this.size = 1;
                this.speed = 0.5;
                this.up = 1;
                this.down = 1;
                this.showAFS = true;
            }
        }
    });