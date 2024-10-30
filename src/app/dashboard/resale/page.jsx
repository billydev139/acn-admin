import { CONFIG } from 'src/config-global';

import { BlankView } from 'src/sections/blank/view';
import { ResaleApplicationsListView } from 'src/sections/resale';

// ----------------------------------------------------------------------

export const metadata = { title: `Page two | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <ResaleApplicationsListView title="Resale Requests" />;
}
