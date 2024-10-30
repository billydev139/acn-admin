import { CONFIG } from 'src/config-global';

import { BlankView } from 'src/sections/blank/view';
import { CorrosionApplicationsListView } from 'src/sections/corrosion';

// ----------------------------------------------------------------------

export const metadata = { title: `Page two | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <CorrosionApplicationsListView title="Page two" />;
}
