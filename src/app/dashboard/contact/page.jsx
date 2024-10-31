import { CONFIG } from 'src/config-global';

import { BlankView } from 'src/sections/blank/view';
import { ContactApplicationsListView } from 'src/sections/contact';

// ----------------------------------------------------------------------

export const metadata = { title: `Contact | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <ContactApplicationsListView />;
}
