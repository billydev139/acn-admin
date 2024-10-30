// app/career/page
import { CONFIG } from 'src/config-global';

import { BlankView } from 'src/sections/blank/view';
import { CareerApplicationsListView} from 'src/sections/career';

// ----------------------------------------------------------------------

export const metadata = { title: `Career | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <CareerApplicationsListView title="Career Applications" />;
}
