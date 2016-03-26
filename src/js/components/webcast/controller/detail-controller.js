'use strict';

/**
 * @ngInject
 */
module.exports = function (webcast, Notification, CurrentUserService, $scope, $state, $translate) {
  var vm = this;
  // functions
  vm.create = create;
  vm.update = update;
  // variables
  vm.selectedCustomer = CurrentUserService.getSelectedCustomer();

  vm.originalModel = angular.copy(webcast);
  vm.model = getModelPrepared(webcast);
  vm.options = {};
  vm.fieldsGeneral = getFieldsGeneral();
  vm.fieldsPrelive = getFieldsPrelive();
  vm.fieldsPostlive = getFieldsPostlive();
  vm.fieldsLive = getFieldsLive();
  vm.fieldsTheme = getFieldsTheme();
  vm.originalFields = angular.copy(vm.fields);

  vm.controlbarItemsHead = getControlbarItemsHead();
  vm.controlbarItemsLeft = getControlbarItemsLeft();
  vm.controlbarItemsRight = getControlbarItemsRight();

  // public methods ////////////////////////////////////////////////////////////////////////////////////////////////////

  function create() {
    webcast.$save().then(
      function () {
        Notification.success($translate.instant('webcast.msg.create.success'));
        $state.go('^', {}, {reload: true});
      },
      function () {
        Notification.error($translate.instant('webcast.msg.create.error'));
      }
    );
  }

  function update() {
    webcast.$update().then(
      function () {
        Notification.success($translate.instant('webcast.msg.update.success'));
        $state.go('^', {}, {reload: true});
      },
      function () {
        Notification.error($translate.instant('webcast.msg.update.error'));
      }
    );
  }

  // private methods ///////////////////////////////////////////////////////////////////////////////////////////////////

  // fields ============================================================================================================

  function getFieldsGeneral() {
    return [
      {
        key: 'name',
        type: 'input',
        templateOptions: {
          label: $translate.instant('webcast.form.name.label'),
          placeholder: $translate.instant('webcast.form.name.placeholder'),
          required: true
        }
      },
      {
        key: 'showQnA',
        type: 'checkbox',
        defaultValue: (angular.isDefined(vm.model.showQnA)),
        templateOptions: {
          label: $translate.instant('webcast.form.showQnA.label')
        }
      },
      {
        key: 'showChat',
        type: 'checkbox',
        defaultValue: (angular.isDefined(vm.model.showChat)),
        templateOptions: {
          label: $translate.instant('webcast.form.showChat.label')
        }
      },
      {
        key: 'showSlides',
        type: 'checkbox',
        defaultValue: (angular.isDefined(vm.model.showSlides)),
        templateOptions: {
          label: $translate.instant('webcast.form.showSlides.label')
        }
      },
      {
        key: 'showDataminerForm',
        type: 'checkbox',
        defaultValue: (angular.isDefined(vm.model.showDataminerForm)),
        templateOptions: {
          label: $translate.instant('webcast.form.showDataminerForm.label')
        }
      }
    ];
  }

  function getFieldsPrelive() {
    return [
      {
        key: 'hdsUrl',
        type: 'input',
        model: vm.model.preliveStateData.playout,
        templateOptions: {
          label: $translate.instant('webcast.form.hdsUrl.label'),
          placeholder: $translate.instant('webcast.form.hdsUrl.placeholder'),
          type: 'url',
          required: true
        }
      },
      {
        key: 'hlsUrl',
        type: 'input',
        model: vm.model.preliveStateData.playout,
        templateOptions: {
          label: $translate.instant('webcast.form.hlsUrl.label'),
          placeholder: $translate.instant('webcast.form.hlsUrl.placeholder'),
          type: 'url',
          required: true
        }
      },
      {
        key: 'dashUrl',
        type: 'input',
        model: vm.model.preliveStateData.playout,
        templateOptions: {
          label: $translate.instant('webcast.form.dashUrl.label'),
          placeholder: $translate.instant('webcast.form.dashUrl.placeholder'),
          type: 'url',
          required: true
        }
      }
    ];
  }

  function getFieldsPostlive() {
    return [
      {
        key: 'hdsUrl',
        type: 'input',
        model: vm.model.postliveStateData.playout,
        templateOptions: {
          label: $translate.instant('webcast.form.hdsUrl.label'),
          placeholder: $translate.instant('webcast.form.hdsUrl.placeholder'),
          type: 'url',
          required: true
        }
      },
      {
        key: 'hlsUrl',
        type: 'input',
        model: vm.model.postliveStateData.playout,
        templateOptions: {
          label: $translate.instant('webcast.form.hlsUrl.label'),
          placeholder: $translate.instant('webcast.form.hlsUrl.placeholder'),
          type: 'url',
          required: true
        }
      },
      {
        key: 'dashUrl',
        type: 'input',
        model: vm.model.postliveStateData.playout,
        templateOptions: {
          label: $translate.instant('webcast.form.dashUrl.label'),
          placeholder: $translate.instant('webcast.form.dashUrl.placeholder'),
          type: 'url',
          required: true
        }
      }
    ];
  }

  function getFieldsLive() {
    return [
      {
        key: 'hdsUrl',
        type: 'input',
        model: vm.model.liveStateData.playout,
        templateOptions: {
          label: $translate.instant('webcast.form.hdsUrl.label'),
          placeholder: $translate.instant('webcast.form.hdsUrl.placeholder'),
          type: 'url',
          required: true
        }
      },
      {
        key: 'hlsUrl',
        type: 'input',
        model: vm.model.liveStateData.playout,
        templateOptions: {
          label: $translate.instant('webcast.form.hlsUrl.label'),
          placeholder: $translate.instant('webcast.form.hlsUrl.placeholder'),
          type: 'url',
          required: true
        }
      },
      {
        key: 'dashUrl',
        type: 'input',
        model: vm.model.liveStateData.playout,
        templateOptions: {
          label: $translate.instant('webcast.form.dashUrl.label'),
          placeholder: $translate.instant('webcast.form.dashUrl.placeholder'),
          type: 'url',
          required: true
        }
      },
      {
        key: 'serverUrl',
        type: 'input',
        model: vm.model.liveStateData.broadcast,
        templateOptions: {
          label: $translate.instant('webcast.form.broadcast.serverUrl.label'),
          placeholder: $translate.instant('webcast.form.broadcast.serverUrl.placeholder'),
          type: 'url',
          required: true
        }
      },
      {
        key: 'streamName',
        type: 'input',
        model: vm.model.liveStateData.broadcast,
        templateOptions: {
          label: $translate.instant('webcast.form.broadcast.streamName.label'),
          placeholder: $translate.instant('webcast.form.broadcast.streamName.placeholder'),
          required: true
        }
      }
    ];
  }

  function getFieldsTheme() {
    return [
      {
        key: 'logoUrl',
        type: 'input',
        model: vm.model.theme,
        templateOptions: {
          label: $translate.instant('webcast.form.logoUrl.label'),
          placeholder: $translate.instant('webcast.form.logoUrl.placeholder'),
          type: 'url',
          required: true
        }
      },
      {
        key: 'backgroundColor',
        type: 'input',
        model: vm.model.theme,
        templateOptions: {
          label: $translate.instant('webcast.form.backgroundColor.label'),
          placeholder: $translate.instant('webcast.form.backgroundColor.placeholder'),
          required: true
        }
      }
    ];
  }

  function getModelPrepared(model) {
    var modelPrepared = model;

    var modelDefault = {
      customer: {id: vm.selectedCustomer.id},
      state: 'prelive',
      preliveStateData: {
        playout: {
          hdsUrl: null,
          hlsUrl: null,
          dashUrl: null
        }
      },
      liveStateData: {
        playout: {
          hdsUrl: null,
          hlsUrl: null,
          dashUrl: null
        },
        broadcast: {
          serverUrl: null,
          streamName: null
        }
      },
      postliveStateData: {
        playout: {
          hdsUrl: null,
          hlsUrl: null,
          dashUrl: null
        }
      },
      theme: {
        logoUrl: null,
        backgroundColor: '#ffffff'  // hatte C3PO so vordefiniert ...
      }
    };

    // definitiv nicht schön, aber selten ...
    for (var property in modelDefault) {
      // level 1
      if (angular.isUndefined(model[property])) {
        modelPrepared[property] = modelDefault[property];
      } else {
        // level 2
        if (angular.isObject(modelDefault[property])) {
          for (var subproperty in modelDefault[property]) {
            if (angular.isUndefined(model[property][subproperty])) {
              modelPrepared[property][subproperty] = modelDefault[property][subproperty];
            }
          }
        }
      }
    }

    return modelPrepared;
  }

  // controlbar ========================================================================================================

  function getControlbarItemsHead() {
    return [
      {
        type: 'breadcrumb',
        segments: [
          {
            type: 'text',
            title: vm.selectedCustomer.name,
            label: vm.selectedCustomer.name
          },
          {
            type: 'link',
            title: $translate.instant('webcast.sidebar.title'),
            label: $translate.instant('webcast.sidebar.label'),
            uiState: 'app.manager.webcast'
          },
          {
            type: 'text',
            title: $translate.instant((angular.isDefined(vm.model.id)) ? 'core.update.title' : 'core.create.title'),
            label: $translate.instant((angular.isDefined(vm.model.id)) ? 'core.update.label' : 'core.create.label')
          }
        ]
      }
    ];
  }

  function getControlbarItemsLeft() {
    return [
      {
        type: 'nav-tabs',
        children: [
          {
            icon: $translate.instant('webcast.nav-tabs.icon'),
            title: $translate.instant('webcast.nav-tabs.title'),
            label: $translate.instant('webcast.nav-tabs.label'),
            uiState: '.'
          // },
          // {
          //   icon: $translate.instant('presentation.nav-tabs.icon'),
          //   title: $translate.instant('presentation.nav-tabs.title'),
          //   label: $translate.instant('presentation.nav-tabs.label'),
          //   uiState: 'app.manager.webcast.detail.presentation'
          }
        ]
      }
    ];
  }

  function getControlbarItemsRight() {
    return [
      {
        type: 'link',
        class: 'btn btn-default',
        title: $translate.instant('core.cancel.title'),
        label: $translate.instant('core.cancel.label'),
        uiState: '^'
      },
      {
        type: 'link',
        class: 'btn btn-primary',
        title: $translate.instant('core.save.title'),
        label: $translate.instant('core.save.label'),
        formcheck: true,
        // achtung, gemeint ist die Funktion in diesem controller, aber unbedingt die runden Klammern weglassen, sonst
        // knallt es fürchterlich
        click: (angular.isDefined(vm.model.id)) ? update : create
      }
    ];
  }

};
