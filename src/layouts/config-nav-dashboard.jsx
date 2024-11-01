import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    subheader: 'Overview 6.0.0',
    items: [
      { title: 'One', path: paths.dashboard.root, icon: ICONS.dashboard },
      { title: 'Career', path: paths.dashboard.career, icon: ICONS.ecommerce },
      { title: 'Sales', path: paths.dashboard.sale, icon: ICONS.ecommerce },
      {
        title: 'Resale',
        path: paths.dashboard.resale.root,
        icon: ICONS.ecommerce,
        children: [
          { title: 'List', path: paths.dashboard.resale.root },
          { title: 'View', path: paths.dashboard.resale.view('null') },
        ],
      },
      {
        title: 'Corrosion',
        path: paths.dashboard.corrosion.root,
        icon: ICONS.ecommerce,
        children: [
          { title: 'List', path: paths.dashboard.corrosion.root },
          { title: 'View', path: paths.dashboard.corrosion.view('null') },
        ],
      },
      { title: 'Contact', path: paths.dashboard.contact, icon: ICONS.ecommerce },
      // { title: 'Corrosion', path: paths.dashboard.corrosion, icon: ICONS.ecommerce },
      { title: 'Three', path: paths.dashboard.three, icon: ICONS.analytics },
    ],
  },
  /**
   * Management
   */
  {
    subheader: 'Management',
    items: [
      {
        title: 'Group',
        path: paths.dashboard.group.root,
        icon: ICONS.user,
        children: [
          { title: 'Four', path: paths.dashboard.group.root },
          { title: 'Five', path: paths.dashboard.group.five },
          { title: 'Six', path: paths.dashboard.group.six },
        ],
      },
    ],
  },
];
