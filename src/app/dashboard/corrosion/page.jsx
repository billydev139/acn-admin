
import { CONFIG } from 'src/config-global';

import { BlankView } from 'src/sections/blank/view';
import { CorrosionApplicationsListView } from 'src/sections/corrosion';

// ----------------------------------------------------------------------

export const metadata = { title: `Corrosion | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  console.log("main page")
  return <CorrosionApplicationsListView title="Page two" />;
}
