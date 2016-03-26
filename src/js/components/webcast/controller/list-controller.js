'use strict';

/**
 * @ngInject
 */
module.exports = function (webcasts, CurrentUserService, $state, $translate) {
  var vm = this;
  // functions
  // variables
  vm.selectedCustomer = CurrentUserService.getSelectedCustomer();
  vm.controlbarItemsHead = getControlbarItemsHead();
  vm.controlbarItemsLeft = getControlbarItemsLeft();
  vm.controlbarItemsRight = getControlbarItemsRight();
  vm.webcasts = webcasts;
  vm.preparedList = [];

  angular.forEach(vm.webcasts, function (webcast) {
    vm.preparedList.push({
      id: webcast.id,
      title: webcast.name,
      state: webcast.state,
      showStateLeft: true,
      stateLabel: getStateLabelValue(webcast),
      showPreview: false,
      previewUrl: webcast.theme.logoUrl,
      showMenu: true,
      menu: getItemMenu(webcast),
      hrefDetail: $state.href('app.manager.webcast.detail', {webcastId: webcast.id})
    });
  });

  // public methods ////////////////////////////////////////////////////////////////////////////////////////////////////

  // private methods ///////////////////////////////////////////////////////////////////////////////////////////////////

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
            type: 'text',
            title: $translate.instant('webcast.sidebar.title'),
            label: $translate.instant('webcast.sidebar.label')
          }
        ]
      }
    ];
  }

  function getControlbarItemsLeft() {
    return [
      {
        type: 'link',
        class: 'btn btn-primary',
        icon: $translate.instant('core.create.icon'),
        title: $translate.instant('core.create.title'),
        label: $translate.instant('core.create.label'),
        uiState: 'app.manager.webcast.create'
      }
    ];
  }

  function getControlbarItemsRight() {
    return [
      {
        type: 'search'
      }
    ];
  }

  // item stuff ========================================================================================================

  function getStateLabelValue(webcast) {
    var value;
    switch (webcast.state) {
      case 'prelive':
        value = 'warning';
        break;
      case 'live':
        value = 'danger';
        break;
      case 'postlive':
        value = 'primary';
        break;
      case 'archive':
        value = 'default';
        break;
    }
    return value;
  }

  function getItemMenu(webcast) {
    return [
      // {
      //   type: 'link',
      //   icon: $translate.instant('core.preview.icon'),
      //   title: $translate.instant('core.preview.title'),
      //   label: $translate.instant('core.preview.label'),
      //   href: (process.env.WBC_CSR_GUI_HOST || '') + '/#/webcast/' + webcast.id,
      //   target: '_blank'
      // },
      // {
      //   type: 'divider'
      // },
      {
        type: 'link',
        icon: $translate.instant('core.update.icon'),
        title: $translate.instant('core.update.title'),
        label: $translate.instant('core.update.label'),
        uiState: 'app.manager.webcast.detail',
        uiStateParams: {webcastId: webcast.id}
      }
    ];
  }
};
