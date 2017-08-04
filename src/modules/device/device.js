import Device from '../../utils/device';

export default {
  name: 'device',
  proto: {
    device: Device,
  },
  static: {
    Device,
  },
  on: {
    init() {
      const classNames = [];
      const html = document.querySelector('html');
      // Pixel Ratio
      classNames.push(`device-pixel-ratio-${Math.floor(Device.pixelRatio)}`);
      if (Device.pixelRatio >= 2) {
        classNames.push('device-retina');
      }
      // OS classes
      if (Device.os) {
        classNames.push(`device-${Device.os}`, `device-${Device.os}-${Device.osVersion.split('.')[0]}`, `device-${Device.os}-${Device.osVersion.replace(/\./g, '-')}`);
        if (Device.os === 'ios') {
          const major = parseInt(Device.osVersion.split('.')[0], 10);
          for (let i = major - 1; i >= 6; i -= 1) {
            classNames.push(`device-ios-gt-${i}`);
          }
        }
      } else if (Device.desktop) {
        classNames.push('device-desktop');
      }
      // Status bar classes
      if (Device.statusBar) {
        classNames.push('with-statusbar-overlay');
      } else {
        html.classList.remove('with-statusbar-overlay');
      }

      // Add html classes
      classNames.forEach((className) => {
        html.classList.add(className);
      });
    },
  },
};