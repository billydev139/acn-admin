import { CONFIG } from 'src/config-global';

import { BlankView } from 'src/sections/blank/view';
import { SalesApplicationsListView } from 'src/sections/sales';

// ----------------------------------------------------------------------

export const metadata = { title: `Page two | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <SalesApplicationsListView title="Sales Enquiries" />;
}
